import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye,
  Filter,
  Download,
  X
} from 'lucide-react';

const OrdersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view'
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      orderId: 'ORD001',
      customer: 'John Doe',
      email: 'john@example.com',
      phone: '+91 98765 43210',
      product: 'Ray-Ban Aviator',
      quantity: 1,
      price: '$199.99',
      total: '$199.99',
      status: 'Completed',
      date: '2024-02-15',
      address: '123 Main St, Delhi, India'
    },
    {
      id: 'ORD002',
      orderId: 'ORD002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+91 98765 43211',
      product: 'Oakley Holbrook',
      quantity: 2,
      price: '$179.99',
      total: '$359.98',
      status: 'Processing',
      date: '2024-02-15',
      address: '456 Park Ave, Mumbai, India'
    },
    {
      id: 'ORD003',
      orderId: 'ORD003',
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+91 98765 43212',
      product: 'Prada PR 17WS',
      quantity: 1,
      price: '$299.99',
      total: '$299.99',
      status: 'Shipped',
      date: '2024-02-14',
      address: '789 Oak Rd, Bangalore, India'
    },
    {
      id: 'ORD004',
      orderId: 'ORD004',
      customer: 'Sarah Williams',
      email: 'sarah@example.com',
      phone: '+91 98765 43213',
      product: 'Gucci GG0061S',
      quantity: 1,
      price: '$450.00',
      total: '$450.00',
      status: 'Completed',
      date: '2024-02-14',
      address: '321 Pine St, Chennai, India'
    },
    {
      id: 'ORD005',
      orderId: 'ORD005',
      customer: 'David Brown',
      email: 'david@example.com',
      phone: '+91 98765 43214',
      product: 'Tom Ford FT0752',
      quantity: 1,
      price: '$520.00',
      total: '$520.00',
      status: 'Pending',
      date: '2024-02-13',
      address: '654 Maple Ave, Pune, India'
    },
    {
      id: 'ORD006',
      orderId: 'ORD006',
      customer: 'Emma Wilson',
      email: 'emma@example.com',
      phone: '+91 98765 43215',
      product: 'Versace VE2150Q',
      quantity: 1,
      price: '$380.00',
      total: '$380.00',
      status: 'Cancelled',
      date: '2024-02-12',
      address: '987 Elm St, Kolkata, India'
    }
  ]);

  const [formData, setFormData] = useState({
    orderId: '',
    customer: '',
    email: '',
    phone: '',
    product: '',
    quantity: 1,
    price: '',
    total: '',
    status: 'Pending',
    address: ''
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-orange-100 text-orange-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleCreateOrder = () => {
    setModalMode('create');
    setFormData({
      orderId: `ORD${String(orders.length + 1).padStart(3, '0')}`,
      customer: '',
      email: '',
      phone: '',
      product: '',
      quantity: 1,
      price: '',
      total: '',
      status: 'Pending',
      address: ''
    });
    setIsModalOpen(true);
  };

  const handleEditOrder = (order) => {
    setModalMode('edit');
    setSelectedOrder(order);
    setFormData(order);
    setIsModalOpen(true);
  };

  const handleViewOrder = (order) => {
    setModalMode('view');
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(order => order.id !== orderId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (modalMode === 'create') {
      const newOrder = {
        ...formData,
        id: formData.orderId,
        date: new Date().toISOString().split('T')[0]
      };
      setOrders([...orders, newOrder]);
    } else if (modalMode === 'edit') {
      setOrders(orders.map(order => 
        order.id === selectedOrder.id ? { ...formData, id: selectedOrder.id } : order
      ));
    }
    
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      // Auto-calculate total when quantity or price changes
      if (name === 'quantity' || name === 'price') {
        const qty = name === 'quantity' ? parseInt(value) || 0 : prev.quantity;
        const price = name === 'price' ? parseFloat(value.replace('$', '')) || 0 : parseFloat(prev.price.replace('$', '')) || 0;
        updated.total = `$${(qty * price).toFixed(2)}`;
      }
      
      return updated;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black">Orders Management</h1>
          <p className="text-gray-600 mt-1">Manage all customer orders and transactions</p>
        </div>
        <button
          onClick={handleCreateOrder}
          className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all"
        >
          <Plus className="w-5 h-5" />
          Create Order
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order ID, customer, product, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors font-medium"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Export Button */}
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-black">
                      {order.orderId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-black">{order.customer}</div>
                      <div className="text-xs text-gray-500">{order.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-black">
                      {order.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleEditOrder(order)}
                          className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit Order"
                        >
                          <Edit2 className="w-4 h-4 text-green-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Order"
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
                    No orders found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
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
                  {modalMode === 'create' && 'Create New Order'}
                  {modalMode === 'edit' && 'Edit Order'}
                  {modalMode === 'view' && 'Order Details'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {modalMode === 'view' ? (
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Order ID</label>
                      <p className="text-lg font-bold text-black mt-1">{selectedOrder.orderId}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Status</label>
                      <div className="mt-1">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                          {selectedOrder.status}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Customer</label>
                      <p className="text-base text-black mt-1">{selectedOrder.customer}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-base text-black mt-1">{selectedOrder.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Phone</label>
                      <p className="text-base text-black mt-1">{selectedOrder.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Date</label>
                      <p className="text-base text-black mt-1">{new Date(selectedOrder.date).toLocaleDateString()}</p>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-gray-500">Product</label>
                      <p className="text-base text-black mt-1">{selectedOrder.product}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Quantity</label>
                      <p className="text-base text-black mt-1">{selectedOrder.quantity}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Price per Unit</label>
                      <p className="text-base text-black mt-1">{selectedOrder.price}</p>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-gray-500">Total Amount</label>
                      <p className="text-2xl font-bold text-black mt-1">{selectedOrder.total}</p>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-gray-500">Delivery Address</label>
                      <p className="text-base text-black mt-1">{selectedOrder.address}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Order ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="orderId"
                        value={formData.orderId}
                        onChange={handleChange}
                        disabled={modalMode === 'edit'}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none disabled:bg-gray-100"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Customer Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="customer"
                        value={formData.customer}
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

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-black mb-2">
                        Product Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="product"
                        value={formData.product}
                        onChange={handleChange}
                        placeholder="Ray-Ban Aviator"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Quantity <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        min="1"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Price per Unit <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="$199.99"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Total Amount
                      </label>
                      <input
                        type="text"
                        name="total"
                        value={formData.total}
                        readOnly
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 font-bold"
                      />
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
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-black mb-2">
                        Delivery Address <span className="text-red-500">*</span>
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
                      {modalMode === 'create' ? 'Create Order' : 'Update Order'}
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

export default OrdersManagement;
