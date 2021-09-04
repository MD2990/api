import Head from 'next/head';
import Main from '../component/Main';

export default function Home({ uni, cont, cur }) {
	return (
		<>
			<Head>
				<title>Api ZooM</title>
				<meta name='description' content='Api integration using Next js' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Main uni={uni} cont={cont} cur={cur} />
		</>
	);
}

export async function getServerSideProps(context) {
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

	if (!cont || !cur || !uni) {
		return {
			notFound: true,
		};
	}

	return {
		props: { uni, cont, cur }, // will be passed to the page component as props
	};
}
