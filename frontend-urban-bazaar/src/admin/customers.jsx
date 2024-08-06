import React, { useState, useEffect } from "react";
import profile2 from "../assets/profile2.svg";
import members from "../assets/members.svg";

const Customer = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    fetch("http://127.0.0.1:5000/user")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex overflow-hidden flex-col items-center px-20 bg-sky-50 max-md:px-5">
      <div className="mt-10 w-full max-w-[1240px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[22%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow pb-8 mt-5 font-medium whitespace-nowrap max-md:mt-10"></div>
          </div>
          <div className="flex flex-col ml-5 w-[78%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col w-full max-md:mt-10 max-md:max-w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
