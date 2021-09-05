import { Box, Center, Flex, SimpleGrid, Text } from '@chakra-ui/layout';
import React from 'react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/dist/client/router';
import { useColorModeValue } from '@chakra-ui/react';

import Link from 'next/link';
import { Stat, StatLabel, StatNumber } from '@chakra-ui/stat';
import { chakra } from '@chakra-ui/system';
import { BsPerson } from 'react-icons/bs';
import { FiServer } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';
import { BsAlarm, BsCardImage, BsAward } from 'react-icons/bs';

function StatsCard(props) {
	const { title, stat, icon } = props;

	return (
		<Stat
			className='title'
			px={{ base: 2, md: 4 }}
			py={'5'}
			shadow={'xl'}
			border={'1px solid'}
			borderColor={useColorModeValue('gray.400', 'gray.500')}
			rounded={'lg'}>
			<Flex justifyContent={'space-between'}>
				<Box isTruncated pl={{ base: 2, md: 4 }}>
					<StatLabel fontWeight={'medium'} isTruncated textAlign='center'>
						{title}
					</StatLabel>
					<StatNumber
						color='blue.600'
						mx='2'
						overflow='hidden'
						textOverflow='ellipsis'
						fontSize={'xl'}
						fontWeight={'medium'}
						textAlign='center'
						isTruncated>
						{stat}
					</StatNumber>
				</Box>
				<Box
					my={'auto'}
					color={useColorModeValue('gray.300', 'gray.200')}
					alignContent={'center'}>
					{icon}
				</Box>
			</Flex>
		</Stat>
	);
}

function BasicStatistics({
	country,
	collegesNumber,
	isp,
	pos,
	timezone,
	city,
	ip,
	code,
	language,
}) {
	return (
		<Box
			maxW='7xl'
			minW='12rem'
			mx={'auto'}
			mb='5%'
			pt={5}
			px={{ base: 2, sm: 12, md: 17 }}>
			<chakra.h1
				color='gray.500'
				className='title'
				textAlign={'center'}
				fontFamily='initial'
				fontSize={{ base: 'xl', xl: '6xl', lg: '4xl', md: '2xl', sm: 'xl' }}
				py={10}
				fontWeight={'bold'}>
				<Text color='blue.500' fontSize='larger' as='span'>
					“{country}”
				</Text>{' '}
				is a great country here is some information about it
			</chakra.h1>
			<SimpleGrid
				columns={{ base: 1, lg: 2, md: 2 }}
				spacing={{ base: 5, lg: 8 }}>
				<StatsCard
					title={'Colleges'}
					stat={collegesNumber}
					icon={<BsAward size={'3em'} />}
				/>
				<StatsCard title={'ISP'} stat={isp} icon={<FiServer size={'3em'} />} />
				<StatsCard
					title={'Position'}
					stat={pos}
					icon={<GoLocation size={'3em'} />}
				/>

				<StatsCard
					title={'Time Zone'}
					stat={timezone}
					icon={<BsAlarm size={'3em'} />}
				/>

				<StatsCard
					title={'City'}
					stat={city}
					icon={<BsCardImage size={'3em'} />}
				/>
				<StatsCard
					title={'Your IP'}
					stat={ip}
					icon={<BsCardImage size={'3em'} />}
				/>
				<StatsCard
					title={'Area Code'}
					stat={code}
					icon={<BsCardImage size={'3em'} />}
				/>
				<StatsCard
					title={'Language'}
					stat={language}
					icon={<BsCardImage size={'3em'} />}
				/>
			</SimpleGrid>
		</Box>
	);
}
export default function Main({ uni, cont, cur }) {
	console.log(cont);
	const router = useRouter();

	const Colleges = () => {
		return uni.map((c, index) => {
			return (
				<div key={index}>
					<Text> {}</Text>

					{c.web_pages.map((p) => (
						<Link key={index} href={p}>
							<a>
								{c.name}
								<ExternalLinkIcon mx='2px' />
							</a>
						</Link>
					))}

					{/* <ExternalLinkIcon mx='2px' /> */}
				</div>
			);
		});
	};

	return (
		<Center>
			<BasicStatistics
				country={uni ? uni[0].country.toUpperCase() : 'Not found'}
				collegesNumber={uni ? uni.length : 0}
				isp={cur.isp}
				pos={`N:${cur.lat}    E:${cur.lon}`}
				timezone={cur.timezone}
				city={cur.city}
				ip={cur.query}
				language={cont.location ? cont.location.languages[0].name : 'Not found'}
				code={cont.location ? cont.location.calling_code : 'Not found'}
			/>
		</Center>
	);
}
