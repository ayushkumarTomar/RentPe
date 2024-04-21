import TrendingCard from "./TrendingCard";

const TrendingList = ({trendingProducts , trend=false} : any) => {
  return (
    <section className="grid  grid-cols-1 xs:grid-cols-2 md:grid-cols-3   lg:grid-cols-4 gap-4  py-4 mt-10">
      <h1 className="text-3xl md:text-4xl lg:text-5xl  break-words flex items-center ml-4 ">
        {trend? <h1>{trend}</h1> : <h1>Trending Products</h1>}
      </h1>

      {trendingProducts.map((product:any) => (
        <TrendingCard key={product.$id} product={product} />
      ))}
    </section>
  );
};

export default TrendingList;
