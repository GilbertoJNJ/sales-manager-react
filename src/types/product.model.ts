export interface Product {
  id: number;
  name: string;
  category: Category;
  unitPrice: number;
  stockQuantity: number;
}

export enum Category {
  ELECTRONIC = "Eletrônicos",
  CLOTHING = "Roupas",
  FOOD = "Alimentos",
  OTHER = "Outros",
}

export enum MeasureUnit {
  KILOGRAM = "Kilogramas",
  LITER = "Litros",
  UNIT = "Unidades",
}