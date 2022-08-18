import "./Form.css";

export default function Form({ children, ...props }) {
  return (
    <form className="Form" {...props}>
      {children}
    </form>
  );
}
