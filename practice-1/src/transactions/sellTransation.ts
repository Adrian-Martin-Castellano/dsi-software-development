import { Transaction } from "./transaction.js";
import { Clients } from "../characters/client.js";
import { Assets } from "../items/asset.js";
import { Date } from "../utils/date.js";

/**
 * SellTransaction class. Represents a sale transaction from the inn to a client
 */
export class SellTransaction extends Transaction {
  /**
   * SellTransaction constructor
   * @param date - Date of the transaction
   * @param assets - Sold assets
   * @param quantity - Quantity of each asset
   * @param _client - Client making the purchase
   */
  constructor(
    date: Date,
    assets: Assets[],
    quantity: number[],
    private readonly _client: Clients
  ) {
    super(date, assets, quantity);
    this._crowns *= 1.2;
  }

  /**
   * Client getter
   */
  get client() {
    return this._client;
  }

  /**
   * Determines whether the transaction is a refund
   * @returns False (it is a regular sale)
   */
  override get isRefund(): boolean {
    return false;
  }
}