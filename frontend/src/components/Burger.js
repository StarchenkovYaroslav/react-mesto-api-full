function Burger(props) {
  return (
    <div
      className={`header__burger${props.isActive ? ' header__burger_active' : ''}`}
      onClick={props.onClick}
    >
      <span className="header__burger-span" />
      <span className="header__burger-span" />
      <span className="header__burger-span" />
    </div>
  )
}

export default Burger;