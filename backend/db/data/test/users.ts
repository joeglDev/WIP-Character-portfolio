import {userData} from "../../../typesAndInterfaces";


interface usersData extends Array<userData>{}

const userData: userData[] = [
    {username: "test1",
    password: "password1",
    },
    {username: "test2",
    password: "password2",
    },
    {username: "test3",
    password: "password3",
    },
];

export default userData;