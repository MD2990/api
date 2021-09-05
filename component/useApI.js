import useSWR from 'swr';

export default function useAPI(api, options) {
	const { data, error } = useSWR(api, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		refreshWhenHidden: false,
	});

	return {
		data,
		isLoading: !error && !data,
		error,
	};
}
