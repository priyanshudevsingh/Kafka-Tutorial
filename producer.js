const { kafka } = require("./client");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();

  console.log("Connecting Producer...");
  await producer.connect();
  console.log("Producer Connected Successfully...");

  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", async function (line) {
    console.log("Sending Topic [rider-updates]");
    const [riderName, location] = line.split(" ");

    await producer.send({
      topic: "rider-updates",
      messages: [
        {
          key: "location-update",
          value: JSON.stringify({ name: riderName, location }),
          partition: location.toLowerCase() == "north" ? 0 : 1,
        },
      ],
    });

    console.log("Topic Sent Successfully [rider-updates]");
  }).on("close", async () => {
    console.log("Disconnecting Producer...");
    await producer.disconnect();
  });
}

init();
