import AppwriteService from '@/services/appwrite'
import React, { useEffect, useState } from 'react'





function ChatBox({ownerId , borrowerId} : {ownerId:string , borrowerId:string}) {

    const appwrite = new AppwriteService()

    const [chat , setChat] = useState<any>()
    useEffect(()=>{
        async function iffy(){
            const chats = await appwrite.getChat(ownerId , borrowerId)

            if(chats) setChat(chats)


        }
    })
  return (
    <div>{JSON.stringify(chat)}</div>
  )
}

export default ChatBox