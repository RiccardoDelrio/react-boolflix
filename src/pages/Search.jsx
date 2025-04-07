import { useGlobal } from "../contexts/GlobalContext"
import Card from "../components/CardFilm"

export default function Search() {
    const { searchResults, languageCode, takefilm, getVideo } = useGlobal()

    return (
        <>
            <main>
                {searchResults === "" ? "Cerca film" :

                    <div className="search-results">

                        <div className="row" >
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
                                        takefilm={() => takefilm(item)}
                                        onClick={() => getVideo(item)} // Update trailer on click

                                    />
                                );
                            })}
                        </div>
                    </div>
                }

            </main >
        </>
    )
}