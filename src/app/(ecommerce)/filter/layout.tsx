import FilterSlider from "@/components/filter/FilterSlider";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import background from "../../../../public/logoAyC.png";
import { getDataCategory } from "@/app/services/category.service";
import { getDataBrand } from "@/app/services/brand.service";
import { getDataColor } from "@/app/services/color.service";
import { getDataProducts } from "@/app/services/product.service";

export default async function FilterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getDataCategory();
  const brands = await getDataBrand();
  const colors = await getDataColor();
  const products = await getDataProducts();
  return (
    <>
      <NavBar background={background} brands={brands} categories={categories} />
      <main className="flex overflow-hidden flex-row container mx-auto gap-5 relative p-3 md:p-5">
        <FilterSlider colors={colors} products={products} />
        <div className={"w-full min-h-screen flex flex-col gap-3"}>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
