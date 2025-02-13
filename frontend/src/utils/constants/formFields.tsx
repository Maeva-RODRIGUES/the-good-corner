import { HTMLInputTypeAttribute } from "react";
import { ProductKey } from "@/types/ads";

const formFields: {
  name: ProductKey;
  label: string;
  type: Extract<HTMLInputTypeAttribute, "text" | "number" | "file">;
}[] = [
  { name: "title", label: "Titre", type: "text" },
  { name: "description", label: "Description", type: "text" },
  { name: "price", label: "Prix", type: "number" },
  { name: "picture", label: "Image", type: "file" },
  { name: "location", label: "Localisation", type: "text" },
];

export default formFields;
