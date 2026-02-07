// app/account/page.jsx
'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  LockClosedIcon,
  ShoppingBagIcon,
  CreditCardIcon,
  BellIcon,
  ShieldCheckIcon,
  TrashIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import LogoutButton from '../../../components/LogoutButton';

export default function AccountPage() {
  const {
    data: session,
    status,
    update,
  } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login?callbackUrl=/account');
    },
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
  });

  // Mock orders data
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      date: '2024-01-15',
      total: 1299.99,
      status: 'Delivered',
      items: 3,
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      total: 599.99,
      status: 'Processing',
      items: 2,
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      total: 2499.99,
      status: 'Delivered',
      items: 5,
    },
  ]);

  // Mock payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'visa', last4: '4242', expiry: '12/25', isDefault: true },
    {
      id: 2,
      type: 'mastercard',
      last4: '8888',
      expiry: '08/24',
      isDefault: false,
    },
  ]);

  useEffect(() => {
    if (session?.user) {
      // In a real app, fetch user data from your API
      setUserData({
        name: session.user.name || '',
        email: session.user.email || '',
        phone: '+1 (555) 123-4567',
        address: '123 Tech Street',
        city: 'San Francisco',
        country: 'United States',
        postalCode: '94107',
      });
    }
  }, [session]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, make API call to update user data
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      toast.success('Profile updated successfully!');
      setIsEditing(false);

      // Update session with new name
      if (userData.name !== session.user.name) {
        await update({ name: userData.name });
      }
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancelEdit = () => {
    // Reset to original data
    setUserData({
      name: session.user.name || '',
      email: session.user.email || '',
      phone: '+1 (555) 123-4567',
      address: '123 Tech Street',
      city: 'San Francisco',
      country: 'United States',
      postalCode: '94107',
    });
    setIsEditing(false);
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      try {
        // In a real app, make API call to delete account
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success('Account deleted successfully');
        // Redirect to home page after deletion
        window.location.href = '/';
      } catch (error) {
        toast.error('Failed to delete account');
      }
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserCircleIcon },
    { id: 'orders', name: 'Orders', icon: ShoppingBagIcon },
    { id: 'payments', name: 'Payments', icon: CreditCardIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
  ];

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Image
            src={session.user.image || '/default-avatar.png'}
            alt="User Avatar"
            width={100}
            height={100}
            className="rounded-full mx-auto"
          />
          <p className="text-gray-600 mt-2">
            Welcome back,{' '}
            <span className="font-semibold text-blue-600">
              {session.user.name || session.user.email}
            </span>
          </p>
          <LogoutButton className="mt-4" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    {tab.name}
                  </button>
                ))}
              </div>

              {/* Account Stats */}
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Account Stats
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Orders</span>
                    <span className="font-semibold">{orders.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Member Since</span>
                    <span className="font-semibold">Jan 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Loyalty Points
                    </span>
                    <span className="font-semibold text-green-600">1,250</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Personal Information
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <PencilIcon className="h-4 w-4" />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveProfile}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                      >
                        <CheckIcon className="h-4 w-4" />
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                      >
                        <XMarkIcon className="h-4 w-4" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="flex items-center gap-2">
                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          value={userData.email}
                          disabled
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Email cannot be changed
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="flex items-center gap-2">
                        <PhoneIcon className="h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={userData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="address"
                          value={userData.address}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                          placeholder="Street address"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={userData.city}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={userData.country}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Order History
                </h2>

                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Order #{order.id}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Placed on {order.date}
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.items} items
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            ${order.total.toFixed(2)}
                          </p>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              order.status === 'Delivered'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                          View Details
                        </button>
                        <button className="ml-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
                          Track Order
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Payment Methods
                  </h2>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Add Payment Method
                  </button>
                </div>

                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-16 bg-gray-100 rounded flex items-center justify-center">
                            <span className="font-bold">
                              {method.type === 'visa' ? 'VISA' : 'MC'}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold">
                              **** **** **** {method.last4}
                            </p>
                            <p className="text-sm text-gray-600">
                              Expires {method.expiry}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {method.isDefault && (
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                              Default
                            </span>
                          )}
                          <button className="text-blue-600 hover:text-blue-800">
                            Edit
                          </button>
                          {!method.isDefault && (
                            <button className="text-red-600 hover:text-red-800">
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Security Settings
                </h2>

                <div className="space-y-6">
                  <div className="border-b pb-6">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <LockClosedIcon className="h-5 w-5" />
                      Change Password
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Enter new password"
                        />
                      </div>
                    </div>
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Update Password
                    </button>
                  </div>

                  <div className="border-b pb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Two-Factor Authentication
                    </h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-600">
                          Add an extra layer of security to your account
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Currently disabled
                        </p>
                      </div>
                      <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                        Enable 2FA
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                      <TrashIcon className="h-5 w-5" />
                      Danger Zone
                    </h3>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-800 mb-3">
                        Once you delete your account, there is no going back.
                        Please be certain.
                      </p>
                      <button
                        onClick={handleDeleteAccount}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Notification Preferences
                </h2>

                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Email Notifications
                      </h3>
                      <p className="text-sm text-gray-600">
                        Receive updates about your orders and promotions
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        SMS Notifications
                      </h3>
                      <p className="text-sm text-gray-600">
                        Get order updates via text message
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Marketing Emails
                      </h3>
                      <p className="text-sm text-gray-600">
                        Receive promotional offers and newsletters
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
