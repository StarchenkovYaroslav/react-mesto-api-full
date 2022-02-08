import {useContext} from 'react';

import {CurrentUserContext} from '../contexts/CurrentUserContext';


function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  const isLikedByUser = props.data.likes.some(user => user._id === currentUser._id);
  const isMadeByUser = props.data.owner._id === currentUser._id;
  const likeCounter = props.data.likes.length;

  function onImageClick() {
    props.onImageClick(props.data);
  }

  function onLikeClick() {
    props.onLikeClick(props.data);
  }

  function onDeleteClick() {
    props.onDeleteClick(props.data);
  }

  return (
    <article className="card">
      <img
        className="card__image"
        src={props.data.link}
        alt={props.data.name}
        onClick={onImageClick}
      />
      <div className="card__info">
        <h2 className="card__title">{props.data.name}</h2>
        <button
          className={`card__like-button${isLikedByUser ? ' card__like-button_active' : ''}`}
          type="button"
          onClick={onLikeClick}
        />
        <span className="card__like-counter">{likeCounter}</span>
      </div>
      <button
        type="button"
        className={`card__delete-button${isMadeByUser ? ' card__delete-button_active' : ''}`}
        disabled={!isMadeByUser}
        onClick={onDeleteClick}
      />
    </article>
  )
}

export default Card;