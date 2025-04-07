import { useGlobal } from "../contexts/GlobalContext";

export default function Details() {
    const { details } = useGlobal();
    return (
        <>
            <h1 className="card-title  titolo_card  ">{details.title}</h1>
            <div className="container rounded big_card  p-0">
                <img
                    src={`http://image.tmdb.org/t/p/w1920/${details.img}`}
                    alt={details.title}
                    className="big-img" // Ensure the class is applied
                />
                <div className="card-img-overlay">
                </div>
            </div>
            <div className="container rounded big_card p-3">
                <h4 className="text-white mt-2 ">Description:</h4>
                <p className="card-text text-white mt-2 mb-4">{details.description}</p>
            </div>
        </>
    );
}