import { useGlobal } from "../contexts/GlobalContext";
import Card from "../components/CardFilm";
import { useEffect } from "react";

export default function Discover() {
    const { languageCode, takefilm, genres, allFilms, setPage, setGenreId, getVideo } = useGlobal();

    const handleGenreChange = (event) => {
        const selectedGenreId = event.target.value;
        setGenreId(selectedGenreId); // Aggiorna il genere selezionato
        setPage(1); // Resetta la pagina a 1 per il nuovo filtro
    };




    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } =
                document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 300) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);



    return (
        <>
            <main>
                <div className="m-5 p-4">
                    <h2 className="mt-5 text-white">Discover Top Movies and TV Shows</h2>
                    <div className="mb-3">
                        <select className="form-select-sm" onChange={handleGenreChange}>
                            <option value="" selected>
                                Select one
                            </option>
                            {genres && genres.map((genre) => ( // Controlla che generi sia definito
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="search-results">
                        <div className="row">
                            {allFilms && allFilms.map((item) => { // Controlla che allFilms sia definito
                                const stars = Math.floor((item.vote_average || 0) / 2);
                                function getStars() {
                                    return Array.from({ length: stars }, (_, i) => <span key={i}>⭐</span>);
                                }

                                return (
                                    <Card
                                        key={`${item.id}`}
                                        movie={item}
                                        lang={languageCode}
                                        stars={getStars()}
                                        takefilm={() => takefilm(item)}
                                        onClick={() => getVideo(item)}
                                    />
                                );
                            })}
                        </div>

                    </div>
                </div>
            </main>
        </>
    );
}