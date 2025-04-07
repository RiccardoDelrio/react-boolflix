import { useGlobal } from "../contexts/GlobalContext";
import Card from "../components/CardFilm";

export default function Search() {
    const { searchResults, languageCode, takefilm, genres, allFilms, setPage } = useGlobal();

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1); // Incrementa la pagina
    };

    const handlePreviousPage = () => {
        setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1)); // Decrementa la pagina, ma non sotto unooo
    };

    return (
        <>
            <main>
                <div className="m-5 p-4">
                    <div className="mb-3">
                        <select className="form-select-sm" name="" id="">
                            <option selected>Select one</option>
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="search-results">
                        <div className="row">
                            {allFilms.map((item) => {
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
                            <button className="btn btn-dark me-2" onClick={handlePreviousPage}>
                                <i className="fa fa-arrow-left" aria-hidden="true"></i> Previous
                            </button>
                            <button className="btn btn-dark" onClick={handleNextPage}>
                                Next <i className="fa fa-arrow-right" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}