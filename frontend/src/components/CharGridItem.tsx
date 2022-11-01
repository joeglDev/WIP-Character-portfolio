import {  useContext } from "react";
import { SelectedCharacterContext } from "../App";

const CharGridItem = ({ char }: any) => {
  const { name, ownerUsername, imgURL } = char;

  //context
  const context = useContext(SelectedCharacterContext);
  const setSelectedCharacter = context.setSelectedCharacter;

  return (
    <article
      className="charGrid__grid__item"
      onClick={(() => {setSelectedCharacter(char)})}
    >
      <div>
        <img
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
