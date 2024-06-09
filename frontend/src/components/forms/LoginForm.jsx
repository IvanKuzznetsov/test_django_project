import { Link } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { useState } from "react";

function LoginForm() {
  const [data, setData] = useState({
    mail: "",
    password: "",
  });

  const [isPending, setIsPending] = useState(false);
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const [isUnsuccessfull, setIsUnsucessfull] = useState(false);

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(data);

    fetch("http://127.0.0.1:8000/auth/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log("Response OK");
      })
      .catch((error) => {
        console.log("Error appeared:" + error);
      });
  }

  function handleInputChange(event, name) {
    const { value } = event.target;
    setData({ ...data, [name]: value });
  }

  return (
    <form className={styles.loginForm} onSubmit={handleFormSubmit}>
      <p>User login form</p>
      <hr />
      <label>
        Email:
        <input
          type="email"
          value={data.mail}
          onChange={(event) => handleInputChange(event, "mail")}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={data.password}
          onChange={(event) => handleInputChange(event, "password")}
          autoComplete="no"
          required
        />
      </label>
      <div className={styles.forgotPwd}>
        <Link to="/password-reset" className={styles.forgotPwdAnchor}>
          Forgot password?
        </Link>
      </div>
      <button>Login</button>
      <div className={styles.waysToLogin}>
        <p>Or login using:</p>
        <div className={styles.waysToLoginLinks}>
          <img src="icons/vk-icon.svg" alt="vk" width={30} />
          <img src="icons/yandex-icon.svg" alt="ya" width={30} />
          <img src="icons/mail-icon.svg" alt="mail" width={30} />
          <img src="icons/gmail-icon.svg" alt="gmail" width={30} />
        </div>
      </div>
      <div className={styles.notRegistered}>
        Not registered yet?{" "}
        <Link to="/register" className={styles.anchorToRegister}>
          Register
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
