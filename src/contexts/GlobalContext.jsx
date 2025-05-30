import { createContext, useContext, useState, useEffect, useRef, use } from "react"; // Aggiungi useEffect

const GlobalContext = createContext();
const api_key = import.meta.env.VITE_MOVIE_DB_API_KEY;

function GlobalProvider({ children }) {
    const [searchText, setSearchText] = useState("");
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const [language, setLanguage] = useState("en");
    const [trendinSeries, setTrendinSeries] = useState([]);
    const [trendingMovie, setTrendingMovie] = useState([]);
    const [idVideo, setIdVideo] = useState("127532" || "696506");
    const [currentVideo, setCurrentVideo] = useState("");
    const [details, setDetails] = useState([{}]);
    const [genres, setGenres] = useState([]);
    const [allFilms, setAllFilms] = useState([]);
    const [page, setPage] = useState(1);
    const [genreId, setGenreId] = useState("");
    const [cast, setCast] = useState([]);

    // Popola i dati di "Top Ten serietvv" al caricamento della pagina
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${api_key}&language=${language}`)
            .then(response => response.json())
            .then(data => {
                setTrendinSeries(data.results.map(movie => ({
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
                setTrendingMovie(data.results.map(movie => ({
                    ...movie,
                    type: 'movie', // Aggiungi il campo "type"
                })));
            })
            .catch(error => {
                console.error('Error fetching top ten movies:', error);
            });
    }, [language]);

    // Fetch video di Youtube
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${idVideo}/videos?api_key=${api_key}&language=${language}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCurrentVideo(data.results[0].key || "NtssbUbxDDM");
                console.log(idVideo);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [idVideo, language]);

    //fetch per ottenere i generi disponibili
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=${language}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setGenres(data.genres || []); // Assicurati che genres sia un array
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [language]);

    // Fetch per il discovery con gestione della pagina e del genere
    useEffect(() => {
        const fetchDiscoverMovies = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=${language}&page=${page}&with_genres=${genreId}`
                );
                const data = await response.json();
                if (page === 1) {
                    setAllFilms(data.results); // Sovrascrivi i risultati se è la prima pagina
                } else {
                    setAllFilms((prevFilms) => [...prevFilms, ...data.results]); // Concatena i nuovi risultati
                }
            } catch (error) {
                console.error("Error fetching discover movies:", error);
            }
        };

        fetchDiscoverMovies();
    }, [language, page, genreId]); // Dipende da `language`, `page` e `genreId`

    //fetch per i nomi degli attori presenti in quel film
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${idVideo}/credits?api_key=${api_key}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCast(data.cast.slice(0, 5))
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [idVideo]);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${idVideo}/credits?api_key=${api_key}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCast(data.cast.slice(0, 5))
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [idVideo]);





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

    const slide = (direction, rowRef) => {
        if (rowRef && rowRef.current) {
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

    function takefilm(item) {
        setDetails({
            title: item.name || item.title,
            description: item.overview,
            img: item.backdrop_path,
        });
        console.log("Film details set:", {
            title: item.name || item.title,
            description: item.overview,
            img: item.backdrop_path,
        });
    }
    function getVideo(item) {
        setIdVideo(item.id);
        console.log(item.id);

    }

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
            trendingMovie,
            details,
            setDetails,
            takefilm,
            genres,
            allFilms,
            setPage,
            setGenreId,
            cast,
            getVideo
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

function useGlobal() {
    return useContext(GlobalContext);
}

export { GlobalProvider, useGlobal };