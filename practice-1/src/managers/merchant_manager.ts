import { Merchant } from "../characters/merchant.js";
import { Type } from "../enums/types-and-races.js";

/**
 * MerchantManager class containing search methods for merchants.
 */
export class MerchantManager {
  /**
   * Constructor.
   * @param merchants - List of merchants.
   */
  constructor(private merchants: Merchant[]) {}

  /**
   * Allows searching for a merchant given a name.
   * @param name - Name of the merchant to search for
   * @returns - List with the merchant or empty list.
   */
  searchByName(name: string): Merchant[] {
    return this.merchants.filter(merchant =>
      merchant.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  /**
   * Allows searching for a merchant given a location.
   * @param location - Location to search for.
   * @returns - List with the merchant or empty list.
   */
  searchByLocation(location: string): Merchant[] {
    return this.merchants.filter(merchant =>
      merchant.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  /**
   * Allows searching for a merchant given a type.
   * @param type - Type to search for.
   * @returns - List with the merchant or empty list.
   */
  searchByType(type: Type): Merchant[] {
    return this.merchants.filter(merchant => merchant.type === type);
  }
}