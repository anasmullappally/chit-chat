import { Box } from "@chakra-ui/react";
import ChatBox from "../components/chat/ChatBox";
import MyChats from "../components/chat/MyChats";
import SideBar from "../components/miscellaneous/SideBar";
import { ChatState } from "../context/ChatProvider";
import { useState } from "react";


function ChatPage() {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideBar  fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && (
          <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
}

export default ChatPage;
