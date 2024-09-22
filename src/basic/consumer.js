import { connect, StringCodec } from "nats";

const runConsumer = async () => {
  const nc = await connect({ servers: "localhost" });
  console.log(`Connected to ${nc.getServer()}`);
  const sc = StringCodec();
  const sub = nc.subscribe("hello");
  for await (const m of sub) {
    console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
  }
};
runConsumer();
