// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from 'axios';

export default function handler(req, res) {
	var options = {
		method: 'GET',
		url: 'https://ipinfo.io/5.36.180.112/geo',
		//params: { query: 'new york', locale: 'en_US' },
	};

	axios
		.request(options)
		.then(function (response) {
			return res.json({ data: response.data });
		})
		.catch(function (error) {
			console.error(error);
		});
}
