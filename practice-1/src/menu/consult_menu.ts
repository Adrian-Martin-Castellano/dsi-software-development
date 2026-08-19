import inquirer from "inquirer";
import { db } from "../database/database.js";
import { menu } from "./menu.js";
import { searchItemMenu } from "./search_item_menu.js";
import { sortItemMenu } from "./sort_item_menu.js";

/**
 * Consultation submenu. Allows users to:
 * - Search asset: Opens "searchItemMenu()".
 * - Sort assets: Opens "sortItemMenu()".
 * - Go back: Returns to the main menu.
 */
export async function consultMenu() {
  db.read();

  const { option } = await inquirer.prompt([
    {
      type: "list",
      name: "option",
      message: "What would you like to do in asset consultation?",
      choices: ["Search asset", "Sort assets", "Go back"],
    },
  ]);

  switch (option) {
    case "Search asset":
      await searchItemMenu();
      break;

    case "Sort assets":
      await sortItemMenu();
      break;

    case "Go back":
      await menu();
      return;
  }

  await consultMenu();
}