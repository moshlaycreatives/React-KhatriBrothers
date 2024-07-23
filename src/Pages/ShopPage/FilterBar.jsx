import React from "react";
import { Box, TextField, Select, MenuItem, InputAdornment, Card } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const FilterBar = ({ city, keyword, neighborhood, price, onFilterChange }) => {

    console.log(city, 'aaaaa')
  return (
    <Card sx={{ display: "flex", justifyContent: "space-between", padding: "1rem 1%", marginTop:'-10rem' }}>
      <Select
        value={city}
        onChange={(e) => onFilterChange("city", e.target.value)}
        displayEmpty
        sx={{ minWidth: "150px" }}
      >
        <MenuItem value="">
          <em>City</em>
        </MenuItem>
        <MenuItem value="Dubai">Dubai</MenuItem>
        <MenuItem value="Sarjah">Sarjah</MenuItem>

      </Select>

      <TextField
        variant="outlined"
        placeholder="Search anything in classifieds..."
        value={keyword}
        onChange={(e) => onFilterChange("keyword", e.target.value)}
        sx={{ flexGrow: 1, mx: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchOutlinedIcon />
            </InputAdornment>
          ),
        }}
      />


      <Select
        value={price}
        onChange={(e) => onFilterChange("price", e.target.value)}
        displayEmpty
        sx={{ minWidth: "150px", mx: 2 }}
      >
        <MenuItem value="">
          <em>Price (AED)</em>
        </MenuItem>
        <MenuItem value="0-100">0-100</MenuItem>
        <MenuItem value="101-500">101-500</MenuItem>
        <MenuItem value="501-1000">501-1000</MenuItem>
        {/* Add more price ranges as needed */}
      </Select>

    </Card>
  );
};

export default FilterBar;
