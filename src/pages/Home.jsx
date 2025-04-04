import { useGlobal } from "../contexts/globalContext"
import ReactCountryFlag from "react-country-flag"

export default function Home() {
    const { searchText, setSearchText, handleSearch, searchResults, setLanguage } = useGlobal()

    return (
        <>
            <div className="container">
                <div className="nav">
                    <h1>Boolflix</h1>
                </div>
                <form className="d-flex" role="search" onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch()
                }}>
                    <input className="form-control me-2"
                        type="search" placeholder="Search"
                        aria-label="Search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)} />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
            <div className="search-results">
                {searchResults?.length > 0 ? (
                    <div className="card">

                        {searchResults.map((movie) => {
                            const languageCode = movie.original_language === 'en' ? 'GB' : movie.original_language;
                            return (
                                <ul key={movie.id}>
                                    <li>{movie.title}</li>
                                    <li><ReactCountryFlag countryCode={languageCode} svg /></li>
                                    <li>{(movie.vote_average).toFixed(0)}</li>
                                </ul>
                            );
                        })}
                    </div>
                ) : (
                    <p>No results found</p>
                )}
            </div >
        </>
    )
}