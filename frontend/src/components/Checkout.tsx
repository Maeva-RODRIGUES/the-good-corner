import useAppContext from "@/hooks/useAppContext";
import defaultPicture from "@/assets/picture.png";
import { GET_INFOS_FOR_CHECKOUTS } from "@/requetes/ads.requests";
import {
  GetInfosForCheckoutQuery,
  GetInfosForCheckoutQueryVariables,
} from "@/generated/graphql";
import { useQuery } from "@apollo/client";
import { formatAmount } from "@/lib/utilities";
import { useEffect, useState } from "react";

function Checkout() {
  const { cart, addToCart, removeFromCart } = useAppContext();
  const [amounts, setAmounts] = useState({ subTotal: 0, total: 0, TVA: 0 });

  const { data, loading } = useQuery<
    GetInfosForCheckoutQuery,
    GetInfosForCheckoutQueryVariables
  >(GET_INFOS_FOR_CHECKOUTS, {
    variables: { ids: cart.map((i) => i.adId) },
    onError(error) {
      console.log("ERROR", error);
    },
  });

  const calculateItemPrice = (id: string, price: number) => {
    let totalItemPrice = 0;
    const item = cart.find((i) => i.adId === id);

    if (item) {
      totalItemPrice = item.quantity * price;
    }

    return formatAmount(totalItemPrice);
  };

  const calculateSubTotal = () => {
    let subTotal = 0;
    cart.forEach((item) => {
      const itemFromBack = data?.getInfosForCheckout?.find(
        (i) => i.id === item.adId
      );
      if (itemFromBack) {
        subTotal += itemFromBack.price * item.quantity;
      }
    });
    const TVA = subTotal * 0.2;
    setAmounts({ subTotal, total: TVA + subTotal, TVA });
  };

  const getQuantity = (id: string) => {
    return cart.find((i) => i.adId === id)?.quantity;
  };

  const handleChangeQuantity = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: number
  ) => {
    event.preventDefault();
    const id = event.currentTarget.dataset.itemid;
    if (id) {
      if (value > 0) {
        addToCart(id);
      } else {
        removeFromCart(id);
      }
    }
  };

  useEffect(() => {
    if (cart.length > 0) {
      calculateSubTotal();
    }
  }, [cart, data]);

  if (loading) {
    return <h1>Veuillez patienter...</h1>;
  }

  if (cart.length === 0) {
    return <h1>C'est bien vide ici, ajoutez des produits au panier 😎</h1>;
  }

  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto bg-white p-12">
        <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-cyan-700">
          Détails du panier
        </h2>
        <div className="hidden lg:grid grid-cols-2 py-6">
          <div className="font-normal text-xl leading-8 text-gray-500">
            Produit
          </div>
          <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
            <span className="w-full max-w-[200px] text-center">
              Prix unitaire
            </span>
            <span className="w-full max-w-[260px] text-center">Quantité</span>
            <span className="w-full max-w-[200px] text-center">Total</span>
          </p>
        </div>

        {data?.getInfosForCheckout?.map((i) => (
          <div
            key={i.id}
            className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6"
          >
            <div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
              <div className="img-box">
                <img
                  src={
                    i.picture
                      ? `${import.meta.env.VITE_BACKEND_URL_FILES}${i.picture}`
                      : defaultPicture
                  }
                  alt="perfume bottle image"
                  className="xl:w-[140px] rounded-xl object-cover"
                />
              </div>
              <div className="pro-data w-full max-w-sm ">
                <h5 className="font-semibold text-xl leading-8 text-cyan-700 max-[550px]:text-center">
                  {i.title}
                </h5>
                <p className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                  {i.description ?? "Aucune description"}
                </p>
              </div>
            </div>
            <div className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
              <h6 className="font-manrope font-bold text-2xl leading-9 text-cyan-700 w-full max-w-[176px] text-center">
                {formatAmount(i.price)}
                <span className="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap"></span>
              </h6>
              <div className="flex items-center w-full mx-auto justify-center">
                <button
                  className="group rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-cyan-400"
                  data-itemid={i.id}
                  onClick={(e) => handleChangeQuantity(e, -1)}
                >
                  <svg
                    className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M16.5 11H5.5"
                      stroke=""
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M16.5 11H5.5"
                      stroke=""
                      strokeOpacity="0.2"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M16.5 11H5.5"
                      stroke=""
                      strokeOpacity="0.2"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  className="border-y border-gray-200 outline-none font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent text-cyan-400"
                  value={getQuantity(i.id)}
                  readOnly
                />
                <button
                  className="group rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-cyan-400"
                  data-itemid={i.id}
                  onClick={(e) => handleChangeQuantity(e, 1)}
                >
                  <svg
                    className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M11 5.5V16.5M16.5 11H5.5"
                      stroke=""
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M11 5.5V16.5M16.5 11H5.5"
                      stroke=""
                      strokeOpacity="0.2"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M11 5.5V16.5M16.5 11H5.5"
                      stroke=""
                      strokeOpacity="0.2"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
              <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
                {calculateItemPrice(i.id, i.price)}
              </h6>
            </div>
          </div>
        ))}
        <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
          <div className="flex items-center justify-between w-full mb-6">
            <p className="font-normal text-xl leading-8 text-gray-400">
              Sous total
            </p>
            <h6 className="font-semibold text-xl leading-8 text-gray-900">
              {formatAmount(amounts.subTotal)}
            </h6>
          </div>
          <div className="flex items-center justify-between w-full mb-6">
            <p className="font-normal text-xl leading-8 text-gray-400">TVA</p>
            <h6 className="font-semibold text-xl leading-8 text-gray-900">
              {formatAmount(amounts.TVA)}
            </h6>
          </div>
          <div className="flex items-center justify-between w-full py-6">
            <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">
              Total TTC
            </p>
            <h6 className="font-manrope font-medium text-2xl leading-9 text-indigo-500">
              {formatAmount(amounts.total)}
            </h6>
          </div>
        </div>
        <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
          <button className="rounded-full py-4 w-full max-w-[280px] flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
            <span className="px-2 font-semibold text-lg leading-8 text-indigo-600">
              Ajouter un code promo
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998"
                stroke="#4F46E5"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700">
            Procéder au paiement
            <svg
              className="ml-2"
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="22"
              viewBox="0 0 23 22"
              fill="none"
            >
              <path
                d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Checkout;