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

function News({ title, url, byline, published_date, caption, img, i }) {
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
          {rs().length < 1 && (
            <Center p="2" m="2" maxW="60%" noOfLines={[2, 3, 4]}>
              <Heading
                textAlign={"center"}
                fontSize={["xl", "2xl", "4xl"]}
                color={"gray.200"}
              >
                No Results Found for{" "}
                <Text as="span" color={"gray.400"}>
                  {snap.searchTerm}
                </Text>
              </Heading>
            </Center>
          )}
          {rs().map((item, index) => (
            <News
              key={index}
              title={item.title}
              url={item.url}
              byline={item.byline}
              i={index + 1 + " of " + data.length}
              caption={item.abstract}
              img={item.multimedia ? item.multimedia[0]?.url : "/loading.png"}
              published_date={new Date(item.published_date).toDateString()}
            />
          ))}
        </Wrap>
      </Center>
      <Paginate />
    </>
  );
}
