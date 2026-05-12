export interface SubCategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  subcategories: SubCategory[];
}

export const productCategories: Category[] = [
  {
    id: "Fashion",
    name: "Fashion",
    subcategories: [
      { id: "Blouse", name: "Blouse" },
      { id: "T-Shirt", name: "T-Shirt" },
      { id: "Dress", name: "Dress" },
      { id: "Celana", name: "Celana" },
      { id: "Hijab", name: "Hijab" },
    ],
  },
  {
    id: "Makanan",
    name: "Makanan & Minuman",
    subcategories: [
      { id: "Keripik", name: "Keripik" },
      { id: "Kue Kering", name: "Kue Kering" },
      { id: "Sambal", name: "Sambal" },
      { id: "Minuman Bubuk", name: "Minuman Bubuk" },
      { id: "Frozen Food", name: "Frozen Food" },
    ],
  },
  {
    id: "Kecantikan",
    name: "Kecantikan",
    subcategories: [
      { id: "Skincare", name: "Skincare" },
      { id: "Makeup", name: "Makeup" },
      { id: "Body Care", name: "Body Care" },
      { id: "Parfum", name: "Parfum" },
    ],
  },
  {
    id: "Elektronik",
    name: "Elektronik",
    subcategories: [
      { id: "Aksesoris HP", name: "Aksesoris HP" },
      { id: "Earphone", name: "Earphone" },
      { id: "Powerbank", name: "Powerbank" },
    ],
  },
];
