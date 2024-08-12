import React, { useState, useEffect } from "react";
import profile2 from "../assets/profile2.svg";
import members from "../assets/members.svg";
import arrowup from "../assets/arrowup .svg";
import arrowdown from "../assets/arrowdown.svg";

const Customer = () => {
  const [users, setUsers] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    // Fetch users (members)
    fetch("http://127.0.0.1:5000/user")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setTotalMembers(data.length); // Set total members count
      })
      .catch((error) => console.error("Error fetching users:", error));

    // Fetch total customers
    fetch("http://127.0.0.1:5000/order")
      .then((response) => response.json())
      .then((data) => setTotalCustomers(data.length)) // Assuming the API returns an array of customers
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col ml-5 w-[80%] max-md:ml-0 max-md:w-full -mt-20">
      <div className="flex flex-col w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-10 justify-between items-start px-6 py-8 w-full bg-white rounded-lg max-md:max-w-full">
          <div className="flex gap-6 mt-1 ml-32">
            <img
              src={profile2}
              className="object-contain shrink-0 w-24 aspect-[1.14]"
              alt="TotalCustomers"
            />
            <div className="flex flex-col mt-1.5">
              <div className="text-sm tracking-normal text-neutral-400 max-md:mr-0.5">
                Total Customers
              </div>
              <div className="self-start mt-3.5 text-3xl font-semibold tracking-tight leading-none text-zinc-800">
                {totalCustomers}
              </div>
              <div className="flex gap-1 mt-2 text-xs tracking-normal text-zinc-800">
                <img
                  src={arrowup}
                  className="object-contain shrink-0 aspect-[1.15] w-[23px]"
                  alt="arrowup"
                />
                <div className="my-auto">
                  <span className="font-bold text-green-600">16%</span> this
                  month
                </div>
              </div>
            </div>
          </div>
          <div className="shrink-0 w-px h-24 bg-gray-200" />
          <div className="flex gap-6 items-start self-stretch mt-1 mr-32">
            <img
              src={members}
              className="object-contain shrink-0 w-24 aspect-[1.14]"
              alt="Members"
            />
            <div className="flex flex-col items-start mt-1.5">
              <div className="text-sm tracking-normal text-neutral-400">
                Members
              </div>
              <div className="mt-3.5 text-3xl font-semibold tracking-tight leading-none text-zinc-800">
                {totalMembers}
              </div>
              <div className="flex gap-1 self-stretch mt-2 text-xs tracking-normal text-zinc-800">
                <img
                  loading="lazy"
                  src={arrowdown}
                  className="object-contain shrink-0 aspect-[1.15] w-[23px]"
                  alt="arrowdown"
                />
                <div className="my-auto">
                  <span className="font-bold text-rose-700">1%</span> this month
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col pt-7 pb-10 mt-5 w-full bg-white rounded-lg max-md:max-w-full">
          <div className="flex flex-wrap gap-5 justify-between mr-7 ml-5 max-md:mr-2.5 max-md:max-w-full">
            <div className="flex flex-col">
              <div className="text-2xl font-semibold tracking-tight text-black">
                All Customers
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Id
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Username
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Password
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Is_Admin
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.username}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.password}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.is_admin}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="shrink-0 mt-9 max-w-full h-px w-[915px] max-md:mr-1.5" />
              <div className="flex flex-wrap gap-5 justify-between mt-9 mr-7 ml-5 font-medium max-md:mr-2.5 max-md:max-w-full">
                <div className="text-sm tracking-normal text-gray-400">
                  Showing data {indexOfFirstUser + 1} to {indexOfLastUser} of{" "}
                  {users.length} entries
                </div>
                <div className="flex space-x-2">
                  <button
                    className={`px-3 py-1 rounded ${
                      currentPage === 1 ? "bg-neutral-300" : "bg-neutral-100"
                    }`}
                    onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    &lt;
                  </button>
                  {[...Array(totalPages).keys()].map((number) => (
                    <button
                      key={number + 1}
                      className={`px-3 py-1 rounded ${
                        currentPage === number + 1
                          ? "text-white bg-indigo-600"
                          : "bg-neutral-100"
                      }`}
                      onClick={() => paginate(number + 1)}
                    >
                      {number + 1}
                    </button>
                  ))}
                  <button
                    className={`px-3 py-1 rounded ${
                      currentPage === totalPages
                        ? "bg-neutral-300"
                        : "bg-neutral-100"
                    }`}
                    onClick={() =>
                      currentPage < totalPages && paginate(currentPage + 1)
                    }
                    disabled={currentPage === totalPages}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
