"use client";
import { useFilterContext } from "@/context/filter.context";
import { useProductContext } from "@/context/product.context";
import { ProductsInterface } from "@/models/products.model";
import { cartStore } from "@/store/cart.store";
import { useState } from "react";
import { BsCartCheck, BsCartPlus, BsEye } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { IoFilterSharp, IoGridSharp } from "react-icons/io5";
import ProductCard from "../product/ProductCard";
import ProductPrice from "../product/ProductPrice";
import ProductRating from "../product/ProductRating";
import { Button } from "../ui/button";
import FilterSection from "./FilterSection";
import FilterSelect from "./FilterSelect";

export default function ProductTable({
  products,
}: {
  products?: ProductsInterface;
}) {
  const { setOpenFilter } = useFilterContext();
  const [isTable, setIsTable] = useState(true);
  const cart = cartStore((state) => state);
  const { getItemQuantity, setProduct, setIsOpen } = useProductContext();

  return (
    <>
      <div className="flex justify-end items-center gap-3 flex-row">
        {products ? (
          products.data.length > 3 ? (
            <>
              <FilterSection />
              <FilterSelect />
            </>
          ) : null
        ) : null}
        <Button onClick={() => setOpenFilter(true)} title="Filtro">
          <IoFilterSharp className="h-6 w-6" /> Filtro
        </Button>
        <Button
          onClick={() => setIsTable(!isTable)}
          title={!isTable ? "Lista" : "Bloques"}
          className="hidden md:block"
        >
          {isTable ? (
            <IoGridSharp className="h-6 w-6" />
          ) : (
            <FaThList className="h-6 w-6" />
          )}
        </Button>
      </div>
      <div className="inline-block min-w-full align-middle">
        {!isTable ? (
          <div className="hidden md:grid">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
              {products?.data?.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col justify-between border rounded-lg overflow-hidden relative text-sm"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {products?.data?.map((product) => (
                <div
                  key={product.id}
                  className="mb-2 w-full rounded-md bg-white p-4 relative"
                >
                  <div className="border-b pb-2">
                    <div
                      className="mb-2 flex items-center gap-2 overflow-hidden"
                      title={product.attributes.name}
                    >
                      <img
                        src={
                          product.attributes.image.data[0].attributes.formats
                            .thumbnail.url
                        }
                        className="rounded-full"
                        width={40}
                        height={40}
                      />
                      <p className="truncate">{product.attributes.name}</p>
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <ProductRating rating={product.attributes.rating} />
                      {getItemQuantity(product.id) &&
                        getItemQuantity(product.id) + " en carrito"}
                    </div>
                  </div>

                  <div className="flex w-full items-center justify-between pt-2 ">
                    <div>
                      <ProductPrice
                        discount={
                          product.attributes.prices?.data[0]?.attributes
                            .discount!
                        }
                        price={
                          product.attributes.prices.data[0]?.attributes.value
                        }
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <div className="flex justify-end p-3 gap-2">
                        <Button
                          onClick={() => {
                            setProduct([product]), setIsOpen(true);
                          }}
                          title="Ver mas detalles"
                        >
                          <BsEye className="h-6 w-6" /> Ver detalles
                        </Button>
                        <Button
                          onClick={() => cart.increaseCartQuantity(product.id)}
                          title="Añadir"
                        >
                          <BsCartCheck className="h-6 w-6" /> Añadir
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Nombre
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Precio
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Valoración
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {products?.data?.map((product) => (
                  <tr
                    key={product.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg relative"
                  >
                    <td className="py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            product.attributes.image.data[0].attributes.formats
                              .thumbnail.url
                          }
                          className="rounded-full"
                          width={60}
                          height={60}
                        />
                        <p title={product.attributes.name}>
                          {product.attributes.name}
                        </p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <ProductPrice
                        discount={
                          product.attributes.prices.data[0]?.attributes
                            .discount!
                        }
                        price={
                          product.attributes.prices.data[0]?.attributes.value
                        }
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <ProductRating rating={product.attributes.rating} />
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end p-3 gap-2">
                        <Button
                          onClick={() => {
                            setProduct([product]), setIsOpen(true);
                          }}
                          title="Ver mas detalles"
                        >
                          <BsEye className="h-6 w-6" /> Ver detalles
                        </Button>

                        {getItemQuantity(product.id) ? (
                          <Button
                            onClick={() =>
                              cart.increaseCartQuantity(product.id)
                            }
                            title="Ver mas detalles"
                          >
                            <BsCartCheck className="h-6 w-6" />{" "}
                            {`x ${getItemQuantity(product.id)}`}
                          </Button>
                        ) : (
                          <Button
                            onClick={() =>
                              cart.increaseCartQuantity(product.id)
                            }
                            title="Añadir"
                          >
                            <BsCartPlus className="h-6 w-6" />
                            Añadir
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
