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
    forward(data);
  }
});

function forward(data) {
  axios.post(process.env.WEBHOOK, {
    payload: data.toString(),
  }, {
    headers: {
      Authorization: `Bearer ${process.env.WEBHOOK_TOKEN}`
    }
  })
}
