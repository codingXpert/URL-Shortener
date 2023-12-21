import User from '../models/user';

const registerUser = async(req, res) => {
    try {
        const {username, email, password} = req.body;
        if(username && email && password){
            const userData = new User({
                username: username,
                email: email,
                password: password
            });
            await userData.save();
        }else{
            req.status(400).send({"status": "failed","message": "All fields are required"});
        }
    } catch (error) {
        res.status(500).json({"status": "failed", "message": "Unable To Register"});
    }
}

export default {
    registerUser
}