import AppwriteService from "@/services/appwrite";
import { useEffect, useState } from "react";
import { FaHome, FaMusic, FaBook, FaGamepad, FaBlackTie, FaFootballBall, FaShoePrints, FaScrewdriver, FaAccessibleIcon, FaMixer } from "react-icons/fa";
import TrendingList from "./TrendingList";

interface Product {
  // Define your product interface here
}
import { Params } from "react-router-dom";
interface RouteParams extends Params {
  productQuery: string;
}

import { useParams } from "react-router-dom";

const categories: string[] = ['Electronics', 'Furniture', 'Games', 'Clothing', 'Books', 'Sports', 'Shoes', 'Mechanical', 'Home Appliances', "Music", "Event organization", 'Others'];
import Navbar from "../navbar/Navbar";
const SearchProduct: React.FC = () => {


  const { productQuery } = useParams<RouteParams>();



  const [products, setProducts] = useState<Product[] | null>(null);
  const [mobileView, setMobileView] = useState<boolean>(false);


  useEffect(() => {
    const appwrite = new AppwriteService();

    const fetchData = async () => {
      try {
        const d = await appwrite.searchProducts(productQuery||"Lehnga");
        if(d){
          //@ts-ignore
          setProducts(d.documents)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const handleResize = () => {
      const isMobile: boolean = window.innerWidth < 768;
      setMobileView(isMobile);
    };

    fetchData();
    handleResize(); // Initial check

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (<>
    <div className='flex'>
      <Navbar />
    </div>
    <div className="flex flex-col items-center my-20">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Categories</h1>
      <div className="flex overflow-x-auto space-x-4 p-4 bg-gray-100 rounded-md mx-30 sm:mx-auto">

        {products && <TrendingList trendingProducts={products} />}
      </div>

    </div>
    </>
    );
  
};

    export default SearchProduct;
