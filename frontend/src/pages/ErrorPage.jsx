import Substrate from "../components/UI/Substrate";

const ErrorPage = () => {
  return (
    <Substrate>
      <h3>Такая страница об ошибке появляется, когда url указан неверно.</h3>
      <img src="/flick-cat.gif" alt="error gif" />
    </Substrate>
  );
};

export default ErrorPage;
