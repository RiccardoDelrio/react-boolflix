import { useGlobal } from "../contexts/globalContext"
import React from 'react';
import Card from "../components/CardFilm"
import { useState } from "react";


export default function Home() {
    const { languageCode, topTen, rowRef, slide, idVideo, setIdVideo, currentVideo } = useGlobal()
    const url = `https://www.youtube.com/embed/${currentVideo}`

    function getVideo(item) {
        setIdVideo(item.id)
        console.log(item.id)
        console.log(currentVideo);


    }

    return (
        <>
            <main>
                <div className="m-5 px-4">
                    <div class=" mb-4 bg-light rounded-3">
                        <div class="container-fluid bg-black rounded">
                            <div style={{ width: '100%', height: '400px' }}>
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={url}
                                    title="YouTube Video Player"

                                    allow="accelerometer; autoplay; clipboard-write; gyroscope;"
                                    allowFullScreen
                                ></iframe>
                            </div>

                        </div>
                    </div>

                    <h2 className="mb-5">Top Movies and TV Series of the Week</h2>
                    <div className="search-results">
                        <button className='arrow_left btn' onClick={() => slide(-1)}> <i className="fa fa-arrow-left" aria-hidden="true"></i>
                        </button>
                        <button className='arrow_right btn' onClick={() => slide(1)}> <i className="fa fa-arrow-right" aria-hidden="true"></i>
                        </button>

                        <div className="row" ref={rowRef}>
                            {topTen.map((item) => {
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
                                        onClick={() => getVideo(item)} // Modifica qui

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