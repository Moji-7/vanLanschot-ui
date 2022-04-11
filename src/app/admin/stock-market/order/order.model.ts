import { StockSymbol } from '../symbols/symbol.model';

export interface Order {
  request: Request;
  responses: OrderResponse[];
}

export interface Request {
  id: number | null;
  symbol: string;
  count: number;
  price: number;
  date: Date;
  traceId: number;
}
export interface OrderResponse {
  date: Date;
  traceId: number;
  id: number;
  statuscode: number;
}
