let users = [
    {
        id: 1,
        name: "James",
        email: "james@testing.com"
    },

    {
        id: 2,
        name: "William",
        email: "william@testing.com"
    }
];

let comingID = 3;

function getAll(){
    return users;
}

function getById(id){
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            return users[i];
        }
    }
    return undefined;
}

function create({name, email}){
    const newUser = {
        id: comingID++,
        name,
        email
    };
    users.push(newUser);

    return newUser;
}

module.exports = { getAll, getById, create };