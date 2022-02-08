import successImage from '../images/icons/server_success.svg';
import errorImage from '../images/icons/server_error.svg';

function InfoTooltip(props) {
  const imageUrl = props.success ? successImage : errorImage;

  return (
    <div
      className={`popup popup_content${props.isOpened ? ' popup_opened' : ''}`}
      onMouseDown={props.onMouseDown}
    >
      <div className="popup__container popup__container_content_info">
        <img className="popup__info-image" src={imageUrl} alt="icon"/>
        <p className="popup__info-message">{props.message}</p>
        <button type="button" className="popup__close-button"/>
      </div>
    </div>
  )
}

export default InfoTooltip;