

const URL = 'http://localhost:3000';

export interface Product {
  id: number;
  name: string;
  price: number;
  picture: string;
}

export class ProductService {
  public static async getAllProducts(): Promise<Product[]> {
    const res = await fetch(`${URL}/products`);
    return res.json();
  }
}
