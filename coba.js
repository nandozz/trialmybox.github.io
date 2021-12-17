function send() {
  client.publish('BokuBox/courier/A1234', 'courier ping', { qos: 0, retain: false });
}
const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)

// const host = 'ws://test.mosca.io:1883/mqtt'
const host = 'wss://iot.eclipse.org:443/mqtts'
// const host = 'wss://test.mosquitto.org:8081/mqtt'
// const host = 'ws://broker.hivemq.com:8000/mqtt'
// var host = "broker.mqttdashboard.com";
		// var port = 8000;
		// var host = "test.mosquitto.org";
		// var port = 8081;
		// var host = "iot.eclipse.org";  	
		// var port = 443;

const options = {
  keepalive: 30,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  },
  rejectUnauthorized: false
}

console.log('connecting mqtt client')
const client = mqtt.connect(host, options)

client.on('error', (err) => {
  console.log('Connection error: ', err)
  client.end()
})

client.on('reconnect', () => {
  console.log('Reconnecting...')
})

client.on('connect', () => {
  console.log('Client connected:' + clientId)
  client.subscribe('BokuBox/courier/A1234', { qos: 0 })
  client.publish('BokuBox/courier/A1234', 'ws connection demo...!', { qos: 0, retain: false })
})

client.on('message', (topic, message, packet) => {
  document.getElementById("txt").innerHTML = message.toString();

  console.log('Received Message: ' + message.toString() + '\nOn topic: ' + topic)
})

client.on('close', () => {
  console.log(clientId + ' disconnected')
})