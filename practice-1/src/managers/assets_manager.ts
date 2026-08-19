import { Assets } from "../items/asset.js";

export class AssetManager {
  /**
   * Private asset list attribute
   */
  private assets: Assets[];

  /**
   * Constructor
   * @param assets - List of assets
   */
  constructor(assets: Assets[]) {
    this.assets = assets;
  }

  /**
   * Searches for an item by its name.
   * @param item_name - Name of the asset to search for
   * @returns - Array of items matching the search.
   */
  searchByName(item_name: string): Assets[] {
    return this.assets.filter(asset =>
      asset.name.toLowerCase().includes(item_name.toLowerCase())
    );
  }

  /**
   * Searches for an item by its description.
   * @param item_description - Description of the asset to search for
   * @returns - Array of items matching the search.
   */
  searchByDescription(item_description: string): Assets[] {
    return this.assets.filter(asset =>
      asset.description.toLowerCase().includes(item_description.toLowerCase())
    );
  }

  /**
   * Sorts items in a list by their name.
   * @param is_ascendance - Boolean. True for ascending order, false for descending order
   * @returns - Array of sorted items.
   */
  sortByName(is_ascendance: boolean): Assets[] {
    return [...this.assets]
    .filter(asset => asset && asset.name) 
    .sort((a, b) => is_ascendance ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
  }

  /**
   * Sorts items in a list by their value in crowns.
   * @param is_ascendance - Boolean. True for ascending order, false for descending order
   * @returns - Array of sorted items.
   */
  sortByCrowns(is_ascendance: boolean): Assets[] {
    return this.assets.sort((a, b) => 
      is_ascendance ? a.crowns - b.crowns : b.crowns - a.crowns
    );
  }
}