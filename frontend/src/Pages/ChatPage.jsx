import { Box } from "@chakra-ui/react";
import ChatBox from "../components/miscellaneous/ChatBox";
import MyChats from "../components/miscellaneous/MyChats";
import SideBar from "../components/miscellaneous/SideBar";
import { ChatState } from "../context/ChatProvider";

function ChatPage() {
  const {user} = ChatState();

  return (

    <div style={{ width: "100%" }}>
      {user && <SideBar />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
}

export default ChatPage;
