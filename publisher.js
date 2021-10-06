const advanceMessageQueue = require("amqplib");   

const message = {number:process.argv[2]}

const connect = async () => {
    try {
        const connection = await advanceMessageQueue.connect("amqp://localhost:5672"); 
        const channel = await connection.createChannel(); 
        const result = await channel.assertQueue("jobs"); 
        channel.sendToQueue("jobs",Buffer.from(JSON.stringify(message))); 
        console.log("Job sent successfully",message.number);  
        // channel.close(); 
        // connection.close();
    } catch (err) {
        console.error(err); 
    }
}

connect();
