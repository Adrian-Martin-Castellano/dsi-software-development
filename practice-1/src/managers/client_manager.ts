import { Clients } from "../characters/client.js";
import { Race } from "../enums/types-and-races.js";

/**
 * ClientsManager class containing search methods for clients.
 */
export class ClientsManager {
  /**
   * Constructor.
   * @param clients - List of clients.
   */
  constructor(private clients: Clients[]) {}

  /**
   * Allows searching for a client given a name.
   * @param name - Name of the client to search for
   * @returns - List with the client or empty list.
   */
  searchByName(name: string): Clients[] {
    return this.clients.filter(client =>
      client.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  /**
   * Allows searching for a client given a location.
   * @param location - Location to search for.
   * @returns - List with the client or empty list.
   */
  searchByLocation(location: string): Clients[] {
    return this.clients.filter(client =>
      client.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  /**
   * Allows searching for a client given a race.
   * @param race - Race to search for.
   * @returns - List with the client or empty list.
   */
  searchByRace(race: Race): Clients[] {
    return this.clients.filter(client => client.race === race);
  }
}