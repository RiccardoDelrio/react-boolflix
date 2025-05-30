# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
import { useGlobal } from "../contexts/GlobalContext"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Header() {
    const { searchText, setSearchText, handleSearch, language, setLanguage, } = useGlobal()
    const navigate = useNavigate();

    return (
        <>
            <header>

                <nav className="navbar navbar-dark navbar-expand-lg netflix-header  ">
                    <div className="container-fluid">
                        <a className="navbar-brand  logo_nav" href="#"><img className="logo_nav" src="./img/netflix.png" alt="" /></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse " id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link active text-white" aria-current="page" href="#" >Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/film" className="nav-link active text-white" aria-current="page" href="#">Fim</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/telefilm" className="nav-link active text-white" aria-current="page" href="#">Telefilm</Link>
                                </li>
                            </ul>
                            <form className="d-flex" role="search" onSubmit={(e) => {
                                e.preventDefault();
                                handleSearch();
                                navigate("/search");
                            }}>


                                <div className="search_bar"></div>
                                <input className="form-control  search-input"
                                    type="search" placeholder="Search"
                                    aria-label="Search"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)} />
                                <button className=" search-click" type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
                            </form>
                            <div className="langChoice">


                                <select className="form-select-sm p-0 bg-black text-white ms-5" id="languageSelect" value={language} onChange={(e) => setLanguage(e.target.value)}>
                                    <option value="en">Eng</option>
                                    <option value="it">Ita</option>
                                    <option value="fr">Fr</option>

                                </select>

                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>

    )
}