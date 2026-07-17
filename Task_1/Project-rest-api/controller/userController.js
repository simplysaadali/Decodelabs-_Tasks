const userData = require("../data/userData");

function getUsers(req, res){
    const users = userData.getAll();
    res.status(200).json({
        count: user.length,
        data: users
    });
}

function getUserById(req, res){
    const id = Numnber(req.params.id);
    const user = userData.getById(id);

    if(!user){
        return res.status(404).json({error: `User with ${id} not found`});
    }

    res.status(200).json({data: user});
}

function createUser(req, res){
    const body = req.body || {};
    const name = body.name;
    const email = body.email;

    if(!name){
        return res(400).json({
            error: "name is required"
        });
    }
    if (typeof name !== "string"){
        return res(400).json({
            error: "name should be a string"
        });
    }

    if (!email) {
        return res.status(400).json({
            error: "'email' is required"
        });
    }
    if (typeof email !== "string") {
        return res.status(400).json({
            error: "'email' must be a string"
        });
    }
    if (!email.includes("@")) {
        return res.status(400).json({
            error: "'email' must be a valid email"
        });
    }

    const newUser = userData.create({
        name: name,
        email: email
    });

    res.status(201).json({
        message: "User Created Successfully",
        data: newUser
    });
}

module.exports = {getUsers, getUserById, createUser};