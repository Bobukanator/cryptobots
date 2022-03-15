/**
 * This simple script calls the "GetMeezers" method defined in the SiameseCat smart contract
 * Code based on Ethereum.org documentation:
 * https://ethereum.org/en/developers/tutorials/calling-a-smart-contract-from-javascript/
 * This script has the following dependencies:
 * INFURA_PROJECT_ID = your infura project id
 * ETHEREUM_NETWORK = ethereum network where your smart contract is deployed
 * CONTRACT_JSON_FILELOCATION = file location of compiled solidity smart contract
 */
const Web3 = require("web3");

// Loading the contract ABI
const fs = require("fs");
const { abi } = JSON.parse(fs.readFileSync("../bin/cryptobots/contracts/SiameseCat.json"));

async function main() {
  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK;
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
    )
  );

  const contract = new web3.eth.Contract(
    abi,
    // Replace this with the address of your deployed contract
    process.env.SIAMESE_CONTRACT
  );
  // Issuing a transaction that calls the `echo` method

  contract.methods.getMeezers().call(function (err, res) {
    if (err) {
      console.log("An error occured", err)
      return
    }
    console.log("Result is: ", res)
  })
}

require("dotenv").config();
main();