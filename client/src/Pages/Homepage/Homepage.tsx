import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import Modal from '../../Shared/Modal/Modal'
import { actionCreators } from '../../store'
import { IStore } from '../../store/store'
import './Homepage.scss'

function Homepage() {
  const { showLoginModal, showRegistrationModal } = useSelector(
    (state: IStore) => state.showModalReducer
  )
  const dispatch = useDispatch()
  const { setLoginModal, setRegistrationModal } = bindActionCreators(
    actionCreators,
    dispatch
  )

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
      <Modal isOpen={showLoginModal} setIsOpen={setLoginModal}>
        <h1>Login</h1>
      </Modal>
      <Modal isOpen={showRegistrationModal} setIsOpen={setRegistrationModal}>
        <h1>Register</h1>
      </Modal>
    </div>
  )
}

export default Homepage
