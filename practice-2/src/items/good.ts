import { connect, model, Schema } from 'mongoose';
import validator from 'validator';

/**
 * Good Interface. Represents a commercial asset/good.
 */
export interface GoodInterface {
  name: string;
  description: string;
  weight: number;
  crowns: number;
}

/**
 * GoodSchema Schema.
 * Represents all stored information regarding a good: name, description, weight, and valuation in crowns.
 */
const GoodSchema = new Schema<GoodInterface>({
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
  description: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('Description must start with a capital letter.');
      } else if (!validator.default.isAlphanumeric(value)) {
        throw new Error('Description must contain alphanumeric characters only.');
      }
    }
  },
  weight: {
    type: Number,
    default: 1,
    validate: (value: number) => {
      if (value <= 0) {
        throw new Error('Good weight must be positive and greater than 0.');
      }
    }
  },
  crowns: {
    type: Number,
    default: 1,
    validate: (value: number) => {
      if (value <= 0) {
        throw new Error('Good crown valuation must be positive and greater than 0.');
      }
    }
  }
});

export const Good = model<GoodInterface>('Good', GoodSchema);