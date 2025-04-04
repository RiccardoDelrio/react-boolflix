export default function Card({ movie, stars }) {
    const truncateText = (text, maxLength) => {
        if (!text) return "No description available.";
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    return (
        <div className="col mb-4 ">
            <div className="card card_film bg-black text-white">
                <div className="card-body">
                    <h5 className="card-title">Titolo: {movie.type === "movie" ? movie.title : movie.name}</h5>
                    <h6 className="card-subtitle mb-2 ">Vote:{stars} </h6>
                    <p className="card-text">
                        {truncateText(movie.overview, 200)}
                    </p>
                </div>
                <img className="img_card" src={`http://image.tmdb.org/t/p/w500/${movie.poster_path} alt=""`} />
            </div>
        </div>
    );
}
