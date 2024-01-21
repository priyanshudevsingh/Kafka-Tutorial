const { kafka } = require("./client");
const group = process.argv[2];

async function init() {
  const consumer = kafka.consumer({ groupId: group });

  console.log("Connecting Consumer...");
  await consumer.connect();
  console.log("Consumer Connected Successfully...");

  console.log("Subscribing Topic [rider-updates]");
  await consumer.subscribe({ topic: "rider-updates", fromBeginning: true });

  console.log("Running Consumer...");
  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log(
        `${group}: [${topic}]: PART:${partition}:`,
        message.value.toString()
      );
    },
  });
}

init();
