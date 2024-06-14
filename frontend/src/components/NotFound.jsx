import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <p>Такой страницы не существует, проверь URL</p>
      <img src="/flick-cat.gif" alt="error image" />
    </div>
  );
}

export default NotFound;
