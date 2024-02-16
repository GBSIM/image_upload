const { Router } = require('express');
const userRouter = Router();

userRouter.post("/register", (req,res) => {
    console.log(req.body);
    res.json({ message: "user registered" });
})

module.exports = { userRouter };
