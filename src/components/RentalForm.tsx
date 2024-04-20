//@ts-ignore

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DeliveryLocation from './maps/Delivery';

import AppwriteService from '@/services/appwrite';

import config from '@/config/config';
import { ID } from 'appwrite';
import LoadingOverlay from 'react-loading-overlay-ts';
import useAuthStore from '@/store/auth';
import { toast } from 'react-toastify';


interface Position {
  coords: {
    latitude: number;
    longitude: number;
  };
}
const categories = ['Electronics', 'Furniture', 'Games' ,'Clothing', 'Books', 'Sports', 'Shoes' , 'Mechanical' , 'Home Appliances', "Music" , "Event organization" , 'Others'];
// @ts-ignore
const RentalForm = () => {

  const [upload, setUpload] = useState(false)
  const appwrite = new AppwriteService()

  let imagesArr = []


  const [forceUpdate, setForceUpdate] = useState(false);


  const {user} = useAuthStore()

  const [imagesId , setImagesId] = useState<string[]>([])
  const { register, handleSubmit, formState: { errors } , reset } = useForm();
  
  const [tags, setTags] = useState<string[]>([]); // State for tags
  const [tagInput, setTagInput] = useState<string>(''); // State for tag input value
  const [images, setImages] = useState<string[]>([]);
// @ts-ignore
  const onSubmit = async(data) => {


    if(images.length==0){
      toast("Please Upload images 📷🎥!!.", { autoClose: 3000 , position: "top-center" })
      return
    }

    if(tags.length==0){
      toast("Please add atleast 1 tag!!. 🏷️🏷️", { autoClose: 3000 , position: "top-center" })
      return
    }



    let longitude , lattitude;

    // Combine form data with images before submission
    const formDataWithImages = { ...data};
    console.log(formDataWithImages);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // Success callback
        async (position: Position) => {

          longitude = String(position.coords.longitude)
          lattitude = String(position.coords.latitude)
          // const { latitude, longitude } = position.coords;
          console.log(longitude , lattitude)
        })}


       const imagesID = await uploadImages()

       console.log("images iD func :: " , imagesID)
        if(imagesID){
       setForceUpdate(prevState => !prevState);


       const location = [longitude , lattitude]
        //@ts-ignore
        // console.log(formDataWithImages)

        const productData = {...formDataWithImages}
        productData.images = imagesID
        productData.location = location
        productData.owner = user?.$id
        productData.tags = tags

        console.log(productData)

        console.log("images id ::: " , imagesID)



       await appwrite.createProduct(productData)

       toast("Successfully listed product 🟢🟢", { autoClose: 5000 , position: "top-center" })
        }
        else{

          toast("Something went wrong ❌❌", { autoClose: 5000 , position: "top-center" })


        }

    
  };

  const uploadImages = async()=>{

    //@ts-ignore
    const files = document.getElementById("uploader")?.files;

    console.log("Fi9leess :: " , files)

    

    if(files.length>0){
      setUpload(true)

      const imagesID = []

      for(let i = 0 ; i < files.length ; i ++){

        const xd =await appwrite.storage.createFile(config.bucketId , ID.unique()  , files[i])
        console.log("Getting image id ::: " , xd.$id)

        imagesID.push(xd.$id)


      }
      
      setUpload(false)
      reset()
      setImages([])
      setTags([])


      return imagesID
      



    }
  else return false}


    



    

  // }
// @ts-ignore
  const handleImageChange = (e) => {
    const files = e.target.files;
    if (!files) return;
// @ts-ignore
    const imagesArray = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          imagesArray.push(e.target.result);
          if (imagesArray.length === files.length) {
            // @ts-ignore
            setImages((prevImages) => [...prevImages, ...imagesArray]);
          }
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };
  // @ts-ignore

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };


  const handleTagInputChange = (e:any) => {
    setTagInput(e.target.value);
  };

  const handleKeyDown = (e:any) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      setTags((prevTags) => [...prevTags, tagInput.trim()]);
      setTagInput('');
    }
  };




  const handleRemoveTag = (tagToRemove:any) => {
    setTags((prevTags) => prevTags.filter(tag => tag !== tagToRemove));
  };

  return (

    <LoadingOverlay
      active={upload}
      spinner
      text='Uploading images ...'
    >
    <div className="container mt-5">
      <h2>Rental Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input type="text" className="form-control" {...register('name', { required: true })} />
          {errors.name && <div className="text-danger">Name is required</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Product:</label>
          <input type="date" className="form-control" {...register('dateOfProduct', { required: true })} />
          {errors.dateOfProduct && <div className="text-danger">Date of Product is required</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea className="form-control" {...register('description', { required: true })} />
          {errors.description && <div className="text-danger">Description is required</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input type="number" className="form-control" {...register('price', { required: true })} />
          {errors.price && <div className="text-danger">Price is required</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Category:</label>
          <select className="form-select" {...register('category', { required: true })}>
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && <div className="text-danger">Category is required</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Tags:</label>
          <div className="d-flex flex-wrap">
            {tags.map((tag, index) => (
              <div key={index} className="tag-item">
                <span>{tag}</span>
                <button type="button" className="btn btn-sm btn-outline-secondary" style={{borderWidth:0}} onClick={() => handleRemoveTag(tag)}>
                  ❌
                </button>
              </div>
            ))}
            <input
              type="text"
              className="form-control"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Press enter to add tags"
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Images:</label>
          <input type="file" className="form-control" id = "uploader" multiple onChange={handleImageChange} accept="image/*" />
        </div>
        <div className="row">
          {images.map((image, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="position-relative">
                <img src={image} alt={`Preview ${index + 1}`} className="img-fluid rounded" />
                <button type="button" className="btn btn-danger btn-sm position-absolute top-0 end-0" onClick={() => handleRemoveImage(index)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="row" style={{marginBottom:30 , marginTop:20}}>

          <DeliveryLocation/>
            

        </div>


        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    </LoadingOverlay>
  );
};

export default RentalForm
