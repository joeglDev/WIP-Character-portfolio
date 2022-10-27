interface charData {
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
};

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
    name: "C",
    age: "30",
    species: "High Entia",
    gender: "NB",
    sexuality: "Ace",
    allignment: "",
    height: "",
    weight: "",
    imgURL: "https://images.nintendolife.com/77fad5e895082/xenoblade-chronicles-3-eunie.large.jpg",
    bio: "",
  },
];

export default charsData;
