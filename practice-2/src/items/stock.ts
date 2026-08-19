import { Schema, connect, model } from "mongoose";
import { Good, GoodInterface } from "./good.js";

/**
 * StockInterface Interface. Represents inn stock.
 */
interface StockInterface extends Document {
  good: GoodInterface;
  quantity: number;
}

/**
 * StockSchema Schema.
 * Stores stock information regarding goods in the inn as a good-quantity pair.
 */
const StockSchema = new Schema<StockInterface>({
  good: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Good'
  },
  quantity: {
    type: Number,
    default: 1,
    validate: (value: number) => {
      if (value < 0) {
        throw new Error('Stock quantity must be at least 0.');
      }
    }
  }
});

export const Stock = model<StockInterface>('Stock', StockSchema);