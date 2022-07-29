import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Flex, Spinner, Heading, Text } from "@chakra-ui/react";

import {
  ChatIcon,
  PhoneIcon,
  QuestionIcon,
  SearchIcon,
  StarIcon,
} from "@chakra-ui/icons";

import { useQuery } from "@apollo/client";
import { GET_COUNTRY } from "../graphql/Queries";
import { InfoCard } from "../components/InfoCard";

type Language = {
  code: string;
  name: string;
};

type Continent = {
  code: string;
  name: string;
};

type States = {
  code: string;
  name: string;
};

type Country = {
  code: string;
  name: string;
  phone: string;
  capital: string;
  emoji: string;
  languages: Language[];
  currency: string;
  continent: Continent;
  states: States[];
};

function Country() {
  const { code } = useParams();

  const { data, loading, error } = useQuery<{ country: Country }>(GET_COUNTRY, {
    onCompleted: (data) => {
      console.log(data);
    },
    variables: { code },
  });

  if (loading) {
    return (
      <Flex
        minH={"calc(100vh - 7rem)"}
        direction={"column"}
        justify="center"
        align="center"
      >
        <Spinner />
      </Flex>
    );
  }

  return (
    <Flex
      minH={"calc(100vh - 7rem)"}
      w="full"
      direction={"column"}
      px={[4, 4, 16]}
      pt={12}
    >
      <Heading textAlign={"center"}>
        {data?.country.name.toUpperCase()} {data?.country.emoji}
      </Heading>
      <Flex w="100%" mt={14} gap={4}>
        <Flex w="30%" direction={"column"} gap={5}>
          <InfoCard
            title={"Code"}
            value={code}
            iconValue={
              <QuestionIcon
                w={[4, 4, 6, 7]}
                h={[4, 4, 6, 7]}
                display={["none", "none", "none", "block"]}
                color={"black"}
              />
            }
          />
          <InfoCard
            title={"Continent"}
            value={data?.country.continent.name}
            iconValue={
              <SearchIcon
                w={[4, 4, 6, 7]}
                h={[4, 4, 6, 7]}
                display={["none", "none", "none", "block"]}
                color={"black"}
              />
            }
          />
          <InfoCard
            title={"Phone"}
            value={`+${data?.country.phone}`}
            iconValue={
              <PhoneIcon
                w={[4, 4, 6, 7]}
                h={[4, 4, 6, 7]}
                display={["none", "none", "none", "block"]}
                color={"black"}
              />
            }
          />
          <InfoCard
            title={"Capital"}
            value={data?.country.capital}
            iconValue={
              <StarIcon
                w={[4, 4, 6, 7]}
                h={[4, 4, 6, 7]}
                display={["none", "none", "none", "block"]}
                color={"black"}
              />
            }
          />
        </Flex>
        <Flex w="70%" direction={"column"} gap={5}>
          <InfoCard
            title={"Languages"}
            value={data?.country.languages
              .map((language) => language.name)
              .join(", ")}
            iconValue={
              <ChatIcon w={[4, 4, 6, 7]} h={[4, 4, 6, 7]} color={"black"} />
            }
          />
          <InfoCard title={"Currency"} value={data?.country.currency} />
          <Flex
            bg="white"
            h="220px"
            w="100%"
            borderRadius={10}
            boxShadow="lg"
            gap={1}
            p={6}
            direction={"column"}
            justify={"space-around"}
          >
            <Heading
              fontSize={["lg", "xl", "xl", "2xl", "3xl"]}
              fontWeight={800}
              color={"black"}
            >
              Description
            </Heading>
            <Text fontSize={["sm", "md", "xl", "xl", "2xl"]} color={"gray.500"}>
              {data?.country.name} is a country located in{" "}
              {data?.country.continent.name}, there they speak{" "}
              {data?.country.languages.length} language(s), they have{" "}
              {data?.country.currency
                ? data?.country.currency.split(",").length
                : 0}{" "}
              currency, the capital of the country is {data?.country.capital},
              and it has {data?.country.states.length} states
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        w="100%"
        gap={4}
        wrap={"wrap"}
        align={"center"}
        justify={["center", "center", "center", "flex-start", "flex-start"]}
        my={10}
      >
        <Heading w="100%">States</Heading>
        {data &&
          (data.country.states.length > 0 ? null : (
            <Text fontSize={"2xl"} color={"gray.500"}>
              {data.country.name} has no states.
            </Text>
          ))}
        {data?.country.states.map((state) => (
          <Flex
            bg="white"
            h="80px"
            w="163px"
            borderRadius={10}
            boxShadow="base"
            align={"center"}
            justify={"center"}
            gap={1}
            color="black"
            textAlign={"center"}
          >
            {state.name}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}

export default Country;
