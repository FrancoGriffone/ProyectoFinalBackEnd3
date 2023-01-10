import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    author: {
        id: { type: String },
        nombre: { type: String },
        apellido: { type: String },
        edad: { type: Number },
        alias: { type: String },
        avatar: { type: String },
      },
      text: { type: String },
    });
    
    const messageModel = model("mensajes", messageSchema);
    
    export default messageModel;