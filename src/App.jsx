import { GlobalProvider } from "./contexts/globalContext"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import DefaultLayout from "./layout/defaultLayout";
import Search from "./pages/Search"
function App() {

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
