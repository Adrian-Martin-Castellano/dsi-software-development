import { Merchant } from "../characters/merchant.js";
import { Clients } from "../characters/client.js";
import { Transaction } from "../transactions/transaction.js";
import { Stock } from "../types/stock.js";
import { Date } from "../utils/date.js";
import { db } from "../database/database.js";
import { BuyTransaction } from "../transactions/buyTransaction.js";
import { SellTransaction } from "../transactions/sellTransation.js";
import { RefundBuyTransaction } from "../transactions/refundBuyTransaction.js";
import { RefundSellTransaction } from "../transactions/refundSellTransaction.js";
import { Assets } from "./asset.js";
import { AssetJSON, ClientsJSON } from "../interfaces/interfaces_json.js";
import { AssetManager } from "../managers/assets_manager.js";
import { MerchantJSON } from "../interfaces/interfaces_json.js";
import _ from 'lodash';

/**
 * Inventary class. Represents an inventory composed of assets, merchants, and clients
 */
export class Inventary {

  private _transactions: Transaction[] = [];

  /**
   * Inventary constructor
   * @param _assetsList - List of assets
   */
  constructor(private _assetsList: Stock[]) { }

  /**
   * Getter for assetsList
   */
  get assetsList() {
    return this._assetsList;
  }

  /**
   * Getter for transactions
   */
  get transactions() {
    return this._transactions;
  }

  /**
   * Initializes the inventory with stock and assets from the database.
   * @returns - Inventary object.
   */
  static buildInventaryFromDB(): Inventary {
    db.read();

    let assets: Assets[] = db.data.assets.map(asset => Assets.fromJSON(asset as unknown as AssetJSON));
  
    let asset_manager = new AssetManager(assets);
    assets = asset_manager.sortByName(true);
  
    const inventary = new Inventary([]);
    
    const repeat_assets: [Assets, number][] = [];
    let counter: number = 0, i = 0;

    assets.forEach((asset, index) => {
      if (index === 0 || (asset.name === assets[index - 1].name && asset.description === assets[index - 1].description)) counter++;
      else {
        repeat_assets.push([assets[index - 1], counter]);
        counter = 1;
      }
      i = index;
    });
  
    repeat_assets.push([assets[i], counter]);
      repeat_assets.forEach(asset => {
      inventary.addAssets(asset);
    });
  
    return inventary;
  }
  
  /**
   * Adds an asset to the inventory
   * @param stock - Asset and its quantity to add
   */
  private addAssets(stock: Stock): void {
    if (this._assetsList.some((asset) => _.isEqual(asset[0], stock[0]))) {
      const index: number = this._assetsList.findIndex((asset) => _.isEqual(asset[0], stock[0]));
      console.log(this._assetsList[index])
      this._assetsList[index][1] += stock[1];
    } else {
      this._assetsList.push(stock);
    }
  }

  /**
   * Removes an asset from the inventory
   * @param stock - Asset to remove
   */
  private removeAssets(stock: Stock): void {
    this._assetsList.forEach((element, index) => {
        if (_.isEqual(element[0], stock[0])) {
          element[1] -= stock[1];

          if (element[1] <= 0) {
            this._assetsList.splice(index, 1);
          }
        }
    });
  }

  /**
   * The inn buys a series of assets from a merchant
   * @param merchant - Merchant from whom the purchase is made
   * @param date - Date on which the sale takes place
   * @param stocks - Assets being purchased
   */
  buyAssets(merchant: Merchant, date: Date, ...stocks: Stock[]): void {
    db.read();

    const merchants: Merchant[] = db.data.merchants.map(merchant => Merchant.fromJSON(merchant as unknown as MerchantJSON));
    const assets: Assets[] = db.data.assets.map(asset => Assets.fromJSON(asset as unknown as AssetJSON));

    if (merchants.some(m => m.id === merchant.id)) {
      stocks.forEach((stock) => {
        if (!assets.some((asst) => _.isEqual(asst, stock[0]))) { 
          throw new Error("El bien que quieres comprar no existe.");
        }
      });

      const goods: Assets[] = [];
      const quantity: number[] = [];

      stocks.forEach((stock) => {
        this.addAssets(stock);
        goods.push(stock[0]);
        quantity.push(stock[1]);
      });

      this._transactions.push(new BuyTransaction(date, goods, quantity, merchant));
    } else {
      throw new Error("El mercader al que le quieres comprar no existe.");
    }
  }

  /**
   * Performs the return of assets to a merchant
   * @param merchant - Merchant to request the return from
   * @param date - Date on which the return takes place
   * @param assets - Assets to return
   */
  refundBuyAssets(merchant: Merchant, date: Date, ...assets: Stock[]): void {
    const goods: Assets[] = [];
    const quantity: number[] = [];

    let qnt: number;
    
    assets.forEach((asset) => {
      qnt = 0;

      if (!this._assetsList.some((stock) => _.isEqual(stock[0], asset[0]) && stock[1] >= asset[1])) {
        throw new Error("No tienes del bien que quieres devolver.");
      }

      this._transactions.forEach((trans) => {
        if (trans instanceof BuyTransaction && trans.merchant.id === merchant.id && trans.date.isLowerOrEqualThan(date)) {
          trans.getExchangeAssets().forEach((good) => {
            if (good[0].id === asset[0].id) {
              qnt += good[1];
            }
          });
        }
      });

      if (qnt === 0) {
        throw new Error("No se realizó ninguna transacción sobre algún bien con ese mercader hasta el momento.");
      } else if (qnt < asset[1]) {
        throw new Error("Entre todas las compras a ese mercader, no se compró tanta cantidad de uno de los bienes.");
      }

      this.removeAssets(asset);
      goods.push(asset[0]);
      quantity.push(asset[1]);
    });

    this._transactions.push(new RefundBuyTransaction(date, goods, quantity, merchant));
  }

  /**
   * Sells a series of assets to a client
   * @param client - Client to whom the sale is made
   * @param date - Date on which the sale took place
   * @param stocks - Assets sold
   */
  sellAssets(client: Clients, date: Date, ...stocks: Stock[]): void {
    db.read();

    const clients: Clients[] = db.data.clients.map(client => Clients.fromJSON(client as unknown as ClientsJSON));

    if (clients.some(c => _.isEqual(c, client))) {
      stocks.forEach((asset) => {
        if (!this._assetsList.some((stock) => _.isEqual(stock[0], asset[0]) && asset[1] <= stock[1] )) {
          throw new Error("El bien que quieres vender no está disponible o no cuenta con el suficiente stock");
        }
      });

      const goods: Assets[] = [];
      const quantity: number[] = [];

      stocks.forEach((asset) => {
        this.removeAssets(asset);
        goods.push(asset[0]);
        quantity.push(asset[1]);
      });

      this._transactions.push(new SellTransaction(date, goods, quantity, client));
    } else {
      throw new Error("El cliente al que le quieres vender no existe.");
    }
  }

  /**
   * Refunds assets to a client
   * @param client - Client to whom the refund is made
   * @param date - Date on which the refund took place
   * @param assets - Assets to refund
   */
  refundSellAssets(client: Clients, date: Date, ...assets: Stock[]): void {
    const goods: Assets[] = [];
    const quantity: number[] = [];

    let qnt: number;
    
    assets.forEach((asset) => {
      qnt = 0;

      this._transactions.forEach((trans) => {
        if (trans instanceof SellTransaction && trans.client.id === client.id && trans.date.isLowerOrEqualThan(date)) {
          trans.getExchangeAssets().forEach((good) => {
            if (good[0].id === asset[0].id) {
              qnt += good[1];
            }
          });
        }
      });

      if (qnt === 0) {
        throw new Error("No se realizó ninguna transacción sobre algún bien con ese cliente hasta el momento.");
      } else if (qnt < asset[1]) {
        throw new Error("Entre todas las ventas a ese cliente, no se compró tanta cantidad de uno de los bienes.");
      }

      this.addAssets(asset);
      goods.push(asset[0]);
      quantity.push(asset[1]);
    });

    this._transactions.push(new RefundSellTransaction(date, goods, quantity, client));
  }

/**
 * Generates a report of available inventory assets.
 * @param name - Optional name to filter the stock report by.
 * @returns - Array containing the list of assets in inventory, filtered if a filter condition is provided.
 */
 getStockReport(name?: string): Stock[] {
    if (name) {
        return this._assetsList.filter(stock => stock[0].name === name);
    }
    return this._assetsList;
  }
  
/**
 * Gets a list of the best-selling assets in inventory, ordered by quantity sold in descending order.
 * @returns - Array of objects containing each asset and total sold quantity.
 */
  getBestSellingAssets(): { asset: Assets; sold: number }[] {
    const salesRecords: { asset: Assets; sold: number }[] = [];
    for (let i = 0; i < this._transactions.length; i++) {
      const trans = this._transactions[i];
      if (trans instanceof SellTransaction) {
        const exchangeAssets: Stock[] = trans.getExchangeAssets();
        for (let j = 0; j < exchangeAssets.length; j++) {
          const asset = exchangeAssets[j][0];
          const quantity = exchangeAssets[j][1];
          let found = false;
          for (let k = 0; k < salesRecords.length; k++) {
            if (salesRecords[k].asset === asset) {
              salesRecords[k].sold += quantity;
              found = true;
              break;
            }
          }
          if (!found) {
            salesRecords.push({ asset: asset, sold: quantity });
          }
        }
      }
    }
    salesRecords.sort((a, b) => b.sold - a.sold);
    return salesRecords;
  }  
  
  /**
 * Calculates a financial summary based on recorded transactions.
 * @returns - An object (pair of two numbers) containing total income and expenses.
 */
  getFinancialSummary(): { totalIncome: number; totalExpenses: number } {
    let totalIncome = 0;
    let totalExpenses = 0;
    this._transactions.forEach((trans) => {
      if (trans instanceof SellTransaction) {
        totalIncome += trans.crowns;
      } else if (trans instanceof BuyTransaction) {
        totalExpenses += trans.crowns;
      } else if (trans instanceof RefundBuyTransaction) {
        totalExpenses -= trans.crowns;
      } else if (trans instanceof RefundSellTransaction) {
        totalIncome -= trans.crowns;
      }
    });
    return { totalIncome, totalExpenses };
  }
  
/**
 * Retrieves the sales transaction history associated with a specific client.
 * @param client - The client whose sales history is being requested.
 * @returns - An array of SellTransaction items associated with the client.
 */
getTransactionHistoryForClient(client: Clients): SellTransaction[] {
  const clientTransactions: SellTransaction[] = [];
  for (let i = 0; i < this._transactions.length; i++) {
    const trans = this._transactions[i];
    if ((trans instanceof SellTransaction || trans instanceof RefundSellTransaction) && trans.client.id === client.id) {
      clientTransactions.push(trans);
    }
  }
  return clientTransactions;
}
  
  /**
 * Retrieves the purchase transaction history associated with a specific merchant.
 * @param merchant - The merchant whose purchase history is being requested.
 * @returns - An array of all purchase transactions executed with the merchant.
 */
  getTransactionHistoryForMerchant(merchant: Merchant): BuyTransaction[] {
    const merchantTransactions: BuyTransaction[] = [];
    for (let i = 0; i < this._transactions.length; i++) {
      const trans = this._transactions[i];
      if ((trans instanceof BuyTransaction || trans instanceof RefundBuyTransaction) && trans.merchant.id === merchant.id) {
        merchantTransactions.push(trans);
      }
    }
    return merchantTransactions;
  }
}