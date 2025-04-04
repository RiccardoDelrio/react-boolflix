import { GlobalProvider } from "./contexts/globalContext"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import DefaultLayout from "./layout/defaultLayout";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
