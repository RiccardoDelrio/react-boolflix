import { useState } from 'react';

export default function Card({ movie, stars }) {
    const [isImageVisible, setIsImageVisible] = useState(true);

    const truncateText = (text, maxLength) => {
        if (!text) return "No description available.";
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    const toggleImage = () => {
        setIsImageVisible(!isImageVisible);
    };

    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className={`card_film ${!isImageVisible ? 'flipped' : ''}`}
                onClick={toggleImage}>
                <div className="card-front">
                    {movie.poster_path == null ?
                        <>
                            <img className='placeholder-img' src='./img/N.png' />
                            <h5 className="title">Titolo: {movie.type === "movie" ? movie.title : movie.name}</h5>
                        </>
                        :
                        <img
                            className="movie-poster"
                            src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title || movie.name}
                        />
                    }
                </div>
                <div className="card-back">
                    <h5 className="title">Titolo: {movie.type === "movie" ? movie.title : movie.name}</h5>
                    <h6 className="vote">Vote: {stars}</h6>
                    <p className="overview">
                        {truncateText(movie.overview, 200)}
                    </p>
                </div>
            </div>
        </div>
    );
}
