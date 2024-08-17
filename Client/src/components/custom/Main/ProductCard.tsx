import { useCart } from "@/context/useCart";
import EmptyStar from "../../../assets/star.png";
import FilledStar from "../../../assets/starfill.png";
import React from "react";


interface ProductCardProps {
  details: {
    id: number;
    title: string;
    price: number;
    rating: {
      rate: number;
    };
    image: string;
  };
}


const ProductCard:React.FC<ProductCardProps> = ({ details }) =>{

  const ratecount = details.rating.rate;
  const rate = [...Array(parseInt(ratecount)).keys()];

 const {handleAddToCart, cart} = useCart();
//  console.log(cart);

 const onClick  = () => {
    handleAddToCart(details); 
  }

  return (
    <>
      <div
        className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md text-justify hover:shadow-xl"
        key={details.id}
      >
        <a
          className=" relative mx-3 mt-3 flex justify-center h-60 overflow-hidden rounded-xl"
          href="#"
        >
          <img
            className="object-cover"
            src={details.image}
            alt="product image"
          />
          {/* <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span> */}
        </a>
        <div className="mt-4 px-5 pb-5">
          <a href="#">
            <h5 className="text-xl  font-semibold tracking-tight text-slate-900">
              {details.title}
            </h5>
          </a>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-xl font-bold text-slate-900">
                {details.price + "$"}
              </span>
              {/* <span className="text-sm text-slate-900 line-through">$699</span> */}
            </p>
            <div className="flex items-center">
              {rate.map((index) => (
                <img
                  src={ratecount > index ? FilledStar : EmptyStar}
                  width="20px"
                  alt=""
                  key={index}
                />
              ))}
              <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                {details.rating.rate}
              </span>
            </div>
          </div>
          <button
            onClick={onClick}
            className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
}


export default ProductCard;
