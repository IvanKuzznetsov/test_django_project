import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import Substrate from "../../components/UI/Substrate";
import BtnClickLoader from "../../components/UI/BtnClickLoader";
import styles from "./AuthorizationPage.module.css";

// возможно стоит валидацию простую добавить и возможность входа по почте
const AuthorizationPage = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [isPending, setIsPending] = useState(false);
  const [serverErrors, setServerErrors] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (e, name) => {
    const { value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setIsPending(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/token/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      setIsPending(false);

      if (!response.ok) {
        setServerErrors(responseData);
      } else {
        const token = responseData.auth_token;
        localStorage.setItem("authToken", token);
        setServerErrors({});
        navigate("/dash");
      }
    } catch (error) {
      setIsPending(false);
      navigate("/auth/err");
    }
  };

  return (
    <Substrate width="400px">
      <form onSubmit={handleFormSubmit} className={styles.auth}>
        <h2 className={styles.authH}>Вход на сайт</h2>
        {Object.keys(serverErrors).map((key) =>
          Array.isArray(serverErrors[key]) ? (
            serverErrors[key].map((message, index) => (
              <p
                key={key + index}
                style={{
                  fontSize: 12 + "px",
                  color: "red",
                  marginTop: 20 + "px",
                  marginBottom: 0 + "px",
                }}
              >
                {message}
              </p>
            ))
          ) : (
            <p
              key={key}
              style={{
                fontSize: 12 + "px",
                color: "red",
                marginTop: 20 + "px",
                marginBottom: 0 + "px",
              }}
            >
              {serverErrors[key]}
            </p>
          )
        )}
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
