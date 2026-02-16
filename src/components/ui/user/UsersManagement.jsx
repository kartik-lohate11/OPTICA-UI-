import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye,
  Filter,
  Download,
  X,
  Mail,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';

const UsersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([
    {
      id: 'USR001',
      userId: 'USR001',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 98765 43210',
      role: 'Customer',
      status: 'Active',
      joinDate: '2024-01-15',
      totalOrders: 5,
      totalSpent: '$1,245.95',
      address: '123 Main St, Delhi, India',
      lastLogin: '2024-02-15'
    },
    {
      id: 'USR002',
      userId: 'USR002',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+91 98765 43211',
      role: 'Customer',
      status: 'Active',
      joinDate: '2024-01-20',
      totalOrders: 3,
      totalSpent: '$879.97',
      address: '456 Park Ave, Mumbai, India',
      lastLogin: '2024-02-14'
    },
    {
      id: 'USR003',
      userId: 'USR003',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+91 98765 43212',
      role: 'Admin',
      status: 'Active',
      joinDate: '2023-12-01',
      totalOrders: 12,
      totalSpent: '$3,599.88',
      address: '789 Oak Rd, Bangalore, India',
      lastLogin: '2024-02-16'
    },
    {
      id: 'USR004',
      userId: 'USR004',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      phone: '+91 98765 43213',
      role: 'Customer',
      status: 'Active',
      joinDate: '2024-02-01',
      totalOrders: 7,
      totalSpent: '$2,150.00',
      address: '321 Pine St, Chennai, India',
      lastLogin: '2024-02-15'
    },
    {
      id: 'USR005',
      userId: 'USR005',
      name: 'David Brown',
      email: 'david@example.com',
      phone: '+91 98765 43214',
      role: 'Customer',
      status: 'Inactive',
      joinDate: '2023-11-15',
      totalOrders: 2,
      totalSpent: '$720.00',
      address: '654 Maple Ave, Pune, India',
      lastLogin: '2024-01-20'
    },
    {
      id: 'USR006',
      userId: 'USR006',
      name: 'Emma Wilson',
      email: 'emma@example.com',
      phone: '+91 98765 43215',
      role: 'Manager',
      status: 'Active',
      joinDate: '2024-01-10',
      totalOrders: 8,
      totalSpent: '$2,980.00',
      address: '987 Elm St, Kolkata, India',
      lastLogin: '2024-02-16'
    }
  ]);

  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    email: '',
    phone: '',
    role: 'Customer',
    status: 'Active',
    address: ''
  });

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin':
        return 'bg-purple-100 text-purple-800';
      case 'Manager':
        return 'bg-blue-100 text-blue-800';
      case 'Customer':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = () => {
    setModalMode('create');
    setFormData({
      userId: `USR${String(users.length + 1).padStart(3, '0')}`,
      name: '',
      email: '',
      phone: '',
      role: 'Customer',
      status: 'Active',
      address: ''
    });
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setModalMode('edit');
    setSelectedUser(user);
    setFormData(user);
    setIsModalOpen(true);
  };

  const handleViewUser = (user) => {
    setModalMode('view');
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (modalMode === 'create') {
      const newUser = {
        ...formData,
        id: formData.userId,
        joinDate: new Date().toISOString().split('T')[0],
        totalOrders: 0,
        totalSpent: '$0.00',
        lastLogin: 'Never'
      };
      setUsers([...users, newUser]);
    } else if (modalMode === 'edit') {
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, ...formData } : user
      ));
    }
    
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black">Users Management</h1>
          <p className="text-gray-600 mt-1">Manage customer accounts and permissions</p>
        </div>
        <button
          onClick={handleCreateUser}
          className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all"
        >
          <Plus className="w-5 h-5" />
          Add User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-sm text-gray-600 font-medium">Total Users</p>
          <p className="text-3xl font-bold text-black mt-2">{users.length}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-sm text-gray-600 font-medium">Active Users</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {users.filter(u => u.status === 'Active').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-sm text-gray-600 font-medium">Admins</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {users.filter(u => u.role === 'Admin').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-sm text-gray-600 font-medium">Customers</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {users.filter(u => u.role === 'Customer').length}
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by user ID, name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
            />
          </div>

          {/* Role Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors font-medium"
            >
              <option value="all">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Customer">Customer</option>
            </select>
          </div>

          {/* Export Button */}
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  User ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-black">
                      {user.userId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div className="text-sm font-medium text-black">{user.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{user.email}</div>
                      <div className="text-xs text-gray-500">{user.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {user.totalOrders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-black">
                      {user.totalSpent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewUser(user)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleEditUser(user)}
                          className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit User"
                        >
                          <Edit2 className="w-4 h-4 text-green-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                    No users found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit/View Modal */}
      {isModalOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsModalOpen(false)}
          />
          
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-black">
                  {modalMode === 'create' && 'Add New User'}
                  {modalMode === 'edit' && 'Edit User'}
                  {modalMode === 'view' && 'User Details'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {modalMode === 'view' ? (
                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                    <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center font-bold text-3xl">
                      {selectedUser.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-black">{selectedUser.name}</h3>
                      <p className="text-gray-600">{selectedUser.userId}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </label>
                      <p className="text-base text-black mt-2">{selectedUser.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone
                      </label>
                      <p className="text-base text-black mt-2">{selectedUser.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Role</label>
                      <div className="mt-2">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(selectedUser.role)}`}>
                          {selectedUser.role}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Status</label>
                      <div className="mt-2">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedUser.status)}`}>
                          {selectedUser.status}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Join Date
                      </label>
                      <p className="text-base text-black mt-2">
                        {new Date(selectedUser.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Last Login</label>
                      <p className="text-base text-black mt-2">{selectedUser.lastLogin}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Total Orders</label>
                      <p className="text-2xl font-bold text-black mt-2">{selectedUser.totalOrders}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Total Spent</label>
                      <p className="text-2xl font-bold text-black mt-2">{selectedUser.totalSpent}</p>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Address
                      </label>
                      <p className="text-base text-black mt-2">{selectedUser.address}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        User ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        disabled={modalMode === 'edit'}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none disabled:bg-gray-100"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Role <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                        required
                      >
                        <option value="Customer">Customer</option>
                        <option value="Manager">Manager</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Status <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                        required
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-black mb-2">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Main St, Delhi, India"
                        rows="3"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none resize-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-6 py-3 border-2 border-gray-200 text-black rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                    >
                      {modalMode === 'create' ? 'Add User' : 'Update User'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersManagement;
