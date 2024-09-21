import React, { useEffect, useState } from 'react'
import Toolbar from '../components/Toolbar'
import UserTable from '../components/UserTable'
import axios from 'axios'

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('/user/all');
      setUsers(res.data);
    };
    fetchUsers();
  }, []);
  
  return (
    <div className='overflow-hidden'>
      <Toolbar />
      <UserTable />

    </div>
  )
}

export default AdminPage