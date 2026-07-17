const express = require("express");
const userRoutes = require("./routes/userRoutes");

const code = express();
const PORT = 3000;

code.use(express.json());

code.get("/", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Server Running"
    });
});

code.use("/user", userRoutes);

code.use((req, res) => {
    res.status(404).json({
        message: "User not found"
    });
});

code.listen(3000, () =>{
    console.log(`Server listening at http://localhost:${PORT}`);
});