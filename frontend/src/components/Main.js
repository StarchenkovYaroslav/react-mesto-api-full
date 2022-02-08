import {useContext} from 'react';

import {CurrentUserContext} from '../contexts/CurrentUserContext';

import Card from './Card';


function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <section className="profile">
        <div className="profile__info">
          <button className="profile__avatar-button" onClick={props.onEditAvatar}>
            <img alt="Аватар" className="profile__avatar" src={currentUser.avatar} />
          </button>
          <div className="profile__text">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__about">{currentUser.about}</p>
            <button className="profile__edit-button" type="button" onClick={props.onEditProfile}/>
          </div>
        </div>
        <button className="profile__add-card-button" type="button" onClick={props.onAddPlace}/>
      </section>

      <section className="cards" aria-label="Фотографии профиля">
        {props.cards.length !== 0 &&
          props.cards.map(cardData => (
            <Card
              key={cardData._id}
              data={cardData}
              onImageClick={props.onCardClick}
              onLikeClick={props.onCardLike}
              onDeleteClick={props.onCardDelete}
            />
        ))}
      </section>
    </>
  )
}

export default Main;