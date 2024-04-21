import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar/Navbar';
import useAuthStore from '@/store/auth';
import AppwriteService from '@/services/appwrite';
import config from '@/config/config';
const WishlistPage = () => {
    const [wishlistItems, setWishlistItems] = useState<any>([]);

    const removeItemFromWishlist = (index: number) => {
        const updatedWishlist = [...wishlistItems];
        updatedWishlist.splice(index, 1);
        setWishlistItems(updatedWishlist);
    };

    const {user} = useAuthStore()

    const appwrite = new AppwriteService()

    useEffect(()=>{


        async function iffy (){
            if(user){
            
            const xd = await appwrite.getWishList(user?.$id)
            console.log("getting wishliist")
            console.log(xd)
            xd.Products.map(async(element:any)=>{

                console.log("product Id ::: " , element)
                const pd = element
                const xdd = await appwrite.getProductIndi(pd)
                //@ts-ignore
                setWishlistItems(prev =>[...prev , xdd])
                
                console.log(xdd)

            })
            
            
        }
        }

        iffy()


    } , [])

    return (

        <>

        <div className="flex">
            <Navbar></Navbar>            
        </div>
        <div className="container mt-5" style={{marginTop:80}}>
            <h1 className="mb-4">Wishlist</h1>
            {wishlistItems.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <ul className="list-group">
                    { wishlistItems.length > 0 && wishlistItems.map((item:any, index:any) => (
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                            <div className="d-flex align-items-center">
                                <img src={String(appwrite.storage.getFileView(config.bucketId , item.images[0]))} alt={item.name} className="mr-3" style={{ width: '100px', height: '100px' }} />
                                {item.name}
                            </div>
                            <button className="btn btn-danger" onClick={() => removeItemFromWishlist(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>

        </>
    );
};

export default WishlistPage;
