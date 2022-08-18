import "./StatusBar.css";

export default function StatusBar({ status, children }) {
  return <p className={status}>{children}</p>;
}
