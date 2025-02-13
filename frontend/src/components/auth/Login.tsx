import { useAuth } from "@/context/AuthContext";
import { LOGIN } from "@/requetes/queries/auth.queries";
import {
  InputLogin,
  LoginQuery,
  LoginQueryVariables,
} from "@/generated/graphql";
import { useLazyQuery } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const { getInfos } = useAuth();

  const [login, { data, error }] = useLazyQuery<
    LoginQuery,
    LoginQueryVariables
  >(LOGIN, {
    fetchPolicy: "no-cache",
    async onCompleted(data) {
      const initialRoute = location.state?.initialRoute;
      await getInfos();
      if (data.login.success && initialRoute) {
        navigate(initialRoute);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData)
    if (data.email && data.password) {
      login({
        variables: {
          infos: {
            email: data.email as InputLogin["email"],
            password: data.password as InputLogin["password"],
            rememberMe: data.rememberMe === "on",
          },
        },
      });
    }
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <form onSubmit={handleSubmit}>
        <h1 className="mb-5">Connexion</h1>
        <div>
          <input type="text" name="email" placeholder="Indiquez votre email" />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Indiquez votre mot de passe"
          />
        </div>
        <input type="submit" />
        <div>
          <span className="text-red-500">{error?.message}</span>
          {data?.login.success ? (
            <span className="text-blue-500">{data?.login?.message}</span>
          ) : (
            <span className="text-red-500">{data?.login?.message}</span>
          )}
        </div>
        <div className="flex items-center mb-4">
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="rememberMe"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Se souvenir de moi
          </label>
        </div>
      </form>
    </main>
  );
}

export default Login;
