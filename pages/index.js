import Head from "next/head";
import Main from "../component/Main";
import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

export default function Home({ res }) {

  if (!res)
    return (
      <Center mt="25%">
        <Spinner size="xl" color="blue.300" />
      </Center>
    );

  return (
    <>
      <Head>
        <title>Api ZooM</title>

        <meta name="description" content="Api integration using Next js" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main data={res} />
    </>
  );
}

export async function getStaticProps() {
  const data = await fetch(
    `https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=${process.env.KEY}`
  );
  let res = await data.json();

  res = res.results.sort((a, b) =>
    a.published_date > b.published_date ? -1 : 1
  );

  return {
    props: {
      res,
    },
    revalidate: 60 * 60,
  };
}
