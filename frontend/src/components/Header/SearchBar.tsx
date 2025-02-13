import { SearchAdQuery, SearchAdQueryVariables } from "@/generated/graphql";
import { SEARCH_AD } from "@/requetes/ads.requests";
import { useLazyQuery } from "@apollo/client";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SearchBar() {
  const [search, { loading, data }] = useLazyQuery<
    SearchAdQuery,
    SearchAdQueryVariables
  >(SEARCH_AD);
  const [inputValue, setInputValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };
  const handleClear = () => {
    setInputValue("");
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue.length >= 3) {
        clearTimeout(handler);
        console.log("Lancement de la requête");
        search({ variables: { search: { text: inputValue } } });
      }
    }, 1000);

    return () => clearTimeout(handler);//cleanup
  }, [inputValue]);

  return (
    <div className="max-w-md mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 min-w-96"
          placeholder="Rechercher une annonce..."
          onChange={handleChange}
          value={inputValue}
          required
        />
        {inputValue.length > 0 && (
          <button
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleClear}
          >
            <svg
              fill="#000000"
              height="15px"
              width="15px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <g>
                  <polygon
                    points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 
			512,452.922 315.076,256 		"
                  />
                </g>
              </g>
            </svg>
          </button>
        )}
        {inputValue.length > 2 && (
          <div className="bg-slate-900 absolute w-full h-auto flex">
            <div>
              {!loading && data?.searchAd?.length === 0 ? (
                <div>Aucun résultat</div>
              ) : loading ? (
                <p>Recherche en cours</p>
              ) : (
                <>
                  {data?.searchAd &&
                    data.searchAd.map((r) => (
                      <Fragment key={r?.categoryId}>
                        <div>{r?.categoryTitle}</div>
                        <div className="flex flex-col ml-12">
                          {r?.ads?.map((a) => (
                            <Link key={a.id} to={`/ads/view/${a.id}`}>
                              {a.title}
                            </Link>
                          ))}
                        </div>
                      </Fragment>
                    ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
