import { GlobalProvider } from "./contexts/globalContext"
import Main from "./components/Main"
function App() {

  return (
    <>
      <GlobalProvider>
        <Main />
      </GlobalProvider>

    </>
  )
}

export default App
