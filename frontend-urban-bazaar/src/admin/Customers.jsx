import React, { useState, useEffect, useContext } from "react";
import profile2 from "../assets/profile2.svg";
import members from "../assets/members.svg";
import active from "../assets/active.svg";
import arrowup from "../assets/arrowup .svg";
import arrowdown from "../assets/arrowdown.svg";
import { UserContext } from "../contexts/userContext";

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const { currentUser, authToken } = useContext(UserContext);
  const token = authToken || localStorage.getItem("access_token");

  useEffect(() => {
    fetch("https://backend-urbanbazaar.onrender.com/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error("Error fetching users:", error));
  }, [token]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAdminToggle = (userId, isAdmin) => {
    fetch(`https://backend-urbanbazaar.onrender.com/admin/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ is_admin: isAdmin }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update user list in state
        setUsers(
          users.map((user) =>
            user.id === userId ? { ...user, is_admin: isAdmin } : user
          )
        );
      })
      .catch((error) => console.error("Error updating admin status:", error));
  };

  // Track user activity
  const trackActivity = () => {
    localStorage.setItem("lastActivity", Date.now());
  };

  useEffect(() => {
    window.addEventListener("mousemove", trackActivity);
    window.addEventListener("keydown", trackActivity);

    return () => {
      window.removeEventListener("mousemove", trackActivity);
      window.removeEventListener("keydown", trackActivity);
    };
  }, []);

  const isUserActive = (user) => {
    const lastActivity = localStorage.getItem("lastActivity");
    const now = Date.now();
    const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds

    if (lastActivity && now - lastActivity < tenMinutes) {
      return true;
    }
    return false;
  };

  // Calculate the number of active users
  const activeUsers = users.filter(isUserActive).length;


  return (
    <div className="flex flex-col ml-5 w-[80%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-wrap gap-5 justify-between items-start px-4 py-6 w-full bg-white rounded-lg max-md:max-w-full">
          <div className="flex gap-6 mt-1">
            <img
              src={profile2}
              className="object-contain shrink-0 w-24 aspect-[1.14]"
              alt="TotalCustomers"
            />
            <div className="flex flex-col self-start mt-1.5">
              <div className="text-sm tracking-normal text-neutral-400 max-md:mr-0.5">
                Total Customers
              </div>
              <div className="self-start mt-3.5 text-3xl font-semibold tracking-tight leading-none text-zinc-800">
                {users.length}
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
          <div className="shrink-0 w-px h-24 max-md:hidden" />
          <div className="flex gap-6 items-start self-stretch max-md:w-full">
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
                {users.length}
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
            <div className="shrink-0 self-stretch w-px h-[95px] max-md:hidden" />
          </div>
          <div className="flex gap-6 max-md:w-full">
            <img
              loading="lazy"
              src={active}
              className="object-contain shrink-0 w-24 aspect-[1.14]"
              alt="Active"
            />
            <div className="flex flex-col self-start mt-1">
              <div className="text-sm tracking-normal text-neutral-400">
                Active Now
              </div>
              <div className="self-start mt-3.5 text-3xl font-semibold tracking-tight leading-none text-zinc-800">
              {activeUsers}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col pt-7 pb-10 mt-5 w-full bg-white rounded-lg">
          <div className="flex flex-col md:flex-row gap-5 mx-4">
            <div className="flex flex-col w-full">
              <div className="text-2xl font-semibold text-black mb-4">
                All Customers
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Id</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Is_Admin</th>
                      {currentUser.is_admin && (
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="px-4 py-4 text-sm text-gray-500">{user.id}</td>
                        <td className="px-4 py-4 text-sm text-gray-500">{user.username}</td>
                        <td className="px-4 py-4 text-sm text-gray-500">{user.email}</td>
                        <td className="px-4 py-4 text-sm text-gray-500">{user.is_admin ? "Yes" : "No"}</td>
                        {currentUser.is_admin && (
                          <td className="px-4 py-4 text-sm text-gray-500">
                            <button
                              className="px-2 py-1 bg-blue-500 text-white rounded"
                              onClick={() => handleAdminToggle(user.id, !user.is_admin)}
                            >
                              {user.is_admin ? "Revoke Admin" : "Make Admin"}
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col gap-4 mt-4">
                <div className="text-sm text-gray-400">
                  Showing data {indexOfFirstUser + 1} to {indexOfLastUser} of {users.length} entries
                </div>
                <div className="flex gap-2 justify-center">
                  <button
                    className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-neutral-300" : "bg-neutral-100"}`}
                    onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    &lt;
                  </button>
                  {[...Array(totalPages).keys()].map((number) => (
                    <button
                      key={number + 1}
                      className={`px-3 py-1 rounded ${currentPage === number + 1 ? "text-white bg-indigo-600" : "bg-neutral-100"}`}
                      onClick={() => paginate(number + 1)}
                    >
                      {number + 1}
                    </button>
                  ))}
                  <button
                    className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-neutral-300" : "bg-neutral-100"}`}
                    onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="flex flex-col pt-7 pb-10 mt-5 w-full bg-white rounded-lg">
          <div className="flex flex-col md:flex-row gap-5 mx-4">
            <div className="flex flex-col w-full">
              <div className="text-2xl font-semibold text-black mb-4">All Customers</div>

              {/* Responsive Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Id</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Is_Admin</th>
                      {currentUser.is_admin && (
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="px-4 py-4 text-sm text-gray-500">{user.id}</td>
                        <td className="px-4 py-4 text-sm text-gray-500">{user.username}</td>
                        <td className="px-4 py-4 text-sm text-gray-500">{user.email}</td>
                        <td className="px-4 py-4 text-sm text-gray-500">{user.is_admin ? "Yes" : "No"}</td>
                        {currentUser.is_admin && (
                          <td className="px-4 py-4 text-sm text-gray-500">
                            <button
                              className="px-2 py-1 bg-blue-500 text-white rounded"
                              onClick={() => handleAdminToggle(user.id, !user.is_admin)}
                            >
                              {user.is_admin ? "Revoke Admin" : "Make Admin"}
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Responsive Cards */}
              <div className="block md:hidden">
                {currentUsers.map((user) => (
                  <div className="flex flex-col bg-white p-4 mb-4 rounded-lg shadow" key={user.id}>
                    <div className="flex flex-col">
                      <div className="font-semibold text-lg">{user.username}</div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                      <div className="text-sm text-gray-600 mt-2">{user.is_admin ? "Admin" : "User"}</div>
                    </div>
                    {currentUser.is_admin && (
                      <button
                        className="mt-4 px-2 py-1 bg-blue-500 text-white rounded"
                        onClick={() => handleAdminToggle(user.id, !user.is_admin)}
                      >
                        {user.is_admin ? "Revoke Admin" : "Make Admin"}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 mt-4">
                <div className="text-sm text-gray-400">
                  Showing data {indexOfFirstUser + 1} to {indexOfLastUser} of {users.length} entries
                </div>
                <div className="flex gap-2 justify-center">
                  <button
                    className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-neutral-300" : "bg-neutral-100"}`}
                    onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    &lt;
                  </button>
                  {[...Array(totalPages).keys()].map((number) => (
                    <button
                      key={number + 1}
                      className={`px-3 py-1 rounded ${currentPage === number + 1 ? "text-white bg-indigo-600" : "bg-neutral-100"}`}
                      onClick={() => paginate(number + 1)}
                    >
                      {number + 1}
                    </button>
                  ))}
                  <button
                    className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-neutral-300" : "bg-neutral-100"}`}
                    onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
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

export default Customers;
