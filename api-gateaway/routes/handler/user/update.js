const apiAdapter = require('../../apiAdapter');
const {
    URL_SERVICE_USER,
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);
module.exports = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await api.put(`/users/update/${userId}`, req.body);
        console.log(user.data);
        return res.status(200).json(user.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({
                status: 'error',
                message: 'Service Unavailable'
            });
        }

        if (error.response) {
            const { status, data } = error.response;
            return res.status(status).json(data);
        } else {
            return res.status(500).json({
                status: 'error',
                message: error.message || 'Unexpected error'
            });
        }
    }
}