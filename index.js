require('dotenv').config();

const {WebSocket} = require('ws');
const axios = require('axios').default;

const socket = new WebSocket(process.env.SO_WSS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.SO_TOKEN}`
  },
});

/**
 * Handle chatops socket events.
 * Chatops has only one event called 'message' so others option not available.
 */
socket.on('message', function message(data) {
  const event = JSON.parse(data.toString());
  if (event.event === 'posted') {
    forward(data);
  }
});

/**
 * Can be customized function for your intent
 * @param data
 */
function forward(data) {
  console.log(new Date(), data.toString());
  axios.post(`${process.env.WEBHOOK}?bot_id=${process.env.SO_BOT_ID}`, {
    payload: data.toString(),
  }, {
    headers: {
      Authorization: `Bearer ${process.env.WEBHOOK_TOKEN}`
    }
  }).then((res) => {
    console.log(new Date(), JSON.stringify(res.data));
  }).catch((e) => {
    console.log(new Date(), e.message);
  })
}
