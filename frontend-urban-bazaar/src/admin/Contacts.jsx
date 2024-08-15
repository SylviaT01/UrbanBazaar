import React, { useState, useEffect } from "react";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortColumn, setSortColumn] = useState("submittedAt"); // Default sort column
  const [sortDirection, setSortDirection] = useState("asc"); // Default sort direction

  useEffect(() => {
    // Fetch contacts data from an API or local data source
    const fetchContacts = async () => {
      const response = await fetch("https://backend-urbanbazaar.onrender.com/admin/contacts");
      const data = await response.json();
      setContacts(data.submissions || []);
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [searchTerm, startDate, endDate, contacts, sortColumn, sortDirection]);

  const filterContacts = () => {
    let filtered = contacts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date range
    if (startDate || endDate) {
      filtered = filtered.filter((contact) => {
        const contactDate = new Date(contact.submittedAt).getTime();
        const start = startDate ? new Date(startDate).getTime() : -Infinity;
        const end = endDate
          ? new Date(endDate).setHours(23, 59, 59, 999)
          : new Date().setHours(23, 59, 59, 999);

        // Ensure start date is before end date
        if (startDate && endDate && start > end) return false;

        return contactDate >= start && contactDate <= end;
      });
    }

    // Sort contacts
    filtered.sort((a, b) => {
      const valueA =
        sortColumn === "submittedAt" ? new Date(a[sortColumn]) : a[sortColumn];
      const valueB =
        sortColumn === "submittedAt" ? new Date(b[sortColumn]) : b[sortColumn];
      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredContacts(filtered);
    setCurrentPage(1); // Reset to the first page on filter or sort
  };

  // Get current contacts for pagination
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-full md:w-auto"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded w-full md:w-auto"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded w-full md:w-auto"
          />
          <button
            onClick={filterContacts} // Trigger filtering
            className="border px-4 py-2 rounded bg-blue-500 text-white w-full md:w-auto"
          >
            Filter
          </button>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border hidden md:table">
          <thead>
            <tr className="border-b">
              <th
                className="p-4 text-left cursor-pointer"
                onClick={() => {
                  setSortColumn("submittedAt");
                  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                }}
              >
                Date{" "}
                {sortColumn === "submittedAt" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="p-4 text-left cursor-pointer"
                onClick={() => {
                  setSortColumn("name");
                  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                }}
              >
                Name{" "}
                {sortColumn === "name" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Message</th>
            </tr>
          </thead>
          <tbody>
            {currentContacts.length ? (
              currentContacts.map((contact, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4">
                    {new Date(contact.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">{contact.name}</td>
                  <td className="p-4">{contact.email}</td>
                  <td className="p-4">{contact.message}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  No contacts found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Mobile View */}
        <div className="block md:hidden">
          {currentContacts.length ? (
            currentContacts.map((contact, index) => (
              <div key={index} className="border-b p-4 flex flex-col space-y-2">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-gray-600">Date:</span>
                  <span className="text-sm text-gray-600">{new Date(contact.submittedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-gray-600">Name: </span>
                  <span className="text-sm text-gray-600">{contact.name}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-gray-600">Email: </span>
                  <span className="text-sm text-gray-600">{contact.email}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-gray-600">Message: </span>
                  <span className="text-sm text-gray-600">{contact.message}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center">
              No contacts found
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-end items-center">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`border px-4 py-2 mx-1 ${number === currentPage ? "bg-blue-500 text-white" : ""
              }`}
          >
            {number}
          </button>
        ))}
        {totalPages > 10 && currentPage < totalPages && (
          <button
            onClick={() => paginate(currentPage + 1)}
            className="border px-4 py-2 mx-1"
          >
            Next
          </button>
        )}
      </div>
    </div>


  );
};

export default Contacts;
