import "./App.css";
import { createContext, useState } from "react";
import LoginBar from "./components/LoginBar";
import  CharGrid  from "./components/CharGrid";

//types for context
type UserContextType = {
  user: string;
  setUser: (newSession: string) => void;
};

type SelectedCharacterContextType = {
  char: any;
  setSelectedCharacter: (newSession: string) => void;
};

export const UserContext = createContext<UserContextType | any>(undefined);
export const SelectedCharacterContext = createContext<SelectedCharacterContextType | any>(undefined);

function App() {
  //set up default user context
  const [user, setUser] = useState<string>("Please sign in ->");
  const [selectedCharacter, setSelectedCharacter] = useState<any>(undefined);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <SelectedCharacterContext.Provider value={{selectedCharacter, setSelectedCharacter}}>
      <LoginBar></LoginBar>
      <CharGrid></CharGrid>
      </SelectedCharacterContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
