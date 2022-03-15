/**
 * This simple script will deploy a smart contract on the defined ethereum network 
 * using Infura - code based on Infura documentation here
 * https://docs.infura.io/infura/networks/ethereum/tutorials/transactions/deploy-a-contract-using-web3.js
 * This script has the following dependencies:
 * INFURA_PROJECT_ID = your infura project id
 * ETHEREUM_NETWORK = ethereum network you want to deploy the smart contract on
 * SIGNER_PRIVATE_KEY = private key of your wallet private key -- KEEP THIS SAFE!! 
 *                      if you are testing, use a test account
 * CONTRACT_JSON_FILELOCATION = file location of compiled solidity smart contract
 */
const Web3 = require("web3");

//Load the contract ABI and Bytecode 
const fs = require("fs");
const { abi, bytecode } = JSON.parse(fs.readFileSync("../bin/cryptobots/contracts/SiameseCat.json"));

async function main() {
  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK;
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
    )
  );

  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.SIGNER_PRIVATE_KEY
  );
  web3.eth.accounts.wallet.add(signer);

  // Using the signing account to deploy the contract
  const contract = new web3.eth.Contract(abi);
  contract.options.data = bytecode;
  const deployTx = contract.deploy();
  const deployedContract = await deployTx
    .send({
      from: signer.address,
      gas: await deployTx.estimateGas(),
    })
    .once("transactionHash", (txhash) => {
      console.log(`Mining deployment transaction ...`);
      console.log(`https://${network}.etherscan.io/tx/${txhash}`);
    });
  // The contract is now deployed on chain!
  console.log(`Contract deployed at ${deployedContract.options.address}`);
  console.log(
    `Add to the.env file to store the contract address: ${deployedContract.options.address}`
  );
}

require("dotenv").config();
main();
