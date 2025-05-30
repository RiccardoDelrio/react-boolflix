import { useGlobal } from "../contexts/GlobalContext"
import React, { useRef } from 'react'; // Aggiungi useRef
import Card from "../components/CardFilm"


export default function Home() {
    const { languageCode, slide, setIdVideo, currentVideo, trendingMovie, setIndex } = useGlobal();
    const url = `https://www.youtube.com/embed/${currentVideo}`;

    const moviesRowRef = useRef(null); // Riferimento per la seconda row

    function getVideo(item) {
        setIdVideo(item.id);
        console.log(item.id);
        ;
    }

    return (
        <>
            <main>
                <div className="m-5 px-4">
                    <h2 className=" mt-5 text-white">Top Movies  of the Week</h2>
                    <div className="search-results">
                        <button className='arrow_left btn' onClick={() => slide("left", moviesRowRef)}>
                            <i className="fa fa-arrow-left" aria-hidden="true"></i>
                        </button>
                        <button className='arrow_right btn' onClick={() => slide("right", moviesRowRef)}>
                            <i className="fa fa-arrow-right" aria-hidden="true"></i>
                        </button>

                        <div className="row slide_row" ref={moviesRowRef}>
                            {trendingMovie.map((item) => {
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
                                        onClick={() => getVideo(item)}
                                        details={setIndex} // Passa setIndex per salvare l'ID
                                    />
                                );
                            })}
                        </div>
                    </div>


                </div>
            </main>
        </>
    );
}