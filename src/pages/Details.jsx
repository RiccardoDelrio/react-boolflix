import { useGlobal } from "../contexts/GlobalContext";

export default function Details() {
    const { details } = useGlobal()
    return (
        <>
            <div className="container rounded big_card">

                <div className="card text-bg-dark asd">
                    <img src={`http://image.tmdb.org/t/p/w1920/${details.img}`} alt={details.title} className="card-img" />
                    <div className="card-img-overlay">
                        <h5 className="card-title  w-25 ">{details.title}</h5>

                    </div>
                </div>
            </div>
            <div className="container rounded big_card">

                <div className="card text-bg-dark asd">
                    <div className="card-img-overlay">
                        <p className="card-text ">{details.description}</p>
                    </div>
                </div>
            </div>
        </>
    );
}