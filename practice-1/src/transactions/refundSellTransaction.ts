import { SellTransaction } from "./sellTransation.js";

/**
 * RefundSellTransaction class. Represents a sale refund initiated by a client
 */
export class RefundSellTransaction extends SellTransaction {
  /**
   * Determines whether the transaction is a refund
   * @returns True (it is a refund)
   */
  get isRefund(): boolean {
    return true;
  }
}