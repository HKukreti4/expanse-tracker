type buttonProps = {
  className: string;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  props?: {
    [key: string]: string | number | undefined | boolean | null;
  };
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
const Button = ({
  children,
  className = "",
  type = "button",
  props,
  onClick,
}: buttonProps) => {
  return (
    <button
      type={type}
      className={`${className} bg-primary-500 cursor-pointer   `}
      {...props}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
