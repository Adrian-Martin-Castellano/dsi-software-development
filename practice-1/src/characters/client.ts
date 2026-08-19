import { Person } from "../characters/person.js";
import * as Enums from "../enums/types-and-races.js";
import { ClientsJSON } from "../interfaces/interfaces_json.js";

/**
 * Clients class. Represents a client
 */
export class Clients extends Person {

  private static _idCount = 1; // Count of IDs being assigned each time a new object is created
  
    /**
     * Clients constructor
     * @param name - Name of the client
     * @param location - Location of the client
     * @param _race - Race of the client
     */
    constructor(
      name: string, 
      location: string, 
      private _race: Enums.Race
    ) {
      super(name, location);

      this._id = Clients._idCount;
      Clients._idCount++;
    }
  
    /**
     * Race getter
     */
    get race() {
      return this._race;
    }
  
    /**
     * Race setter
     */
    set race(race: Enums.Race) {
      this._race = race;
    }

    /**
     * Converts a database client into a normal client instance.
     * @param json - Client in json format (database).
     * @returns - Client as a Clients instance.
     */
    static fromJSON(json: ClientsJSON): Clients {
      const c: Clients = new Clients(json._name, json._location, json._race);
      c.setId(json._id);
    
      return c;
    }
  }