import { useState } from "react";

const CharGridItem = ({ char }: any) => {
  const { _id, name, ownerUsername, imgURL } = char;

  //states
  const [isOpen, setIsOpen] = useState(false);

  //functions
  const toggleOpen = () => {
    let inverseIsOpen = !isOpen;
    setIsOpen(inverseIsOpen);
  };

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
    </article>
  );
};

export default CharGridItem;
