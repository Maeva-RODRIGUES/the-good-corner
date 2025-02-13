import { CHECK_TOKEN } from "@/requetes/queries/auth.queries";
import { CheckToken } from "@/generated/graphql";
import { useLazyQuery } from "@apollo/client";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type ContextType = {
  infos: {
    email: CheckToken["email"];
  };
  getInfos(): Promise<void>;
  reset(): void;
};
const AuthContext = createContext({} as ContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

function AuthProvider({ children }: Readonly<PropsWithChildren>) {
  const [state, setState] = useState<{ infos: ContextType["infos"] }>(() => {
    const infos = localStorage.getItem("infos");
    if (infos) {
      return { infos: JSON.parse(infos) };
    }
    return {
      infos: { email: "" },
    };
  });
  const [checkToken] = useLazyQuery<CheckToken>(CHECK_TOKEN, {
    fetchPolicy: "no-cache",
  });

  const value: ContextType = {
    infos: state.infos,
    getInfos: async () => {
      await checkToken({
        onCompleted(data) {
          const infos = { email: data.checkToken?.email ?? "" };
          console.log("%c⧭", "color: #f200e2", infos);
          setState({ infos });
          localStorage.setItem("infos", JSON.stringify(infos));
        },
      });
    },
    reset: () => setState({ infos: { email: "" } }),
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
