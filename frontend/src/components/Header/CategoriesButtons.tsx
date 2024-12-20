import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { LIST_CATEGORIES } from "@/requetes/categories.requests";
import { CategoriesQuery } from "@/generated/graphql";
function CategoriesButtons() {
  const { data } = useQuery<CategoriesQuery>(LIST_CATEGORIES, {
    // onCompleted(data) {
    //   // si je dois travailler avec le retour de l'api je peux le faire avec data ici
    //   console.log("DATA", data);
    // },
    // onError(error) {
    // },
  });
  // const { data } = useCategoriesQuery();

  return (
    <div className="flex gap-5 justify-center mb-5">
      {data?.categories?.map((c) => (
        <Link key={c.id} to={`/categories/${c.id}`}>
          {c.title}
        </Link>
      ))}
    </div>
  );
}

export default CategoriesButtons;
