import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign,
  Eye,
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const AdminDashboard = () => {
  // Sample analytics data
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: '+20.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Total Orders',
      value: '2,350',
      change: '+15.3%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      title: 'Eye Tests Booked',
      value: '573',
      change: '-5.2%',
      trend: 'down',
      icon: Eye,
      color: 'bg-orange-500'
    }
  ];

  // Recent orders data
  const recentOrders = [
    {
      id: 'ORD001',
      customer: 'John Doe',
      product: 'Ray-Ban Aviator',
      amount: '$199.99',
      status: 'Completed',
      date: '2024-02-15'
    },
    {
      id: 'ORD002',
      customer: 'Jane Smith',
      product: 'Oakley Holbrook',
      amount: '$179.99',
      status: 'Processing',
      date: '2024-02-15'
    },
    {
      id: 'ORD003',
      customer: 'Mike Johnson',
      product: 'Prada PR 17WS',
      amount: '$299.99',
      status: 'Shipped',
      date: '2024-02-14'
    },
    {
      id: 'ORD004',
      customer: 'Sarah Williams',
      product: 'Gucci GG0061S',
      amount: '$450.00',
      status: 'Completed',
      date: '2024-02-14'
    },
    {
      id: 'ORD005',
      customer: 'David Brown',
      product: 'Tom Ford FT0752',
      amount: '$520.00',
      status: 'Processing',
      date: '2024-02-13'
    }
  ];

  // Top products data
  const topProducts = [
    { name: 'Ray-Ban Aviator', sales: 234, revenue: '$46,766' },
    { name: 'Oakley Holbrook', sales: 187, revenue: '$33,641' },
    { name: 'Prada PR 17WS', sales: 156, revenue: '$46,794' },
    { name: 'Gucci GG0061S', sales: 143, revenue: '$64,350' },
    { name: 'Tom Ford FT0752', sales: 98, revenue: '$50,960' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your business overview</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold text-black mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders - Takes 2 columns */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-black">Recent Orders</h2>
            <p className="text-sm text-gray-600 mt-1">Latest transactions from your store</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-black">
                      {order.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products - Takes 1 column */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-black">Top Products</h2>
            <p className="text-sm text-gray-600 mt-1">Best selling items</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-black">{product.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-black">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sales Chart Placeholder */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-black">Sales Overview</h2>
            <p className="text-sm text-gray-600 mt-1">Monthly revenue trend</p>
          </div>
          <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:border-black">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last year</option>
          </select>
        </div>
        
        {/* Simple Bar Chart Visualization */}
        <div className="flex items-end justify-between gap-2 h-64">
          {[65, 80, 75, 90, 85, 95, 88, 92, 78, 85, 90, 94].map((height, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full bg-gradient-to-t from-black to-gray-700 rounded-t-lg hover:from-gray-800 hover:to-gray-600 transition-all cursor-pointer"
                style={{ height: `${height}%` }}
              />
              <span className="text-xs text-gray-500">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
