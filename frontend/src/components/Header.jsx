import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.head}>
      <img src="/icons/KIDEQ2.svg" alt="logo" height={66} />
    </header>
  );
}

export default Header;
