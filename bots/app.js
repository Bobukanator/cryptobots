//NODE BOT to mess around with Infura

const axios = require('axios');

async function main() {
  var data = JSON.stringify({
    "jsonrpc": "2.0",
    "method": "eth_blockNumber",
    "params": [],
    "id": 1
  })

  var projectid = process.env.INFURA_PROJECT_ID;
  var url = 'https://mainnet.infura.io/v3/' + projectid;

  var headers = {
    'Content-Type': 'application/json'
  }

  axios.post(url, data, { headers })
    .then(function (response) {
      console.log(JSON.stringify(response.data))
    })
    .catch(function (error) {
      console.log(error);
    });

}

require("dotenv").config();
main();

