import { GlobalProvider } from "./contexts/GlobalContext"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import DefaultLayout from "./layout/defaultLayout";
import Search from "./pages/Search"
import Film from "./pages/Film"
import Telefilm from "./pages/Telefilm"
function App() {

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/film" element={<Film />} />
            <Route path="/telefilm" element={<Telefilm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
