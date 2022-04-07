export interface Transfer {
  amount: number;
  cardNumber: string;
  isSign: boolean;
}

export interface Counterparty {
  counterpartyIBAN: string;
  counterpartyName: string;
}
