import { useContext, useState } from "react";
import { UserContext } from "../App";

export const UploadCharacterForm = ({ isOpen }: any) => {
  //context
  const userContext = useContext(UserContext);
  const user = userContext.user;
  //states

  //functions
  const changeName = () => {};
  const changeAge = () => {};
  const changeSpecies = () => {};
  const changeGender = () => {};
  const changeSexuality = () => {};
  const changeImgURL = () => {};
  const changeBio = () => {};

  const handleFormSubmission = (event: React.MouseEvent<HTMLElement>) => {};

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
            {" "}
            <label
              className="UploadCharacterForm__form__item"
              htmlFor="sexuality"
            >
              Sexuality:
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
