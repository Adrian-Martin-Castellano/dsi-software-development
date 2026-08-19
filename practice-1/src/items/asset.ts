import { AssetJSON } from "../interfaces/interfaces_json.js";

/**
 * Assets class. Represents an asset
 */
export class Assets {

  private _id: number; // Unique ID of the asset
  private static _idCount: number = 1; // Count of IDs being assigned each time a new object is created

  /**
   * Assets constructor
   * @param _name - Name of the asset
   * @param _description - Description of the asset
   * @param _materials - Materials of the asset
   * @param _weight - Weight of the asset
   * @param _crowns - Value in crowns of the asset
   */
  constructor(
    private _name: string, 
    private _description: string, 
    private _materials: string[],
    private _weight: number,
    private _crowns: number
  ) {
    if (_weight <= 0) {
      throw new Error("El peso del bien ha de ser mayor que 0.");
    } else if (_crowns < 0) {
      throw new Error("El número de coronas no puede ser negativos.");
    } else if (_name === "") {
      throw new Error("El nombre no puede estar vacío.");
    } else if (_description === "") {
      throw new Error("El descripción no puede estar vacía.");
    } else if (_materials.length === 0) {
      throw new Error("La lista de materiales no puede estar vacía.");
    }

    this._id = Assets._idCount;
    Assets._idCount++;
  }

  /**
   * ID getter
   */
  get id() {
    return this._id;
  }

  /**
   * ID setter
   * @param id - New ID
   */
  private setId(id: number): void {
    this._id = id;
  }

  /**
   * Name getter
   */
  get name() {
    return this._name;
  }

  /**
   * Name setter
   */
  set name(name: string) {
    if (name === "") {
      throw new Error("El nombre no puede estar vacío.");
    }

    this._name = name;
  }

  /**
   * Description getter
   */
  get description() {
    return this._description;
  }

  /**
   * Description setter
   */
  set description(desc: string) {
    if (desc === "") {
      throw new Error("El descripción no puede estar vacía.");
    }

    this._description = desc;
  }

  /**
   * Materials getter
   */
  get materials() {
    return this._materials;
  }

  /**
   * Materials setter
   */
  set materials(mats: string[]) {
    if (mats.length === 0) {
      throw new Error("La lista de materiales no puede estar vacía.");
    }

    this._materials = mats;
  }

  /**
   * Weight getter
   */
  get weight() {
    return this._weight;
  }

  /**
   * Weight setter
   */
  set weight(weight: number) {
    if (weight <= 0) {
      throw new Error("El peso del bien ha de ser mayor que 0.");
    }

    this._weight = weight;
  }

  /**
   * Crowns getter
   */
  get crowns() {
    return this._crowns;
  }

  /**
   * Crowns setter
   */
  set crowns(crowns: number) {
    if (crowns < 0) {
      throw new Error("El número de coronas no puede ser negativos.");
    }

    this._crowns = crowns;
  }

/**
 * Static method to reconstruct an Assets object from JSON.
 * @param json - Object with the AssetJSON structure
 * @returns New instance of Assets
 */
static fromJSON(json: AssetJSON): Assets {
  const a: Assets = new Assets(json._name, json._description, json._materials, json._weight, json._crowns);
    a.setId(json._id);
    
    return a;
}
}