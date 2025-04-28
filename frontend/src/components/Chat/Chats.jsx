import { useEffect } from "react";
import { useApp } from "../../context/AppContext"
import Navy from "./Navy";
import Sidey from "./Sidey";
import MessagingCont from "./MessagingCont";
import GroupMessaging from "./GroupMessaging";

const Chats = () => {
    const {groupChat,user,isChatOpened}=useApp();
    useEffect(()=>{
      console.log(user)
    },[]);
  return (
    <div>
     <Navy/> 
     <Sidey />
     {
       isChatOpened && <MessagingCont />
     }
     {
      groupChat && <GroupMessaging />
     }
    </div>
  )
}

export default Chats;
