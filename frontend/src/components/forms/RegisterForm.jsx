import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./RegisterForm.module.css";

function RegisterForm() {
  const NAME_REGEX = /^[А-ЯЁ][а-яё]{1,}$/;
  const SURNAME_REGEX = /^[А-ЯЁ][а-яё]{1,}$/;
  const PHONE_REGEX = /^\+7\d{10}$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const PWD_REGEX =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;

  const [data, setData] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isPending, setIsPending] = useState(false);
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const [isUnsuccessfull, setIsUnsucessfull] = useState(false);

  function handleFormSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      const { confirmPassword, ...formData } = data;

      setIsPending(true);

      // url от бэка - http://127.0.0.1:8000/auth/users

      fetch("http://127.0.0.1:8000/auth/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          setIsPending(false);
          if (response.ok) {
            setIsSuccessfull(true);
          } else {
            setIsUnsucessfull(true);
          }
        })
        .catch((error) => {
          setIsPending(false);
          setIsUnsucessfull(true);
          console.log(error);
        });
    }
  }

  function handleInputChange(e, name) {
    const { value } = e.target;
    setData({ ...data, [name]: value });
    validateField(name, value);
  }

  function handlePhoneChange(e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.startsWith("8")) {
      value = "7" + value.slice(1);
    }
    if (!value.startsWith("7")) {
      value = "7" + value;
    }
    value = "+7" + value.slice(1);
    if (value.length > 12) {
      value = value.slice(0, 12);
    }
    setData({ ...data, phone: value });
    validateField("phone", value);
  }

  function validateField(name, value) {
    let error = "";
    switch (name) {
      case "name":
        if (!NAME_REGEX.test(value)) {
          error =
            "Некорректный ввод. Только кириллица, первая буква должна быть заглавной, остальные строчными.";
        }
        break;
      case "surname":
        if (!SURNAME_REGEX.test(value)) {
          error =
            "Некорректный ввод. Только кириллица, первая буква должна быть заглавной, остальные строчными.";
        }
        break;
      case "phone":
        if (!PHONE_REGEX.test(value)) {
          error =
            "Некорректный ввод. Номер должен начинаться с +7, далее ваш номер, всего 11 цифр";
        }
        break;
      case "email":
        if (!EMAIL_REGEX.test(value)) {
          error = "Некорректный адрес электронной почты.";
        }
        break;
      case "password":
        if (!PWD_REGEX.test(value)) {
          error =
            "Длина пароля - минимум 6 символов. Должен содержать одну заглавную букву, одну строчную, а также символ.Только латиница.";
        }
        break;
      case "confirmPassword":
        if (value !== data.password) {
          error = "Пароли не совпадают.";
        }
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: error });
  }

  function validateForm() {
    const { name, phone, email, surname, password, confirmPassword } = data;
    const nameValid = NAME_REGEX.test(name);
    const surnameValid = SURNAME_REGEX.test(surname);
    const phoneValid = PHONE_REGEX.test(phone);
    const emailValid = EMAIL_REGEX.test(email);
    const passwordValid = PWD_REGEX.test(password);
    const passwordsMatch = password === confirmPassword;

    setErrors({
      name: nameValid ? "" : "Некорректное имя.",
      surname: surnameValid ? "" : "Некорректная фамилия.",
      phone: phoneValid ? "" : "Некорректный номер телефона.",
      email: emailValid ? "" : "Некорректный адрес электронной почты.",
      password: passwordValid ? "" : "Некорректный пароль.",
      confirmPassword: passwordsMatch ? "" : "Пароли не совпадают.",
    });

    return (
      nameValid &&
      surnameValid &&
      phoneValid &&
      emailValid &&
      passwordValid &&
      passwordsMatch
    );
  }

  return (
    <div>
      {!isSuccessfull && !isUnsuccessfull ? (
        <form className={styles.regForm} onSubmit={handleFormSubmit}>
          <p>Регистрация нового пользователя</p>
          <hr />
          <label>
            Имя:
            <input
              type="text"
              value={data.name}
              onChange={(e) => handleInputChange(e, "name")}
              required
            />
            {errors.name && <div className={styles.error}>{errors.name}</div>}
          </label>
          <label>
            Фамилия:
            <input
              type="text"
              value={data.surname}
              onChange={(e) => handleInputChange(e, "surname")}
              required
            />
            {errors.surname && (
              <div className={styles.error}>{errors.surname}</div>
            )}
          </label>
          <label>
            Номер телефона:
            <input
              type="tel"
              value={data.phone}
              onChange={handlePhoneChange}
              required
            />
            {errors.phone && <div className={styles.error}>{errors.phone}</div>}
          </label>
          <label>
            Электронная почта:
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleInputChange(e, "email")}
              required
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </label>
          <label>
            Придумайте пароль:
            <input
              type="password"
              value={data.password}
              onChange={(e) => handleInputChange(e, "password")}
              autoComplete="off"
              required
            />
            {errors.password && (
              <div className={styles.error}>{errors.password}</div>
            )}
          </label>
          <label>
            Повторите пароль:
            <input
              type="password"
              value={data.confirmPassword}
              onChange={(e) => handleInputChange(e, "confirmPassword")}
              autoComplete="off"
              required
            />
            {errors.confirmPassword && (
              <div className={styles.error}>{errors.confirmPassword}</div>
            )}
          </label>
          {!isPending && <button type="submit">Регистрация</button>}
          {isPending && <div className={styles.loader}></div>}
          <div className={styles.alreadyRegistered}>
            Уже зарегистрированы?{" "}
            <Link to="/login" className={styles.anchorToLogin}>
              Вход
            </Link>
          </div>
        </form>
      ) : isSuccessfull ? (
        <div className={styles.successMessage}>
          <p>Новый пользователь успешно добавлен!</p>
          <img src="./dancing-cat.gif" alt="" width={100} />
        </div>
      ) : (
        <div className={styles.errorMessage}>
          <p>
            Ошибка! <br />
            Попробуйте заново :(
          </p>
          <img src="./sad-cat.gif" alt="sad cat gif" width={200} />
        </div>
      )}
    </div>
  );
}

export default RegisterForm;
