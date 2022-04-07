export interface PriceInfo {
  id: number;
  openPrice: number;
  rangePrice: { min: number; max: number };
  lastPrice: { price: number; change: number };
  currentPrice: { price: number; change: number };
}
export enum SymbolState {
  Close = 0,
  Open = 1,
  Opening = 2,
}

export interface chartData {
  SymbolName: string;
  lineChartData: any;
}
