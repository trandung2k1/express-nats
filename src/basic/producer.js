// import { connect, StringCodec } from "nats";
// const servers = [{}, { port: 4222 }, { servers: "localhost" }];

// // Test server
// servers.forEach(async (v) => {
//   try {
//     const nc = await connect(v);
//     console.log(`Connected to ${nc.getServer()}`);
//     const done = nc.closed();
//     const err = await done;
//     if (err) {
//       console.log(`Error closing:`, err);
//     }
//   } catch (err) {
//     console.log(`Error connecting to ${JSON.stringify(v)}`);
//   }
// });

import { AckPolicy, connect, StringCodec } from "nats";

async function runProducer() {
  try {
    const nc = await connect({ servers: "localhost" });
    console.log(`Connected to ${nc.getServer()}`);
    const sc = StringCodec();
    const jsm = await nc.jetstreamManager();
    const streams = await jsm.streams.list().next();
    streams.forEach((si) => {
      console.log(si);
    });

    nc.publish("hello", sc.encode("world"));
    nc.publish("hello", sc.encode("again"));

    const done = nc.closed();
    await nc.close();

    // Check if there was any error while closing
    const err = await done;
    if (err) {
      console.log(`Error closing connection:`, err);
    }
  } catch (error) {
    console.log(`Error connecting to server:`, error);
  }
}

runProducer();
