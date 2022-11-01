import { useContext } from "react";
import { SelectedCharacterContext } from "../App";

const CharDetails = () => {
  //context
  const context = useContext(SelectedCharacterContext);
  const selectedCharacter = context.selectedCharacter;

  if (!selectedCharacter) {
    return <section className="charGrid__grid__item placeholder"></section>;
  } else {
    //destructure selectedCharacter
    const { name } = selectedCharacter;
    return (
      <section className="charGrid__grid__item">
        <h3>{name}</h3>
      </section>
    );
  }
};

export default CharDetails;
