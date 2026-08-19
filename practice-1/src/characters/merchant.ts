import { Person } from "../characters/person.js";
import * as Enums from "../enums/types-and-races.js";
import { MerchantJSON } from "../interfaces/interfaces_json.js";

/**
 * Merchant class. Represents a merchant
 */
export class Merchant extends Person {

  private static _idCount = 1; // Count of IDs being assigned each time a new object is created

  /**
   * Merchant constructor
   * @param name - Name of the merchant
   * @param location - Location of the merchant
   * @param _type - Type of the merchant
   */
  constructor(
    name: string, 
    location: string, 
    private _type: Enums.Type) 
    {
      super(name, location);

      this._id = Merchant._idCount;
      Merchant._idCount++;
    }

  /**
   * Type getter
   */
  get type() {
    return this._type
  }

  /**
   * Type setter
   */
  set type(type: Enums.Type) {
    this._type = type;
  }

/**
 * Static method to reconstruct a Merchant object from JSON.
 * @param json - Object with the MerchantJSON structure
 * @returns New instance of Merchant
 */
  static fromJSON(json: MerchantJSON): Merchant {
    const m: Merchant = new Merchant(json._name, json._location, json._type);
    m.setId(json._id);
    
    return m;
  }
}