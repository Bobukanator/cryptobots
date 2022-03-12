//Mocha tests to learn more about uniswap
var fs = require('fs');
var vm = require('vm');
var path = 'bots/app.js';


var assert = require('assert');

//pre-reqs for uniswap
import { ethers } from "ethers";
import { Pool } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";
import { abi as IUniswapV3PoolABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";

var code = fs.readFileSync(path);
vm.runInThisContext(code);

suite('Initialize Uniswap Fun Basic stuff', function () {

  test('get Pool State', function () {
    var expected = "";
    assert.equal(0, 1);
  })

});
