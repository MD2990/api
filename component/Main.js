import { Box, Center, Flex, SimpleGrid, Text } from "@chakra-ui/layout";
import React from "react";
import { useColorModeValue } from "@chakra-ui/react";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/stat";
import { chakra } from "@chakra-ui/system";
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import {
  BsAlarm,
  BsAward,
  BsGeo,
  BsTypeItalic,
  BsLayers,
  BsFileEarmarkCode,
} from "react-icons/bs";

function StatsCard(props) {
  const { title, stat, icon } = props;

  return (
    <Stat
      className="title"
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.400", "gray.500")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} textAlign="center">
            {title}
          </StatLabel>
          <StatNumber
            color="blue.600"
            mx="2"
            overflow="hidden"
            textOverflow="ellipsis"
            fontSize={"xl"}
            fontWeight={"medium"}
            textAlign="center"
          >
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("blue.500", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

function BasicStatistics({
  country,
  country_code,
  region_name,
  pos,
  timezone,
  city,
  ip,
  region_code,
  zip_code,
}) {
  return (
    <Box
      maxW="7xl"
      minW="12rem"
      mx={"auto"}
      mb="5%"
      pt={5}
      px={{ base: 2, sm: 12, md: 17 }}
    >
      <chakra.h1
        color="gray.500"
        className="title"
        textAlign={"center"}
        fontFamily="initial"
        fontSize={{ base: "xl", xl: "6xl", lg: "4xl", md: "2xl", sm: "xl" }}
        py={10}
        fontWeight={"bold"}
      >
        <Text color="blue.500" fontSize="larger" as="span">
          “{country}”
        </Text>{" "}
        is a great country here is some information about it
      </chakra.h1>
      <SimpleGrid
        columns={{ base: 1, lg: 2, md: 2 }}
        spacing={{ base: 5, lg: 8 }}
      >
        <StatsCard
          title={"Country Code"}
          stat={country_code}
          icon={<BsAward size={"3em"} />}
        />
        <StatsCard
          title={"Region Name"}
          stat={region_name}
          icon={<FiServer size={"3em"} />}
        />
        <StatsCard
          title={"Position"}
          stat={pos}
          icon={<GoLocation size={"3em"} />}
        />

        <StatsCard
          title={"Time Zone"}
          stat={timezone}
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
        />
      </SimpleGrid>
    </Box>
  );
}
export default function Main({ data }) {
  return (
    <Center mt={{ base: "10%", lg: "8%", md: "18%", sm: "5%" }}>
      <BasicStatistics
        country={data.country?.toUpperCase() || "Not found"}
        country_code={data.countryCode || "Not found"}
        region_name={data.regionName || "Not found"}
        pos={`N:${data.lat || "Not found"}    E:${data.lon || "Not found"}`}
        timezone={data.timezone || "Not found"}
        city={data.city || "Not found"}
        ip={data.query || "Not found"}
        zip_code={data.zip || "Not found"}
        region_code={data.region || "Not found"}
      />
    </Center>
  );
}
