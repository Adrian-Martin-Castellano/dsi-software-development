import inquirer from "inquirer";
import { addMenu } from "./add_menu.js";
import { removeMenu } from "./remove_menu.js";
import { modifyMenu } from "./modify_menu.js";
import { consultMenu } from "./consult_menu.js";
import { locateMenu } from "./locate_menu.js";
import { reportMenu } from "./report_menu.js";
import { db, initDB } from "../database/database.js";
import { Inventary } from "../items/inventary.js";
import { transactionMenu } from "./transactions_menu.js";

export const inventory: Inventary = await Inventary.buildInventaryFromDB();

/**
 * Main Menu. Available options:
 * - Add: Adds an asset, merchant, or client to the database.
 * - Remove: Removes an asset, merchant, or client from the database.
 * - Modify: Modifies an existing asset, merchant, or client.
 * - Consult Asset Information: Allows searching assets by name/description and sorting.
 * - Locate People: Allows locating merchants (by name, location, type) and clients (by name, location, race).
 * - Reset Database: Resets the database to default values.
 * - Generate Reports: Generates inventory and financial reports.
 * - Transactions: Manages sales, purchases, and refunds.
 * - Exit: Exits the application.
 */
export async function menu() {
  const { option } = await inquirer.prompt([
    {
      type: "rawlist",
      name: "option",
      message: "Please select an option:",
      choices: [
        "Add",
        "Remove",
        "Modify",
        "Consult Asset Information",
        "Locate People",
        "Reset Database",
        "Generate Reports",
        "Transactions",
        "Exit",
      ],
    },
  ]);

  switch (option) {
    case "Add":
      await addMenu();
      break;

    case "Remove":
      await removeMenu();
      break;

    case "Modify":
      await modifyMenu();
      break;

    case "Consult Asset Information":
      await consultMenu();
      break;

    case "Locate People":
      await locateMenu();
      break;

    case "Reset Database":
      await initDB();
      await menu();
      break;

    case "Generate Reports":
      await reportMenu();
      break;

    case "Transactions":
      await transactionMenu();
      break;

    case "Exit":
      console.log("Exiting system...");
      process.exit();
  }
}

if (db.data === null) {
  initDB();
}

db.read();
await menu();