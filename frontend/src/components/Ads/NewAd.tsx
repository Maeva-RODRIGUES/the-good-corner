import CreateOrEditAdForm from "@/components/Forms/CreateOrEditAdForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createAd } from "@/requests/ads.requests";

function CreateAd() {
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleSubmit = async (formData: FormData) => {
    try {
      await createAd(formData);
      navigate("/");
    } catch (err: any) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      <CreateOrEditAdForm submitCall={handleSubmit} error={error} />
    </div>
  );
}
export default CreateAd;
