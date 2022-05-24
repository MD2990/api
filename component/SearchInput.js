import React, { useEffect } from "react";
import { useSnapshot } from "valtio";
import state from "../stor";
import { Input } from "@chakra-ui/input";
import { Center } from "@chakra-ui/react";

function SearchInputField() {
  const snap = useSnapshot(state);
  const handleChange = (e) => {
    state.searchTerm = e.target.value;
  };
  return (
    <Center>
      <Input
        type={"search"}
        focusBorderColor="gray.400"
        m={[2, 3, 4, 5]}
        maxW="35%"
        fontSize={["sm", "md", "lg", "xl"]}
        textAlign="center"
        size="lg"
        rounded="xl"
        placeholder="Search for ..."
        value={snap.searchTerm}
        onChange={handleChange}
      />
    </Center>
  );
}

export default function SearchInput({ data }) {
  const snap = useSnapshot(state);

  useEffect(() => {
    state.searchResults = myFilter({
      arr: data,
      searchTerm: state.searchTerm,
    });
  }, [data, snap.searchTerm]);

  return (
    <>
      <SearchInputField />
    </>
  );
}
export const myFilter = ({ arr, searchTerm }) => {
  const results = arr.filter((e) => {
    return (
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.abstract.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return results;
};
