import {Link} from "react-router-dom";

import logo from "../images/logo.svg";

import HeaderRightCorner from "./HeaderRightCorner";
import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function Header(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className={`header${props.loggedIn ? ' header_authorized' : ''}`}>
      <Link to="/" className={`header__logo${props.loggedIn ? ' header__logo_authorized' : ''}`}>
        <img
          src={logo}
          alt="Логотип Место"
          className="header__logo-image"
        />
      </Link>
      <HeaderRightCorner
        loggedIn={props.loggedIn}
        currentUserEmail={currentUser.email}
        onSignOut={props.onSignOut}
      />
    </header>
  )
}

export default Header;