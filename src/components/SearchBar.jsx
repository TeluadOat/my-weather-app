import React, { useState } from "react";
import '../css/SearchBar.css'

export default function SearchBar({ onSearch }) {
    const [city, setCity] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (!city.trim()) return;
        onSearch(city.trim());
        setCity("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="Enter city (e.g. Lagos)"
            />
            <button type="submit">Search</button>
        </form>
    );
}
