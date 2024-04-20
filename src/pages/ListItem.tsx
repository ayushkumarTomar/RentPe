import React, { useState, ChangeEvent } from 'react';
import Navbar from '@/components/navbar/Navbar';
interface ImageUploaderProps { }

const ImageUploader: React.FC<ImageUploaderProps> = () => {
    const [images, setImages] = useState<string[]>([]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const imagesArray: string[] = [];

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    imagesArray.push(e.target.result as string);
                    if (imagesArray.length === files.length) {
                        setImages((prevImages) => [...prevImages, ...imagesArray]);
                    }
                }
            };
            reader.readAsDataURL(files[i]);
        }
    };

    const handleRemoveImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title text-center mb-4">Image Uploader</h5>
                            <input
                                type="file"
                                multiple
                                onChange={handleImageChange}
                                accept="image/*"
                                className="form-control mb-4"
                            />
                            <div className="row">
                                {images.map((image, index) => (
                                    <div key={index} className="col-md-4 mb-3">
                                        <div className="position-relative">
                                            <img
                                                src={image}
                                                alt={`Preview ${index + 1}`}
                                                className="img-fluid rounded"
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                                onClick={() => handleRemoveImage(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { ImageUploader };
import { useEffect } from 'react';

import { SideBar } from '@/components/profile/Profile';

function ListItem() {
    const user = { username: "Ayush", phoneNumber: "+919929419734" }
    return (
        <>
            {/* <Navbar /> */}
            <div className='flex'>
                <Navbar />
            </div>
            <div className="profile-container" style={{ marginTop: 80 }}>

                <SideBar username={user.username} />
                <div className="other-components">
                    <div className="card" style={{ width: 'auto', height: 'auto', padding: 40 }}>
                    <h1 className="card-title" style={{ fontSize: '2.5rem', marginBottom: '20px' , fontSizeAdjust:70 , alignSelf:'center'}}>List Product</h1> {/* Increased font size and added margin */}
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <img
                                    src="https://hips.hearstapps.com/hmg-prod/images/robert-pattinson-as-batman-bruce-wayne-in-the-batman-1645186686.jpeg?crop=0.607xw:0.911xh;0.318xw,0.0102xh&resize=640:*"
                                    className="card-img-top rounded-circle"
                                    alt="ProfileIcon"
                                    style={{ width: '70%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div className="col-md-8">

                                
                                <ImageUploader />
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </>
    );
}

export default ListItem;

