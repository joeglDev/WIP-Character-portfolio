import { useContext } from "react";
import { SelectedCharacterContext } from "../App";

const CharDetails = () => {
  //context
  const context = useContext(SelectedCharacterContext);
  const selectedCharacter = context.selectedCharacter;

  if (!selectedCharacter) {
    return <section className="charGrid__details"></section>;
  } else {

    //destructure selectedCharacter
    const { name, ownerUsername, bio, _id, imgURL } = selectedCharacter;
    const keys = Object.keys(selectedCharacter);
    const uppercaseKeys = (key: string) => {
      const letters = key.split("");
      const capitalisedLetters = letters.map((letter, index) => {
       return index === 0 ? letter.toUpperCase() : letter
      });
      const newTitle = capitalisedLetters.join("");
      return newTitle
    }; 
    keys.splice(keys.indexOf("_id"), 1);
    keys.splice(keys.indexOf("bio"), 1);
    keys.splice(keys.indexOf("imgURL"), 1);

    return (
      <section className="charGrid__details">
        <div className="charGrid__details__item">
          <h3>{name}</h3>
          <ul>
            {keys.map((key) => {
              return (
                <li className="charGrid__details__catagory__li">
                  <p className="charGrid__details__title">{key === "ownerUsername" ? "Owner" : uppercaseKeys(key)}:</p>
                  <p className="charGrid__details__title">
                    {selectedCharacter[key]}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="charGrid__details__item">
          <h3>Biography</h3>
          <p>{bio}</p>
        </div>

        <div className="charGrid__details__item">
          <img
            id={_id}
            src={imgURL}
            alt={`Character name: ${name}, Owner name: ${ownerUsername}`}
          ></img>
        </div>
      </section>
    );
  }
};

export default CharDetails;
