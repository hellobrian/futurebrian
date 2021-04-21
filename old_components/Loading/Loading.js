import styles from "./Loading.module.css";

export function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 800,
        height: 800,
      }}
    >
      <svg
        className={styles.Loading}
        style={{ width: 48, height: 48 }}
        viewBox="0 0 300 100"
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
      >
        <circle cx="50" cy="50" r="50" />
      </svg>
    </div>
  );
}
