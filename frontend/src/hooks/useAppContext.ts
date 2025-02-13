import { AppContext } from "@/contexts/AppContext";
import { useContext } from "react";

function useAppContext() {
  const context = useContext(AppContext);

  return context;
}

export default useAppContext;
