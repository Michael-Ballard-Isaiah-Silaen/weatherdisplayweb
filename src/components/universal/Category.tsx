import { twMerge } from "tailwind-merge";

interface CategoryProps {
  category: string;
}

const Category = ({ category }: CategoryProps) => {
  return (
    <div
      className={twMerge(
        "w-fit rounded-full bg-violet-200 px-2 text-violet-600",
      )}
    >
      {category}
    </div>
  );
};

export default Category;
