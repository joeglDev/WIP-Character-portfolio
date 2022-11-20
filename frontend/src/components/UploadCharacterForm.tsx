import { useContext, useState } from "react";
import { UserContext } from "../App";

export const UploadCharacterForm = ({ isOpen }: any) => {
  //context
  const userContext = useContext(UserContext);
  const user = userContext.user;
  //states
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");
  const [sexuality, setSexuality] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [bio, setBio] = useState("");
  const [allignment, setAllignment] = useState("");

  //functions
  const changeName = (event: React.ChangeEvent) => {
    const target = event.target as HTMLTextAreaElement;
    setName(target.value);
  };
  const changeAge = (event: React.ChangeEvent) => {
    const target = event.target as HTMLTextAreaElement;
    setAge(target.value);
  };
  const changeSpecies = (event: React.ChangeEvent) => {
    const target = event.target as HTMLTextAreaElement;
    setSpecies(target.value);
  };
  const changeGender = (event: React.ChangeEvent) => {
    const target = event.target as HTMLTextAreaElement;
    setGender(target.value);
  };
  const changeSexuality = (event: React.ChangeEvent) => {
    const target = event.target as HTMLTextAreaElement;
    setSexuality(target.value);
  };
  const changeImgURL = (event: React.ChangeEvent) => {
    const target = event.target as HTMLTextAreaElement;
    setImgURL(target.value);
  };
  const changeBio = (event: React.ChangeEvent) => {
    const target = event.target as HTMLTextAreaElement;
    setBio(target.value);
  };

  const changeAllignment = (event: React.ChangeEvent) => {
    const target = event.target as HTMLTextAreaElement;
    setAllignment(target.value);
  };

  const handleFormSubmission = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const newCharacter = {
      new_character: {
        ownerUsername: user,
        name: name,
        age: age,
        species: species,
        gender: gender,
        sexuality: sexuality,
        allignment: allignment,
        imgURL: imgURL,
        bio: bio,
      },
    };
    console.log("new char obj", newCharacter)
  };

  if (isOpen && user !== "Please sign in ->") {
    return (
      <section className="UploadCharacterForm__section">
        <h3>Upload a new Character</h3>
        <form className="UploadCharacterForm__form">
          <div className="UploadCharacterForm__form__item">
            {" "}
            <label className="UploadCharacterForm__form__item" htmlFor="name">
              Name:
            </label>
            <input
              className="UploadCharacterForm__form__item"
              id="name"
              type="text"
              onChange={changeName}
            ></input>
          </div>

          <div className="UploadCharacterForm__form__item">
            {" "}
            <label className="UploadCharacterForm__form__item" htmlFor="age">
              Age:
            </label>
            <input
              className="UploadCharacterForm__form__item"
              id="age"
              type="number"
              onChange={changeAge}
            ></input>
          </div>

          <div className="UploadCharacterForm__form__item">    
            <label className="UploadCharacterForm__form__item" htmlFor="allignment">
              Allignment:
            </label>
            <select  id="allignment" onChange={changeAllignment}>
        <option value="Lawful Good">Lawful Good</option>
        <option value="Neutral Good">Neutral Good</option>
        <option value="Chaotic Good">Chaotic Good</option>
        <option value="Lawful Neutral">Lawful Neutral</option>
        <option value="True Neutral">True Neutral</option>
        <option value="Chaotic Neutral">Chaotic Neutral</option>
        <option value="Lawful Evil">Lawful Evil</option>
        <option value="Neutral Evil">Neutral Evil</option>
        <option value="Chaotic Evil">Chaotic Evil</option>
    </select>
          </div>

          <div className="UploadCharacterForm__form__item">
            <label
              className="UploadCharacterForm__form__item"
              htmlFor="species"
            >
              Species:
            </label>
            <input
              className="UploadCharacterForm__form__item"
              id="species"
              type="text"
              onChange={changeSpecies}
            ></input>
          </div>

          <div className="UploadCharacterForm__form__item">
            <label className="UploadCharacterForm__form__item" htmlFor="gender">
              Gender:
            </label>
            <input
              className="UploadCharacterForm__form__item"
              id="gender"
              type="text"
              onChange={changeGender}
            ></input>
          </div>

          <div className="UploadCharacterForm__form__item">
          
            <label
              className="UploadCharacterForm__form__item"
              htmlFor="sexuality"
            >
              Sexuality and Gender identity:
            </label>
            <input
              className="UploadCharacterForm__form__item"
              id="sexuality"
              type="text"
              onChange={changeSexuality}
            ></input>
          </div>

          <div className="UploadCharacterForm__form__item">
            <label className="UploadCharacterForm__form__item" htmlFor="imgURL">
              Image Link:
            </label>
            <input
              className="UploadCharacterForm__form__item"
              id="imgURL"
              type="url"
              onChange={changeImgURL}
            ></input>
          </div>

          <div className="UploadCharacterForm__form__item">
            <label className="UploadCharacterForm__form__item" htmlFor="bio">
              Biography:{" "}
            </label>
            <textarea
              className="UploadCharacterForm__form__item"
              id="bio"
              onChange={changeBio}
            ></textarea>
          </div>
          <div className={"UploadCharacterForm__form__item" + " last"}>
            <button
              className="chargrid__form__button"
              type="button"
              aria-label="upload a new character"
              onClick={handleFormSubmission}
            >
              Upload new character
            </button>
          </div>
        </form>
      </section>
    );
  } else if (isOpen && user === "Please sign in ->") {
    return <h3>Please login to upload characters</h3>;
  } else {
    return <></>;
  }
};
