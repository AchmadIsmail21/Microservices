const { User } = require('../../../models');

module.exports = async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id, {
        attributes: ['id', 'name', 'email', 'profession', 'avatar']
    });
    // console.log(user.dataValues);
    // Jika user tidak ditemukan
    if(!user){
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        });
    }
    
    return res.status(200).json({
        status: 'success',
        data: user
    });
}