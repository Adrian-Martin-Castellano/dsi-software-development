import inquirer from "inquirer";
import { Clients } from "../characters/client.js";
import { ClientsManager } from "../managers/client_manager.js";
import { Race } from "../enums/types-and-races.js";
import { ClientsJSON } from "../interfaces/interfaces_json.js";
import { db } from "../database/database.js";
import { locateMenu } from "./locate_menu.js";

/**
 * Submenu locateClient(). Locates clients by:
 * - Name: Searches client by name. Displays error if not found.
 * - Race: Searches client by race. Displays error if not found.
 * - Location: Searches client by location. Displays error if not found.
 * - View all: Displays all clients in database.
 * - Go back: Returns to "locateMenu()".
 */
export async function locateClient() {
  db.read();

  const clients: Clients[] = db.data.clients.map((client) =>
    Clients.fromJSON(client as unknown as ClientsJSON)
  );
  const clientManager = new ClientsManager(clients);

  const { filter } = await inquirer.prompt([
    {
      type: "list",
      name: "filter",
      message: "How would you like to search for the client?",
      choices: ["Name", "Race", "Location", "View all", "Go back"],
    },
  ]);

  let foundClients: Clients[] = [];

  switch (filter) {
    case "Name":
      const { searchName } = await inquirer.prompt([
        { type: "input", name: "searchName", message: "Enter name to search:" },
      ]);

      foundClients = clientManager.searchByName(searchName);

      if (foundClients.length > 0) {
        console.table(
          foundClients.map((client) => ({
            Name: client.name,
            Location: client.location,
            Race: typeof client.race === "number" ? Race[client.race] : client.race,
          }))
        );
      } else {
        console.log("No clients found with that name.");
      }
      break;

    case "Race":
      const { selectedRace } = await inquirer.prompt([
        {
          type: "list",
          name: "selectedRace",
          message: "Select client race:",
          choices: Object.values(Race).filter(
            (race): race is keyof typeof Race => isNaN(Number(race))
          ),
        },
      ]);
      const enumRace = Race[selectedRace as keyof typeof Race];
      foundClients = clientManager.searchByRace(enumRace);

      if (foundClients.length > 0) {
        console.table(
          foundClients.map((client) => ({
            Name: client.name,
            Location: client.location,
            Race: typeof client.race === "number" ? Race[client.race] : client.race,
          }))
        );
      } else {
        console.log("No clients found of that race.");
      }
      break;

    case "Location":
      const { searchLocation } = await inquirer.prompt([
        { type: "input", name: "searchLocation", message: "Enter location to search:" },
      ]);
      foundClients = clientManager.searchByLocation(searchLocation);

      if (foundClients.length > 0) {
        console.table(
          foundClients.map((client) => ({
            Name: client.name,
            Location: client.location,
            Race: typeof client.race === "number" ? Race[client.race] : client.race,
          }))
        );
      } else {
        console.log("No clients found at that location.");
      }
      break;

    case "View all":
      console.table(
        clients.map((client) => ({
          Name: client.name,
          Location: client.location,
          Race: typeof client.race === "number" ? Race[client.race] : client.race,
        }))
      );
      break;

    case "Go back":
      await locateMenu();
      return;
  }
}