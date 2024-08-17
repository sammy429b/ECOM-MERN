import data from "../db.json";
import ProductCard from "@/components/custom/Main/ProductCard";
import Carousel from "@/components/custom/Main/Carousel";
function Index() {
  // console.log(data);
  return <>
    <Carousel />

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {
        data.map((item) =>
          <ProductCard details={item} key={item.id} />
          // <ProductCardShimmer/>
        )

      }
    </div>
  </>;
}

export default Index;
