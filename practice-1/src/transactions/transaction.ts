import { Assets } from "../items/asset.js";
import { Stock } from "../types/stock.js";
import { Date } from "../utils/date.js";

/**
 * Abstract class Transaction. Represents the minimum contract for a transaction
 */
export abstract class Transaction {
  protected _crowns: number = 0;

  /**
   * Transaction constructor
   * @param _date - Date when the transaction occurred
   * @param _exchangeAssets - Exchanged assets
   * @param _quantity - Quantity of each asset
   */
  constructor(
    protected readonly _date: Date,
    protected readonly _exchangeAssets: Assets[],
    protected readonly _quantity: number[]
  ) {
    if (_exchangeAssets.length !== _quantity.length) {
      throw new Error("Every asset must have a specified quantity.");
    } else if (_exchangeAssets.length === 0) {
      throw new Error("The transaction must contain at least one asset.");
    }

    _exchangeAssets.forEach((asset, index) => {
      this._crowns += asset.crowns * _quantity[index];
    });
  }

  /**
   * Date getter
   */
  get date() {
    return this._date;
  }

  /**
   * Crowns getter
   */
  get crowns() {
    return this._crowns;
  }

  /**
   * Exchanged assets getter
   * @returns List of assets paired with their quantities
   */
  getExchangeAssets(): Stock[] {
    const assetQuantity: Stock[] = [];

    this._exchangeAssets.forEach((elem, index) => {
      assetQuantity.push([elem, this._quantity[index]]);
    });

    return assetQuantity;
  }

  /**
   * Determines whether the transaction is a refund
   * @returns True if it's a refund, false otherwise
   */
  get isRefund(): boolean {
    return false;
  }
}