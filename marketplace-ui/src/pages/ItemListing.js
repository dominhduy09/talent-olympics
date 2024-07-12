import React, { useState, useEffect } from 'react';
import { getMarketplaceItems } from '../api';
import NFT from '../components/NFTGallery';

const Listings = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const fetchedItems = await getMarketplaceItems();
                setItems(fetchedItems);
            } catch (error) {
                console.error("Error fetching marketplace items", error);
            }
        };

        fetchItems();
    }, []);

    return (
        <div>
            <div className="items-container">
                {items.length === 0 ? (
                    <p>No items available</p>
                ) : (
                    items.map((item, index) => (
                        <NFT key={index} item={item} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Listings;
