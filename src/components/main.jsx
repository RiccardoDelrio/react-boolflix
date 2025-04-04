import { useGlobal } from "../contexts/globalContext"

export default function Main() {
    const { searchText, setSearchText, handleSearch, searchResults } = useGlobal()

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
                        {searchResults.map((movie) => (
                            <ul key={movie.id}>
                                <li>{movie.title}</li>
                                <li>{movie.original_language}</li>
                                <li>{movie.vote_count}</li>
                            </ul>
                        ))}
                    </div>
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </>
    )
}