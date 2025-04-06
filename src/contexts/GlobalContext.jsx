import { createContext, useContext, useState, useEffect, useRef } from "react"; // Aggiungi useEffect

const GlobalContext = createContext();
const api_key = import.meta.env.VITE_MOVIE_DB_API_KEY;

function GlobalProvider({ children }) {
    const [searchText, setSearchText] = useState("");
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const [language, setLanguage] = useState("en");
    const [trendinSeries, setTrendinSeries] = useState([]);
    const [trendingMovie, setTrendingMovie] = useState([])
    const [idVideo, setIdVideo] = useState("127532")
    const [currentVideo, setCurrentVideo] = useState("")

    // Popola i dati di "Top Ten serietvv" al caricamento della pagina
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${api_key}&language=${language}`)
            .then(response => response.json())
            .then(data => {
                setTrendinSeries(data.results.slice(0, 30).map(movie => ({
                    ...movie,
                    type: 'tv', // Aggiungi il campo "type"
                })));
            })
            .catch(error => {
                console.error('Error fetching top ten movies:', error);
            });
    }, [language]); // Esegui ancora la chimata se cambia la lingua


    // Popola i dati di "Top Ten Films" al caricamento della pagina
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}&language=${language}`)
            .then(response => response.json())
            .then(data => {
                setTrendingMovie(data.results.slice(0, 30).map(movie => ({
                    ...movie,
                    type: 'movie', // Aggiungi il campo "type"
                })));
            })
            .catch(error => {
                console.error('Error fetching top ten movies:', error);
            });
    }, [language])

    // Fetch video di Youtube
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${idVideo}/videos?api_key=${api_key}&language=${language}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCurrentVideo(data.results[0].key || "NtssbUbxDDM");
                console.log(idVideo)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [idVideo, language]);



    const handleSearch = () => {
        // Fetch film
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



    //SLIDE DELLA ROW
    const rowRef = useRef(null);

    const slide = (direction, rowRef) => { // Aggiungi rowRef come parametro
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    useEffect(() => {
        const rowElement = rowRef.current;
        if (rowElement) {
            const handleTouchStart = () => { };
            rowElement.addEventListener("touchstart", handleTouchStart, { passive: true });
            return () => {
                rowElement.removeEventListener("touchstart", handleTouchStart);
            };
        }
    }, []);

    return (
        <GlobalContext.Provider value={{
            searchText,
            setSearchText,
            searchResults: allResults,
            handleSearch,
            language,
            setLanguage,
            trendinSeries,
            setTrendinSeries,
            rowRef,
            slide,
            idVideo,
            setIdVideo,
            currentVideo,
            trendingMovie


        }}>
            {children}
        </GlobalContext.Provider>
    );
}

function useGlobal() {
    return useContext(GlobalContext);
}

export { GlobalProvider, useGlobal };