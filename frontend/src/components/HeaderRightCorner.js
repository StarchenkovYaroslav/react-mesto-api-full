import {Link, useLocation} from "react-router-dom";
import {useState} from "react";

import {paths} from "../utils/settings";

import Burger from "./Burger";

function HeaderRightCorner(props) {
  const location = useLocation();

  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isBurgerActive, setIsBurgerActive] = useState(false);

  function handleExitButtonClick() {
    props.onSignOut();

    setIsInfoVisible(false);
    setIsBurgerActive(false);
  }

  function handleBurgerClick() {
    setIsInfoVisible(isInfoVisible => !isInfoVisible);
    setIsBurgerActive(isBurgerActive => !isBurgerActive);
  }

  let elementToRender = null;

  if (props.loggedIn) {
    elementToRender = (
      <>
        <div className={`header__info${isInfoVisible ? ' header__info_visible' : ''}`}>
          <span className="header__email">{props.currentUserEmail}</span>
          <button onClick={handleExitButtonClick} className="header__button">Выход</button>
        </div>
        <Burger isActive={isBurgerActive} onClick={handleBurgerClick} />
      </>
    )
  } else if (location.pathname === `/${paths.signUp}`) {
    elementToRender = (<Link to={`/${paths.signIn}`} className="header__link">Войти</Link>);
  } else if (location.pathname === `/${paths.signIn}`) {
    elementToRender = (<Link to={`/${paths.signUp}`} className="header__link">Регистрация</Link>);
  }

  return elementToRender;
}

export default HeaderRightCorner;