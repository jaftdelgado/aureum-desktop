import type {
  Currency,
  Volatility,
  ThickSpeed,
  TransactionFee,
} from "@domain/entities/MarketConfig";

const currencyValues = ["USD", "EUR", "MXN"] as const;
export function isCurrency(value: string): value is Currency {
  return currencyValues.includes(value as Currency);
}

const volatilityValues = ["Low", "Medium", "High", "Disabled"] as const;
export function isVolatility(value: string): value is Volatility {
  return volatilityValues.includes(value as Volatility);
}

const thickSpeedValues = ["Low", "Medium", "High"] as const;
export function isThickSpeed(value: string): value is ThickSpeed {
  return thickSpeedValues.includes(value as ThickSpeed);
}

const transactionFeeValues = ["Low", "Medium", "High", "Disabled"] as const;
export function isTransactionFee(value: string): value is TransactionFee {
  return transactionFeeValues.includes(value as TransactionFee);
}

export const toCurrency = (value: string): Currency =>
  isCurrency(value) ? value : "USD";

export const toVolatility = (value: string): Volatility =>
  isVolatility(value) ? value : "Medium";

export const toThickSpeed = (value: string): ThickSpeed =>
  isThickSpeed(value) ? value : "Medium";

export const toTransactionFee = (value: string): TransactionFee =>
  isTransactionFee(value) ? value : "Low";
