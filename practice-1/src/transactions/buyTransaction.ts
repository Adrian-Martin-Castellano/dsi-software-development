import { Transaction } from "./transaction.js";
import { Merchant } from "../characters/merchant.js";
import { Assets } from "../items/asset.js";
import { Date } from "../utils/date.js";

/**
 * BuyTransaction class. Represents a purchase transaction from a merchant
 */
export class BuyTransaction extends Transaction {
  /**
   * BuyTransaction constructor
   * @param date - Date of the purchase
   * @param assets - Purchased assets
   * @param quantity - Quantity of each asset
   * @param _merchant - Merchant involved in the purchase
   */
  constructor(
    date: Date,
    assets: Assets[],
    quantity: number[],
    private readonly _merchant: Merchant
  ) {
    super(date, assets, quantity);
  }

  /**
   * Merchant getter
   */
  get merchant() {
    return this._merchant;
  }
}