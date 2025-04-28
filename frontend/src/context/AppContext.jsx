import { createContext, useContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tab,setTab]=useState("Profile");
  const [friendChat,setFriendChat]=useState({});
  const [groupChat,setGroupChat]=useState({});
  const [tabClick, setTabClick] = useState();
  const [isChatOpened,setIsChatOpened]=useState(false);
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [user, setUser] = useState({});
  const [admin,setAdmin]=useState({});
  const [loading, setLoading] = useState(true);
  const [availableClass , setAvailableClass] = useState([]);
  const [joinedClasses, setJoinedClasses] = useState([]);
  const [currentClass , setCurrentClass] = useState({});
  const [placementOption , setPlacementOption] = useState(false);

    useEffect(() => {
      const state = localStorage.getItem('isloggedIn');
      const bool = state === "true";
      setIsLoggedIn(bool);
      console.log(isLoggedIn)
      const newState=localStorage.getItem("user");
      setUser(JSON.parse(newState));
      console.log(typeof newState)
    }, []);


  


  const states = {
    user,
    loading,
    isLoggedIn,
    setIsLoggedIn,
    setUser,
    tab,
    setTab,
    availableClass,
    setAvailableClass, 
    joinedClasses, 
    setJoinedClasses,
    currentClass , 
    setCurrentClass,
    friendChat,
    setFriendChat,
    isChatOpened,
    setIsChatOpened,
    groupChat,
    setGroupChat,
    placementOption , 
    setPlacementOption,
    admin,
    setAdmin,
    tabClick,
    setTabClick
  };

  return <AppContext.Provider value={states}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
