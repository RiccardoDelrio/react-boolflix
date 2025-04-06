import { GlobalProvider } from "./contexts/GlobalContext"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import DefaultLayout from "./layout/defaultLayout";
import Search from "./pages/Search"
import Film from "./pages/Film"
import Telefilm from "./pages/Telefilm"
import Details from "./pages/Details"; // Importa la nuova pagina

function App() {

  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/film" element={<Film />} />
            <Route path="/telefilm" element={<Telefilm />} />
            <Route path="/details" element={<Details />} />
          </Route>
        </Routes>
      </Router>
    </GlobalProvider>
  )
}

export default App
