import React, { useEffect, useState } from "react";
import "./App.css"; // Import the external CSS file

const App = () => {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // To toggle between ascending and descending

  // Fetch data from the API
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/candidates");
        const data = await response.json();
        if (data.status) {
          setCandidates(data.candidates);
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  // Filter candidates based on search input (Name or Skills)
  const filteredCandidates = candidates.filter((candidate) => {
    const lowercasedSearch = search.toLowerCase();
    return (
      candidate.name.toLowerCase().includes(lowercasedSearch) ||
      candidate.skills.toLowerCase().includes(lowercasedSearch)
    );
  });

  // Sort candidates by Years of Experience
  const sortedCandidates = filteredCandidates.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.experience - b.experience;
    } else {
      return b.experience - a.experience;
    }
  });

  // Toggle sorting order
  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="container">
      <h1 className="header">Candidates List</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Name or Skills"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="searchInput"
      />

      {/* Sort Button */}
      <button onClick={handleSort} className="sortButton">
        Sort by Experience ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>

      {/* Table to display candidates */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Skills</th>
            <th>Years of Experience</th>
          </tr>
        </thead>
        <tbody>
          {sortedCandidates.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.name}</td>
              <td>{candidate.skills}</td>
              <td>{candidate.experience}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
