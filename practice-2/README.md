[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1fefee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/iigoPld8)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespaces-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=19272812)
[![CI Tests](https://github.com/ULL-ESIT-INF-DSI-2425/prct11-witcher-api-groupk/actions/workflows/ci.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2425/prct11-witcher-api-groupk/actions/workflows/ci.yml)
[![Coveralls](https://github.com/ULL-ESIT-INF-DSI-2425/prct11-witcher-api-groupk/actions/workflows/coveralls.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2425/prct11-witcher-api-groupk/actions/workflows/coveralls.yml)
[![SonarQube Cloud](https://github.com/ULL-ESIT-INF-DSI-2425/prct11-witcher-api-groupk/actions/workflows/build.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2425/prct11-witcher-api-groupk/actions/workflows/build.yml)

# Complete REST API for Inn & Inventory Management with Express and Mongoose

**Course:** Data Structures and Systems Design / Web Applications Development  
**Institution:** Universidad de La Laguna (ULL) - Escuela Superior de Ingeniería y Tecnología  
**Author:** Adrián Martín Castellano  
**Email:** alu0101547619@ull.edu.es  
**Date:** Academic Year 2024-2025  

---

## Overview

This project implements a complete, asynchronous RESTful web application service for managing the commercial inventory and transactional operations of the inn *"La Posada del Lobo Blanco"*. Built on top of **Node.js**, **Express**, and **Mongoose** (MongoDB), the backend API provides strict schema validations, relational data modeling via document references, automatic stock ledger adjustments, and transactional rollbacks for financial and operational management.

The system is fully deployed on **Render** using a cloud-hosted **MongoDB Atlas** database cluster.

---

## Architecture & Repository Structure

The code is organized in `practice-2/` with a clean modular separation between database connection configs, domain entities, transaction models, and Express REST routes:

```text
practice-2/
├── config/                <-- Environment & Server Configuration Files
├── src/
│   ├── characters/        <-- Domain Schemas & Models (Client & Merchant)
│   ├── db/                <-- Database Connection Setup (Mongoose & Atlas)
│   ├── items/             <-- Inventory Assets & Stock Models (Good & Stock)
│   ├── routes/            <-- Express Endpoint Handlers & REST Logic
│   │   ├── goods-route.ts
│   │   ├── hunters-route.ts
│   │   ├── main-app.ts
│   │   ├── merchant-route.ts
│   │   └── transactions-route.ts
│   └── transactions/      <-- Transaction Schemas & Interfaces
├── tests/                 <-- Integration & Unit Test Suite
├── .gitignore
├── .prettierignore
├── .prettierrc
├── eslint.config.js       <-- Code Formatting & Linter Setup
├── package.json
├── tsconfig.json          <-- TypeScript Compiler Rules
├── typedoc.json          <-- Technical API Documentation Setup
└── README.md
```

### 1. Domain Models & Data Schemas
* **`characters/`**: Defines base `Person` structures alongside Mongoose schemas for **Clients/Hunters** (`client.ts`) and **Merchants** (`merchant.ts`).
* **`items/`**: Manages commercial assets (**Good**, `good.ts`) and real-time inventory levels (**Stock**, `stock.ts`).

### 2. Transaction Engine
* **`transactions/` & `routes/transactions-route.ts`**: Contains the transaction logic responsible for:
  * Computing dynamic total exchange costs in crowns based on associated good valuations.
  * Updating inventory stock atomically (`$inc` and `upsert` strategies) upon purchase or sale operations.
  * Executing stock validation checks to prevent negative inventory values.
  * Performing automated inventory restoration on transaction modifications (`PATCH`) or cancellations (`DELETE`).

### 3. REST Routing & Application Lifecycle
* **`routes/`**: Route handlers (`goods-route.ts`, `hunters-route.ts`, `merchant-route.ts`, `transactions-route.ts`).
* **`routes/main-app.ts`**: Main Express app initialization, registering routers, parsing JSON request bodies, and handling fallback routes.

---

## Technical Features

* **Cloud Integration**: Database deployment powered by MongoDB Atlas and automated service deployment on Render.
* **Strict Mongoose Validation**: Data-type enforcement, alphanumeric pattern matching, and custom validators across all models.
* **Automated Stock Adjustments**: Dynamic inventory balance updates during direct purchases, sales, and refund operations.
* **Flexible Query Filtering**: Transactions filtering by merchant/client names or date/time windows (`iniDate`, `finDate`, `iniTime`, `finTime`).
* **Transaction Rollbacks**: Reverts stock modifications automatically upon transaction update or deletion.
* **CI/CD Pipeline**: Continuous integration with GitHub Actions, code coverage tracking via Coveralls, and code quality analysis via SonarQube Cloud.

---

## Prerequisites & Installation

### Requirements
* **Node.js**: Version 18.x or higher.
* **MongoDB**: Local MongoDB server or active connection to MongoDB Atlas.
* **Package Manager**: `npm` or `yarn`.

### Installation
Clone the workspace repository and install project dependencies:

```bash
npm install
```

## Execution & Deployment
To run the application locally:

```bash
npm start
```

Alternatively, run directly using TypeScript execution tools:

```bash
npx ts-node practice-2/src/routes/main-app.ts
```

## Endpoints Summary
The REST API exposes the following management resources:

| Endpoint Resource | HTTP Method | Query / Path Parameters | Functionality |
| :--- | :--- | :--- | :--- |
| **`/hunters`** | `POST` | N/A | Register a new client/hunter in the database. |
| | `GET` | `?name=...` | Retrieve client details by name or list all clients. |
| | `PATCH` | `?name=...` or `/:id` | Modify client properties by name or ObjectId. |
| | `DELETE` | `?name=...` or `/:id` | Delete a client record from the database. |
| **`/merchants`** | `POST` | N/A | Register a new merchant entity. |
| | `GET` | `?name=...` | Retrieve merchant records by name query. |
| | `PATCH` | `?name=...` or `/:id` | Modify merchant properties by name or ObjectId. |
| | `DELETE` | `?name=...` or `/:id` | Remove a merchant entity by name or ObjectId. |
| **`/goods`** | `POST` | N/A | Create a new commercial good entry in the inventory. |
| | `GET` | `?name=...`, `?weight=...` | Search goods by property filters or list all items. |
| | `PATCH` | Query parameters or `/:id` | Update attributes of a marketable good. |
| | `DELETE` | Query parameters or `/:id` | Remove a good from the catalogue. |
| **`/transactions`** | `POST` | N/A | Execute a commercial transaction and update stock. |
| | `GET` | `?client=...`, `?merchant=...` | Filter transactions by party name or time range. |
| | `PATCH` | `/:id` | Update transaction goods/quantities and adjust stock. |
| | `DELETE` | `/:id` | Cancel a transaction and restore inventory stock. |

## Database Schemas & Sample Document
The API interacts with MongoDB using Mongoose models. Sample document output:

```JSON
{
  "_id": "660f81d1a2b3c4d5e6f7a8b9",
  "client": "660f81b0a2b3c4d5e6f7a8b1",
  "goods": [
    "660f81c2a2b3c4d5e6f7a8b5"
  ],
  "quantities": [2],
  "crowns": 300,
  "date": "2026-04-15",
  "time": "14:30",
  "__v": 0
}
```

## Code Quality & CI/CD Pipeline
### Testing Suite
Run the automated test suite located in tests/:

```bash
npm test
```

### Formatting & Linting
Check code quality and apply fixes automatically:

```bash
npm run lint
```

### Documentation Generation
Build technical HTML API documentation using TypeDoc:

```bash
npx typedoc
```