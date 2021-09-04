import Head from 'next/head';
import Main from '../component/Main';
import useAPI from '../component/useApI';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { Center } from '@chakra-ui/layout';

export default function Home() {
	const { data, isLoading, error } = useAPI('/api/h');

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
	if (error) return <Center mt='25%'>failed to load...</Center>;

	return (
		<>
			<Head>
				<title>Api ZooM</title>
				<meta name='description' content='Api integration using Next js' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Main uni={data.uni} cont={data.cont} cur={data.cur} />
		</>
	);
}
