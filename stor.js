import { proxy } from "valtio";
const state = proxy({
  searchTerm: "",
  searchResults: [],
  currentPage: parseInt(0),
  pageCount: null,
  PER_PAGE: 8,
  offset: 0,
  
});
export default state;

