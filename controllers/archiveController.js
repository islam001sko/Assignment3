const axios = require('axios');

exports.getArchive = async (req, res) => {
    try {
        const type = req.query.filter || "emailed";

        const days = req.query.time || "1";
        const apiKey = process.env.NYT_API_KEY;

        const url = `https://api.nytimes.com/svc/mostpopular/v2/${type}/${days}.json?api-key=${apiKey}`;

        const response = await axios.get(url);
        const data = response.data;

        if (data.status === "OK") {
            const articles = data.results.slice(0, 3);
            res.render('archive', { articles, user: req.session.user });
        } else {
            res.render('archive', { articles: null, user: req.session.user });
        }
    } catch (error) {
        console.error('Error fetching archive data:', error);
        res.render('archive', { articles: null, user: req.session.user });
    }
};
