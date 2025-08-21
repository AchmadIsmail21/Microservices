const apiAdapter = require('../../apiAdapter');
const {
    URL_SERVICE_MEDIA
} = process.env;

const api = apiAdapter(URL_SERVICE_MEDIA);
module.exports = async (req, res) => {
    try {
        const media = await api.delete(`/media/${req.params.id}`);
        return res.status(200).json(media.data);
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
};
