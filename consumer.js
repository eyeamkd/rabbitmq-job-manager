const advanceMessageQueue = require("amqplib");

const message = { number: 22 };

const connect = async () => {
  try {
    const connection = await advanceMessageQueue.connect(
      "amqp://localhost:5672"
    );
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("jobs");
    channel.consume("jobs", (msg) => {
      //converting buffer into string and then to JSON
      let input = JSON.parse(msg.content.toString());

      if (input.number == "22") {
        channel.ack(msg);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

connect();
