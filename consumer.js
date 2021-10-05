const advanceMessageQueue = require("amqplib");   

const message = {number:22}

const connect = async () => {
    try {
        const connection = await advanceMessageQueue.connect("amqp://localhost:5672"); 
        const channel = await connection.createChannel(); 
        const result = await channel.assertQueue("jobs");  
        channel.consume("jobs",(msg)=>{
            console.log("Message received ",msg.content.toString())
        })
        console.log("Listening for Messages..");
    } catch (err) {
        console.error(err); 
    }
}

connect();
