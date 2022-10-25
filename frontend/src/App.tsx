import "./App.css";
import { createContext, useState } from "react";
import LoginBar from "./components/LoginBar";
import  CharGrid  from "./components/CharGrid";

//types for context
type UserContextType = {
  user: string;
  setUser: (newSession: string) => void;
};

export const UserContext = createContext<UserContextType | any>(undefined);

function App() {
  //set up default user context
  const [user, setUser] = useState<string>("Please sign in ->");

  return (
    <UserContext.Provider value={{user, setUser}}>
      <LoginBar></LoginBar>
      <CharGrid></CharGrid>
    </UserContext.Provider>
  );
}

export default App;
