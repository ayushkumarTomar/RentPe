import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate, Params } from 'react-router-dom';
import { FaStar, FaHeart } from 'react-icons/fa';
import LoadingOverlay from 'react-loading-overlay-ts';
import AppwriteService from '@/services/appwrite';
import config from '@/config/config';
import './index.css'
import Navbar from '@/components/navbar/Navbar';
import useAuthStore from '@/store/auth';
import { toast } from 'react-toastify';

interface RouteParams extends Params {
  productId: string;
}

const ProductPage = () => {
  const { productId } = useParams<RouteParams>();
  const appwrite = new AppwriteService();
  const navigate = useNavigate();

  const [productDetails, setProductDetails] = useState<any>();
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const {user} = useAuthStore()
  useEffect(() => {
    async function fetchData() {
      try {
        const details = await appwrite.getProduct(productId || "null");
        if (!details) {
          navigate('/not-found');
          return;
        }
        setProductDetails(details);

        const related = await appwrite.getCategory(details.category);
        setRelatedProducts(related || []);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, [productId]);
  const navigor = useNavigate()

  const addWishList = async()=>{
    if(user && productDetails){
    await appwrite.addWishList(user?.$id , productDetails.$id)
    toast("Added Wishlist 🟢🟢", { autoClose: 3000 , position: "top-center" })
  }

  }
  const borrowNow = async()=>{
    console.log("Reached herere" , productDetails.owner  , ":::: ", user?.$id )
    await appwrite.getChat(productDetails.owner , user?.$id || "null")

    
    navigor("/chat")
  }
  const [owner , setOwner] = useState("")
  useEffect(()=>{
    ownerName()
  } , [productDetails])
  const ownerName = async()=>{
    if(productDetails)
    {
      // console.log
      const anmem =await appwrite.getUsername(productDetails.owner)

    setOwner(anmem)}
  }
  return (
    <LoadingOverlay
      active={loading}
      spinner
      text='Fetching Product ...'
    >

<div className='flex'>
    <Navbar/>
  </div>
      {!loading && productDetails && (
        <div className="container py-5" style={{marginTop:80}}>
          <div className="row">
            <div className="col-md-6">
              <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {productDetails.images.map((image: string, index: number) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                      <div className="dotted-box">
                        <img
                          src={String(appwrite.storage.getFileView(config.bucketId, image)) || "https://via.placeholder.com/400"}
                          alt={`Product Image ${index + 1}`}
                          className="d-block w-100"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <h2 className="mb-4" style={{fontSize:40}}>{productDetails.name}</h2>
              <p className="lead">{productDetails.description}</p>
              <div className="mb-3">
                <span className="text-warning">
                  <FaStar />
                </span>
                <span className="text-warning">
                  <FaStar />
                </span>
                <span className="text-warning">
                  <FaStar />
                </span>
                <span className="text-warning">
                  <FaStar />
                </span>
                <span className="text-secondary">
                  <FaStar />
                </span>
                <span className="ms-2">4.0 (123 reviews)</span>
              </div>
              <h3 className="mb-3">INR {productDetails.price>2000 ? productDetails.price/10 : productDetails.price} per Day</h3>
              <div className="mb-4">
                <button className="btn btn-primary me-2" style={{ flexDirection: 'row' }} onClick={addWishList}>
                  <FaHeart className="me-1" />
                  Add to WishList
                </button>
                <button className="btn btn-outline-primary" onClick={borrowNow}>
                  BorrowNow
                </button>
              </div>
              <p className="text-muted">
                {productDetails.description}
              </p>

              <p style={{fontSize:30}} className="text-muted">
                SOLD By : {owner}
              </p>
              <p className="text-muted">Category: {productDetails.category}</p>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="row mt-5">
              <div className="col-md-12">
                <h3 className="mb-3">Related Products</h3>
                <div className="row">
                  {relatedProducts.map((relatedProduct: any) => (
                    <div key={relatedProduct.$id} className="col-md-3">
                      <div className="card">
                        <img
                          src={String(appwrite.storage.getFilePreview(config.bucketId, relatedProduct.images[0])) || "https://via.placeholder.com/300"}
                          alt="Related Product"
                          className="card-img-top"
                          style={{height:"100" , width:"auto"}}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{relatedProduct.name}</h5>
                          <p className="card-text">INR {relatedProduct.price>2000 ? (relatedProduct.price /40).toFixed(0): relatedProduct.price} per Day</p>
                          <Link to={`/productSpec/${relatedProduct.$id}`} className="btn btn-primary">View</Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </LoadingOverlay>
  );
}

export default ProductPage;
