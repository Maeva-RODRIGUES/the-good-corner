import defaultPicture from "@/assets/picture.png";
import { Link } from "react-router-dom";
import { ProductType } from "@/types/ads";
function Cardad(props: { data: ProductType }) {
  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link
          to={`/ads/edit/${props.data.id}`}
          className="flex place-content-center"
        >
          <img
            src={
              props.data.picture
                ? `${import.meta.env.VITE_BACKEND_URL_FILES}${
                    props.data.picture
                  }`
                : defaultPicture
            }
            alt="Image"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        </Link>
        <div className="p-5">
          <Link to={`/ads/edit/${props.data.id}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {props.data.title}
            </h5>
          </Link>
          <div>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {props.data.description}
            </p>
            <div className="flex justify-between">
              <p>Créée le {props.data.created_at}</p>
              <p>{props.data.price} €</p>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <Link
              to={`/ads/view/${props.data.id}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Voir l'annonce
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
            <Link
              to={`/ads/edit/${props.data.id}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Editer l'annonce
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cardad;
