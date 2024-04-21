import Navbar from "@/components/navbar/Navbar"
import Banner from "@/components/Banner"
import { useEffect, useState } from "react"
import AppwriteService from "@/services/appwrite"

import TrendingCard from "@/components/trending/TrendingCard"
import TrendingList from "@/components/trending/TrendingList"
import CategoriesScroll from "@/components/trending/CategoryScroll"



function Home() {

  const appwrite = new AppwriteService()
  const [allProducts , setAllProducts] = useState([])

  useEffect(()=>{
    async function iffy(){
      const prd = await appwrite.getAllProducts()
      //@ts-ignore
      if (prd) setAllProducts(prd)

        console.log("prd :: " , prd)
    }
    iffy();
  } , [])
  return (
    <>
    <div className='flex'>
    <Navbar/>
  </div>

  <div style={{marginTop:110 , marginLeft:20}}>
    <Banner />

   {allProducts.length>0 &&  <TrendingList trendingProducts = {allProducts.slice(0 , 7)}></TrendingList>}
    <div style={{alignSelf:'center'}}><CategoriesScroll /></div>

    
   
  </div>
</>



  )
}

export default Home