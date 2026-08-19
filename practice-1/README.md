# Complete System Management & Transactional Inventory Framework in C++ / TypeScript

**Course:** Data Structures and Systems Design  
**Institution:** Universidad de La Laguna (ULL) - Escuela Superior de Ingeniería y Tecnología  
**Author:** Adrián Martín Castellano  
**Email:** alu0101547619@ull.edu.es  
**Date:** April 2025  

---

## Overview

This project implements a complete, interactive, data-driven system management framework designed to process and control transactional operations across an inventory system. Built on top of modular object-oriented structures, the application provides an enterprise-ready CLI environment to manage inventory items (**Assets**), commercial entities (**Merchants** and **Clients**), and complex commercial operations (**Buy**, **Sell**, **Refunds**).

The framework integrates persistent storage using JSON database serialization, dynamic sorting/searching algorithms, state management for inventory stock, and historical report generators for complete financial and operational audits.

---

## Architecture & Core Modules

The software design leverages standard Object-Oriented Design (OOD) practices to guarantee clean decoupling between data persistence layers, CLI interaction, and the transaction execution pipeline:

```text
practice-1/
├── src/
│   ├── characters/        <-- Domain Entities (Merchant, Clients)
│   ├── database/          <-- Lowdb Persistent Data Handling & Collections
│   ├── enums/             <-- Shared Enumerations (Races, Types, etc.)
│   ├── interfaces/        <-- JSON Data Schemas & Structural Interfaces
│   ├── items/             <-- Inventory Asset Entities
│   ├── managers/          <-- Asset Searching, Sorting & Inventory Logic
│   ├── menu/              <-- Interactive CLI Prompt Navigation Submenus
│   ├── transactions/      <-- Polymorphic Transactions (Buy, Sell, Refunds)
│   ├── types/             <-- Custom Type Definitions
│   ├── utils/             <-- Utility Helpers (Date Handling, Formatting)
│   └── index.ts           <-- Application Entry Point
├── tests/                 <-- Unit & Integration Testing Suite (Mocha/Chai/Vitest)
├── .gitignore
├── .prettierignore
├── .prettierrc
├── eslint.config.mjs      <-- Code Style & Linter Configuration
├── package.json
├── tsconfig.json          <-- TypeScript Compiler Configuration
├── typedoc.json           <-- Automated API Documentation Setup
└── README.md
```

### 1. Domain Entities & Data Schemas
* **`items/` & `characters/`**: Represents domain objects including **Assets** (with name, description, weight, and crown valuation attributes), **Merchants** (trading specialists), and **Clients** (system consumers).
* **`interfaces/` & `enums/`**: Type contracts and enumerations defining race types, merchant categories, and low-level JSON object serialization rules.

### 2. Transactional Engine
* **`transactions/`**: Implements dynamic commercial transaction processors:
  * **`BuyTransaction`**: Handles acquisitions from merchants and increases stored stock.
  * **`SellTransaction`**: Manages client purchases and adjusts available stock.
  * **`RefundBuyTransaction` & `RefundSellTransaction`**: Bi-directional transaction rollback handlers for customer returns or merchant adjustments.

### 3. Managers & Navigation
* **`managers/`**: Contains core processing engines such as `AssetManager` (filtering and sorting algorithms) and `Inventory` (stock ledger and balance generator).
* **`menu/`**: CLI controllers built with `inquirer` for interactive user prompts.

---

## Technical Features

* **Interactive CLI Navigation**: Menu-driven flows for adding, modifying, searching, and deleting entities interactively.
* **Transactional Integrity**: Dynamic updating of balances, inventory counts, and crowns exchanged for both direct operations and refunds.
* **Audit & Financial Reports**: Instant tabular output (`console.table`) summarizing total stock, sales velocity, income/expense margins, and client/merchant transaction histories.
* **Persistent Storage**: Real-time state synchronization with a local JSON storage powered by Lowdb using `fromJSON` entity mapping methods.
* **Automated Documentation**: Native TypeDoc configuration for generating full API technical docs.

---

## Prerequisites & Installation

### Requirements
* **Node.js**: Version 18.x or higher.
* **Package Manager**: `npm` or `yarn`.

### Installation
Clone the repository and install the project dependencies:

```bash
npm install
```

## Execution & Usage
To start the interactive command-line interface:

```bash
npm start
```

Alternatively, run directly with TypeScript execution tools:

```bash
npx ts-node src/index.ts
```

## Menu System Breakdown

The CLI workflow is divided into five core execution areas:

| Main Menu Option | Submenu Capabilities |
| :--- | :--- |
| **Realizar Transacción** | Execute **Buy**, **Sell**, **Object Return (Refund Sell)**, or **Money Refund (Refund Buy)** operations with automated ledger state updates. |
| **Consultar Bienes** | Perform searches by **Name** or **Description**, or sort inventory lists alphabetically (A-Z/Z-A) and by monetary valuation. |
| **Generar Informe** | View current **Stock Levels**, **Best-Selling Assets**, **Financial Summary (Income/Expenses)**, and transaction history logs. |
| **Modificar Datos** | Select and update attribute fields for existing **Assets**, **Merchants**, or **Clients**. |
| **Eliminar Datos** | Safely remove assets or characters from the local database. |

## Database & Data Persistence
The system maintains real-time synchronization with a local JSON store. Persistent state structure sample:

```JSON
{
  "assets": [
    {
      "name": "Espada de Acero",
      "description": "Hoja afilada para combate corporal",
      "materials": ["Acero", "Cuero"],
      "weight": 2.5,
      "crowns": 150
    }
  ],
  "merchants": [
    {
      "name": "Hattori",
      "location": "Novigrado",
      "type": "Armero"
    }
  ],
  "clients": [
    {
      "name": "Geralt de Rivia",
      "location": "Kaer Morhen",
      "race": "Brujo"
    }
  ]
}
```

## Code Quality & Documentation
### Unit Testing
Run the automated test suite located in the tests/ directory:

```bash
npm test
```

### Code Formatting & Linting
Check and fix code formatting rules:

```bash
npm run lint
```

### Documentation Generation
Generate HTML technical API documentation via TypeDoc:

```bash
npx typedoc
```