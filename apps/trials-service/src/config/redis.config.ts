import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: "redis-12469.c284.us-east1-2.gce.cloud.redislabs.com",
    port: 12469,
  },
});

export default client;
