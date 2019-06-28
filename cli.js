// Kafka connectivity
const { Kafka } = require('kafkajs')
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka:9092' ]
})

const schemas = require('./app/events/schemas');

const start = async () => {
    const producer = kafka.producer()
    await producer.connect()
    await producer.send({
      topic: 'payments',
      messages: [
        { value: JSON.stringify(schemas.payment("cli", "1234", "5678", "10.0", "EUR")) },
      ],
    })
    
    await producer.disconnect()
};

start();