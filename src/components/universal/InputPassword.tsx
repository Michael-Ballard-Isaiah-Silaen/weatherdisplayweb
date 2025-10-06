import { twMerge } from "tailwind-merge";

const InputPassword = ({
  name,
  className,
  placeholder,
  onChange,
  value,
  id,
}: {
  name: string;
  className?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  id?: string;
}) => {
  return (
    <input
      type="password"
      autoComplete="new-password"
      name={name}
      id={id || name}
      placeholder={placeholder || name}
      value={value}
      onChange={onChange}
      className={twMerge("w-full rounded-md border-[1px] px-2 py-1", className)}
    />
  );
};

export default InputPassword;
