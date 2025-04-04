import CardFilm from './CardFilm';
export default function FilmGrid(movie) {
    return (
        <div className="container">
            <div className="row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6"></div>
            <CardFilm></CardFilm>
        </div>
    )
}