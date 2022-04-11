import { PriceInfo, SymbolState } from '../common.model';

export interface StockSymbol {
  id: number;
  name: string;
  state:SymbolState;
  description: string;
  icon: string;
  Group: number;
  priceInfo: PriceInfo;
}
