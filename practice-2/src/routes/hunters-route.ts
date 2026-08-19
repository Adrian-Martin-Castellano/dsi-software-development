import express from 'express';
import mongoose from 'mongoose';
import { Client, ClientInterface } from '../characters/client.js';

/**
 * Clients/Hunters router.
 */
export const hunterRouter = express.Router();

const port = process.env.PORT || 3000;

hunterRouter.use(express.json());

/**
 * POST /hunters handler. Stores client/hunter information in the database.
 */
hunterRouter.post('/hunters', async (req, res) => {
  const client = new Client(req.body);

  try {
    await client.save();
    res.status(201).send(client);
  } catch (err) {
    res.status(400).send(err);
  }
}); 

/**
 * GET /hunters handler. Retrieves client information by name provided as a query string.
 */
hunterRouter.get('/hunters', async (req, res) => {
  const name = req.query.name as string;

  try {
    const client = await Client.find({ name: name });

    if (client.length === 0) {
      res.status(404).send({ error: 'Client not found.' });
    } else {
      res.send(client);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * GET /hunters/:id handler. Retrieves client information by ID passed as a path parameter.
 */
hunterRouter.get('/hunters/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
  
    if (client) {
      res.send(client);
    } else {
      res.status(404).send({ error: 'Client not found.' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * PATCH /hunters handler. Updates client information matching the name passed as a query string.
 */
hunterRouter.patch('/hunters', async (req, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided in the query string',
    });
  } else if (!req.body) {
    res.status(400).send({
      error: 'Fields to be modified have to be provided in the request body',
    });
  } else {
    const allowedUpdates = ['name', 'location', 'race'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      res.status(400).send({
        error: 'Update is not permitted',
      });
    } else {
      try {
        const client = await Client.findOneAndUpdate({ name: req.query.name.toString() }, req.body, {
          new: true,
          runValidators: true,
        });

        if (!client) {
          res.status(404).send();
        } else {
          res.send(client);
        }
      } catch (err) {
        res.status(400).send(err);
      }
    }
  }
});

/**
 * PATCH /hunters/:id handler. Updates client information by ID passed as a path parameter.
 */
hunterRouter.patch('/hunters/:id', async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      error: 'Fields to be modified have to be provided in the request body',
    });
  } else {
    const allowedUpdates = ['name', 'location', 'race'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      res.status(400).send({
        error: 'Update is not permitted',
      });
    } else {
      try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!client) {
          res.status(404).send();
        } else {
          res.send(client);
        }
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }
});

/**
 * DELETE /hunters handler. Deletes a client from the database using their name passed as a query string.
 */
hunterRouter.delete('/hunters', async (req, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  } else {
    try {
      const client = await Client.findOneAndDelete({ name: req.query.name.toString() });

      if (!client) {
        res.status(404).send();
      } else {
        res.send(client);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

/**
 * DELETE /hunters/:id handler. Deletes a client from the database by ID passed as a path parameter.
 */
hunterRouter.delete('/hunters/:id', async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      res.status(404).send();
    } else {
      res.send(client);
    }
  } catch (err) {
    res.status(500).send();
  }
});