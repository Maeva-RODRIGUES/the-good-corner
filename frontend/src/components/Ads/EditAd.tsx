import CreateOrEditAdForm from "@/components/Forms/CreateOrEditAdForm";
import { findAd, updateAd } from "@/requests/ads.requests";
import { AdCreateFormInfos } from "@/types/ads";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditAd() {
  const params = useParams();
  const navigate = useNavigate();
  // const [categories, setCategories] = useState<CategoryType[]>();
  const [initialData, setInitialData] = useState<AdCreateFormInfos>();
  const [error, setError] = useState();

  const getAd = async () => {
    try {
      const data = await findAd(params.id!);
      if (data.success) {
        const { category, ...adData } = data.result;
        setInitialData({ ...adData, categoryId: category.id });
      }
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };

  useEffect(() => {
    getAd();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    try {
      await updateAd(params.id!, formData);
      navigate("/");
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div>
      {initialData ? (
        <CreateOrEditAdForm
          initialData={initialData}
          submitCall={handleSubmit}
          error={error}
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
