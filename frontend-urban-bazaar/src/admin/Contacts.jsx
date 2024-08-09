import React, { useState, useEffect } from "react";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    // Fetch contacts data from an API or local data source
    const fetchContacts = async () => {
      const response = await fetch("http://127.0.0.1:5000/admin/contacts");
      const data = await response.json();
      setContacts(data.submissions);
      setFilteredContacts(data.submissions);
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [searchTerm, startDate, endDate, contacts]);

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
        const end = endDate ? new Date(endDate).getTime() : Infinity;
        return contactDate >= start && contactDate <= end;
      });
    }

    setFilteredContacts(filtered);
    setCurrentPage(1); // Reset to the first page on filter
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={filterContacts}
            className="border px-4 py-2 rounded bg-blue-500 text-white"
          >
            Filter
          </button>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Message</th>
            </tr>
          </thead>
          <tbody>
            {currentContacts.map((contact, index) => (
              <tr key={index} className="border-b">
                <td className="p-4">
                  {new Date(contact.submittedAt).toLocaleDateString()}
                </td>
                <td className="p-4">{contact.name}</td>
                <td className="p-4">{contact.email}</td>
                <td className="p-4">{contact.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-end items-center">
        {Array.from(
          { length: Math.min(totalPages, 10) },
          (_, index) => index + 1
        ).map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`border px-4 py-2 mx-1 ${
              number === currentPage ? "bg-blue-500 text-white" : ""
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
