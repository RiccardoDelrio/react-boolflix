export default function FilmGrid(movie) {
    return (
        <div className="col">
            <div className="card">
                <ul key={movie.id}>
                    <li>{movie.title}</li>
                    <li><ReactCountryFlag countryCode={languageCode} title={movie.original_language} svg /></li>
                    <li>{(movie.vote_average).toFixed(0)}</li>
                </ul>
            </div>

        </div>
    )
}