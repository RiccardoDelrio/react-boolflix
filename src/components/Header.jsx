import { useGlobal } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Header() {
    const { searchText, setSearchText, handleSearch, language, setLanguage } = useGlobal();
    const navigate = useNavigate();

    return (
        <>
            <header className="px-3">
                <nav className="navbar navbar-dark navbar-expand-lg netflix-header">
                    <div className="container-fluid align-items-center">
                        <a className="navbar-brand logo_nav" href="#"><img className="logo_nav" src="./img/netflix.png" alt="" /></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link active text-white" aria-current="page">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/film" className="nav-link active text-white" aria-current="page">Film</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/telefilm" className="nav-link active text-white" aria-current="page">Telefilm</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/discover" className="nav-link active text-white" aria-current="page">Discover</Link>
                                </li>
                            </ul>
                            <form className="d-flex" role="search" onSubmit={(e) => {
                                e.preventDefault();
                                handleSearch();
                                navigate("/search");
                            }}>
                                <div className="search_bar"></div>
                                <input className="form-control search-input"
                                    type="search" placeholder="Search"
                                    aria-label="Search"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)} />
                                <button className="search-click" type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
                            </form>
                            <div className="langChoice dropdown">
                                <button
                                    className="btn user_lang p-0 dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <img className="w-100" src="/img/N.png" alt="User" />
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end bg-dark" aria-labelledby="dropdownMenuButton">
                                    <li className="text-white px-3"><img className="img-profile" src="/img/profile.jpg" alt="" />Rich</li>
                                    <li className="py-2">
                                        <Link to="/profile" className="nav-link text-white px-3">Profile</Link>
                                    </li>
                                    <li className="py-2">
                                        <Link to="/profile" className="nav-link text-white px-3">Centro assistenza</Link>
                                    </li>
                                    <li className="py-2">
                                        <Link to="/profile" className="nav-link text-white px-3">LogOut</Link>
                                    </li>

                                    <li className="text-white px-3"></li>
                                    <li>

                                        <div className="lang_choice d-flex justify-content-around px-3">
                                            <button
                                                value="en"
                                                onClick={() => setLanguage("en")}
                                                className={` btn btn_lang ${language === "en" ? "active" : ""}`}
                                            >
                                                <img className="flag" src="/img/eng.png" alt="English" />
                                            </button>
                                            <button
                                                value="it"
                                                onClick={() => setLanguage("it")}
                                                className={`btn btn_lang ${language === "it" ? "active" : ""}`}
                                            >
                                                <img className="flag" src="/img/ita.png" alt="Italian" />
                                            </button>
                                            <button
                                                value="fr"
                                                onClick={() => setLanguage("fr")}
                                                className={` btn btn_lang ${language === "fr" ? "active" : ""}`}
                                            >
                                                <img className="flag" src="/img/fr.png" alt="French" />
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}