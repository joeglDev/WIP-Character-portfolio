import { useState } from "react";
import CharDetails from "./CharDetails";

const CharGridItem = ({ char }: any) => {
  const { name, ownerUsername, imgURL } = char;

  //states
  const [isOpen, setIsOpen] = useState(false);

  //functions
  const toggleOpen = () => {
    let inverseIsOpen = !isOpen;
    setIsOpen(inverseIsOpen);
  };

  //details of a specific character

  return (
    <article
      className="charGrid__grid__item"
      onClick={() => {
        toggleOpen();
      }}
    >
      <div>
        <img
          id="a"
          src={imgURL}
          alt={`Character name: ${name}, Owner name: ${ownerUsername}`}
        ></img>
        <p id="b">{char.name}</p>
      </div>

      <CharDetails charDetails={char} isOpenState={isOpen}></CharDetails>
    </article>
  );
};

export default CharGridItem;
