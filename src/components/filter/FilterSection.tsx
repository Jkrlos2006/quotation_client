"use client";
import { useFilterContext } from "@/context/filter.context";
import { AiOutlineClear } from "react-icons/ai";
import { CartButtonAction } from "../cart/CartButtonAction";

export default function FilterSection() {
  const { cleanFilter, filterByPrice, minPrice, maxPrice } =
    useFilterContext();

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    filterByPrice(event.target.value);
  };

  return (
    <>
      <div title="Limpiar">
        <CartButtonAction
          onClick={cleanFilter}
          icon={<AiOutlineClear className="text-gray-600" />}
          className="max-w-[42px]"
        />
      </div>

      <div className="flex flex-col w-full gap-0">
        <label htmlFor="range" className="font-bold text-gray-900">
          Filtrar por precio:
        </label>
        <div className="flex flex-col w-full items-center">
          <input
            type="range"
            id="range"
            name="range"
            min="0"
            max={maxPrice}
            onChange={handleRangeChange}
            className="h-2 w-full cursor-ew-resize appearance-none rounded-full bg-gray-200 disabled:cursor-not-allowed"
          />
          <div className="flex flex-wrap w-full justify-between text-gray-700">
            <span>${minPrice}</span>
            <span>${maxPrice}</span>
          </div>
        </div>
      </div>
    </>
  );
}
