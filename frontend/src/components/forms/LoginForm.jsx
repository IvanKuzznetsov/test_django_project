import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LoginForm.module.css";

function LoginForm() {
  const [data, setData] = useState({
    mail: "",
    password: "",
  });

  const [isPending, setIsPending] = useState(false);

  function handleFormSubmit(event) {
    event.preventDefault();

    setIsPending(true);

    fetch("http://127.0.0.1:8000/auth/token/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        setIsPending(false);
        console.log(data);
        console.log(response);
      })
      .catch((error) => {
        setIsPending(false);
        console.log(error);
      });
  }

  function handleInputChange(event, name) {
    setData({ ...data, [name]: event.target.value });
  }

  return (
    <form className={styles.loginForm} onSubmit={handleFormSubmit}>
      <p>Вход на сайт</p>
      <hr />
      <label>
        Электронная почта:
        <input
          type="email"
          value={data.mail}
          onChange={(event) => handleInputChange(event, "mail")}
          required
        />
      </label>
      <label>
        Пароль:
        <input
          type="password"
          value={data.password}
          onChange={(event) => handleInputChange(event, "password")}
          autoComplete="no"
          required
        />
      </label>
      <div className={styles.forgotPwd}>
        <Link to="*" className={styles.forgotPwdAnchor}>
          Забыли пароль?
        </Link>
      </div>
      {!isPending && <button>Вход</button>}
      {isPending && <div className={styles.loader}></div>}

      <div className={styles.waysToLogin}>
        <p>Или войдите используя:</p>
        <div className={styles.waysToLoginLinks}>
          <Link to="*">
            <img src="icons/vk-icon.svg" alt="vk" width={30} />
          </Link>
          <Link to="*">
            <img src="icons/yandex-icon.svg" alt="ya" width={30} />
          </Link>
          <Link to="*">
            <img src="icons/mail-icon.svg" alt="mail" width={30} />
          </Link>
          <Link to="*">
            <img src="icons/gmail-icon.svg" alt="gmail" width={30} />
          </Link>
        </div>
      </div>
      <div className={styles.notRegistered}>
        Еще не зарегистрированы?{" "}
        <Link to="/register" className={styles.anchorToRegister}>
          Регистрация
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
