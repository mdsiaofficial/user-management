import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserTable = () => {

  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (selectAll) {
      setSelectedUsers([]);
      console.log(selectedUsers);
    } else {
      setSelectedUsers(users.map((user) => user._id));
    }
  };

  const handleSelect = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
      console.log(selectedUsers);
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('/user/all');
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <table className="user-table w-full text-sm font-light text-gray-500 dark:text-gray-400 m-10">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr className="text-left">
          <th className="px-6 py-3">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
            />
          </th>
          {/* <th className="px-6 py-3">ID</th> */}
          <th className="px-6 py-3">Name</th>
          <th className="px-6 py-3">Email</th>
          <th className="px-6 py-3">Last Login</th>
          {/* <th className="px-6 py-3">Registration Time</th> */}
          <th className="px-6 py-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id} className="hover:bg-gray-100 dark:hover:bg-gray-900 text-xl font-bold">
            <td className="px-6 py-4 whitespace-nowrap">
              <input
                type="checkbox"
                checked={selectedUsers.includes(user._id)}
                onChange={() => handleSelect(user._id)}
              />
            </td>
            {/* <td>{user._id}</td> */}
            <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.lastLogin ?user.lastLogin: "N/A"}</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
};

export default UserTable;