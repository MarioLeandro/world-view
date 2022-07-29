import {
  Heading,
  Box,
  Flex,
  IconProps,
  ComponentWithAs,
  useColorMode,
  Badge,
} from "@chakra-ui/react";
import { ReactNode } from "react";

type InfoCardProps = {
  title: string;
  value: string | undefined;
  iconValue?: ReactNode;
};

export function InfoCard({ title, value, iconValue }: InfoCardProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      bg="white"
      h="100px"
      w="100%"
      borderRadius={10}
      boxShadow="lg"
      align={"center"}
      justify={"space-between"}
      gap={1}
      p={[3, 3, 5, 6, 6]}
    >
      <Flex direction={"column"}>
        <Heading
          fontSize={["lg", "xl", "xl", "2xl", "3xl"]}
          fontWeight={800}
          color={"black"}
        >
          {title}
        </Heading>
        <Heading
          fontSize={["sm", "md", "xl", "xl", "2xl"]}
          fontWeight={500}
          color={"gray.500"}
        >
          {value}
        </Heading>
      </Flex>
      {iconValue || (
        <Badge colorScheme="green" fontSize={["md", "xl", "xl", "xl", "2xl"]}>
          $
        </Badge>
      )}
    </Flex>
  );
}
