import { model, Schema } from "mongoose";
import { GoodInterface } from "../items/good.js";
import validator from "validator";

/**
 * Transaction Interface. Represents a transaction record.
 */
export interface TransactionInterface extends Document {
  merchant: Schema.Types.ObjectId;
  client: Schema.Types.ObjectId;
  goods: Schema.Types.ObjectId[];
  quantities: number[];
  crowns: number;
  date: string;
  time: string;
}

/**
 * TransactionSchema Schema.
 * Stores information for transactions conducted with either a merchant or a client (managed via handlers).
 * Tracks exchanged goods and quantities at a specific date, time, and crown cost.
 */
const TransactionSchema = new Schema<TransactionInterface>({
  merchant: {
    type: Schema.Types.ObjectId,
    ref: 'Merchant'
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client'
  },
  goods: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: 'Good',
    validate: (value: Schema.Types.ObjectId[]) => {
      if (value.length === 0) {
        throw new Error('Goods list cannot be empty.');
      }
    }
  },
  quantities: {
    type: [Number],
    required: true,
    validate: (value: number[]) => {
      if (value.length === 0) {
        throw new Error('Quantities list cannot be empty.');
      } else if (value.some((qnt) => qnt <= 0)) {
        throw new Error('No quantity can be less than or equal to 0.');
      }
    }
  },
  crowns: {
    type: Number,
    required: true,
    validate: (value: number) => {
      if (value <= 0) {
        throw new Error('Total transaction price cannot be less than or equal to 0.');
      }
    }
  },
  date: {
    type: String,
    required: true,
    validate: (value: string) => {
      if (!validator.default.isDate(value)) {
        throw new Error('The provided date format is invalid.');
      }
    }
  },
  time: {
    type: String,
    required: true,
    validate: (value: string) => {
      if (!validator.default.isTime(value)) {
        throw new Error('The provided time format is invalid.');
      }
    }
  }
});

export const Transaction = model<TransactionInterface>('Transaction', TransactionSchema);