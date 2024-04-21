
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import defaultUser from "@/assets/defaultUser.png";
import AppwriteService from "@/services/appwrite";
import useAuthStore from "@/store/auth";
interface convoProp {
    collectionId: string;
    createdAt: string;
    ownerName: string;
    borrowerName: string;
    databaseId: string;
    id: string;
    permissions: any[];
    updatedAt: string;
    borrower: string;
    borrowerMsgs: any[];
    owner: string;
    ownerMsgs: any[];

}


type ChatType = {
    ownerId : string , 
    borrowerId: string
}

import './index.css'
import { FaSnapchat } from "react-icons/fa";

import Navbar from "@/components/navbar/Navbar";
import ChatBox from "@/components/ChatBox";

function Chat() {
    const [isMobile, setIsMobile] = useState(false);

    const [currentChat , setCurrentChat] = useState<ChatType>()


    const [convo, setConvo] = useState<convoProp[]>([])

    const { user } = useAuthStore()
    const appwrite = new AppwriteService()
    useEffect(() => {


        async function getConvo() {


            const convos = await appwrite.getConvo(user?.$id || "null")
            console.log("getting convos :: from db :: ", convos)

            console.log(convos, " :: ", user?.$id)

            if (convos) {
                console.log("Settting convos")
                //@ts-ignore

                setConvo(convos)
            }

            console.log("Convo :: ", convo)

        }

        getConvo()
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (

        <>
            <div className='flex'>
                <Navbar />
            </div>
            <div className="profile-container" style={{ marginTop: 80 }}>
                <div className="custom-sidebar">
                <Sidebar collapsed={isMobile}>
                    <Menu>
                        <div className="sidebar-top">
                            <Link to="/profile">
                                <img
                                    className="rounded-full border-2 bg-yellow-300 me-3 hover:bg-yellow-500 cursor-pointer"
                                    src={defaultUser}
                                    alt="userProfileImage"
                                    width={40}
                                />
                            </Link>
                            {!isMobile && <span>{user?.name}</span>}
                        </div>
                        {convo.length > 0 &&
                            convo.map((element , index:number) => (
                                <MenuItem  key = {index} onClick = {()=> {setCurrentChat({ownerId:element.owner , borrowerId : element.borrower})}} icon={<FaSnapchat />} >{element.borrower == user?.$id ? element.ownerName : element.borrowerName}</MenuItem>

                            ))
                        }
                    </Menu>
                </Sidebar>
                
                </div>
               

            <div className="other-components">
            <div className="card" style={{ width: 'auto', height: 'auto', padding: 40 }}>

            {currentChat && <ChatBox  ownerId={currentChat.ownerId} borrowerId={currentChat.borrowerId}/>}

            
            {!currentChat && <h1 className="card-title" style={{ fontSize: '2.5rem', marginBottom: '20px'  , textAlign:'center'}}>Click to Open Chat</h1> }
                </div>
            </div>

        </div >
      </>
    );
}


export default Chat