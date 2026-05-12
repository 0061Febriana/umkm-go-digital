# ============================================
# Auto Git Commit & Push Script
# Cukup jalankan: powershell -ExecutionPolicy Bypass -File auto-push.ps1
# ============================================

$folder = $PSScriptRoot
$delay = 3  # detik tunggu sebelum commit (menghindari commit bertumpuk)

# Folder/file yang di-ignore
$ignorePatterns = @(
    '\.git\\',
    'node_modules\\',
    '\.next\\',
    'eslint-errors',
    '\.vscode\\'
)

function ShouldIgnore($path) {
    foreach ($pattern in $ignorePatterns) {
        if ($path -match $pattern) { return $true }
    }
    return $false
}

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "  AUTO GIT COMMIT & PUSH" -ForegroundColor Yellow
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "  Folder: $folder" -ForegroundColor White
Write-Host "  Delay: ${delay}detik" -ForegroundColor White
Write-Host "  Tekan Ctrl+C untuk berhenti" -ForegroundColor Gray
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Cek apakah remote sudah di-set
$remote = git remote get-url origin 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Remote origin belum di-set! Jalankan dulu: git remote add origin <url>" -ForegroundColor Red
    exit
}

# Buat branch dev jika belum ada
$branchExists = git branch --list "dev" 2>&1
if (-not $branchExists) {
    git checkout -b dev 2>&1 | Out-Null
    git push -u origin dev 2>&1 | Out-Null
    Write-Host "✅ Branch 'dev' dibuat dan di-push" -ForegroundColor Green
} else {
    git checkout dev 2>&1 | Out-Null
}

# Setup FileSystemWatcher
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $folder
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

# Filter hanya file source code
$watcher.Filter = "*.*"

# Debounce: kumpulkan perubahan dalam jangka waktu tertentu
$changedFiles = @{}
$timer = $null

while ($true) {
    $result = $watcher.WaitForChanged([System.IO.WatcherChangeTypes]::All, 1000)

    if ($result.TimedOut) {
        # Cek apakah ada file yang perlu di-commit
        if ($changedFiles.Count -gt 0) {
            $now = Get-Date
            if ($timer -eq $null -or ($now - $timer).TotalSeconds -ge $delay) {
                $filesToCommit = $changedFiles.Keys -join ", "
                Write-Host "`n📝 Perubahan terdeteksi: $filesToCommit" -ForegroundColor Yellow

                # Reset
                $changedFiles = @{}
                $timer = $null

                # Add, commit, push
                try {
                    git add . 2>&1 | Out-Null
                    $msg = "auto: perubahan ($(Get-Date -Format 'HH:mm:ss'))"
                    git commit -m $msg 2>&1
                    if ($LASTEXITCODE -eq 0) {
                        git push 2>&1
                        Write-Host "✅ Berhasil di-commit dan di-push!" -ForegroundColor Green
                    } else {
                        Write-Host "⚠️ Tidak ada perubahan baru untuk di-commit" -ForegroundColor Yellow
                    }
                } catch {
                    Write-Host "❌ Gagal: $_" -ForegroundColor Red
                }
            }
        }
        continue
    }

    $changedFile = $result.Name
    $fullPath = Join-Path $folder $changedFile

    if (-not (ShouldIgnore $changedFile)) {
        $changedFiles[$changedFile] = $true
        $timer = Get-Date
    }
}