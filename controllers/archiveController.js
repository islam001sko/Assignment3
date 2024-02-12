const axios = require('axios');

exports.getArchive = async (req, res) => {
    const year = req.query.year || "2021";
    const month = req.query.month || "7";
    const apiKey = process.env.NYT_API_KEY;

    if (!year || !month) {
        return res.render('archive', { articles: null, user: req.session.user });
    }

    const url = `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        console.log(data);
        const articles = data.response.docs.slice(0, 3);
        res.render('archive', { articles, user: req.session.user });
    } catch (error) {
        console.error('Error fetching archive data:', error);
        res.render('archive', { articles: null, user: req.session.user });
    }
};
