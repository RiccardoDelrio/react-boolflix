import { useGlobal } from "../contexts/globalContext"
import Card from "../components/CardFilm"

export default function Home() {
    const { searchResults, languageCode, } = useGlobal()


    return (
        <>
            <main>
                <div className="container p-4">
                    <div className="search-results">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4">
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

                    </div>
                </div>
            </main>
        </>
    )
}