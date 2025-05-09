'use client'; 
import React, { useEffect, useState } from 'react';

interface Listing {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
}

export default function ListingList() {
    const [listings, setListings] = useState<Listing[]>([]);

    useEffect(() => {
        fetch('/api/listings')
            .then((res) => res.json())
            .then((data) => setListings(data));
    }, []);

    return (
        <ul>
            {listings.map((listing) => (
                <li key={listing._id} className="mb-4">
                    <h2 className="text-xl font-semibold">{listing.title}</h2>
                    <p>{listing.description}</p>
                    <p className="text-gray-600">${listing.price}</p>
                    <p className="text-sm text-gray-500">{listing.category}</p>
                </li>
            ))}
        </ul>
    );

}