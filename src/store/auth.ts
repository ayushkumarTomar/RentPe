import {create} from 'zustand'
type User = {
    $createdAt: string;
    $id: string;
    $updatedAt: string;
    accessedAt: string;
    email: string;
    emailVerification: boolean;
    labels: any[]; // You can replace 'any[]' with a more specific type if you know the type of labels
    name: string;
    passwordUpdate: string;
    phone: string;
    phoneVerification: boolean;
    prefs: Record<string, any>; // You can replace 'Record<string, any>' with a more specific type for prefs
    registration: string;
    status: boolean;
  };

type AuthStore = {
    isLoggedIn : boolean ,
    login : (user:User)=> void ,
    logout : ()=>void , 
    user : User | null ,
    loading: boolean , 
    toggleLoading : ()=> void

}

const useAuthStore = create<AuthStore>((set , get) => ({
    user: null ,

    isLoggedIn: false,
    login: (user:User) => {

        set({user:user})
       
        set({isLoggedIn:true});
        
      },
      logout: () => {
    
        set({ isLoggedIn: false });
        set({user:null});
      } ,
      loading : true , 
      toggleLoading: ()=>{
        set((state)=> ({loading: !state.loading}))
      }
  }));
  

export default useAuthStore