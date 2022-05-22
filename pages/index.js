import Head from "next/head";
import Main from "../component/Main";
import useAPI from "../component/useApI";

import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

export default function Home() {
  const { data, isLoading, error } = useAPI("/api/h");

  if (isLoading)
    return (
      <Center mt="25%">
        <Spinner size="xl" color="blue.300" />
      </Center>
    );
  if (error) return <Center mt="25%">Failed to load...</Center>;

  return (
    <>
      <Head>
        <title>Api ZooM</title>

        <meta name="description" content="Api integration using Next js" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main data={data.country} />
    </>
  );
}
