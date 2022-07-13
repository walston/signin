import "./Button.css";

export default function Button({ children, color = "", ...props }) {
  if (props.type === "submit") {
    return (
      <input value={children} style={{ "--color": color } as any} {...props} />
    );
  }
  return (
    <button style={{ "--color": color } as any} {...props}>
      {children}
    </button>
  );
}
