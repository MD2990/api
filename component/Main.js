import { Center } from '@chakra-ui/layout';

import React from 'react';

export default function Main({ data, data2 }) {
	return (
		<Center>
			<pre>{JSON.stringify(data, null, 2)}</pre>
			<pre>{JSON.stringify(data2, null, 2)}</pre>
		</Center>
	);
}
