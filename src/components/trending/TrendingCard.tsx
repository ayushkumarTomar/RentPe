import { Link } from "react-router-dom";
import { AiOutlinePlus, AiOutlineCheck, AiOutlineHeart } from "react-icons/ai";
import AppwriteService from "@/services/appwrite";
import config from "@/config/config";

const TrendingCard = ({ product }: any) => {
  const appwrite = new AppwriteService();

  return (
    <Link
      to={`/productSpec/${product.$id}`}
      className="flex flex-col gap-4 px-4 py-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
      style={{ background: "#F9FAFB" }}
    >
      {/* Product Image */}
      <div className="w-full h-44 overflow-hidden rounded-lg">
        <img
          src={String(appwrite.storage.getFileView(config.bucketId, product.images[0]))}
          alt={product.name}
          className="object-cover w-full h-full transform hover:scale-105 transition duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">{product.name}</h1>
          <p className="mt-1 text-sm text-gray-600">{product.category}</p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <h1 className="text-lg font-semibold text-indigo-600">₹{product.price>2000 ? (product.price/40).toFixed(0) : product.price} per Day</h1>
          <button className="p-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition duration-300">
            {product.inCart ? (
              <AiOutlineHeart className="text-lg" />
            ) : (
              <AiOutlineHeart className="text-lg" />
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default TrendingCard;
