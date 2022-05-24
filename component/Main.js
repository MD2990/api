import {
  Box,
  Center,
  Text,
  Link,
  Stack,
  Heading,
  HStack,
} from "@chakra-ui/layout";
import { Wrap, WrapItem } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
import { useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import SearchInput from "./SearchInput";
import { useSnapshot } from "valtio";
import state from "../stor";
import Paginate from "./Paginate";



function News({
  title,
  url,
  byline,
  published_date,
  caption,
  img,
  i,
}) {
  return (
    <WrapItem>
      <Center py={12}>
        <Box
          role={"group"}
          p={6}
          maxW={"330px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
        >
          <Box
            className="title"
            rounded={"lg"}
            mt={-12}
            pos={"relative"}
            height={"230px"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              backgroundImage: `url(${img})`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Image
              alt="image"
              rounded={"lg"}
              height={230}
              width={282}
              objectFit={"cover"}
              src={img}
            />
          </Box>
          <Stack pt={10} align={"center"}>
            <Text
              color={"gray.500"}
              fontSize={"sm"}
              textTransform={"uppercase"}
            >
              {title}
            </Text>
            <Link
              href={url}
              isExternal
              m="1.5"
              p="0.5"
              _focus={{
                boxShadow: "none",
                outline: "none",
              }}
              _hover={{
                textDecoration: "none",
              }}
            >
              <Heading fontSize={"xl"} fontFamily={"body"} fontWeight={500}>
                {caption.length > 50
                  ? caption.substring(0, 80) + "..."
                  : caption}
              </Heading>
            </Link>
            <HStack w="full" justify="space-between">
              <Text fontWeight={"hairline"} fontSize={"xx-small"}>
                {i}
              </Text>
              <Text fontWeight={100} fontSize={"xx-small"}>
                {published_date}
              </Text>
              <Text as="cite" fontSize={"x-small"} color={"gray.600"}>
                {byline}
              </Text>
            </HStack>
          </Stack>
        </Box>
      </Center>
      {/*   <Box
        overflow={"clip"}
        fontSize={["sm", "md", "xl", "3xl"]}
        textAlign="center"
      >
        <Text color="blue.500" fontSize={["sm", "md", "lg"]}>
          {title}
        </Text>
        <Image
          src={img}
          height={"200px"}
          width={"300px"}
          layout="fixed"
          alt="name"
        />
        <Text textAlign="left">{caption}</Text>

        <Link
          href={url}
          isExternal
          m="1.5"
          p="0.5"
          _focus={{
            boxShadow: "none",
            outline: "none",
          }}
        >
          <LinkIcon />
        </Link>

        <Text fontSize={"xs"}>{byline}</Text>

        <Text color="blue.500" fontSize={"xx-small"}>
          {i}
        </Text>
      </Box> */}

      {/*    <StatsCard
          title={"Country Code"}
          stat={url}
          icon={<BsAward size={"3em"} />}
        /> */}
      {/*   <StatsCard
          title={"Region Name"}
          stat={region_name}
          icon={<FiServer size={"3em"} />}
        />
        <StatsCard
          title={"Position"}
          stat={byline}
          icon={<GoLocation size={"3em"} />}
        />

        <StatsCard
          title={"Time Zone"}
          stat={published_date}
          icon={<BsAlarm size={"3em"} />}
        />

        <StatsCard title={"City"} stat={city} icon={<BsGeo size={"3em"} />} />
        <StatsCard
          title={"Your IP"}
          stat={ip}
          icon={<BsTypeItalic size={"3em"} />}
        />
        <StatsCard
          title={"Region Code"}
          stat={region_code}
          icon={<BsLayers size={"3em"} />}
        />
        <StatsCard
          title={"Zip Code"}
          stat={zip_code}
          icon={<BsFileEarmarkCode size={"3em"} />}
        /> */}
    </WrapItem>
  );
}

export default function Main({ data }) {
  const snap = useSnapshot(state);

  const rs = useCallback(
    () => snap.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE),
    [snap.PER_PAGE, snap.offset, snap.searchResults]
  );

  useEffect(() => {
    rs();
  }, [rs]);

  useEffect(() => {
    state.searchResults = data;
  }, [data]);

  return (
    <>
      <Center mt="5%">
        <Heading
          color={"gray.500"}
          fontWeight={500}
          textOverflow={"ellipsis"}
          overflow="clip"
          whiteSpace={"break-spaces"}
          fontSize={["xl", "2xl", "4xl", "7xl"]}
          textAlign={"center"}
          fontFamily={"fantasy"}
          letterSpacing={["0.01em", "0.03em", "0.05em"]}
        >
          {"Search, Read, Learn & Explore"}
        </Heading>
      </Center>

      <SearchInput data={data} />
      <Center>
        <Wrap spacing="4" justify={"center"}>
          {rs().map((item, index) => (
            <News
              key={index}
              title={item.title}
              url={item.url}
              byline={item.byline}
              i={index + 1 + " of " + data.length}
              caption={item.abstract}
              img={item.multimedia[1].url}
              published_date={new Date(item.published_date).toDateString()}
            />
          ))}
        </Wrap>
      </Center>
      <Paginate />
    </>
  );
}
