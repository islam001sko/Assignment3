const axios = require('axios');

exports.getCountryByName = async (req, res) => {
    const countryName = req.query.countryName || "Kazakhstan";
    
    try {

        const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
        const country = response.data;
        if (!country || country.status === 404) {
            return res.render('country', { country: null, error: 'Country not found', user: req.session.user });
        }
        res.render('country', { country, user: req.session.user  });
    } catch (error) {
        console.error('Error fetching country:', error);
        res.render('country', { country: null, error: 'Failed to fetch country', user: req.session.user  });
    }
};
