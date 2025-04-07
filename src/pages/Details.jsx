import { useGlobal } from "../contexts/GlobalContext";

export default function Details() {
    const { details, cast } = useGlobal();

    return (
        <>
            <div className="container">
                <h1 className="card-title titolo_card">{details.title}</h1>
                <div className="rounded big_card p-0">
                    <img
                        src={`http://image.tmdb.org/t/p/w1920/${details.img}`}
                        alt={details.title}
                        className="big-img"
                    />
                </div>
                <div className="container rounded big_card p-2">
                    <h4 className="text-white mt-2">Description:</h4>
                    <p className="card-text text-white mt-2 mb-4">{details.description}</p>
                    <h4 className="text-white mt-2 text-center">Cast:</h4>
                    <div className="d-flex flex-wrap justify-content-between">
                        {cast.map((actor, index) => (
                            <div key={index} className="text-center col-3 col-md-2 col-lg-1 col-xl-1">
                                <img
                                    src={`http://image.tmdb.org/t/p/w185/${actor.profile_path}`}
                                    alt={actor.name}
                                    className="cast_img"
                                />
                                <h6 className="cast_name text-white">{actor.name}</h6>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}