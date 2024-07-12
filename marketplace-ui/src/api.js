import Web3 from 'web3';
import { contractAddress, contractABI } from './config';

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
const contract = new web3.eth.Contract(contractABI, contractAddress);

export const getMarketplaceItems = async () => {
    const items = await contract.methods.getItems().call();
    return items;
};

export const purchaseItem = async (itemId, buyerAddress) => {
    const result = await contract.methods.purchaseItem(itemId).send({ from: buyerAddress });
    return result;
};
