const RegistrationUserExists = () => {
  const style = {
    marginBottom: 20,
  };

  return (
    <Substrate width="400px">
      <h3>Ошибка!</h3>
      <p style={style}>
        Такое имя пользователя уже существует, попробуйте другое.
      </p>
      <img src="/flick-cat.gif" alt="cat meme" style={style} />
      <Link to="/reg" style={{ width: 50 + "%" }}>
        <Button>Повторить</Button>
      </Link>
      <Link to="/" style={{ width: 50 + "%" }}>
        <Button>На главную</Button>
      </Link>
    </Substrate>
  );
};

export default RegistrationUserExists;
