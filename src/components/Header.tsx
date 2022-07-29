import * as React from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
  Flex,
  useColorMode,
  useColorModeValue,
  IconButton,
  Icon,
  Image,
  Heading,
  Center,
  Divider,
  Box,
} from "@chakra-ui/react";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import AsyncSelect from "react-select/async";

import LogoW from "../assets/images/logoW.png";
import LogoD from "../assets/images/logoD.png";

import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "../graphql/Queries";
import { SingleValue } from "react-select";

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

type CountryOpt = Country & {
  label: string;
  value: string;
};

export function Header() {
  const navigate = useNavigate();

  const { colorMode, toggleColorMode } = useColorMode();

  const { data, loading, error } = useQuery<{ countries: Country[] }>(
    GET_COUNTRIES
  );

  function loadOptions(searchValue: string, callback: Function) {
    const values: CountryOpt[] = [];
    console.log(data);

    if (data) {
      data.countries.forEach((element) => {
        values.push({
          ...element,
          value: element.name,
          label: element.name,
        });
      });

      const filteredOptions = values.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      );

      console.log(filteredOptions);

      callback(filteredOptions);
    }
  }

  function handleInputChange(selectedOption: SingleValue<Country>) {
    navigate(`/country/${selectedOption?.code}`);
  }

  return (
    <Flex
      as="header"
      w="full"
      align={"center"}
      justify="space-between"
      h={[48, 48, 36, 28]}
      borderBottom="1px inset"
      borderColor={"gray.300"}
      position={"sticky"}
      top="0"
      zIndex={9}
    >
      <Flex
        align="center"
        w={["100%", "100%", "91%", "80%", "65%"]}
        direction={["column", "column", "row"]}
      >
        <Flex
          gap={10}
          align="center"
          w="100%"
          cursor={"pointer"}
          onClick={() => navigate("/")}
        >
          <Image
            w={["30%", "20%", "20%", "10%"]}
            ml={10}
            src={useColorModeValue(LogoW, LogoD)}
          />
          <Heading textAlign={"center"} fontWeight={900}>
            World View
          </Heading>
          <Center height={16} display={["none", "none", "block", "block"]}>
            <Divider
              orientation="vertical"
              borderWidth={2}
              borderColor={useColorModeValue("black", "white")}
            />
          </Center>
        </Flex>
        <Box
          mt={[4, 4, 0]}
          w={["90%", "90%", "60%"]}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          gap={4}
        >
          <Box w="100%">
            <AsyncSelect
              styles={{
                control: (styles) => ({
                  ...styles,
                  background: "transparent",
                  borderColor: "#b3b5c6",
                  color: colorMode === "light" ? "black" : "white",
                }),
                input: (styles) => ({
                  ...styles,
                  color: colorMode === "light" ? "black" : "white",
                }),
                menu: (styles) => ({
                  ...styles,
                  color: "black",
                }),
                placeholder: (styles) => ({
                  ...styles,
                  color: "gray",
                }),
                singleValue: (styles) => ({
                  ...styles,
                  color: colorMode === "light" ? "black" : "white",
                }),
              }}
              placeholder="Search a country..."
              loadOptions={loadOptions}
              onChange={handleInputChange}
            />
          </Box>
          <IconButton
            display={["block", "block", "none", "none"]}
            mr={4}
            bg={"inherit"}
            variant="outline"
            borderColor={"gray.600"}
            onClick={toggleColorMode}
            color={useColorModeValue("white", "gray.800")}
            icon={
              <Icon
                as={useColorModeValue(MoonIcon, SunIcon)}
                color={useColorModeValue("black", "white")}
                size="lg"
              />
            }
            aria-label="Change theme"
            isRound
          />
        </Box>
      </Flex>
      <IconButton
        display={["none", "none", "block", "block"]}
        mr={4}
        bg={"inherit"}
        variant="outline"
        borderColor={"gray.600"}
        onClick={toggleColorMode}
        color={useColorModeValue("white", "gray.800")}
        icon={
          <Icon
            as={useColorModeValue(MoonIcon, SunIcon)}
            color={useColorModeValue("black", "white")}
            size="lg"
          />
        }
        aria-label="Change theme"
        isRound
      />
    </Flex>
  );
}
