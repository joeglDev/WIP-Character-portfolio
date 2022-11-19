import {charData} from "../../../typesAndInterfaces";

interface charsData extends Array<charData>{}

const charsData: charData[] = [
  {
    ownerUsername: "test1",
    name: "A",
    age: "125",
    species: "Human",
    gender: "Male",
    sexuality: "gay msm",
    allignment: "chaotic neutral",
    height: "170",
    weight: "54",
    imgURL: "https://img.gamewith.net/img/0661a8019adb93ce1cd18de5dc4aaa8c.jpg",
    bio: "Hello there!",
  },
  {
    ownerUsername: "test1",
    name: "B",
    age: "20",
    species: "Gormotti",
    gender: "F",
    sexuality: "straight",
    allignment: "lawful good",
    height: "140",
    weight: "70",
    imgURL: "https://risibank.fr/cache/medias/0/27/2795/279561/full.png",
    bio: "",
  },
  {
    ownerUsername: "test2",
    name: "Eunie",
    age: "30",
    species: "High Entia",
    gender: "NB",
    sexuality: "Ace",
    allignment: "",
    height: "",
    weight: "",
    imgURL: "https://images.nintendolife.com/77fad5e895082/xenoblade-chronicles-3-eunie.large.jpg",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

export default charsData;
