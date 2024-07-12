import Web3 from 'web3';
import { contractAddress, contractABI } from './config';

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
const contract = new web3.eth.Contract(contractABI, contractAddress);

export const getMarketplaceItems = async () => {
    const items = [];
    const tokenCount = await contract.methods.tokenCount().call();

    for (let i = 1; i <= tokenCount; i++) {
        const owner = await contract.methods.ownerOf(i).call();
        const price = await contract.methods.tokenPrices(i).call();
        items.push({ id: i, owner, price });
    }

    return items;
};

export const purchaseItem = async (itemId, buyerAddress, value) => {
    const result = await contract.methods.purchaseToken(itemId).send({ from: buyerAddress, value });
    return result;
};
