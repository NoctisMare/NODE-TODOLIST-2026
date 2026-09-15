import mongoose from "mongoose";

const MONGOOSEEVENT = Object.freeze({
  CONNECTED: "connected",
});

mongoose.connection.on(MONGOOSEEVENT.CONNECTED, () =>
  console.log(`MongoDB: CONNECTED | HOST: ${mongoose.connection.host}`),
);
