import Web3 from "web3";
import { thorify } from 'thorify';
import cc from 'cryptocompare';

import ContractJson from "../build/contracts/exchange.json";

const address = "0xc63e4E69Aa1A8d28fa50bE30A4cB330712b9d93f";
const web3 = thorify(new Web3(), "https://vechain-api.monti.finance");
const Contract = new web3.eth.Contract(ContractJson.abi, address);

cc.setApiKey(process.env.CRYPTOCOMPARE_API_KEY);

const getVTHO = () => cc.price('VTHO', ['USD']);
const getVET = () => cc.price('VET', ['USD']);

export const fetchBalances = () => ({
  type: 'FETCH_BALANCES',
  payload: Promise.all([
    web3.eth.getBalance(address),
    web3.eth.getEnergy(address)])
});

export const fetchTickers = () => ({
  type: 'FETCH_TICKERS',
  payload: Promise.all([getVTHO(), getVET()]),
});

export const fetchFees = () => ({
  type: 'FETCH_FEES',
});

export const calculateVTHO = (val) => {
  const { getEthToTokenInputPrice } = Contract.methods;
  const num = web3.utils.toWei(val);

  return {
    type: 'CALCULATE_VTHO',
    payload: getEthToTokenInputPrice(num).call(),
    meta: { web3 },
  };
};

export const calculateVET = (val) => {
  const { getTokenToEthInputPrice } = Contract.methods;
  const num = web3.utils.toWei(val);

  return {
    type: 'CALCULATE_VET',
    payload: getTokenToEthInputPrice(num).call(),
    meta: { web3 },
  };
};

export const changeLanguage = (val) => {
  return {
    type: 'CHANGE_LOCALE',
    payload: val,
  }
};



