// Kafka connectivity
const { Kafka } = require('kafkajs')
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka:9092' ]
})
const consumer = kafka.consumer({ groupId: 'test-group' })
const models = require('../models');

async function eventLoop() {
    // subscribe to kafka topic
    await consumer.subscribe({ topic: 'payments', fromBeginning: true })

    // listen to events from kafka
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
                        
            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString(),
            })
            if(topic == "payments") {
                // deserialize message
                const payment = deserializePayment(message.value.toString());
                console.log(`Received payment! Amount was ${payment.amount}`);

                // update the corresponding account tables
                /*
                fromAccount = await models.Account.findByPk(payment.fromAccount);
                toAccount = await models.Account.findByPk(payments.toAccount);
                */
            }
        },
    })
}

function deserializePayment(message) {
    // TODO: this would obviously check that the message is valid as per the schema
    return(JSON.parse(message).payload);
}

module.exports.consumer = consumer;
module.exports.eventLoop = eventLoop;