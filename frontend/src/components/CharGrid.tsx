import { useContext, useState } from "react";
import { UserContext } from "../App";
import {
  pullAllCharDataModel,
  pullUserCharDataModel,
} from "../models/API_calls";

const CharGrid = () => {
  //context
  const context = useContext(UserContext);
  const user = context.user;

  //types
  interface charDataType {
    _id: string;
    ownerUsername: string;
    name: string;
    age: string;
    species: string;
    gender: string;
    sexuality: string;
    allignment: string;
    height: string;
    weight: string;
    imgURL: string;
    bio: string;
  }

  //states
  const [charData, setCharData] = useState<charDataType[]>([]);

  //button functions
  const pullAllCharData = async (event: React.MouseEvent<HTMLElement>) => {
    const actual= await pullAllCharDataModel();
    setCharData(actual.characters);
  };

  const pullUserCharData = async (event: React.MouseEvent<HTMLElement>) => {
    const actual = await pullUserCharDataModel(user);
    setCharData(actual.user_characters);
  };

  return (
    <section>
      <h1 className="chargrid__header">Welcome {user}</h1>
      <h2 className="chargrid__header">
        Click below to pull your characters ^w^
      </h2>
      <form className="chargrid__form">
        <button
          className="chargrid__form__button"
          type="button"
          aria-label="pull all character data"
          onClick={pullAllCharData}
        >
          All characters
        </button>
        <button
          className="chargrid__form__button"
          type="button"
          aria-label="pull your character data"
          onClick={pullUserCharData}
        >
          Your characters
        </button>
      </form>
      <ul className="charGrid__grid">
        {Array.isArray(charData)
          ? charData.map(({ name, imgURL, ownerUsername, _id }) => {
            const [s, sets] = useState("")
              return (
                <article className="charGrid__grid__item" key={_id}>
                    <div>
                  <img id="a"
                    src={imgURL}
                    alt={`Character name: ${name}, Owner name: ${ownerUsername}`}
                  ></img>
                  <p id="b">{name}</p>
                  </div>
                </article>
              );
            })
          : null}
      </ul>
    </section>
  );
};

export default CharGrid;
