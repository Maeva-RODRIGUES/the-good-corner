import { CategoryType } from "@/types/categories";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import { categoriesList } from "@/requests/categories.requests";

function CategoriesButtons() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const getCategories = async () => {
    try {
      // const data = await categoriesList();
      // if (data.success) {
      //   setCategories(data.result);
      // }
    } catch (err: any) {
      console.log({ err });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="flex gap-5 justify-center mb-5">
      {categories.map((c) => (
        <Link key={c.id} to={`/categories/${c.id}`}>
          {c.title}
        </Link>
      ))}
    </div>
  );
}

export default CategoriesButtons;
