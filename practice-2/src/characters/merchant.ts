import { PersonInterface } from "./person.js";
import { connect, model, Schema } from 'mongoose';
import validator from 'validator';

/**
 * Merchant Interface. Represents a merchant entity.
 */
export interface MerchantInterface extends PersonInterface {
  type: 'Blacksmith' | 'Alchemist' | 'General';
}

/**
 * MerchantSchema Schema.
 * Represents all stored information regarding a merchant: name, location, and type.
 */
const MerchantSchema = new Schema<MerchantInterface>({
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
  type: {
    type: String,
    default: 'General',
    enum: ['General', 'Blacksmith', 'Alchemist']
  }
});

export const Merchant = model<MerchantInterface>('Merchant', MerchantSchema);