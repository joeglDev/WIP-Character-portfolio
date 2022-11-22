import { useContext, useState } from "react";
import { SelectedCharacterContext, UserContext } from "../App";
import {
  deleteCharacterModel,
  pullAllCharDataModel,
  pullUserCharDataModel,
} from "../models/API_calls";
import CharDetails from "./CharDetails";
import CharGridItem from "./CharGridItem";
import { charData } from "../../../backend/typesAndInterfaces";
import { UploadCharacterForm } from "./UploadCharacterForm";

const CharGrid = () => {
  //context
  const userContext = useContext(UserContext);
  const user = userContext.user;
  const selectedCharacterContext = useContext(SelectedCharacterContext);
  const selectedCharacter = selectedCharacterContext.selectedCharacter;
  const setSelectedCharacter = selectedCharacterContext.setSelectedCharacter;

  //types
  interface charDataType extends charData {
    _id: string;
  }

  //states
  const [charData, setCharData] = useState<charDataType[]>([]);
  const [displayUploadCharacterForm, setDisplayUploadCharacterForm] =
    useState(false);
  const [isVisible, setIsVisible] = useState(false);

  //button functions
  const pullAllCharData = async (event: React.MouseEvent<HTMLElement>) => {
    const actual = await pullAllCharDataModel();
    setCharData(actual.characters);
  };

  const pullUserCharData = async (event: React.MouseEvent<HTMLElement>) => {
    const actual = await pullUserCharDataModel(user);
    setCharData(actual.user_characters);
  };

  const deleteCharacter = async (event: React.MouseEvent<HTMLElement>) => {
    //prevent del if user does not equal characters owner
    if (user !== selectedCharacter.ownerUsername) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      const actual = await deleteCharacterModel(user, selectedCharacter._id);
      //if char deleted successfully then optimistically render in
      //remove del character from state
      if (!actual.invalid_character) {
        const newCharData = charData.filter((char) => {
          if (char._id !== selectedCharacter._id) {
            return char;
          }
        });
        setCharData(newCharData);
        setSelectedCharacter(undefined);
      }
    }
  };

  const displayUploadCharacter = (event: React.MouseEvent<HTMLElement>) => {
    const currentState = displayUploadCharacterForm;
    setDisplayUploadCharacterForm(!currentState);
  };

  return (
    <section>
      <h1 className="chargrid__header">Welcome {user}</h1>
      <h2 className="chargrid__header">
        Click below to pull your characters ^w^
      </h2>
    <p className={isVisible ? "visible" : "not_visible"}>You cannot delete a character that is not yours.</p>
      <form className="chargrid__form">
        <button
          className="chargrid__form__button"
          type="button"
          aria-label="pull all character data"
          onClick={pullAllCharData}
        >
          All characters
        </button>
        <button
          className="chargrid__form__button"
          type="button"
          aria-label="pull your character data"
          onClick={pullUserCharData}
        >
          Your characters
        </button>
        <button
          className="chargrid__form__button"
          type="button"
          aria-label="delete selected character"
          onClick={deleteCharacter}
        >
          Delete selected character
        </button>
        <button
          className="chargrid__form__button"
          type="button"
          aria-label="upload a new character"
          onClick={displayUploadCharacter}
        >
          Open form to add a new character
        </button>
      </form>
      <UploadCharacterForm
        isOpen={displayUploadCharacterForm}
      ></UploadCharacterForm>
      <CharDetails></CharDetails>
      <ul className="charGrid__grid">
        {Array.isArray(charData)
          ? charData.map((char) => {
              return <CharGridItem char={char} key={char._id}></CharGridItem>;
            })
          : null}
      </ul>
    </section>
  );
};

export default CharGrid;
