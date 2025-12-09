export interface TradeNotificationDTO {
  userPublicId: string;
  message: string;
}

export interface TradeResultDTO {
  movementPublicId: string;
  transactionPublicId: string;
  transactionPrice: number;
  quantity: number;
  notifications: TradeNotificationDTO[];
}
