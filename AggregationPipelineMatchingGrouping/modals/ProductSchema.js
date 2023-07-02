import mongoose from "mongoose";
import { Schema } from "mongoose";


const Product = new Schema({
    name: String,
    description: String,
    price: Number,
    category: String
});

export default mongoose.model("Products", Product)