import React, { useEffect, useState } from "react";
import PublishersService from "../services/PublishersService";
import SortTypeDropdown from "./SortTypeDropdown";
import TableView from "./TableView";

const SortPublishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sortType, setSortType] = useState(0);
  const [sortTypesOptions, setSortTypesOptions] = useState([]);

  useEffect(() => {
    const loadSortTypes = async () => {
      try {
        const options = await PublishersService.getSortTypes();
        setSortTypesOptions(options);
      } catch (error) {
        console.error("Neuspesno ucitavanje opcija", error);
      }
    };
    loadSortTypes();
  }, []);

  useEffect(() => {
    const loadPublishers = async () => {
      try {
        setLoading(true);
        const data = await PublishersService.getSortedPublishers(sortType);
        setPublishers(data);
        setError("");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadPublishers();
  }, [sortType]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <h1>Sort Publishers</h1>
      <SortTypeDropdown
        sortType={sortType}
        options={sortTypesOptions}
        onSelect={setSortType}
      />
      <TableView publishers={publishers} />
    </div>
  );
};
export default SortPublishers;
