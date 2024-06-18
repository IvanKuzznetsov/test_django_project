import { Link } from "react-router-dom";
import "../index.css";

function Header() {
  return (
    <header>
      <Link className="header-first-img" to="/">
        <img src="/icons/KIDEQ2.svg" alt="KIDEQ logo" height={66} />
      </Link>
      <Link className="header-second-img" to="/dash">
        <img src="/icons/user-icon.svg" alt="Dashboard logo" height={24} />
      </Link>
    </header>
  );
}

export default Header;
