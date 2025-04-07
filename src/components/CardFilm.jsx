import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Card({ movie, stars, onClick, takefilm }) {

    //rotazione dell'img
    const [isImageVisible, setIsImageVisible] = useState(true);


    //accorciare descrizione 
    const truncateText = (text, maxLength) => {
        if (!text) return "No description available.";
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    const toggleImage = () => {
        setIsImageVisible(!isImageVisible);
    };

    return (
        <div
            onClick={onClick}
            className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2 mb-4 ">
            <div className={`card_film ${!isImageVisible ? 'flipped' : ''}`}
                onClick={toggleImage}>
                <div className="card-front ">
                    {movie.poster_path == null ?
                        <>
                            <img className='placeholder-img' src='./img/N.png' />
                            <h5 className="title">Titolo: {movie.title || movie.name}</h5>
                        </>
                        :
                        <img
                            className="movie-poster"
                            src={`http://image.tmdb.org/t/p/w1920/${movie.poster_path}`}
                            alt={movie.title || movie.name}
                        />
                    }
                </div>
                <div className="card-back overflow-hidden">
                    <h5 className="title">Titolo: {movie.title || movie.name}</h5>
                    <h6 className="vote">Vote: {stars}</h6>
                    <p className="overview">
                        {truncateText(movie.overview, 180)}
                    </p>
                    <Link
                        to="/details"
                        onMouseDown={takefilm} // Salva l'ID al click
                        className="btn btn-dark w-100 position-sticky top-100"
                    >
                        Dettagli
                    </Link>
                </div>
            </div>
        </div>
    );
}
