exports.getArchive = async (req, res) => {
    const year = req.query.year;
    const month = req.query.month;
    const apiKey = process.env.NYT_API_KEY;

    if (!year || !month) {
        return res.render('archive', { articles: null, user: req.session.user });
    }

    const url = `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${apiKey}`;

    try {
        const fetch = (await import('node-fetch')).default;

        const response = await fetch(url);
        const data = await response.json();
        const articles = data.response.docs.slice(0, 3);
        res.render('archive', { articles, user: req.session.user });
    } catch (error) {
        console.error('Error fetching archive data:', error);
        res.render('archive', { articles: null, user: req.session.user });
    }
};
