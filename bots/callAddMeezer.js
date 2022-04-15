/**
 * This simple script calls the "AddMeezer" method defined in the SiameseCat smart contract
 * Code based on Infura documentation:
 * https://docs.infura.io/infura/networks/ethereum/tutorials/transactions/call-a-contract
 * This script has the following dependencies:
 * INFURA_PROJECT_ID = your infura project id
 * ETHEREUM_NETWORK = ethereum network where your smart contract is deployed
 * SIGNER_PRIVATE_KEY = private key of your wallet private key -- KEEP THIS SAFE!! 
 *                      if you are testing, use a test account
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
  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.SIGNER_PRIVATE_KEY
  );
  web3.eth.accounts.wallet.add(signer);
  // Creating a Contract instance
  const contract = new web3.eth.Contract(
    abi,
    // Replace this with the address of your deployed contract
    process.env.SIAMESE_CONTRACT
  );
  // Issuing a transaction that calls the method
  const tx = contract.methods.addMeezer("Sir Howie", "Dark", "Canada", "Arrogant", 0) //this adds a Meezer
  const receipt = await tx
    .send({
      from: signer.address,
      gas: await tx.estimateGas(),
    })
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(`https://${network}.etherscan.io/tx/${txhash}`);
    });
  // The transaction is now on chain!
  console.log(`Mined in block ${receipt.blockNumber}`);
  console.log({ receipt });
}

require("dotenv").config();
main();