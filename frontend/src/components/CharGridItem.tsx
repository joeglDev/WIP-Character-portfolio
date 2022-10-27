import { useState } from "react";

const CharGridItem = ({char}:any) => {
    const {_id, name, ownerUsername, imgURL} =char;

    //states
    const [isOpen, setIsOpen] = useState(false);
    //implements component composition toggle here

    return (
        <article className="charGrid__grid__item">
                    <div>
                  <img id="a"
                    src={imgURL}
                    alt={`Character name: ${name}, Owner name: ${ownerUsername}`}
                  ></img>
                  <p id="b">{char.name}</p>
                  </div>
                </article>
    )
};

export default CharGridItem;