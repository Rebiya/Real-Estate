import React, { useState, useEffect } from 'react';
import { 
  Table, ActionIcon, Group, Text, Loader, TextInput, 
  Select, Modal, Button, Box, Stack, Flex, ScrollArea
} from '@mantine/core';
import { IconEdit, IconTrash, IconSearch, IconRefresh, IconUserPlus } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import './Users.css';

// Configure axios instance with base URL
const api = axios.create({
  baseURL: 'https://realestate-backend-8b6m.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [opened, setOpened] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    auth0_id: null,
    fname: '',
    lname: '',
    phone_number: ''
  });
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 480px)');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/users');
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      showNotification({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to fetch users',
        color: 'red'
      });
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (uuid) => {
    try {
      await api.delete(`/users/${uuid}`);
      showNotification({
        title: 'Success',
        message: 'User deleted successfully',
        color: 'green'
      });
      fetchUsers();
    } catch (error) {
      showNotification({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to delete user',
        color: 'red'
      });
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setFormData({
      email: user.email,
      auth0_id: user.auth0_id || null,
      fname: user.fname,
      lname: user.lname,
      phone_number: user.phone_number || ''
    });
    setEditModalOpened(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async () => {
    try {
      await api.put(`/users/${currentUser.uuid}`, formData);
      showNotification({
        title: 'Success',
        message: 'User updated successfully',
        color: 'green'
      });
      fetchUsers();
      setEditModalOpened(false);
    } catch (error) {
      showNotification({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to update user',
        color: 'red'
      });
    }
  };

  const handleRegisterSubmit = async () => {
    try {
      await api.post('/users/register', formData);
      showNotification({
        title: 'Success',
        message: 'User registered successfully',
        color: 'green'
      });
      fetchUsers();
      setOpened(false);
      setFormData({ 
        email: '', 
        auth0_id: null, 
        fname: '', 
        lname: '', 
        phone_number: '' 
      });
    } catch (error) {
      showNotification({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to register user',
        color: 'red'
      });
    }
  };

  const filteredUsers = users
    .filter(user => {
      const term = searchTerm.toLowerCase();
      return (
        user.email.toLowerCase().includes(term) ||
        (user.fname || '').toLowerCase().includes(term) ||
        (user.lname || '').toLowerCase().includes(term) ||
        (user.auth0_id || '').toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'created_at') {
        return new Date(b.created_at) - new Date(a.created_at);
      }
      return (a[sortBy] || '').localeCompare(b[sortBy] || '');
    });

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : 'N/A';
  };

  return (
    <Box p="sm">
      <Stack spacing="md">
        <Flex justify="space-between" align="center" wrap="wrap" gap="md">
          <Text size="xl" weight={600}>User Management</Text>
          
          <Group spacing="sm" grow={isSmallMobile} style={{ flex: isMobile ? '1 1 100%' : undefined }}>
            <TextInput
              placeholder="Search users..."
              icon={<IconSearch size={16} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <Select
              data={[
                { value: 'email', label: 'Email' },
                { value: 'fname', label: 'First Name' },
                { value: 'lname', label: 'Last Name' },
                { value: 'created_at', label: 'Date Created' },
              ]}
              value={sortBy}
              onChange={setSortBy}
            />
            
            <Group spacing="xs" noWrap>
              <ActionIcon variant="outline" onClick={fetchUsers} title="Refresh">
                <IconRefresh size={18} />
              </ActionIcon>
              
              <Button
                leftIcon={<IconUserPlus size={16} />}
                onClick={() => {
                  setFormData({ 
                    email: '', 
                    auth0_id: null, 
                    fname: '', 
                    lname: '', 
                    phone_number: '' 
                  });
                  setOpened(true);
                }}
                fullWidth={isSmallMobile}
              >
                {!isSmallMobile && 'Add User'}
                {isSmallMobile && <IconUserPlus size={18} />}
              </Button>
            </Group>
          </Group>
        </Flex>

        {loading ? (
          <Box py="xl" style={{ display: 'flex', justifyContent: 'center' }}>
            <Loader size="xl" />
          </Box>
        ) : (
          <ScrollArea>
            <Table striped highlightOnHover verticalSpacing="sm" fontSize={isMobile ? 'xs' : 'md'}>
              <thead>
                <tr>
                  <th>Email</th>
                  {!isMobile && <th>Auth0 ID</th>}
                  <th>First Name</th>
                  {!isMobile && <th>Last Name</th>}
                  {!isSmallMobile && <th>Phone</th>}
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.uuid}>
                      <td>{user.email}</td>
                      {!isMobile && <td style={{ wordBreak: 'break-word' }}>{user.auth0_id || 'N/A'}</td>}
                      <td>{user.fname || 'N/A'}</td>
                      {!isMobile && <td>{user.lname || 'N/A'}</td>}
                      {!isSmallMobile && <td>{user.phone_number || 'N/A'}</td>}
                      <td>{formatDate(user.created_at)}</td>
                      <td>
                        <Group spacing="xs" noWrap>
                          <ActionIcon color="blue" onClick={() => handleEdit(user)}>
                            <IconEdit size={16} />
                          </ActionIcon>
                          <ActionIcon color="red" onClick={() => handleDelete(user.uuid)}>
                            <IconTrash size={16} />
                          </ActionIcon>
                        </Group>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={isMobile ? (isSmallMobile ? 4 : 5) : 7} style={{ textAlign: 'center' }}>
                      <Text c="dimmed">No users found</Text>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </ScrollArea>
        )}
      </Stack>

      {/* Add User Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Register New User"
        size={isMobile ? 'sm' : 'md'}
      >
        <Stack spacing="sm">
          <TextInput
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <TextInput
            label="First Name"
            name="fname"
            value={formData.fname}
            onChange={handleInputChange}
          />
          <TextInput
            label="Last Name"
            name="lname"
            value={formData.lname}
            onChange={handleInputChange}
          />
          <TextInput
            label="Phone Number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
          />
          <Button onClick={handleRegisterSubmit} fullWidth mt="sm">
            Register User
          </Button>
        </Stack>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        opened={editModalOpened}
        onClose={() => setEditModalOpened(false)}
        title={`Edit User`}
        size={isMobile ? 'sm' : 'md'}
      >
        {currentUser && (
          <Stack spacing="sm">
            <TextInput
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <TextInput
              label="First Name"
              name="fname"
              value={formData.fname}
              onChange={handleInputChange}
            />
            <TextInput
              label="Last Name"
              name="lname"
              value={formData.lname}
              onChange={handleInputChange}
            />
            <TextInput
              label="Phone Number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
            <Button onClick={handleUpdateSubmit} fullWidth mt="sm">
              Update User
            </Button>
          </Stack>
        )}
      </Modal>
    </Box>
  );
};

export default Users;