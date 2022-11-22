import { useContext, useState } from "react";
import { UserContext, SelectedCharacterContext } from "../App";
import { uploadNewCharacter } from "../models/API_calls";

export const UploadCharacterForm = ({ isOpen }: any) => {
  //context
  const userContext = useContext(UserContext);
  const user = userContext.user;

  const selectedCharacterContext = useContext(SelectedCharacterContext);
  const setSelectedCharacter = selectedCharacterContext.setSelectedCharacter;
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

  const handleFormSubmission = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const newCharacter = {
      new_character: {
        ownerUsername: user,
        name: name,
        age: age.toString(),
        species: species,
        gender: gender,
        sexuality: sexuality,
        allignment: allignment,
        imgURL: imgURL,
        bio: bio,
      },
    };
    const response = await uploadNewCharacter(user, newCharacter);
    //renders new character created in character details grid
    //to allow render to grid grid charData will need to be extracted out to a context
    if (response.character_created) {
      setSelectedCharacter(response.character_created);
    }
  };

  if (isOpen && user !== "Please sign in ->") {
    return (
      <section className="UploadCharacterForm__section">
        <h3>Upload a new Character</h3>
        <form className="UploadCharacterForm__form">
          <div className="UploadCharacterForm__form__item">
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
            <label
              className="UploadCharacterForm__form__item"
              htmlFor="allignment"
            >
              Allignment:
            </label>
            <select id="allignment" onChange={changeAllignment}>
              <option value="default">Please pick one</option>
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
              Sexuality:
            </label>
            <input
              type="text"
              id="sexuality"
              onChange={changeSexuality}
            ></input>
            {/* <input type="checkbox" id="lgbtq" value="lgbtq" onChange={changeIdentity}></input>
            <label htmlFor="lgbtq">LGBTQ</label>
            <input type="checkbox" id="bi" value="bi" onChange={changeIdentity}></input>
            <label htmlFor="bi">Bisexual</label>
            <input type="checkbox" id="pan" value="pan"></input>
            <label htmlFor="pan">Pansexual</label>
            <input type="checkbox" id="lesbian" value="lesbian"></input>
            <label htmlFor="lesbian">Lesbian</label>
            <input type="checkbox" id="msm" value="msm"></input>
            <label htmlFor="msm">MSM</label>
            <input type="checkbox" id="ace" value="ace"></input>
            <label htmlFor="ace">Asexual</label>
            <input type="checkbox" id="non-binary" value="non-binary"></input>
            <label htmlFor="non-binary">non-binary</label>
            <input type="checkbox" id="trans" value="trans"></input>
            <label htmlFor="trans">Transgender</label>
            <input type="checkbox" id="agender" value="agender"></input>
            <label htmlFor="agender">Agender</label>
            <input type="checkbox" id="genderfluid" value="genderfluid"></input>
            <label htmlFor="genderfluid">Genderfluid</label>
            <input type="checkbox" id="demiboy" value="demiboy"></input>
            <label htmlFor="demiboy">Demiboy</label>
            <input type="checkbox" id="demigirl" value="demigirl"></input>
            <label htmlFor="demigirl">Demigirl</label>*/}
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
          
        </form>
        <div className={"UploadCharacterForm__form__item" + " btn"}>
            <button
              className="chargrid__form__button"
              type="button"
              aria-label="upload a new character"
              onClick={handleFormSubmission}
            >
              Upload new character
            </button>
          </div>
      </section>
    );
  } else if (isOpen && user === "Please sign in ->") {
    return <h3>Please login to upload characters</h3>;
  } else {
    return <></>;
  }
};
