import inquirer from "inquirer";
import { Assets } from "../items/asset.js";
import { Merchant } from "../characters/merchant.js";
import { Clients } from "../characters/client.js";
import * as Enums from "../enums/types-and-races.js";
import { db } from "../database/database.js";
import { menu } from "./menu.js";

/**
 * Submenu addMenu(). Offers the following choices:
 * - Asset: Adds a new asset to the database.
 * - Merchant: Adds a new merchant to the database.
 * - Client: Adds a new client to the database.
 * - Go back: Returns to the main menu.
 */
export async function addMenu() {
  const { option } = await inquirer.prompt([
    {
      type: "list",
      name: "option",
      message: "What would you like to add?",
      choices: ["Asset", "Merchant", "Client", "Go back"],
    },
  ]);

  switch (option) {
    case "Asset":
      const assetPrompt = await inquirer.prompt([
        { type: "input", name: "name", message: "Asset name:" },
        { type: "input", name: "description", message: "Description:" },
        { type: "input", name: "materials", message: "Materials (comma-separated):" },
        { type: "number", name: "weight", message: "Weight:" },
        { type: "number", name: "crowns", message: "Value in crowns:" },
      ]);

      addAsset(
        new Assets(
          assetPrompt.name,
          assetPrompt.description,
          assetPrompt.materials.split(","),
          assetPrompt.weight,
          assetPrompt.crowns
        )
      );
      break;

    case "Merchant":
      const merchantPrompt = await inquirer.prompt([
        { type: "input", name: "name", message: "Merchant name:" },
        { type: "input", name: "location", message: "Location:" },
        {
          type: "list",
          name: "type",
          message: "Type:",
          choices: Object.values(Enums.Type)
            .filter((value) => isNaN(Number(value)))
            .map(String),
        },
      ]);

      addMerchant(
        new Merchant(merchantPrompt.name, merchantPrompt.location, merchantPrompt.type)
      );
      break;

    case "Client":
      const clientPrompt = await inquirer.prompt([
        { type: "input", name: "name", message: "Client name:" },
        { type: "input", name: "location", message: "Location:" },
        {
          type: "list",
          name: "race",
          message: "Race:",
          choices: Object.values(Enums.Race)
            .filter((value) => isNaN(Number(value)))
            .map(String),
        },
      ]);

      addClient(
        new Clients(clientPrompt.name, clientPrompt.location, clientPrompt.race)
      );
      break;

    case "Go back":
      await menu();
      return;
  }

  await addMenu();
}

/**
 * Adds an asset to the database.
 * @param asset - Asset to add.
 */
export function addAsset(asset: Assets): void {
  db.data.assets.push(asset);
  db.write();
}

/**
 * Adds a merchant to the database.
 * @param merchant - Merchant to add.
 */
export function addMerchant(merchant: Merchant): void {
  db.data.merchants.push(merchant);
  db.write();
}

/**
 * Adds a client to the database.
 * @param client - Client to add.
 */
export function addClient(client: Clients): void {
  db.data.clients.push(client);
  db.write();
}