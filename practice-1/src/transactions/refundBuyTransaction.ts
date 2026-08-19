import { BuyTransaction } from "./buyTransaction.js";

/**
 * RefundBuyTransaction class. Represents a refund transaction of goods to a merchant
 */
export class RefundBuyTransaction extends BuyTransaction {
  /**
   * Determines whether the transaction is a refund
   * @returns True (it is a refund)
   */
   get isRefund(): boolean {
    return true;
  }
}