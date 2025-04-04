import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();
const api_key = import.meta.env.VITE_MOVIE_DB_API_KEY;

function GlobalProvider({ children }) {
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchText}`)
            .then(response => response.json())
            .then(data => {
                setSearchResults(data.results);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <GlobalContext.Provider value={{ searchText, setSearchText, searchResults, handleSearch }}>
            {children}
        </GlobalContext.Provider>
    )
}

function useGlobal() {
    return useContext(GlobalContext);
}

export { GlobalProvider, useGlobal }
