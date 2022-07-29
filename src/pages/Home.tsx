import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Flex,
  useColorMode,
  Spinner,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";

import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@chakra-ui/icons";

import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "../graphql/Queries";

type Language = {
  code: string;
  name: string;
};

type Country = {
  code: string;
  name: string;
  capital: string;
  emoji: string;
  languages: Language[];
  currency: string;
};

function Home() {
  const navigate = useNavigate();

  const { colorMode, toggleColorMode } = useColorMode();

  const [countries, setCountries] = useState<Country[]>([]);
  const [sortAsc, setSortAsc] = useState({
    name: true,
    capital: false,
    emoji: false,
    languages: false,
    currency: false,
  });

  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const countriesPerPage = 7;
  const pagesVisited = (pageNumber - 1) * countriesPerPage;

  const { data, loading, error } = useQuery<{ countries: Country[] }>(
    GET_COUNTRIES,
    {
      onCompleted: (data) => {
        setPageCount(Math.ceil(data.countries.length / countriesPerPage));
        const ordened = [...data.countries].sort((a: Country, b: Country) => {
          return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
        });
        setCountries(ordened);
      },
    }
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (Number(e.target.value) > 36) return;
    if (Number(e.target.value) < 1) {
      setPageNumber(1);
      return;
    }
    setPageNumber(Number(e.target.value));
  }

  function order(col: "name" | "capital" | "emoji" | "currency" | "languages") {
    if (col !== "languages") {
      if (!sortAsc[col]) {
        const ordened = [...countries].sort((a: Country, b: Country) => {
          return a[col]?.toLowerCase() > b[col]?.toLowerCase() ? 1 : -1;
        });
        setCountries(ordened);
      } else {
        const ordened = [...countries].sort((a: Country, b: Country) => {
          return a[col]?.toLowerCase() < b[col]?.toLowerCase() ? 1 : -1;
        });
        setCountries(ordened);
      }
    } else {
      if (!sortAsc[col]) {
        const ordened = [...countries].sort((a: Country, b: Country) => {
          return a[col]
            ?.map((language) => language.name)
            .join("")
            .toLowerCase() >
            b[col]
              ?.map((language) => language.name)
              .join("")
              .toLowerCase()
            ? 1
            : -1;
        });
        setCountries(ordened);
      } else {
        const ordened = [...countries].sort((a: Country, b: Country) => {
          return a[col]
            ?.map((language) => language.name)
            .join("")
            .toLowerCase() <
            b[col]
              ?.map((language) => language.name)
              .join("")
              .toLowerCase()
            ? 1
            : -1;
        });
        setCountries(ordened);
      }
    }
    setPageNumber(1);
    setSortAsc({ ...sortAsc, [col]: !sortAsc[col] });
  }

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
      <Flex
        justify="space-between"
        align="center"
        w="full"
        direction={["column", "column", "row"]}
      >
        <Heading
          textAlign={["center", "center", "start"]}
          fontWeight={800}
          mb={[4, 4, 4, 10]}
          color={colorMode === "dark" ? "white" : "gray.500"}
          w="100%"
        >
          Countries
        </Heading>
        <Flex
          gap={2}
          justify={["center", "center", "center", "flex-end"]}
          align="center"
          w="100%"
          mb={[4, 4, 4, 0]}
        >
          <IconButton
            colorScheme="facebook"
            aria-label="Arrow back"
            icon={<ArrowBackIcon />}
            onClick={() =>
              setPageNumber(pageNumber === 1 ? pageNumber : pageNumber - 1)
            }
          />
          <Input
            variant="outline"
            w={16}
            textAlign={"center"}
            type="number"
            value={pageNumber}
            border="1px solid"
            borderColor={"gray.500"}
            onChange={handleInputChange}
          />
          <Text fontSize={"xl"}>/{pageCount}</Text>
          <IconButton
            colorScheme="facebook"
            aria-label="Arrow forward"
            icon={<ArrowForwardIcon />}
            onClick={() =>
              setPageNumber(
                pageNumber === pageCount ? pageNumber : pageNumber + 1
              )
            }
          />
        </Flex>
      </Flex>

      <TableContainer
        w="full"
        bg={colorMode === "dark" ? "gray.100" : "white"}
        boxShadow="2xl"
        borderRadius={10}
        p={4}
        mb={16}
      >
        <Table variant="striped" colorScheme="gray" size={["sm", "md"]}>
          <Thead>
            <Tr>
              <Th
                textAlign={"center"}
                onClick={() => order("name")}
                cursor="pointer"
              >
                Name {sortAsc.name ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </Th>
              <Th
                textAlign={"center"}
                onClick={() => order("capital")}
                cursor="pointer"
              >
                Capital {sortAsc.capital ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </Th>
              <Th
                textAlign={"center"}
                onClick={() => order("emoji")}
                cursor="pointer"
              >
                Emoji {sortAsc.emoji ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </Th>
              <Th
                textAlign={"center"}
                onClick={() => order("languages")}
                cursor="pointer"
              >
                Language(s){" "}
                {sortAsc.languages ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </Th>
              <Th
                textAlign={"center"}
                onClick={() => order("currency")}
                cursor="pointer"
              >
                Currency
                <Badge colorScheme="green">$</Badge>
                {sortAsc.currency ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {countries
              ?.slice(pagesVisited, pagesVisited + countriesPerPage)
              .map((country, index) => (
                <Tr
                  key={country.code}
                  color={
                    index % 2
                      ? "black"
                      : colorMode === "dark"
                      ? "white"
                      : "black"
                  }
                >
                  <Td
                    textAlign={"center"}
                    fontWeight={800}
                    cursor="pointer"
                    onClick={() => navigate(`/country/${country.code}`)}
                    _hover={{ color: "gray.500" }}
                  >
                    {country.name}
                  </Td>
                  <Td textAlign={"center"}>{country.capital}</Td>
                  <Td textAlign={"center"}>{country.emoji}</Td>
                  <Td textAlign={"center"}>
                    <Flex
                      gap={2}
                      justify="center"
                      align="center"
                      direction={"column"}
                    >
                      {country.languages.map((language) => (
                        <Badge
                          key={language.code}
                          colorScheme="orange"
                          color={"orange.300"}
                        >
                          {language.name}
                        </Badge>
                      ))}
                    </Flex>
                  </Td>
                  <Td textAlign={"center"}>
                    <Flex
                      gap={4}
                      justify="center"
                      align="center"
                      direction={["column", "column"]}
                    >
                      {country.currency?.split(",").map((currency, index) => (
                        <Badge
                          key={index}
                          colorScheme="green"
                          color={"green.300"}
                        >
                          {currency}
                        </Badge>
                      ))}
                    </Flex>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}

export default Home;
