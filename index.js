require('dotenv').config();

const {WebSocket} = require('ws');
const axios = require('axios').default;

const socket = new WebSocket(process.env.SO_WSS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.SO_TOKEN}`
  },
});

socket.on('message', function message(data) {
  const event = JSON.parse(data.toString());
  if (event.event === 'posted') {
    console.log(new Date(), event.event, data.toString());
    forward(data);
  }
});

/**
 * Can be customized function for your intent
 * @param data
 */
function forward(data) {
  axios.post(process.env.WEBHOOK, {
    payload: data.toString(),
  }, {
    headers: {
      Authorization: `Bearer ${process.env.WEBHOOK_TOKEN}`
    }
  })
}
