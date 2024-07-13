// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { getMarketplaceItems, purchaseItem } from '../api';
import Web3 from 'web3';
import styles from './Home.module.css';
import './Home.css';
import NFTGallery from '../components/NFTGallery';

const Home = () => {
    const [items, setItems] = useState([]);
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const initWeb3 = async () => {
            if (window.ethereum) {
                try {
                    const web3Instance = new Web3(window.ethereum);
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    setWeb3(web3Instance);
                    const accounts = await web3Instance.eth.getAccounts();
                    setAccounts(accounts);
                } catch (error) {
                    console.error("Error initializing web3", error);
                }
            } else {
                console.error("Ethereum browser extension not detected.");
            }
        };

        initWeb3();
    }, []);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const fetchedItems = await getMarketplaceItems();
                setItems(fetchedItems);
            } catch (error) {
                console.error("Error fetching marketplace items", error);
            }
        };

        if (web3) {
            fetchItems();
        }
    }, [web3]);

    const handleBuy = async (itemId, price) => {
        if (!web3 || accounts.length === 0) {
            console.error("Web3 or accounts not initialized");
            return;
        }

        try {
            await purchaseItem(itemId, accounts[0], price);
            alert("Item purchased successfully!");
            const fetchedItems = await getMarketplaceItems();
            setItems(fetchedItems);
        } catch (error) {
            console.error("Error purchasing item", error);
        }
    };

    if (!web3) {
        return <div>Loading Web3...</div>;
    }

    return (
        <div className={styles.container}>
            <h1>Marketplace Items</h1>
            <div className={styles.itemList}>
                {items.length === 0 ? (
                    <p>No items available</p>
                ) : (
                    items.map((item, index) => (
                        <div key={index} className={styles.itemCard}>
                            <h2>Token ID: {item.id}</h2>
                            <p>Owner: {item.owner}</p>
                            <p>Price: {web3.utils.fromWei(item.price, 'ether')} ETH</p>
                            <button onClick={() => handleBuy(item.id, item.price)} className={styles.btn}>Buy</button>
                        </div>
                    ))
                )}
            </div>
            <hr />
            <NFTGallery web3={web3} accounts={accounts} /> {/* Integrating NFTGallery component */}
        </div>
    );
};

export default Home;
