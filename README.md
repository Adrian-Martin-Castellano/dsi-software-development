# Software Development & Interactive Systems Management Framework

**Course:** Desarrollo de Sistemas Informáticos (DSI)  
**Institution:** Universidad de La Laguna (ULL) - Escuela Superior de Ingeniería y Tecnología  
**Author:** Adrián Martín Castellano  
**Email:** alu0101547619@ull.edu.es  
**Academic Year:** 2024–2025  

---

## Workspace Overview

This repository aggregates the core practical assignments developed for the **Desarrollo de Sistemas Informáticos** course. The project follows a modular evolution from a local, command-line-driven inventory system (**Practice 1**) to a fully asynchronous, cloud-deployed RESTful API backend (**Practice 2**) for managing commercial operations at *"La Posada del Lobo Blanco"*.

```text
dsi-software-development/
├── practice-1/            <-- CLI-based Inventory Management System (Inquirer & Lowdb)
│   ├── src/
│   │   ├── characters/
│   │   ├── database/
│   │   ├── items/
│   │   ├── managers/
│   │   ├── menu/
│   │   ├── transactions/
│   │   └── index.ts
│   └── tests/
├── practice-2/            <-- Cloud RESTful API Backend (Express, Mongoose, Atlas & Render)
│   ├── config/
│   ├── src/
│   │   ├── characters/
│   │   ├── db/
│   │   ├── items/
│   │   ├── routes/
│   │   └── transactions/
│   └── tests/
├── eslint.config.mjs
├── package.json
└── README.md
```
## Practices Breakdown

### Practice 1: CLI System Management & Transactional Inventory Framework
An interactive, menu-driven command-line interface built in TypeScript for managing inventory assets, merchants, and clients with persistent storage using **Lowdb**.

* **Architecture**: Object-Oriented Design (OOD) isolating entity models, sorting algorithms, and menu prompt controllers.
* **Core Capabilities**:
  * Interactive CLI navigation built with `inquirer`.
  * Support for dynamic commercial operations: **Buy**, **Sell**, and bi-directional **Refunds**.
  * Inventory reporting, financial audit summaries, and stock search/sorting utilities.
  * Local JSON storage persistence and native API documentation generation via **TypeDoc**.

### Practice 2: REST API for Inn & Inventory Management with Express & Mongoose
An asynchronous REST API backend developed with **Node.js**, **Express**, and **Mongoose** (MongoDB) to manage the commercial inventory and dynamic transactions of *"La Posada del Lobo Blanco"*.

* **Architecture**: Decoupled Express routers, Mongoose schema models, strict data validators, and cloud deployment pipelines.
* **Services & Cloud Integration**:
  * **Database Cluster**: MongoDB Atlas.
  * **Deployment**: Cloud hosting via Render.
  * **Automated Rollbacks**: Atomic stock updates (`$inc`, `upsert`) with automatic stock restoration upon transaction updates (`PATCH`) or cancellations (`DELETE`).
  * **CI/CD Pipeline**: GitHub Actions for CI testing, Coveralls for test coverage, and SonarQube Cloud for automated code quality reviews.

---

## Global Technical Features & Stack