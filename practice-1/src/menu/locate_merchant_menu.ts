import inquirer from "inquirer";
import { Merchant } from "../characters/merchant.js";
import { MerchantManager } from "../managers/merchant_manager.js";
import { Type } from "../enums/types-and-races.js";
import { MerchantJSON } from "../interfaces/interfaces_json.js";
import { db } from "../database/database.js";
import { locateMenu } from "./locate_menu.js";

/**
 * Submenu locateMerchant(). Locates merchants by:
 * - Name: Searches merchant by name. Displays error if not found.
 * - Type: Searches merchant by type. Displays error if not found.
 * - Location: Searches merchant by location. Displays error if not found.
 * - View all: Displays all merchants in database.
 * - Go back: Returns to "locateMenu()".
 */
export async function locateMerchant() {
  db.read();

  const merchants: Merchant[] = db.data.merchants.map((merchant) =>
    Merchant.fromJSON(merchant as unknown as MerchantJSON)
  );
  const merchantManager = new MerchantManager(merchants);

  const { filter } = await inquirer.prompt([
    {
      type: "list",
      name: "filter",
      message: "How would you like to search for the merchant?",
      choices: ["Name", "Type", "Location", "View all", "Go back"],
    },
  ]);

  let foundMerchants: Merchant[] = [];

  switch (filter) {
    case "Name":
      const { searchName } = await inquirer.prompt([
        { type: "input", name: "searchName", message: "Enter name to search:" },
      ]);

      foundMerchants = merchantManager.searchByName(searchName);

      if (foundMerchants.length > 0) {
        console.table(
          foundMerchants.map((merchant) => ({
            Name: merchant.name,
            Location: merchant.location,
            Type: typeof merchant.type === "number" ? Type[merchant.type] : merchant.type,
          }))
        );
      } else {
        console.log("No merchants found with that name.");
      }
      break;

    case "Type":
      const { selectedType } = await inquirer.prompt([
        {
          type: "list",
          name: "selectedType",
          message: "Select merchant type:",
          choices: Object.values(Type).filter(
            (type): type is keyof typeof Type => isNaN(Number(type))
          ),
        },
      ]);
      const enumType = Type[selectedType as keyof typeof Type];
      foundMerchants = merchantManager.searchByType(enumType);

      if (foundMerchants.length > 0) {
        console.table(
          foundMerchants.map((merchant) => ({
            Name: merchant.name,
            Location: merchant.location,
            Type: typeof merchant.type === "number" ? Type[merchant.type] : merchant.type,
          }))
        );
      } else {
        console.log("No merchants found of that type.");
      }
      break;

    case "Location":
      const { searchLocation } = await inquirer.prompt([
        { type: "input", name: "searchLocation", message: "Enter location to search:" },
      ]);
      foundMerchants = merchantManager.searchByLocation(searchLocation);

      if (foundMerchants.length > 0) {
        console.table(
          foundMerchants.map((merchant) => ({
            Name: merchant.name,
            Location: merchant.location,
            Type: typeof merchant.type === "number" ? Type[merchant.type] : merchant.type,
          }))
        );
      } else {
        console.log("No merchants found at that location.");
      }
      break;

    case "View all":
      console.table(
        merchants.map((merchant) => ({
          Name: merchant.name,
          Location: merchant.location,
          Type: typeof merchant.type === "number" ? Type[merchant.type] : merchant.type,
        }))
      );
      break;

    case "Go back":
      await locateMenu();
      return;
  }
}