import useSWR from 'swr';

export default function useAPI(api, options) {
	const { data, error } = useSWR(api, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		refreshWhenHidden: false,
		dedupingInterval: 5000,
		focusThrottleInterval: 5000,
	});

	return {
		data,
		isLoading: !error && !data,
		error,
	};
}
