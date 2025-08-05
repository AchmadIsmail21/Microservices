const { RefreshToken, User } = require('../../../models');

module.exports = async (req, res) => {
    const userId = req.body.user_id;
    const user = await User.findByPk(userId);
    // Check if user exists
    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        });
    }

    // Check jika user is already logged out
    const existingToken = await RefreshToken.findOne({ where: { user_id: userId } });
    if (!existingToken) {
        return res.status(400).json({
            status: 'error',
            message: 'User is already logged out'
        });
    }

    // Delete the refresh token for the user
    await RefreshToken.destroy({
        where: { user_id: userId }
    });

    return res.status(200).json({
        status: 'success',
        message: 'User logged out successfully'
    });

}