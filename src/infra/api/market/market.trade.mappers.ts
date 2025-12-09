import type { TradeResultDTO } from "./market.trade.dto";
import type { TradeResult } from "@domain/entities/Trade";

export const mapTradeResultDTOToEntity = (
  dto: TradeResultDTO
): TradeResult => ({
  movementPublicId: dto.movementPublicId,
  transactionPublicId: dto.transactionPublicId,
  transactionPrice: dto.transactionPrice,
  quantity: dto.quantity,
  notifications: dto.notifications.map((n) => ({
    userPublicId: n.userPublicId,
    message: n.message,
  })),
});
