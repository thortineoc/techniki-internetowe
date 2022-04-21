import { useSelector } from 'react-redux'
import Modal from '../../Shared/Modal/Modal'
import { IStore } from '../../store/store'
import './Homepage.scss'

function Homepage() {
  const showLoginModal = useSelector(
    (state: IStore) => state.showModalReducer.showLoginModal
  )
  console.log(showLoginModal)

  return (
    <div>
      <div className="homepage">
        <div className="homepage-textbox">
          <h1 className="homepage-title">Polecajka</h1>
          <div>
            Welcome to Polecajka app. You can find your favourite places 🗺️,
            save them 📍 and rate ⭐. You can also see others' 👩👨 favourites
            spots and later check them out. Look across many avaliable locations
            🥡💈🏀.
          </div>
        </div>
      </div>
      <Modal isOpen={showLoginModal}>Login</Modal>
    </div>
  )
}

export default Homepage
