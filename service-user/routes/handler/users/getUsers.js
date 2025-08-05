const { User } = require('../../../models');

module.exports = async (req, res) => {

    // Jika ada user_ids dalam query, filter berdasarkan user_ids
    const userIds = req.query.user_ids || [];

    const sqlOptions = {
        attributes: ['id', 'name', 'email', 'profession', 'avatar']
    };

    // Jika userIds tidak kosong, maka tambahkan kondisi where
    if (userIds.length > 0) {
        sqlOptions.where = {
            id: userIds
        };
    }

    // Menggunakan findAll untuk mendapatkan daftar user
    const users = await User.findAll(sqlOptions);
    // console.log(users.length);
    // Jika tidak ada user ditemukan
    if (!users.length) {
        return res.status(404).json({
            status: 'error',
            message: 'No users found'
        });
    }
    // Mengembalikan daftar user
    return res.status(200).json({
        status: 'success',
        data: users
    });
}