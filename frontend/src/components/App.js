import {useState, useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";

import {CurrentUserContext, defaultUser} from '../contexts/CurrentUserContext';

import {api} from '../utils/api';
import {paths} from "../utils/settings";

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupToConfirm from "./PopupToConfirm";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import NotFoundPage from "./NotFoundPage";


function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(defaultUser);

  const [loggedIn, setLoggedIn] = useState(false);

  const [cards, setCards] = useState([]);

  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] = useState(false);
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = useState(false);
  const [isAddPlacePopupOpened, setIsAddPlacePopupOpened] = useState(false);
  const [isDeleteCardPopupOpened, setIsDeleteCardPopupOpened] = useState(false);
  const [isServerInfoPopupOpened, setIsServerInfoPopupOpened] = useState(false);

  const [isAvatarEditing, setIsAvatarEditing] = useState(false);
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [isPlaceAdding, setIsPlaceAdding] = useState(false);
  const [isCardDeleting, setIsCardDeleting] = useState(false);

  const [cardToShow, setCardToShow] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);

  const [serverSuccess, setServerSuccess] = useState(false);
  const [serverMessage, setServerMessage] = useState('');

  const isSomePopupOpened = isEditAvatarPopupOpened
    || isEditProfilePopupOpened
    || isAddPlacePopupOpened
    || isDeleteCardPopupOpened
    || isServerInfoPopupOpened
    || cardToShow
    || cardToDelete;

  function showServerResponse(success, message) {
    setIsServerInfoPopupOpened(true);
    setServerSuccess(success);
    setServerMessage(message);
  }

  function showServerError(message) {
    showServerResponse(false, message);
  }

  function showServerSuccess(message) {
    showServerResponse(true, message);
  }

  useEffect(() => {
    api.checkToken()
      .then((tokenProps) => {
        setLoggedIn(tokenProps.isValid);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUser(), api.getInitialCards()])
        .then(([userData, initialCards]) => {
          setCurrentUser(userData);

          setCards(initialCards);

          navigate('/');
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (isSomePopupOpened) {
      function handleKeyDown(evt) {
        if (evt.key === 'Escape') {
          handleClosePopup();
        }
      }

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      }
    }
  }, [isSomePopupOpened]);


  function handleSignUp(signUpData) {
    api.signUp(signUpData)
      .then(() => {
        showServerSuccess('Вы успешно зарегистрировались!')

        navigate(`/${paths.signIn}`);
      })
      .catch((err) => {
        showServerError(err.message);
      });
  }

  function handleSignIn(signInData) {
    api.signIn(signInData)
      .then(() => {
        setLoggedIn(true);

        navigate('/', {replace: true});
      })
      .catch((err) => {
        showServerError(err.message);
      });
  }

  function handleSignOut() {
    api.signOut()
      .then(() => {
        setLoggedIn(false);

        navigate(`/${paths.signIn}`);
      })
      .catch((err) => {
        console.log(err.message);
      })
  }

  function handleClosePopup() {
    setIsEditAvatarPopupOpened(false);
    setIsEditProfilePopupOpened(false);
    setIsAddPlacePopupOpened(false);
    setIsDeleteCardPopupOpened(false);
    setIsServerInfoPopupOpened(false);
    setCardToShow(null);
    setCardToDelete(null);
  }

  function handleEditAvatarClick()  {
    setIsEditAvatarPopupOpened(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpened(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpened(true);
  }

  function handlePopupMouseDown(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
      handleClosePopup();
    }
  }

  function handleUpdateUser(userData) {
    setIsProfileEditing(true);

    api.editUserInfo(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);

        handleClosePopup();
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setIsProfileEditing(false);
      })
  }

  function handleUpdateAvatar(avatarData) {
    setIsAvatarEditing(true);

    api.editUserAvatar(avatarData)
      .then((newUserData) => {
        setCurrentUser(newUserData);

        handleClosePopup();
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setIsAvatarEditing(false);
      })
  }

  function handleAddPlaceSubmit(cardData) {
    setIsPlaceAdding(true);

    api.addCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);

        handleClosePopup();
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setIsPlaceAdding(false);
      })
  }

  function handleCardClick(cardData) {
    setCardToShow(cardData);
  }
  
  function handleCardLike(currentCard) {
    const isLikedByUser = currentCard.likes.some(user => user._id === currentUser._id);

    api.toggleCardLike(currentCard._id, isLikedByUser)
      .then((newCard) => {
        setCards((prevCards) => {
          return prevCards.map(card => card._id === currentCard._id ? newCard : card)
        });
      })
      .catch((err) => {
        console.log(err.message);
      })
  }

  function handleCardDelete(card) {
    setCardToDelete(card)
  }

  function handleConfirmCardDelete(currentCard) {
    setIsCardDeleting(true);

    api.deleteCard(currentCard)
      .then(() => {
        setCards((prevCards) => {
          return prevCards.filter(card => card._id !== currentCard._id);
        })

        setCardToDelete(null);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setIsCardDeleting(false);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} onSignOut={handleSignOut} />

        <main className="content section">
          <Routes>

            <Route
              path="/"
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Main}
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              }
            />

            <Route path={`/${paths.signUp}`} element={<Register onSignUp={handleSignUp} />} />
            <Route path={`/${paths.signIn}`} element={<Login onSignIn={handleSignIn} /> } />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {loggedIn ? <Footer/> : null}

        <EditAvatarPopup
          isOpened={isEditAvatarPopupOpened}
          onMouseDown={handlePopupMouseDown}
          onUpdateAvatar={handleUpdateAvatar}
          isSubmitting={isAvatarEditing}
        />

        <EditProfilePopup
          isOpened={isEditProfilePopupOpened}
          onMouseDown={handlePopupMouseDown}
          onUpdateUser={handleUpdateUser}
          isSubmitting={isProfileEditing}
        />

        <AddPlacePopup
          isOpened={isAddPlacePopupOpened}
          onMouseDown={handlePopupMouseDown}
          onAddPlace={handleAddPlaceSubmit}
          isSubmitting={isPlaceAdding}
        />

        <PopupToConfirm
          onMouseDown={handlePopupMouseDown}
          onSubmit={handleConfirmCardDelete}
          objectToHandle={cardToDelete}
          isSubmitting={isCardDeleting}
        />

        <ImagePopup cardData={cardToShow} onMouseDown={handlePopupMouseDown}/>

        <InfoTooltip
          isOpened={isServerInfoPopupOpened}
          onMouseDown={handlePopupMouseDown}
          success={serverSuccess}
          message={serverMessage}
        />

      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
