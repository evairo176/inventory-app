import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { useDebounce } from "use-debounce";

type Props = {
  data: any[];
  onSearch: (filteredData: any[]) => void;
};

const SearchBar = ({ data = [], onSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [valueDebounce] = useDebounce(searchTerm, 500);

  useEffect(() => {
    const filteredData = data?.filter((item: any) =>
      Object.values(item).some((value: any) =>
        value?.toString().toLowerCase().includes(valueDebounce.toLowerCase()),
      ),
    );
    onSearch(filteredData);
  }, [valueDebounce, data, onSearch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        id="search"
        autoComplete="search"
        name="search"
        type="search"
        placeholder="Search category..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full appearance-none bg-background pl-8 shadow-none "
      />
    </div>
  );
};

export default SearchBar;
