import { PersonInterface } from "./person.js";
import { connect, model, Schema } from 'mongoose';
import validator from 'validator';

/**
 * Client Interface. Represents a client entity.
 */
export interface ClientInterface extends PersonInterface {
  race: 'Human' | 'Elf' | 'Dwarf' | 'Wizard';
}

/**
 * ClientSchema Schema.
 * Represents all stored information regarding a client: name, location, and race.
 */
const ClientSchema = new Schema<ClientInterface>({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('Name must start with a capital letter.');
      } else if (!validator.default.isAlphanumeric(value)) {
        throw new Error('Name must contain alphanumeric characters only.');
      }
    }
  },
  location: {
    type: String,
    trim: true,
    default: 'Drakenborg',
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('Location must start with a capital letter.');
      } else if (!validator.default.isAlphanumeric(value)) {
        throw new Error('Location must contain alphanumeric characters only.');
      }
    }
  },
  race: {
    type: String,
    default: 'Human',
    enum: ['Human', 'Elf', 'Dwarf', 'Wizard']
  }
});

export const Client = model<ClientInterface>('Client', ClientSchema);