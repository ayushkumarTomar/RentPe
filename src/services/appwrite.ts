


import { ID , Client , Databases , Account ,Query , Storage } from 'appwrite';


import config from '@/config/config';
import { MdLocationPin } from 'react-icons/md';


type CreateUserAccount = {
    email: string;
    password: string;
    name: string
}
type LoginUserAccount = {
    email: string;
    password: string;
}
const wishlistCollection = "662429a0204b20005307"

const userCollectionId = "6624da9ecac2ea20ae15"

type Category =
  | 'Electronics'
  | 'Furniture'
  | 'Games'
  | 'Clothing'
  | 'Books'
  | 'Sports'
  | 'Shoes'
  | 'Mechanical'
  | 'Home Appliances'
  | 'Music'
  | 'Event organization'
  | 'Others';

type CreateProduct = {
    name: string;
    dateOfProduct: string;
    description: string;
    price: number;
    category: Category
    tags: string[];
    owner: string;
    images: string[];
    location: string[];
  };
  


const appwriteClient = new Client()

const APPWRITE_ENDPOINT: string = config.endpoint
const APPWRITE_PROJECT_ID:string = config.projectId;
const APPWRITE_DATABASE_ID:string = config.databaseId


class AppwriteService {
    account;
    database;
    storage;
    client;
    constructor(){
        appwriteClient
        .setEndpoint(APPWRITE_ENDPOINT)
        .setProject(APPWRITE_PROJECT_ID)

        this.client = appwriteClient

        this.account = new Account(appwriteClient)
        this.database = new Databases(appwriteClient)

        this.storage = new Storage(appwriteClient)
    }

    //create a new record of user inside appwrite



    async getUsername(userId:string){

        const x = (await this.database.listDocuments(APPWRITE_DATABASE_ID , userCollectionId , [Query.equal("id" , [userId])])).documents[0].name
        console.log(x)
        return x
        // return "Ayush"
    }
    async createAccount({email, password, name}: CreateUserAccount){
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            if (userAccount) {
                return this.login({email, password})
            } else {
                return userAccount
            }
        } catch (error) {
            console.log("Appwrite service :: createAccount() :: " + error);
            return false
            
            
        }
    }

    async login({email, password}: LoginUserAccount){
        try {
            return await this.account.createEmailSession(email.trim(), password.trim())
        } catch (error) {
            console.log("Appwrite service :: loginAccount() :: " + error);
           return false
            
            
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser() :: " + error);
            return false
        }
    }

    async logout(){
        try {
            return await this.account.deleteSession('current')
        } catch (error) {
            console.log("Appwrite service :: logoutError() :: " + error);
            return false

        }
    }


    async createProduct({name ,dateOfProduct , description , price , category , tags , images , location , owner } : CreateProduct){
        try {

            await this.database.createDocument(APPWRITE_DATABASE_ID , config.productsCollectionId , ID.unique()  , {

                name , 
                date: new Date() ,
                dateOfProduct ,
                description , 
                price , 
                category , 
                tags,
                images ,
                location ,
                owner

            })

        } catch (error) {
            console.log("creating product error :: " , error)
            return false
            
        }
    }

    async getBorrowed(userID:string){
        try {
            return (await this.database.listDocuments(APPWRITE_DATABASE_ID , config.productsCollectionId , [Query.equal('borrower' , [userID])])).documents
        } catch (error) {
            console.log("borrow error ::: " , error)
            return false
        }

    }

    async getRented(userID:string){
        try {
            return (await this.database.listDocuments(APPWRITE_DATABASE_ID , config.productsCollectionId , [Query.equal('owner' , [userID])])).documents
        } catch (error) {
            console.log("borrow error ::: " , error)
            return false
        }

    }

    async getAllProducts(){
        try {
            return (await this.database.listDocuments(APPWRITE_DATABASE_ID , config.productsCollectionId , [Query.limit(99)])).documents
        } catch (error) {
            console.log("all product error ::: " , error)
            return false

            
        }
    }

    async getCategory(category:string){

        try {
            return (await this.database.listDocuments(APPWRITE_DATABASE_ID , config.productsCollectionId , [Query.equal('category' , [category])])).documents
        } catch (error) {
            console.log("all product error ::: " , error)
            return false

            
        }

    }

    async getProduct(productId:string){
         try {
            const dd = await this.database.getDocument(APPWRITE_DATABASE_ID , config.productsCollectionId , productId)

            console.log(dd)
            return dd
        } catch (error) {
            console.log("all product error ::: " , error)
            return false

            
        }
        
    }


    async getConvo(user:string){
        try {

            const convos1 = (await this.database.listDocuments(APPWRITE_DATABASE_ID , config.chatCollectionId , [Query.equal("owner" , [user])])).documents
            const convos2  = (await this.database.listDocuments(APPWRITE_DATABASE_ID , config.chatCollectionId , [Query.equal("borrower" , [user])])).documents
            const convos = [...convos1 , ...convos2]
            console.log("Convo 1 :: " , convos1)
            console.log("Convo 2 :: " , convos2)

            console.log("convo  inside db:: " , convos)

            return convos
            
        } catch (error) {

            console.log("Errror getting convos :: " , error)
            return false
            
        }
    }
    async sendMsg(documentId:string , msg:string){
        try {
            const oldMsgs = await this.database.getDocument(APPWRITE_DATABASE_ID , config.chatCollectionId , documentId)
            const newA = await this.database.updateDocument(APPWRITE_DATABASE_ID , config.chatCollectionId , documentId , {
                msgs: [...oldMsgs.msgs , msg]
            })

            return newA
        } catch (error) {
            console.log("Error sending msg:: " ,  error)
            
        }
    }

    
    async getChat(owner:string , borrower:string){
        try {
            

            const data = await this.database.listDocuments(APPWRITE_DATABASE_ID , config.chatCollectionId , [Query.equal("owner" , [owner]) , Query.equal("borrower" , [borrower])])
            console.log("chat data found ::: " , data)
            if(data.total<1){


                const ownerName = await this.getUsername(owner)
                const borrowerName = await this.getUsername(borrower)
                const data2 = await this.database.createDocument(APPWRITE_DATABASE_ID , config.chatCollectionId , ID.unique() ,{
                    owner ,
                    ownerName ,
                    borrowerName ,
                    borrower
                })

                console.log("chat creation :: " , data2)
                return data2;
            }
            return data;
        
        } catch (error) {
                console.log("Error getting chat :: " ,error)
                return false
        }
    }

    async addWishList(userId:string , productId:string){
        try {

            const user = (await this.database.listDocuments(APPWRITE_DATABASE_ID , wishlistCollection , [Query.equal("user" , [userId])])).documents[0]
            console.log("wishlist ::: " , user)
            const productID = user.$id

            const oldList = await this.database.getDocument(APPWRITE_DATABASE_ID , wishlistCollection ,productID)


            console.log("oldList ::: " , oldList)


            const newList = [...oldList.Products , productId ]

            return await this.database.updateDocument(APPWRITE_DATABASE_ID , wishlistCollection , oldList.$id  ,{
                Products : newList
            })

            
        } catch(error) {
            console.log("error ::: " , error)
        }
    }


    async getWishList(userId:string){
        const xd =(await this.database.listDocuments(APPWRITE_DATABASE_ID , wishlistCollection , [Query.equal("user" , [userId])])).documents[0]
        console.log(xd)
        return xd
    }

    async getProductIndi(productId : string){

        const xd = await this.database.getDocument(APPWRITE_DATABASE_ID , config.productsCollectionId , productId)
        console.log("product Indi ::" , xd)
        return xd
    }

    async searchProducts(query:string){

        const xd = await this.database.listDocuments(APPWRITE_DATABASE_ID , config.productsCollectionId ,[Query.search("name" , query)] )

        console.log("Searched :: " , xd
        )
        return xd
    }

}

export default AppwriteService