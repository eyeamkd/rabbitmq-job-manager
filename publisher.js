const advanceMessageQueue = require("amqplib");   

const message = {number:22}

const connect = async () => {
    try {
        const connection = await advanceMessageQueue.connect("amqp://localhost:5672"); 
        const channel = await connection.createChannel(); 
        const result = await channel.assertQueue("jobs"); 
        channel.sendToQueue("jobs",Buffer.from(JSON.stringify(message))); 
        console.log("Job sent successfully",message.number); 
    } catch (err) {
        console.error(err); 
    }
}

connect();
