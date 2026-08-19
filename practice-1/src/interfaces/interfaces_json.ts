import { Type, Race } from "../enums/types-and-races.js";

/**
 * JSON representation of an Asset.
 * Used to store data in the database without class instances.
 */
export interface AssetJSON {
  /**
   * Unique ID of the asset
   */
  _id: number;
  
  /**
   * Name of the asset.
   */
  _name: string;

  /**
   * Description of the asset.
   */
  _description: string;

  /**
   * List of materials that compose the asset.
   */
  _materials: string[];

  /**
   * Weight of the asset.
   */
  _weight: number;

  /**
   * Value in crowns of the asset.
   */
  _crowns: number;
}

/**
 * JSON representation of a Merchant.
 * Allows storing merchants in the database without losing type information.
 */
export interface MerchantJSON {
  /**
   * Unique ID of the merchant
   */
  _id: number;
  
  /**
   * Name of the merchant.
   */
  _name: string;

  /**
   * Location where the merchant is found.
   */
  _location: string;

  /**
   * Type of merchant, represented by Type.
   */
  _type: Type;
}

/**
 * JSON representation of a Client (Clients).
 * Used to store client information in the database.
 */
export interface ClientsJSON {
  /**
   * Unique ID of the client
   */
  _id: number;
  
  /**
   * Name of the client.
   */
  _name: string;
  /**
   * Location of the client.
   */
  _location: string;

  /**
   * Race of the client, represented by Race.
   */
  _race: Race;
}