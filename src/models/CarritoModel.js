import mongoose, { mongo } from "mongoose";

const carritoSchema = new mongoose.Schema({
    productos: Array,
    fecha: {
      type: Date,
      default: Date.now  
    }
});

const CarritoModel = mongoose.model("carritos", carritoSchema);
export default CarritoModel;