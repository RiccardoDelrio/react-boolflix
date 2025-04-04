import { useGlobal } from "../contexts/globalContext"
import Card from "../components/CardFilm"

export default function Home() {
    const { searchResults, languageCode } = useGlobal()

    return (
        <div className="container mt-5">

            <div className="search-results">
                {searchResults?.length > 0 ? (
                    <div className="row row-cols-md-2 row-cols-lg-4">
                        {searchResults.map((item) => {
                            const stars = ((item.vote_average || 0) / 2);
                            function getStars() {
                                return (
                                    Array.from({ length: stars }, (_, i) => (
                                        <span key={i}>⭐</span>
                                    ))
                                );
                            }

                            return (
                                <Card
                                    key={`${item.type}-${item.id}`}
                                    movie={item}
                                    lang={languageCode}
                                    stars={getStars()}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </div>
    )
}