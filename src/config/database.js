import mongoose from "mongoose";
import { envs } from "./envs.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(envs.mongo_uri);

    console.log("Base de datos conectada");
  } catch (error) {
    console.error("Error al conectar la base de datos");
    console.error(error);
  }
};