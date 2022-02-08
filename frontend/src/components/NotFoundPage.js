import {Link} from "react-router-dom";


function NotFoundPage() {
  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <Link to="/" className="not-found__link">На главную</Link>
    </div>
  )
}

export default NotFoundPage;