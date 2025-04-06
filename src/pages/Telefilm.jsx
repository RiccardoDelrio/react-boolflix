import { useGlobal } from "../contexts/GlobalContext";
import React, { useRef } from "react";
import Card from "../components/CardFilm";

export default function Home() {
    const { languageCode, trendinSeries, slide, setIdVideo, currentVideo, takefilm } = useGlobal();
    const url = `https://www.youtube.com/embed/${currentVideo}`;

    const seriesRowRef = useRef(null);

    function getVideo(item) {
        setIdVideo(item.id); // Update the trailer video ID
        console.log("Selected video ID:", item.id);
    }

    return (
        <>
            <main>
                <div className="m-5 px-4">

                    <h2 className="mt-5 text-white">Top TV Series of the Week</h2>
                    <div className="search-results">
                        <button className="arrow_left btn" onClick={() => slide(-1, seriesRowRef)}>
                            <i className="fa fa-arrow-left" aria-hidden="true"></i>
                        </button>
                        <button className="arrow_right btn" onClick={() => slide(1, seriesRowRef)}>
                            <i className="fa fa-arrow-right" aria-hidden="true"></i>
                        </button>

                        <div className="row" ref={seriesRowRef}>
                            {trendinSeries.map((item) => {
                                const stars = Math.floor((item.vote_average || 0) / 2);
                                function getStars() {
                                    return Array.from({ length: stars }, (_, i) => <span key={i}>⭐</span>);
                                }
                                return (
                                    <Card
                                        key={`${item.type}-${item.id}`}
                                        movie={item}
                                        lang={languageCode}
                                        stars={getStars()}
                                        onClick={() => getVideo(item)}
                                        takefilm={() => takefilm(item)}
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