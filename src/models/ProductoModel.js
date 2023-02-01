import { Schema, model } from "mongoose" 

const productoSchema = new Schema({
    nombre: {type: String, require: true},
    precio: {type: String, require: true},
    stock: {type: Number, require: true}
});

const ProductoModel = model("producto", productoSchema);
export default ProductoModel;