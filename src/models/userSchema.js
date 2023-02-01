import { Schema, model } from "mongoose" 

const UserSchema = new Schema({
	username: { type: String, required: true,  unique: true },
	password: { type: String, required: true },
	edad: { type: Number, required: true },
	telefono: { type: Number, required: true },
	direccion: { type: String, required: true },
	avatar: { type: String, required: true }
});

const userModel = model("user", UserSchema)
export default userModel;