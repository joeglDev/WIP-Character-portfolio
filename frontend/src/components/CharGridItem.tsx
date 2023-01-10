import { useContext } from "react";
import { SelectedCharacterContext } from "../App";

const CharGridItem = ({ char }: any) => {
  const { name, ownerUsername, imgURL } = char;

  //context
  const context = useContext(SelectedCharacterContext);
  const setSelectedCharacter = context.setSelectedCharacter;

  //methods
   /**
    * Listens for a enter keydown event and passes image of event's char data to setSelectedCharacter context.
    * 
    * @param {React.KeyboardEvent<HTMLImageElement>} event - Keyboard event which is passed to function on keydown of img.
    */
   const handleEnterKeyDown = (event: React.KeyboardEvent<HTMLImageElement>) => {
    if (event.key === 'Enter') {
      setSelectedCharacter(char);
    }
  }

  return (
    <article
      className="charGrid__grid__item"
      onClick={() => {
        setSelectedCharacter(char);
      }}
    >
      <div>
        <img
          tabIndex={0}
          onKeyDown={handleEnterKeyDown}
          id="a"
          src={imgURL}
          alt={`Character name: ${name}, Owner name: ${ownerUsername}`}
        ></img>
        <p id="b">{char.name}</p>
      </div>
    </article>
  );
};

export default CharGridItem;
