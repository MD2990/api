// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
	/* 	const data1 = await fetch(`http://ip-api.com/json`);
	const cont = await data1.json();

	res.json({cont}) */

	const api = process.env.API;

	const data1 = await fetch(`http://ip-api.com/json`);
	const cont = await data1.json();

	const data2 = await fetch(
		`http://api.ipstack.com/${cont.query}?access_key=${api}`,
	);

	const cur = await data2.json();

	const data3 = await fetch(
		`http://universities.hipolabs.com/search?country=${cont.country}`,
	);

	const uni = await data3.json();
	res.json({ uni, cont, cur });
}
