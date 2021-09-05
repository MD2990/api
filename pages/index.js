import Head from 'next/head';
import Main from '../component/Main';
import useAPI from '../component/useApI';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { Center } from '@chakra-ui/layout';

export default function Home() {
	const api = process.env.NEXT_PUBLIC_API;

	const {
		data: d1D,
		isLoading: d1L,
		error: d1E,
	} = useAPI('http://ip-api.com/json');

	const {
		data: d2D,
		isLoading: d2L,
		error: d2E,
	} = useAPI(`http://api.ipstack.com/85.154.239.230?access_key=${api}`);

	const {
		data: d3D,
		isLoading: d3L,
		error: d3E,
	} = useAPI(
		`http://universities.hipolabs.com/search?country=${
			d1D ? d1D.country : 'oman'
		}`,
	);

	if (d1L || d2L || d3L)
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
	if (d1E || d2E || d3E) return <Center mt='25%'>failed to load...</Center>;

	return (
		<>
			<Head>
				<title>Api ZooM</title>
				<meta name='description' content='Api integration using Next js' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Main uni={d3D} cont={d2D} cur={d1D} />
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
