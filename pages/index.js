import Head from 'next/head';
import Main from '../component/Main';
import useAPI from '../component/useApI';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { Center } from '@chakra-ui/layout';

export default function Home() {

	const {
		data,
		isLoading,
		error,
	} = useAPI('https://freegeoip.app/json/');


	if (isLoading)
		return (
			<Center mt='25%'>
				<Loader
					type='Puff'
					color='#00BFFF'
					height={100}
					width={100}
					timeout={3000} //3 secs
				/>
			</Center>
		);
	if (error) return <Center mt='25%'>Failed to load...</Center>;

	return (
		<>
			<Head>
				<title>Api ZooM</title>
				<meta
					httpEquiv='Content-Security-Policy'
					content='upgrade-insecure-requests'
				/>
				<meta name='description' content='Api integration using Next js' />

				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Main data={data}  />
		</>
	);
	/* 
	async function d3() {
		const data3 = await fetch(
			`http://universities.hipolabs.com/search?country=${d1().country}`,
		);

		const uni = await data3.json();
		return uni;
	}

	async function d2() {
		const data2 = await fetch(
			`http://api.ipstack.com/oman?access_key=af98f690b4f3734a42a9025a484a464a`,
		);

		const cur = await data2.json();
		return cur;
	}

	async function d1() {
		const data1 = await fetch(`http://ip-api.com/json`);
		const cont = await data1.json();
	
		return cont;
	} */
}
