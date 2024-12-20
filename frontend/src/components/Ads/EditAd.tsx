import CreateOrEditAdForm from "@/components/Forms/CreateOrEditAdForm";
import {
  FindAdForUpdateQuery,
  FindAdForUpdateQueryVariables,
  UpdateAdMutation,
  UpdateAdMutationVariables,
} from "@/generated/graphql";

import { FIND_AD_BY_ID_FOR_UPDATE, UPDATE_AD } from "@/requetes/ads.requests";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditAd() {
  const params = useParams();
  const navigate = useNavigate();
  const [updateAd, { error: errorUpdate, loading: loadingUpdate }] =
    useMutation<UpdateAdMutation, UpdateAdMutationVariables>(UPDATE_AD);
  // const [initialData, setInitialData] = useState({});
  const { data, loading, error } = useQuery<
    FindAdForUpdateQuery,
    FindAdForUpdateQueryVariables
  >(FIND_AD_BY_ID_FOR_UPDATE, {
    variables: { findAdId: params.id! },
    skip: params.id === undefined,
    // onCompleted(data) {
    //   const {category, ...other} = data.findAd!;
    //     setInitialData({...other, categoryId: category?.id })
    // },
  });

  const handleSubmit = async (values: any) => {
    try {
      await updateAd({
        variables: { data: { ...values, id: params.id } },
        onCompleted(data) {
          console.log("data", data);
          console.log("Tout s'est bien passé");
        },
      });
      navigate("/");
    } catch (err: any) {
      console.log(err);
    }
  };

  const getInitialData = () => {
    const { category, tags, ...other } = data?.findAd!; //comme pour category, on retire tags de l'objet pour ne pas l'envoyer dans l'état initial
    return {
      ...other,
      categoryId: data?.findAd?.category?.id,
      tagsInfos: data?.findAd?.tags?.map((t) => ({ // tagsInfos c'est pour préremplir le select dans le cas de l'édition
        value: t.id,
        label: t.label,
      })),
      tagsIds: data?.findAd?.tags?.map((t) => t.id), // la valeur initial pour le tableau de tags (côté back on attend un tableau de tagsIds)
    };
  };
  return (
    <div>
      {data?.findAd ? (
        <CreateOrEditAdForm
          // loading={loading || loadingUpdate}
          initialData={getInitialData()}
          submitCall={handleSubmit}
          error={error || errorUpdate}
        />
      ) : (
        <div>Cette annonce n'existe pas</div>
      )}
      {/* <form onSubmit={handleSubmit}>
        <select
          name="categoryId"
          required
          onChange={handleChange}
          value={data.categoryId}
        >
          <option>Choisir une catégorie</option>
          {categories?.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            );
          })}
        </select>

        {formFields.map((field) => (
          <label key={field.label} style={{ display: "flex" }}>
            {field.name}:
            <input
              type={field.type}
              name={field.name}
              onChange={handleChange}
              value={field.name === "picture" ? "" : data[field.name]}
            />
          </label>
        ))}
        <button type="submit">Soumettre</button>
      </form> */}
    </div>
  );
}
export default EditAd;
