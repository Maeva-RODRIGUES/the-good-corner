import formFields from "@/utils/constants/formFields";
import instance from "@/lib/instance";
import { AdCreateFormInfos } from "@/types/ads";
import { ApiResponse } from "@/types/common";
import { CategoryType } from "@/types/categories";
import { useEffect, useState } from "react";
import { categoriesList } from "@/requests/categories.requests";

function CreateOrEditAdForm({ initialData, submitCall, error }: any) {
  const [categories, setCategories] = useState<CategoryType[]>();
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<AdCreateFormInfos>(
    initialData || {
      title: "",
      description: "",
      price: 0,
      picture: "",
      location: "",
      categoryId: "",
    }
  );

  const getCategories = async () => {
    try {
      const data = await categoriesList();
      if (data.success) {
        setCategories(data.result);
      }
    } catch (err: any) {
      console.log({ err });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append("picture", file);
    }
    console.log("%c⧭", "color: #735656", data);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("location", data.location);
    formData.append("categoryId", data.categoryId);
    try {
      submitCall(formData);
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="categoryId"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Catégorie
          </label>
          <select
            name="categoryId"
            required
            onChange={handleChange}
            value={data.categoryId}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        </div>
        {formFields.map((field) => (
          <div className="mb-3">
            <label
              key={field.label}
              style={{ display: "flex" }}
              htmlFor={field.name}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {field.label}:
            </label>
            <input
              type={field.type}
              name={field.name}
              onChange={(e) =>
                field.type === "file" ? handleFileChange(e) : handleChange(e)
              }
              value={
                field.type === "file" &&
                data[field.name] === initialData?.picture
                  ? ""
                  : data[field.name]
              }
              {...(field.type === "file" ? { accept: "image/*" } : {})}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        ))}
        <div className="flex justify-center flex-col items-center">
          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Prévisualisation
          </p>
          {preview ? (
            <img
              src={preview}
              alt="Prévisualisation"
              style={{ maxWidth: "300px", maxHeight: "300px" }}
            />
          ) : (
            <div>Aucune image sélectionnée pour l'instant</div>
          )}
        </div>

        <button type="submit">Soumettre</button>
      </form>
      {error}
    </div>
  );
}
export default CreateOrEditAdForm;
