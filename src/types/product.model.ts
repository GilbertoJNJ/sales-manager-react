export interface Product {
  id?: number;
  name: string;
  code?: string;
  supplier?: any;
  measureUnit?: MeasureUnit;
  description?: string;
  category: Category;
  unitPrice: number;
  stockQuantity?: number;
  maxStockLevel?: number;
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