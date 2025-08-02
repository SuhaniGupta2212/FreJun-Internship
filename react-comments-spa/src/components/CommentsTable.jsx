import React, { useEffect, useState } from "react";

const CommentsTable = () => {
  const [comments, setComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => setComments(data.slice(0, 50))); // limit to 50
  }, []);

  const filtered = comments.filter((c) =>
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / commentsPerPage);
  const startIndex = (currentPage - 1) * commentsPerPage;
  const currentComments = filtered.slice(startIndex, startIndex + commentsPerPage);

  const handlePageChange = (e) => {
    const val = Number(e.target.value);
    if (val >= 1 && val <= totalPages) {
      setCurrentPage(val);
    }
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="dashboard">
      <h1>📝 Comment Explorer</h1>
      <input
        type="text"
        className="search-bar"
        placeholder="Search comments..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // reset to first page on search
        }}
      />

      <div className="table-container">
        <h2>📋 Comments Manager Dashboard</h2>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Body</th>
              <th>Post</th>
            </tr>
          </thead>
          <tbody>
            {currentComments.map((c) => (
              <tr key={c.id}>
                <td>{c.email}</td>
                <td>{c.name}</td>
                <td>{c.body}</td>
                <td>sunt aut facere repellat provident occaecati</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
          <button onClick={handlePrev} disabled={currentPage === 1}>
            ⬅️ Prev
          </button>

          <span>
            Page{" "}
            <input
              type="number"
              value={currentPage}
              min={1}
              max={totalPages}
              onChange={handlePageChange}
              style={{ width: "60px", textAlign: "center" }}
            />{" "}
            of {totalPages}
          </span>

          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next ➡️
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsTable;
