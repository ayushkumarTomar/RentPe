import AppwriteService from "@/services/appwrite";
import { useEffect, useState } from "react";
import { FaHome, FaMusic, FaBook, FaGamepad, FaBlackTie, FaFootballBall, FaShoePrints, FaScrewdriver, FaAccessibleIcon, FaMixer, FaBed } from "react-icons/fa";
import TrendingList from "./TrendingList";

interface Product {
  // Define your product interface here
}

const categories: string[] = ['Electronics', 'Furniture', 'Games', 'Clothing', 'Books', 'Sports', 'Shoes', 'Mechanical', 'Home Appliances', "Music", "Event organization", 'Others'];

const CategoriesScroll: React.FC = () => {
  const [category, setCategory] = useState<Product[] | null>(null);
  const [mobileView, setMobileView] = useState<boolean>(false);

  const [currentCat , setCurrentCat] = useState("All Products")

  useEffect(() => {
    const appwrite = new AppwriteService();

    const fetchData = async () => {
      try {
        const d = await appwrite.getAllProducts();
        if (d) {
          setCategory(d.slice().reverse());
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

  const updateProducts = async (index: number) => {
    try {
        setCurrentCat(categories[index])
      const appwrite = new AppwriteService();
      const catt = await appwrite.getCategory(categories[index]);
      if (catt) {
        setCategory(catt.slice().reverse());
      }
    } catch (error) {
      console.error("Error updating products:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Categories</h1>
      <div className="flex overflow-x-auto space-x-4 p-4 bg-gray-100 rounded-md mx-30 sm:mx-auto">
        {!mobileView
          ? categories.slice(0, 9).map((category, index) => (
              <div key={index} className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full mx-2 sm:mx-4">
                  {index === 0 && <FaMixer className="text-3xl text-gray-600" onClick={() => updateProducts(0)} />}
                  {index === 1 && <FaBed className="text-3xl text-gray-600" onClick={() => updateProducts(1)} />}
                  {index === 2 && <FaGamepad className="text-3xl text-gray-600" onClick={() => updateProducts(2)} />}
                  {index === 3 && <FaBlackTie className="text-3xl text-gray-600" onClick={() => updateProducts(3)} />}
                  {index === 4 && <FaBook className="text-3xl text-gray-600" onClick={() => updateProducts(4)} />}
                  {index === 5 && <FaFootballBall className="text-3xl text-gray-600" onClick={() => updateProducts(5)} />}
                  {index === 6 && <FaShoePrints className="text-3xl text-gray-600" onClick={() => updateProducts(6)} />}
                  {index === 7 && <FaScrewdriver className="text-3xl text-gray-600" onClick={() => updateProducts(7)} />}
                  {index === 8 && <FaHome className="text-3xl text-gray-600" onClick={() => updateProducts(8)} />}
                </div>
                <p className="text-xs mt-2 text-center">{category}</p>
              </div>
            ))
          : categories.slice(0, 2).map((category, index) => (
              <div key={index} className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full mx-2 sm:mx-4">
                  {index === 0 && <FaMixer className="text-3xl text-gray-600" onClick={() => updateProducts(0)} />}
                  {index === 1 && <FaBed className="text-3xl text-gray-600" onClick={() => updateProducts(1)} />}
                  {index === 2 && <FaGamepad className="text-3xl text-gray-600" onClick={() => updateProducts(2)} />}
                </div>
                <p className="text-xs mt-2 text-center">{category}</p>
              </div>
            ))}
      </div>
      {category && <TrendingList trendingProducts={category} trend={currentCat} />}
    </div>
  );
};

export default CategoriesScroll;
