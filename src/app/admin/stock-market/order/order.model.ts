import { StockSymbol } from '../symbols/symbol.model';

export interface OrderRequest {
  id:number|null;
  symbol: string;
  count: number;
  price: number;
  date: Date;
}

export interface OrderResponse {
  request: OrderRequest;
  respone: OrderCoreResponse;
}

 interface OrderCoreResponse {
  date: Date;
  traceId:number;
  statuscode: number;
}
