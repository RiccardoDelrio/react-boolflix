import { createContext, useContext, useState, useEffect } from "react"; // Aggiungi useEffect

const GlobalContext = createContext();
const api_key = import.meta.env.VITE_MOVIE_DB_API_KEY;

function GlobalProvider({ children }) {
    const [searchText, setSearchText] = useState("");
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const [language, setLanguage] = useState("en");
    const [topTen, setTopTen] = useState([]);

    // Popola i dati di "Top Ten" al caricamento della pagina
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}&language=${language}`)
            .then(response => response.json())
            .then(data => {
                setTopTen(data.results.slice(0, 8).map(movie => ({
                    ...movie,
                    type: 'movie', // Aggiungi il campo "type"
                })));
            })
            .catch(error => {
                console.error('Error fetching top ten movies:', error);
            });
    },); // Esegui nuovamente la chiamata se cambia la lingua

    const handleSearch = () => {
        // Fetch movies
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchText}&language=${language}`)
            .then(response => response.json())
            .then(data => {
                setMovies(data.results.map(movie => ({ ...movie, type: 'movie' })));
            })
            .catch(error => {
                console.error('Error:', error);
            });

        // Fetch TV shows
        fetch(`https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${searchText}&language=${language}`)
            .then(response => response.json())
            .then(data => {
                setTvShows(data.results.map(show => ({ ...show, type: 'tv' })));
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const allResults = [...movies, ...tvShows];

    return (
        <GlobalContext.Provider value={{
            searchText,
            setSearchText,
            searchResults: allResults,
            handleSearch,
            language,
            setLanguage,
            topTen,
            setTopTen
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

function useGlobal() {
    return useContext(GlobalContext);
}

export { GlobalProvider, useGlobal };