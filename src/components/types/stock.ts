export interface Stock {
  symbol: string;
  price: number;
  quantity: number;
  name?: string;
  change?: number;
}
