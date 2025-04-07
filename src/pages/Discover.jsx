import { useGlobal } from "../contexts/GlobalContext";
import Card from "../components/CardFilm";
import { useEffect } from "react";

export default function Discover() {
    const { languageCode, takefilm, genres, allFilms, setPage, setGenreId } = useGlobal();

    const handleGenreChange = (event) => {
        const selectedGenreId = event.target.value;
        setGenreId(selectedGenreId); // Aggiorna il genere selezionato
        setPage(1); // Resetta la pagina a 1 per il nuovo filtro
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1); // Incrementa la pagina
    };

    return (
        <>
            <main>
                <div className="m-5 p-4">
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
                                    />
                                );
                            })}
                        </div>
                        <div className="button_container d-flex justify-content-center mt-4">
                            <button className="btn btn-dark" onClick={handleNextPage}>
                                Load more <i className="fa fa-arrow-right" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}