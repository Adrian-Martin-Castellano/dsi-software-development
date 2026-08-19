import { Assets } from "../items/asset.js";

/**
 * Stock type. Represents a tuple holding an asset and its stock quantity
 */
export type Stock = [Assets, number];