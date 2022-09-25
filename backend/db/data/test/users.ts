//may want to add an incrementing id number
interface userData {
    username: string,
    password: string,
};

interface usersData extends Array<userData>{}

const userData: userData[] = [
    {username: "test1",
    password: "password",
    },
    {username: "test2",
    password: "password",
    },
    {username: "test3",
    password: "password",
    }
];

export default userData;