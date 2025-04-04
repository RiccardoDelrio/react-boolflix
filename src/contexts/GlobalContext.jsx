import { createContext, useContext, useState } from "react";
const globalContext = createContext()
const api_key = import.meta.env.VITE_MOVIE_DB_API_KEY;


export const GlobalContext = ({ children }) => {
    const [serchText, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    function handleSearch(searchTerm) {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${serchText}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
}
export function useGlobal() {
    <GlobalContext.Provider value={{ serchText, setSearchTerm, searchResults, handleSearch }}>
        {children}
    </GlobalContext.Provider >
}
