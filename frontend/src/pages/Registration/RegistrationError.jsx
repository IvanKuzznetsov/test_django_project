import { Link } from "react-router-dom";
import Substrate from "../../components/UI/Substrate";
import Button from "../../components/UI/Button";

const RegistrationError = () => {
  return (
    <Substrate width="400px">
      <h3>Ошибка!</h3>
      <p style={{ marginBottom: 20 + "px" }}>
        Не получилось создать пользователя.
      </p>
      <img
        src="/flick-cat.gif"
        alt="cat meme"
        style={{ marginBottom: 20 + "px" }}
      />
      <Link to="/reg" style={{ width: 50 + "%" }}>
        <Button>Повторить</Button>
      </Link>
      <Link to="/" style={{ width: 50 + "%" }}>
        <Button>На главную</Button>
      </Link>
    </Substrate>
  );
};

export default RegistrationError;
