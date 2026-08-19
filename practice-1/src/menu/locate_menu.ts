import inquirer from "inquirer";
import { db } from "../database/database.js";
import { menu } from "./menu.js";
import { locateMerchant } from "./locate_merchant_menu.js";
import { locateClient } from "./locate_client_menu.js";

/**
 * Location submenu. Allows locating merchants, clients, or returning back.
 * - Merchant: Calls locateMerchant() menu.
 * - Client: Calls locateClient() menu.
 * - Go back: Returns to main menu.
 */
export async function locateMenu() {
  db.read();

  const { category } = await inquirer.prompt([
    {
      type: "list",
      name: "category",
      message: "What would you like to locate?",
      choices: ["Merchant", "Client", "Go back"],
    },
  ]);

  switch (category) {
    case "Merchant":
      await locateMerchant();
      break;

    case "Client":
      await locateClient();
      break;

    case "Go back":
      await menu();
      return;
  }

  await locateMenu();
}