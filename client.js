const { Kafka } = require("kafkajs");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

exports.kafka = new Kafka({
  clientId: "kafka-tutorial",
  brokers: [process.env.IP_ADDRESS + ":9092"],
});
