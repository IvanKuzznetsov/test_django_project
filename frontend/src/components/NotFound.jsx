import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <p>This page doesn`t exist, check URL</p>
    </div>
  );
}

export default NotFound;
