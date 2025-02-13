import CreateOrEditAdForm from "@/components/Forms/CreateOrEditAdForm";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import {
  CreateAdMutation,
  CreateAdMutationVariables,
} from "@/generated/graphql";
import { CREATE_AD } from "@/requetes/ads.requests";

function CreateAd() {
  const navigate = useNavigate();
  const [createAd, { error }] = useMutation<
    CreateAdMutation,
    CreateAdMutationVariables
  >(CREATE_AD);

  const handleSubmit = async (values: any) => {
    console.log("%c⧭", "color: #8c0038", values);
    // const values = Object.fromEntries(formData) as any;
    createAd({
      variables: { data: values },
      onCompleted: async () => {
        console.log("L'annonce a été créée");
        navigate("/");
      },
    });
  };

  return (
    <div>
      <CreateOrEditAdForm submitCall={handleSubmit} error={error?.message} />
    </div>
  );
}
export default CreateAd;
 