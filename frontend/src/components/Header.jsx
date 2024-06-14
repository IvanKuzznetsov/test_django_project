import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.head}>
      <Link to="/">
        <img src="/icons/KIDEQ2.svg" alt="logo" height={66} />
      </Link>
      <p>(по клику на лого перейдешь на главную страницу)</p>
    </header>
  );
}

export default Header;
