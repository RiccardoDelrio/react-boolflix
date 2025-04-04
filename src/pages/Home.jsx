import { useGlobal } from "../contexts/globalContext"
import ReactCountryFlag from "react-country-flag"

export default function Home() {
    const { searchText, setSearchText, handleSearch, searchResults, language, setLanguage, } = useGlobal()

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
                <div className="langChoice">
                    <label htmlFor="languageSelect">Select language:</label>
                    <select id="languageSelect" value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <option value="en">English</option>
                        <option value="it">Italian</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                    </select>
                </div>
            </div>
            <div className="search-results">
                {searchResults?.length > 0 ? (
                    <div className="card">
                        {searchResults.map((item) => {
                            const languageCode = item.original_language === 'en' ? 'GB' : item.original_language;
                            const uniqueKey = `${item.type}-${item.id}`;
                            const stars = ((item.vote_average).toFixed(0) / 2)
                            function getStars() {
                                return (
                                    Array.from({ length: stars }, (_, i) => (
                                        <span key={i}>⭐</span>
                                    ))
                                );
                            }

                            return (
                                <ul key={uniqueKey}>
                                    <li>{item.type === 'movie' ? item.title : item.name}</li>
                                    <li>{item.type === 'movie' ? item.original_title : item.original_name}</li>
                                    <li><ReactCountryFlag countryCode={languageCode} title={item.original_language} svg /></li>
                                    <li>
                                        {getStars()}

                                    </li>
                                    <li>{item.overview}</li>
                                    <li><img src={`http://image.tmdb.org/t/p/w500/${item.poster_path
                                        }`} alt="" /></li>
                                </ul>
                            );
                        })}
                    </div>
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </>
    )
}