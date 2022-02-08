import {Navigate} from "react-router-dom";

import {paths} from "../utils/settings";


function ProtectedRoute({component: Component, ...props}) {
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to={`/${paths.signIn}`} />
  )
}

export default ProtectedRoute;