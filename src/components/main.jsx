
export default function Main() {
    return (
        <>
            <div className="container">
                <div className="nav">
                    <h1>Boolflix</h1>
                </div>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </>
    )
}