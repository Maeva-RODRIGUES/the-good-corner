import { Link, NavLink } from "react-router-dom";
import logo from "@/assets/store.png";
import routesLink from "@/lib/routes";
import SearchBar from "./SearchBar";
import useAppContext from "@/hooks/useAppContext";
import { useAuth } from "@/context/AuthContext";

const classInfo = {
  active: "text-indigo-600 underline font-bold",
  inactive: "text-slate-600",
};

function NavBar() {
  const { cart } = useAppContext();
  const { infos } = useAuth();

  const calculateTotalElements = () => {
    //si on veut montrer le nombre total d'éléments dans le panier plutôt que la longueur du tableau, on peut faire quelque chose du genre :
    let counter = 0;
    cart.forEach((i) => (counter += i.quantity));
    return counter;
  };
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-start space-x-3 rtl:space-x-reverse flex-col"
          >
            <img src={logo} className="h-8" alt="Flowbite Logo" />
            <span className="self-start text-2xl font-semibold whitespace-nowrap dark:text-white">
              The Good Corner
            </span>
            <span className="self-start text-sm font-semibold whitespace-nowrap dark:text-white">
              {infos?.email && `connecté en tant que ${infos?.email}`}
            </span>
          </Link>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <SearchBar />
          </div>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {routesLink.map((r) => {
                return r.protected && !infos.email ? null : (
                  <NavLink
                    key={r.title}
                    to={r.to}
                    className={({ isActive }) =>
                      `${
                        isActive ? classInfo.active : classInfo.inactive
                      } block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500`
                    }
                  >
                    {r.title}
                  </NavLink>
                );
              })}
            </ul>
            
          </div>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <div className="flex justify-center items-center">
            {!infos?.email && (
            <Link
              to="/auth/login"
              className="px-6 py-2 text-black transition duration-700 ease-out bg-white border border-black rounded-lg hover:bg-black hover:border hover:text-white dark:border-white dark:bg-inherit dark:text-white dark:hover:bg-white dark:hover:text-black"
            >
              Se connecter
            </Link>
          )}
            {infos?.email && (
                <Link
                  to="/auth/logout"
                  className="px-6 py-2 mr-4 text-white transition duration-500 ease-out bg-red-700 rounded-lg hover:bg-red-800 hover:ease-in hover:underline"
                >
                  Se déconnecter
                </Link>
              )}
              <Link to="/cart/checkout">
                <div className="relative py-2">
                  <div className="t-0 absolute left-3">
                    <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                      {/* {cart.length} */}
                      {calculateTotalElements()}
                    </p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="file: mt-4 h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </div>
              </Link>
          
            </div>
          </div>
        </div>
      </nav>
      <div className="flex gap-5"></div>
    </>
  );
}

export default NavBar;
