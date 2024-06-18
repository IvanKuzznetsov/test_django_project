import styles from "./Substrate.module.css";

const Substrate = (props) => {
  const { width = "50%", children } = props;
  const substrateStyle = {
    maxWidth: width,
  };

  return (
    <div className={styles.substrate} style={substrateStyle}>
      {children}
    </div>
  );
};

export default Substrate;
