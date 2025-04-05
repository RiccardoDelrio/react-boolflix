import React, { useRef } from 'react';
import { useGlobal } from "../contexts/globalContext"
import Card from "../components/CardFilm"

export default function Home() {
    const { languageCode, topTen } = useGlobal()
    const rowRef = useRef(null);

    // SLIDE LATERALE DELLA ROW
    const slide = (direction) => {
        const cardWidth = rowRef.current.firstChild.offsetWidth + 0; // Dimensione card + margine
        rowRef.current.scrollBy({
            left: direction * cardWidth,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <main>
                <div className="container p-4">
                    <div className="search-results">
                        <button onClick={() => slide(-2)}> Sinistra</button>
                        <button onClick={() => slide(2)}> Destra</button>

                        <div className="row  " ref={rowRef}>
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