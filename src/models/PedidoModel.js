import mongoose, { mongo } from "mongoose";

const pedidoSchema = new mongoose.Schema({
    carritos: Array,
    productos: Array,
    fecha: {
      type: Date,
      default: Date.now  
    }
});

const PedidoModel = mongoose.model("pedidos", pedidoSchema);
export default PedidoModel;