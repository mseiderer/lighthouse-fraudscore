import "./Form.css";

export const Button = (props) => {
  /*
  TODO:
  Hover states
  Focus states
  Variants (primary/secondary).
  */
  return (
    <input
      className='btn'
      type='button'
      value={props.children}
      onClick={props.onClick}
    />
  );
};
