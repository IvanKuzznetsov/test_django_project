import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Substrate from "../../components/UI/Substrate";
import Button from "../../components/UI/Button";
import BtnClickLoader from "../../components/UI/BtnClickLoader";
import styles from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  const USER_REGEX = /^[a-zA-Z0-9]{1,15}$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const PWD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { confirmPassword, ...formData } = data;

      setIsPending(true);

      try {
        const response = await fetch("http://127.0.0.1:8000/auth/users/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        setIsPending(false);

        if (response.ok) {
          navigate("/reg/success");
        } else if (response.status === 409) {
          const errorText = await response.json();
          console.error("Conflict error: ", errorText);
          navigate("/reg/user-exists");
        } else {
          const errorText = await response.json();
          console.error("Server error: ", errorText);
          navigate("/reg/err");
        }
      } catch (error) {
        setIsPending(false);
        console.error("Network error: ", error);
        navigate("/reg/err");
      }
    }
  };

  const handleInputChange = (e, name) => {
    const { value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "password" || name === "confirmPassword") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "",
      }));
    }

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "username":
        error = USER_REGEX.test(value)
          ? ""
          : "Только латиница и цифры. Максимальная длина - 15 символов.";
        break;
      case "email":
        error = EMAIL_REGEX.test(value) ? "" : "Некорректная почта.";
        break;
      case "password":
        error = PWD_REGEX.test(value) ? "" : "Я хз какие тут требования.";
        break;
      case "confirmPassword":
        error = value === data.password ? "" : "Пароли не совпадают.";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const { username, email, password, confirmPassword } = data;
    const usernameValid = USER_REGEX.test(username);
    const emailValid = EMAIL_REGEX.test(email);
    const passwordValid = PWD_REGEX.test(password);
    const passwordsMatch = password === confirmPassword;

    setErrors({
      username: usernameValid ? "" : "Некорректное имя пользователя.",
      email: emailValid ? "" : "Некорректная почта.",
      password: passwordValid ? "" : "Некорректный пароль.",
      confirmPassword: passwordsMatch ? "" : "Пароли не совпадают.",
    });

    return usernameValid && emailValid && passwordValid && passwordsMatch;
  };

  return (
    <Substrate width="400px">
      <form onSubmit={handleFormSubmit} className={styles.reg}>
        <h2 className={styles.regH}>Регистрация нового пользователя</h2>
        <label>
          Имя пользователя:
          <input
            type="text"
            value={data.username}
            onChange={(e) => handleInputChange(e, "username")}
            className={`${errors.username ? styles.regInputError : ""} ${
              !errors.username && data.username ? styles.regInputValid : ""
            }`}
            required
          />
          {errors.username && (
            <div className={styles.error}>{errors.username}</div>
          )}
        </label>
        <label>
          Электронная почта:
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleInputChange(e, "email")}
            className={`${errors.email ? styles.regInputError : ""} ${
              !errors.email && data.email ? styles.regInputValid : ""
            }`}
            required
          />
          {errors.email && <div className={styles.error}>{errors.email}</div>}
        </label>
        <label>
          Пароль:
          <input
            type="password"
            value={data.password}
            onChange={(e) => handleInputChange(e, "password")}
            className={`${errors.password ? styles.regInputError : ""} ${
              !errors.password && data.password ? styles.regInputValid : ""
            }`}
            autoComplete="off"
            required
          />
          {errors.password && (
            <div className={styles.error}>{errors.password}</div>
          )}
        </label>
        <label>
          Подтвердите пароль:
          <input
            type="password"
            value={data.confirmPassword}
            onChange={(e) => handleInputChange(e, "confirmPassword")}
            className={`${errors.confirmPassword ? styles.regInputError : ""} ${
              !errors.confirmPassword && data.confirmPassword
                ? styles.regInputValid
                : ""
            }`}
            autoComplete="off"
            required
          />
          {errors.confirmPassword && (
            <div className={styles.error}>{errors.confirmPassword}</div>
          )}
        </label>
        {!isPending ? <Button>Регистрация</Button> : <BtnClickLoader />}
        <p className={styles.alreadyRegistered}>
          Уже зарегистрированы?{"  "}
          <Link to="/auth" className={styles.alreadyRegisteredLink}>
            Вход
          </Link>
        </p>
      </form>
    </Substrate>
  );
};

export default RegistrationPage;
