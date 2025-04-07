import { useGlobal } from "../contexts/GlobalContext"
import Card from "../components/CardFilm"

export default function Search() {
    const { searchResults, languageCode, rowRef, slide, takefilm, genres, getVideo } = useGlobal()

    return (
        <>
            <main>
                <div className="m-5 p-4">
                    <div class="mb-3">
                        <select
                            class=" form-select-sm"
                            name=""
                            id=""
                        >
                            <option selected>Select one</option>
                            {genres.map(genres => {
                                return (
                                    <option value={genres.id}>{genres.name}</option>
                                )
                            })}
                        </select>
                    </div>

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