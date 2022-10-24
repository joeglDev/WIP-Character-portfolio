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
    imgURL: "https://d.furaffinity.net/art/scaledscientist/1560355662/1560355662.scaledscientist_hiroji-traxon-2.png",
  },
  {
    ownerUsername: "test1",
    name: "B",
    age: "20",
    species: "Sergal",
    gender: "F",
    sexuality: "straight",
    allignment: "lawful good",
    height: "140",
    weight: "70",
    imgURL: "https://d.furaffinity.net/art/scaledscientist/1585250880/1585250880.scaledscientist_zellogi_s_derision_krita_wip_v3.jpg",
  },
  {
    ownerUsername: "test2",
    name: "C",
    age: "30",
    species: "Protogen",
    gender: "NB",
    sexuality: "Ace",
    allignment: "",
    height: "",
    weight: "",
    imgURL: "https://d.furaffinity.net/art/scaledscientist/1541436639/1541436639.scaledscientist_ref_sheet_synteny_1_v2.png",
  },
];

export default charsData;
