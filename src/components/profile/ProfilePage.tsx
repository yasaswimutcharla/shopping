import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldAlert,
  Sparkles,
  Package,
  Heart,
  Edit2,
  Check
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const {
    currentUser,
    switchUserRole,
    setCurrentPage,
    orders,
    wishlist,
    showToast
  } = useShop();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone || '+91 98765 43210');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    showToast('Profile updated in local demonstration session.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-black text-2xl shadow-md">
            {currentUser.name[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">{currentUser.name}</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-sky-100 text-sky-800 border border-sky-200">
                {currentUser.role}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{currentUser.email}</p>
          </div>
        </div>

        {/* Switch Role Buttons */}
        <div className="flex items-center gap-2">
          {currentUser.role !== 'admin' ? (
            <button
              onClick={() => switchUserRole('admin')}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Switch to Store Admin</span>
            </button>
          ) : (
            <button
              onClick={() => switchUserRole('customer')}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <User className="w-4 h-4" />
              <span>Switch to Shopper View</span>
            </button>
          )}
        </div>
      </div>

      {/* Account Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => setCurrentPage('orders')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
        >
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase">Your Orders</span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">{orders.length} Placed</h3>
            <span className="text-xs text-sky-600 font-medium">Track or view invoices &rarr;</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
        </div>

        <div
          onClick={() => setCurrentPage('wishlist')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
        >
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase">Wishlist</span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">{wishlist.length} Items</h3>
            <span className="text-xs text-rose-600 font-medium">View saved products &rarr;</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
        </div>

        <div
          onClick={() => setCurrentPage('catalog')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
        >
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase">Catalogue</span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">30+ Items</h3>
            <span className="text-xs text-emerald-600 font-medium">Browse store deals &rarr;</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Profile Details & Default Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Details */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="font-bold text-sm text-slate-900">Personal Information</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs font-semibold text-sky-600 hover:underline flex items-center gap-1"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel' : 'Edit'}</span>
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-bold"
              >
                Save Details
              </button>
            </form>
          ) : (
            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                <span>{name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{currentUser.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>{phone}</span>
              </div>
            </div>
          )}
        </div>

        {/* Default Shipping Address */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-sky-600" />
              <span>Saved Shipping Address</span>
            </h2>
            <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
              Default
            </span>
          </div>

          <div className="text-xs text-slate-700 leading-relaxed">
            <p className="font-semibold text-slate-900">
              {currentUser.defaultAddress?.fullName || 'Rohan Sharma'}
            </p>
            <p>{currentUser.defaultAddress?.addressLine1 || 'Room 304, Campus Tech Hostel'}</p>
            {currentUser.defaultAddress?.addressLine2 && (
              <p>{currentUser.defaultAddress.addressLine2}</p>
            )}
            <p>
              {currentUser.defaultAddress?.city || 'Mumbai'},{' '}
              {currentUser.defaultAddress?.state || 'Maharashtra'} -{' '}
              {currentUser.defaultAddress?.pinCode || '400076'}
            </p>
            <p className="text-slate-500 mt-2">
              Phone: {currentUser.defaultAddress?.phone || '+91 98765 43210'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
