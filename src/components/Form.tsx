import "./Form.css";

export default function Form({ children, ...props }) {
  return <form {...props}>{children}</form>;
}
