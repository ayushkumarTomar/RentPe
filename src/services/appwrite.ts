


import { ID , Client , Databases , Account ,Query } from 'appwrite';


import config from '@/config/config';


type CreateUserAccount = {
    email: string;
    password: string;
    name: string
}
type LoginUserAccount = {
    email: string;
    password: string;
}


const appwriteClient = new Client()

const APPWRITE_ENDPOINT: string = config.endpoint
const APPWRITE_PROJECT_ID:string = config.projectId;
const APPWRITE_DATABASE_ID:string = config.databaseId


class AppwriteService {
    account;
    database

    constructor(){
        appwriteClient
        .setEndpoint(APPWRITE_ENDPOINT)
        .setProject(APPWRITE_PROJECT_ID)

        this.account = new Account(appwriteClient)
        this.database = new Databases(appwriteClient)
    }

    //create a new record of user inside appwrite

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

}

export default AppwriteService