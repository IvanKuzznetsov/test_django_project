import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeZagolovok}>Главная</h1>
      <p>
        Это просто корневая страница, которая как бы в реальном проекте будет
        являться лендингом и с которой будет осуществляться вся остальная
        навигация по сайту. Так как реакт предполагет создание одностраничных
        приложений, то вся навигация получилась за мной в этом же файле. По
        ссылкам ниже можно тыкать и двигаться по приложению. Также внутри каждой
        "странички" есть еще кликабельные ссылки, которые тоже куда-то ведут.
      </p>
      <div className={styles.homeBtnContainer}>
        <button>
          <Link to="/register">Регистрация пользователя</Link>
        </button>
        <button>
          <Link to="/login">Вход на сайт</Link>
        </button>
      </div>
    </div>
  );
}

export default HomePage;
