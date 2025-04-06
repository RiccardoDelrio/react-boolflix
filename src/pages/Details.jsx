import { useGlobal } from "../contexts/GlobalContext";

export default function Details() {
    const { details } = useGlobal();
    return (
        <>
            <div className="container rounded big_card bg-dark">
                <div className="card text-bg-dark">
                    <img
                        src={`http://image.tmdb.org/t/p/w1920/${details.img}`}
                        alt={details.title}
                        className="big-img" // Ensure the class is applied
                    />
                    <div className="card-img-overlay">
                        <h5 className="card-title w-25">{details.title}</h5>
                    </div>
                </div>
            </div>
            <div className="container rounded big_card bg-dark">
                <div className="card bg-dark  mt-4">
                    <h4 className="text-white mt-2 ">Description:</h4>
                    <p className="card-text text-white mt-2 mb-4">{details.description}</p>
                </div>
            </div>
        </>
    );
}