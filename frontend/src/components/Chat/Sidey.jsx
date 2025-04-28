import "../Sidebar.css";
import { FaUser, FaComments, FaUsers, FaPlus } from "react-icons/fa";
import { useApp } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";



const AddFriends = () => {
  const [userList, setUserList] = useState([]);
  const { user } = useApp();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:5000/api/student/getUsers");
    if (response.ok) {
      const data = await response.json();
      setUserList(data.data);
    }
  };

  const addFriendtoList = async (e, id) => {
    e.preventDefault();
    let friendId=id;
    let myId=user._id;
    if(user.role==="Teacher"){
      myId=user.id;
    }
    console.log(user.id,id)
    const response = await fetch("http://localhost:5000/api/student/addFriend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: myId, friendId: friendId,role:user.role }),
    });

    if (response.ok) {
      setUserList((prev) => prev.filter((u) => u._id !== id));
    }
  };

  return (
    <>
      <div className="add-friends-container">
        <h2 className="add-friends-container-header">Add Friends</h2>
        <div className="list-containers">
          {userList.map((user) => (
            <div
              key={user._id}
              style={{
                backgroundColor: "#ffffff15",
                padding: "10px",
                marginBottom: "8px",
                borderRadius: "6px",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                {user.name}{" "}
                <small style={{ color: "#ccc" }}>
                  ({user.role === "student" ? user.rollno : user.teacher_id})
                </small>
              </span>
              <button
                style={{
                  backgroundColor: "#1e90ff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "4px 10px",
                  cursor: "pointer",
                }}
                onClick={(e) => addFriendtoList(e, user._id)}
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


const GroupsCont = () => {
  const [groups, setGroups] = useState([]);
  const { user } = useApp();
  useEffect(()=>{
    console.log(user)
  },[user]);
  useEffect(() => {
    //fetchGroups();
  }, []);

  const fetchGroups = async () => {
    const response = await fetch("http://localhost:5000/api/chat/fetchallgroups");
    if (response.ok) {
      const data = await response.json();
      setGroups(data.data); // assuming groups come under data.data
    }
  };

  const joinGroup = async (e, groupId) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/chat/joinGroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user._id, groupId }),
    });

    if (response.ok) {
      setGroups((prev) => prev.filter((g) => g._id !== groupId)); // remove joined group from list
    }
  };

  return (
    <>
      <div className="add-friends-container">
        <h2 className="add-friends-container-header">Groups</h2>
        <div className="list-containers">
          {groups.map((group) => (
            <div
              key={group._id}
              style={{
                backgroundColor: "#ffffff15",
                padding: "10px",
                marginBottom: "8px",
                borderRadius: "6px",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div className="avatar-circle">
                  {group.groupName.charAt(0)}
                </div>
                <span className="chat-name">{group.groupName}</span>
              </div>
              <button
                style={{
                  backgroundColor: "#1e90ff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "4px 10px",
                  cursor: "pointer",
                }}
                onClick={(e) => joinGroup(e, group._id)}
              >
                Join
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


const Sidey = () => {
  const { user ,setFriendChat,setGroupChat, setIsChatOpened} = useApp();
  const navigate = useNavigate();

  const [joinedGroups, setJoinedGroups] = useState([]);
  const [friends, setFriends] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [addFriends,setAddFriends]=useState(false);
  const [isGroupsView,setIsGroupView]=useState(false);

  useEffect(() => {
    console.log("User",user)
    if (user) {
      fetchGroups();
      fetchChats();
    }
  }, []);

  useEffect(()=>{
    console.log("My Friends",friends);
    
  },[friends]);
  useEffect(()=>{
    console.log("My groups",joinedGroups);
    
  },[joinedGroups]);
  const fetchGroups = async () => {
    const response = await fetch("http://localhost:5000/api/chat/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: user._id }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setJoinedGroups(data.groups || []);
    } else {
      console.error('Failed to fetch groups');
    }
    console.log("Joined Groups",joinedGroups)
};

const fetchChats = async () => {
    let myId=user._id;
    if(user.role==="Teacher") myId=user.id
    const response = await fetch("http://localhost:5000/api/chat/friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: myId }),
    });
    
    if (response.ok) {
        const data = await response.json();
        setFriends(data.friends || []);
    } else {
        console.error('Failed to fetch chats');
    }
    console.log("Friends",friends)
  };

  const handleNewChat = () => {
    setAddFriends(true);
  };
  const handleMyChat = () => {
    setAddFriends(false);
  };

  const handleJoinGroup = () => {
    setIsGroupView(true);
  };

  const handleGroupClick = (groupId) => {
    setSelectedChat(groupId);
    setGroupChat(groupId);
  };

  const handleFriendClick = (friendId) => {
    console.log("Friend Id",friendId)
    setIsChatOpened(true);
    setFriendChat(friendId);
  };

  return (
    <div className="sidebar-container">
      <div className="group-tabs">
        <div className="groups-list">
        {joinedGroups.length > 0 &&
  joinedGroups.map((group) => (
    <div
      key={group._id}
      className="group-item"
      onClick={() => handleGroupClick(group._id)}
    >
      <div className="avatar-circle">{group.chatName[0]}</div>
      <span className="chat-name">{group.chatName}</span>
    </div>
  ))}

{friends.length > 0 &&
  friends.map((friend) => (
    <div
      key={friend._id}
      className="group-item"
      onClick={() => handleFriendClick(friend._id)}
    >
      <div className="avatar-circle">{friend.name[0]}</div>
      <span className="chat-name">{friend.name}</span>
    </div>
  ))}
        </div>
      </div>


      <div className="chat-actions">
        { !addFriends ? <button className="new-chat-btn" onClick={handleNewChat}>
          <FaPlus /> New Chats
        </button> :
         <button className="new-chat-btn" onClick={handleMyChat}>
         My Chats
       </button>
        }
        <button className="join-group-btn" onClick={handleJoinGroup}>
          Join Group
        </button>
      </div>

      {
        addFriends && <AddFriends/>
      }

      {
        isGroupsView && <GroupsCont />
      }

    </div>
  );
};

export default Sidey;
