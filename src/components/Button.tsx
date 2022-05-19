import "./Button.css";

export default function Button({ children, color = "", ...props }) {
  return (
    <button style={{ "--color": color } as any} {...props}>
      {children}
    </button>
  );
}
