import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String,
         
            required: true },
    subcategories: [{ type: String }]
  });
  export const Category=mongoose.model("Category",categorySchema)