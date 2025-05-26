import { useState } from "react"

export default function SearchField({ searchFieldValue, setSearchFieldValue }) {

    return (
        <input
            type="text"
            value={searchFieldValue}
            onChange={(e) => setSearchFieldValue(e.target.value)}
            placeholder="Search or start new chat"
        />
    )
    
}