import { Link } from "react-router-dom";
import Substrate from "../../components/UI/Substrate";
import Button from "../../components/UI/Button";

const RegistrationSuccess = () => {
  const style = {
    marginBottom: 10,
  };

  return (
    <Substrate width="400px">
      <h3 style={style}>Новый пользователь успешно добавлен!</h3>
      <img src="/dancing-cat.gif" alt="cat meme" />
      <Link to="/" style={{ width: 50 + "%" }}>
        <Button>На главную</Button>
      </Link>
    </Substrate>
  );
};

export default RegistrationSuccess;
