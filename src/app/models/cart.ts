export class CartItem {
  id!: string;
  size: string
  product: string
  colour: string;
  quantity: number;
  productCode: string;
  productName: string;
  productImg: string;
  price:string;
  Total:string
}
export class Carts{
  id!: string;
  user!: string;
  products:[CartItem] ;
  total: number;
}
