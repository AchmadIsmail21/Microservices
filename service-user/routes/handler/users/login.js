const bcrypt = require('bcrypt');
const { User } = require('../../../models');
const Validator = require('fastest-validator');

const v = new Validator();

module.exports = async (req, res) => {
    // const { email, password } = await req.body;
    const schema = {
        email: 'email|empty:false',
        password: 'string|min:6'
    }

    const validate = v.validate(req.body, schema);

    // console.log(validate.length);
    // Jika error validasi ditemukan
    if(validate.length){
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }
    // Mencari user berdasarkan email
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });

    // console.log(user);
    // Jika user tidak ditemukan
    if(!user){
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        })
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    // console.log(isValidPassword);

    if(!isValidPassword){
        return res.status(401).json({
            status: 'error',
            message: 'Invalid password'
        });
    }

    res.status(200).json({
        status: 'success',
        message: 'Login successful',
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            profession: user.profession
        }
    });

}