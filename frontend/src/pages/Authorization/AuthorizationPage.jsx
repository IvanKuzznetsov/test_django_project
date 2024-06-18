import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import Substrate from "../../components/UI/Substrate";
import BtnClickLoader from "../../components/UI/BtnClickLoader";
import styles from "./AuthorizationPage.module.css";

const AuthorizationPage = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e, name) => {
    const { value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setIsPending(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setIsPending(false);

      if (response.ok) {
        navigate("/dash");
      }
    } catch (error) {
      setIsPending(false);
      console.log(error);
      navigate("/auth/err");
    }
  };

  return (
    <Substrate width="400px">
      <form onSubmit={handleFormSubmit} className={styles.auth}>
        <h2 className={styles.authH}>Вход на сайт</h2>
        <label>
          Имя пользователя:
          <input
            type="text"
            value={data.username}
            onChange={(e) => handleInputChange(e, "username")}
            required
          />
        </label>
        <label>
          Пароль:
          <input
            type="password"
            value={data.password}
            onChange={(e) => handleInputChange(e, "password")}
            autoComplete="off"
            required
          />
        </label>
        <p className={styles.authP}>
          <Link to="/auth/reset-password" className={styles.authLink}>
            Забыли пароль?
          </Link>
        </p>
        {!isPending ? <Button>Вход</Button> : <BtnClickLoader />}
        <p className={styles.alreadyAuthed}>
          Нет аккаунта?{"  "}
          <Link to="/reg" className={styles.alreadyAuthedLink}>
            Регистрация
          </Link>
        </p>
      </form>
    </Substrate>
  );
};

export default AuthorizationPage;
