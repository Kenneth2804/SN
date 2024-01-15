require("dotenv").config();
const {Router} = require ("express");
const bcrypt = require("bcrypt");
const {User} = require ("../db.js");

const router = Router();

router.post("/", async (req, res)=>{
    let { email, nickname, name, picture,password} = req.body;
    const saltRounds = 10; 

    if(!email){
        return res.status(200).json("No email");
    }
    
    try {
        const whereisuser = await User.findOne({
            where: {
              email: email
            }
          });
        if (whereisuser) {
            if(!(whereisuser.available)) 
            return res.status(200).send("Suerte para la proxima vaquero")
        }
        if(whereisuser === null){
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newuser = await User.create({
                email,
                nickname,
                name,
                picture,
                password: hashedPassword 
            });

            return res.status(200).send(newuser);
        }
        return res.status(200).json("user ya existe")
    } catch (error) {
        return res.status(400).json(error.message);
        
    }
})
module.exports = router;