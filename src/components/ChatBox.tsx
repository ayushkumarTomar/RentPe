import AppwriteService from '@/services/appwrite';
import React, { PropsWithChildren, useEffect, useState } from 'react';

type ChatType = {
    ownerId: string;
    borrowerId: string;
};

import {
    MinChatUiProvider,
    MainContainer,
    MessageContainer,
    MessageList,
    MessageHeader
   //@ts-ignore
  } from "@minchat/react-chat-ui";
import useAuthStore from '@/store/auth';


type ChatMsgs = {
    text: string ,
    user:{
        id:string , 
        name:string
    }

}
function ChatBox({ ownerId, borrowerId }: ChatType) {
    const appwrite = new AppwriteService();
    const [chat, setChat] = useState<any>([]);

    const [chatArr , setChatArr] = useState<ChatMsgs[]>([])
    const {user} = useAuthStore()


    const [msg , setMsg] = useState("")

    const handleSubmit = (e:any)=>{
        e.preventDefault()
        sendMsg(msg)
        setMsg("")
    }
    const sendMsg = async(msg:string)=>{
        //@ts-ignore
        setChatArr(prev=> [...prev , {
            text:msg ,
            user:{
                id:user?.name ,
                name: user?.name
            }
        }])


        const text = user?.name + ":"+msg



        await appwrite.sendMsg(chat.documents[0].$id||"null" , text)




    }


    useEffect(()=>{

        let subscribe

        console.log("socket connected")
        subscribe = appwrite.client.subscribe(["databases.*.collections.*.documents.*.update"], response => {

            console.log("socket :: " ,response.payload)
            
        });

        return()=>{
            subscribe()
        }
    } , [])
    useEffect(() => {
        async function fetchData() {
            try {
                const chats = await appwrite.getChat(ownerId, borrowerId);



                if (chats && user) {

                    setChat(chats);
                    console.log("chats ::::: " , chats.documents[0].msgs)

                    chats.documents[0].msgs.map((element:any)=>{
                        let newMsg;

                        console.log("chats found ::: " , element)

                        const sender = element.split(":")
                        
                        newMsg = {
                            text: sender[1] , 
                            user:{
                                id:sender[0] ,
                                name:sender[0]
                            }
                        }
                        setChatArr(prev => [...prev||[] , newMsg])
                    })



                }
            } catch (error) {
                console.error('Error fetching chat:', error);
            }
        }

        fetchData();
    }, []);

    // return <div>{JSON.stringify(chat)}</div>;

    return <MinChatUiProvider theme="#6ea9d7">
    <MainContainer style={{ height: '80vh' }}>
      <MessageContainer>
        <MessageHeader />
        <MessageList
          currentUserId='Ayush'
          messages={chatArr}
        />
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={msg}
                style={{width:"100%"}}
                onChange={(e)=>setMsg(e.target.value)}
                placeholder="Type message here"
            />
            <button  style={{alignSelf:'center'}} type="submit">Send</button>
    </form>      </MessageContainer>
    </MainContainer>
  </MinChatUiProvider>
}

export default ChatBox;
