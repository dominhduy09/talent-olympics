// src/components/NFTGallery.js
import React, { useState, useEffect } from 'react';

const NFTGallery = ({ web3, accounts }) => {
    const [nfts, setNFTs] = useState([]);

    useEffect(() => {
        const fetchNFTs = async () => {
            try {
                const response = await fetch('https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20');
                if (!response.ok) {
                    throw new Error('Failed to fetch NFTs');
                }
                const data = await response.json();
                setNFTs(data.assets);
            } catch (error) {
                console.error('Error fetching NFTs from OpenSea', error);
            }
        };

        fetchNFTs();
    }, []);

    const handleBuy = async (tokenId, price) => {
        if (!web3 || accounts.length === 0) {
            console.error("Web3 or accounts not initialized");
            return;
        }

        // Handle buying logic here if needed
    };

    return (
        <div>
            <h1>OpenSea NFTs</h1>
            <div className="nft-gallery">
                {nfts.map((nft, index) => (
                    <div key={index} className="nft-card">
                        <h2>{nft.name}</h2>
                        <img src={nft.image_thumbnail_url} alt={nft.name} />
                        <p>Owner: {nft.owner.user?.username || 'Unknown'}</p>
                        <p>Price: {nft.sell_orders ? nft.sell_orders[0]?.current_price : 'Not for sale'}</p>
                        {nft.sell_orders && (
                            <button onClick={() => handleBuy(nft.token_id, nft.sell_orders[0]?.current_price)}>Buy</button>
                        )}
                        <a href={nft.permalink} target="_blank" rel="noopener noreferrer">View on OpenSea</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NFTGallery;
