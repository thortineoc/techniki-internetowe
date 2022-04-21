import { BrowserRouter } from 'react-router-dom'
import MainRouter from './Routers/MainRouter'
import Footer from './Shared/Footer/Footer'
import Navbar from './Shared/Navbar/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <MainRouter />
      <Footer />
    </BrowserRouter>
  )
}
export default App
