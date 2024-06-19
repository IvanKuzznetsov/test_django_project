import { useState, useEffect } from "react";
import Substrate from "../components/UI/Substrate";

const Dashboard = () => {
  const [userData, setUserData] = useState({ username: "", email: "" });

  const getUserDataFromServer = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("нет токена и вообще ниче не понимаю");
      return;
    }

    const response = await fetch("http://127.0.0.1:8000/auth/users/me/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (response.ok) {
      const userData = await response.json();
      setUserData(userData);
    } else {
      console.error("Failed to fetch user data");
    }
  };

  useEffect(() => {
    getUserDataFromServer();
  }, []);

  return (
    <Substrate width="300px">
      <h3>
        Имя пользователя:{" "}
        <p style={{ fontSize: 16 + "px", color: "green" }}>
          {userData.username}
        </p>
      </h3>
      <h3>
        Почта:{" "}
        <p style={{ fontSize: 16 + "px", color: "green" }}>{userData.email}</p>
      </h3>
    </Substrate>
  );
};

export default Dashboard;
