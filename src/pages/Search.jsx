import { useGlobal } from "../contexts/globalContext"
import Card from "../components/CardFilm"

export default function Search() {
    const { searchResults, languageCode, rowRef, slide } = useGlobal()

    return (
        <>
            <main>
                <div className="m-5 p-4">
                    <div className="search-results">
                        <button className='arrow_left btn' onClick={() => slide(-1)}> <i className="fa fa-arrow-left" aria-hidden="true"></i>
                        </button>
                        <button className='arrow_right btn' onClick={() => slide(1)}> <i className="fa fa-arrow-right" aria-hidden="true"></i>
                        </button>
                        <div className="row" ref={rowRef}>
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