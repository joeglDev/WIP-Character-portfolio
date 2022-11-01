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
    const {
      name,
      ownerUsername,
      age,
      species,
      gender,
      sexuality,
      allignment,
      bio,
      _id,
      imgURL
    } = selectedCharacter;
    return (
      <section className="charGrid__details">
        <div className="charGrid__details__item">
        <h3>{name}</h3>
          <div>
            <p className="charGrid__details__title">
              Created by:
              {ownerUsername}
            </p>
          </div>
          <div className="charGrid__details__catagory__div">
            <p className="charGrid__details__title">Age: </p>
            <p>{age}</p>
          </div>
          <div className="charGrid__details__catagory__div">
            <p className="charGrid__details__title">Species: </p>
            <p>{species}</p>
          </div>
          <div className="charGrid__details__catagory__div">
            <p className="charGrid__details__title">Gender: </p>
            <p>{gender}</p>
          </div>
          <div className="charGrid__details__catagory__div">
            <p className="charGrid__details__title">Sexuality: </p>
            <p> {sexuality}</p>
          </div>
          <div className="charGrid__details__catagory__div">
            <p className="charGrid__details__title">Allignment: </p>
            <p> {allignment}</p>
          </div>
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
