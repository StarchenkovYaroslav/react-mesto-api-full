function ImagePopup(props) {
  return (
    <div
      className={`popup popup_content_picture${props.cardData ? ' popup_opened' : ''}`}
      onMouseDown={props.onMouseDown}
    >
      <div className="popup__container popup__container_content_picture">
        <figure className="picture">
          <img
            className="picture__image"
            src={props.cardData ? props.cardData.link : ''}
            alt={props.cardData ? props.cardData.name : ''}
          />
          <figcaption className="picture__description">{props.cardData ? props.cardData.name : ''}</figcaption>
        </figure>
        <button type="button" className="popup__close-button"/>
      </div>
    </div>
  )
}

export default ImagePopup;