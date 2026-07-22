import { config } from "dotenv";

config();

export const envs = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
};