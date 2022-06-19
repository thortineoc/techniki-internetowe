import { BrowserRouter } from 'react-router-dom'
import MainRouter from './Routers/MainRouter'
import Navbar from './Shared/Navbar/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <MainRouter />
    </BrowserRouter>
  )
}
export default App
