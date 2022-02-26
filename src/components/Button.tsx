import "./Button.css";

export default function Button({ children, color = "", ...props }) {
  return (
    <button type="submit" style={{ "--color": color } as any} {...props}>
      {children}
    </button>
  );
}
