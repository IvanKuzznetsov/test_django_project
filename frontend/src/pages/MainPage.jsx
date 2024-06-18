import Substrate from "../components/UI/Substrate";
import Button from "../components/UI/Button";
import { Link } from "react-router-dom";

const MainPage = () => {
  const linkWidth = {
    minWidth: "40%",
  };
  return (
    <Substrate width="40%">
      <h1>Главная</h1>
      <p>
        Это просто корневая страница, которая как бы в реальном проекте будет
        являться лендингом и с которой будет осуществляться вся остальная
        навигация по сайту. Так как реакт предполагет создание одностраничных
        приложений, то вся навигация получилась за мной в этом же файле. По
        ссылкам ниже можно тыкать и двигаться по приложению. Также внутри каждой
        "странички" есть еще кликабельные ссылки, которые тоже куда-то ведут.
      </p>
      <Link to="/reg" style={linkWidth}>
        <Button>Регистрация</Button>
      </Link>
      <Link to="/auth" style={linkWidth}>
        <Button>Авторизация</Button>
      </Link>
    </Substrate>
  );
};

export default MainPage;
