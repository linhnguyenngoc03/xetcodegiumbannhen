import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

import { suggest } from "../../../config/setup"; // Only import the necessary function
import { useRouter } from "next/router";
import { Autocomplete, TextField } from "@mui/material";

export default function SearchBox() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any>([]);

  const handleSearchChange = (event: any, value: string) => {
    setSearchValue(value); // Cập nhật giá trị searchValue khi có sự thay đổi
    const newSuggestions = suggest.filter((item) => {
      if (typeof item === "string" && typeof value === "string") {
        return item.toLowerCase().includes(value.toLowerCase());
      }
      return false;
    });
    setSuggestions(newSuggestions);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const cleanedValue = searchValue.replace(/[%&#/]/g, "");
    router.push(`/search/${cleanedValue}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        position: "relative",
      }}
    >
      <label
        htmlFor="search"
        style={{
          position: "absolute",
          zIndex: 2,
          top: "55%",
          right: "1rem",
          transform: "translateY(-50%)",
        }}
      >
        <SearchIcon color="primary" />
      </label>
      <Autocomplete
        freeSolo
        inputValue={searchValue}
        onInputChange={handleSearchChange}
        options={suggestions}
        selectOnFocus
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            id="search"
            variant="outlined"
            value={searchValue}
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "white",
                borderRadius: "1rem",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #FF9B9B",
                borderRadius: "1rem",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "2px solid #FF9B9B !important",
              },
              width: "100%",
            }}
          />
        )}
      />
    </form>
  );
}
