import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Product, Category, OrderStatus } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';
import {
  ShieldAlert,
  Package,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  CheckCircle2,
  X,
  Search,
  Filter
} from 'lucide-react';

const CATEGORIES: Category[] = [
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Books',
  'Beauty',
  'Sports',
  'Toys'
];

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    resetToInitialData,
    currentUser,
    switchUserRole,
    showToast
  } = useShop();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals for Products
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State for Adding / Editing Product
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics' as Category,
    brand: '',
    price: 999,
    originalPrice: 1499,
    stock: 20,
    description: '',
    image: '',
    specKey: 'Material / Specs',
    specValue: 'Premium standard'
  });

  // Calculate Metrics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const lowStockProducts = products.filter((p) => p.stock <= 10);

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      category: 'Electronics',
      brand: '',
      price: 1999,
      originalPrice: 2999,
      stock: 25,
      description: '',
      image: '',
      specKey: 'Primary Feature',
      specValue: 'High durability'
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price,
      originalPrice: product.originalPrice,
      stock: product.stock,
      description: product.description,
      image: product.image,
      specKey: 'Main Feature',
      specValue: 'Verified spec'
    });
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.brand.trim() || !formData.description.trim()) {
      showToast('Please fill in product title, brand, and description.', 'warning');
      return;
    }

    const discountPercentage = Math.max(
      0,
      Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)
    );

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: formData.name.trim(),
        category: formData.category,
        brand: formData.brand.trim(),
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        discountPercentage,
        stock: Number(formData.stock),
        description: formData.description.trim(),
        image: formData.image.trim() || editingProduct.image
      });
      setEditingProduct(null);
    } else {
      addProduct({
        name: formData.name.trim(),
        category: formData.category,
        brand: formData.brand.trim(),
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        discountPercentage,
        rating: 4.8,
        reviewCount: 1,
        stock: Number(formData.stock),
        description: formData.description.trim(),
        image:
          formData.image.trim() ||
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
        specifications: {
          [formData.specKey]: formData.specValue
        },
        isFeatured: true
      });
      setIsAddModalOpen(false);
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in">
      {/* Top Banner & Role notice */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              Store Admin Demonstration Portal
              <span className="text-[10px] font-mono uppercase bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded">
                Expo Mode
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulate merchant inventory operations, order fulfillment pipelines, and real-time storefront synchronizations.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToInitialData}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
            title="Reset data to pristine demo state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          {currentUser.role === 'admin' ? (
            <button
              onClick={() => switchUserRole('customer')}
              className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg transition-colors"
            >
              Switch to Shopper View
            </button>
          ) : (
            <button
              onClick={() => switchUserRole('admin')}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-colors"
            >
              Switch to Admin Role
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'overview'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Overview & Metrics
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'products'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Manage Catalogue ({totalProducts})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'orders'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Manage Orders ({totalOrders})
        </button>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Total Products
                </span>
                <h3 className="text-2xl font-black text-slate-900 font-mono-tabular mt-1">
                  {totalProducts}
                </h3>
                <span className="text-[11px] text-emerald-600 font-medium">Across 7 categories</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Simulated Orders
                </span>
                <h3 className="text-2xl font-black text-slate-900 font-mono-tabular mt-1">
                  {totalOrders}
                </h3>
                <span className="text-[11px] text-sky-600 font-medium">Active test transactions</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Demo Revenue (₹)
                </span>
                <h3 className="text-2xl font-black text-slate-900 font-mono-tabular mt-1">
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </h3>
                <span className="text-[11px] text-emerald-600 font-medium">Non-financial simulation</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Low Stock Items
                </span>
                <h3 className="text-2xl font-black text-amber-600 font-mono-tabular mt-1">
                  {lowStockProducts.length}
                </h3>
                <span className="text-[11px] text-amber-700 font-medium">&le; 10 units remaining</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Low stock alerts table */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Low Stock Replenishment Alerts</span>
                </h3>
                <button
                  onClick={() => setActiveTab('products')}
                  className="text-xs text-sky-600 hover:underline font-semibold"
                >
                  Manage All
                </button>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {lowStockProducts.slice(0, 5).map((prod) => (
                  <div key={prod.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900 line-clamp-1">{prod.name}</h4>
                      <span className="text-slate-400">{prod.category} · ₹{prod.price.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-[11px]">
                        {prod.stock} units left
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-sky-600" />
                  <span>Recent Simulated Orders</span>
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-sky-600 hover:underline font-semibold"
                >
                  View All Orders
                </button>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {orders.slice(0, 5).map((ord) => (
                  <div key={ord.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 font-mono">{ord.id}</span>
                        <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-1.5 py-0.2 rounded">
                          {ord.status}
                        </span>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        {ord.shippingAddress.fullName} · {ord.shippingAddress.city}
                      </p>
                    </div>
                    <span className="font-bold text-slate-900 font-mono-tabular">
                      ₹{ord.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Catalogue Management</h2>
              <p className="text-xs text-slate-500">Add new products, edit pricing and stock counts, or remove items</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter products..."
                  className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg pr-7 focus:outline-hidden"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
              </div>

              <button
                onClick={handleOpenAdd}
                className="py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                <tr>
                  <th className="p-3">Product Info</th>
                  <th className="p-3">Category</th>
                  <th className="p-3 text-right">Price (₹)</th>
                  <th className="p-3 text-right">Stock</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50">
                    <td className="p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        <ImageWithFallback src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="font-semibold text-slate-900 block line-clamp-1">{p.name}</span>
                        <span className="text-[10px] text-slate-400 uppercase font-bold">{p.brand} · SKU: {p.id}</span>
                      </div>
                    </td>
                    <td className="p-3 text-slate-600 font-medium">{p.category}</td>
                    <td className="p-3 text-right font-mono-tabular font-bold text-slate-900">
                      ₹{p.price.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-right font-mono-tabular">
                      <span className={`font-bold ${p.stock <= 5 ? 'text-rose-600' : 'text-slate-700'}`}>
                        {p.stock} units
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      {p.stock > 0 ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                          Out of Stock
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-slate-100 rounded"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${p.name}" from storefront?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">Simulated Order Pipeline Management</h2>
            <p className="text-xs text-slate-500">
              Promote order status from "Confirmed" to "Packed", "Shipped", or "Delivered". The user's tracking page updates in real-time!
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Customer & Location</th>
                  <th className="p-3 text-right">Total Amount</th>
                  <th className="p-3">Current Status</th>
                  <th className="p-3 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/50">
                    <td className="p-3 font-mono font-bold text-slate-900">{ord.id}</td>
                    <td className="p-3 text-slate-500">{new Date(ord.date).toLocaleDateString('en-IN')}</td>
                    <td className="p-3">
                      <span className="font-semibold text-slate-900 block">{ord.shippingAddress.fullName}</span>
                      <span className="text-[11px] text-slate-400">{ord.shippingAddress.city} - {ord.shippingAddress.pinCode}</span>
                    </td>
                    <td className="p-3 text-right font-mono-tabular font-bold text-slate-900">
                      ₹{ord.total.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-sky-50 text-sky-800 border border-sky-200">
                        {ord.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className="px-2 py-1 bg-slate-50 border border-slate-300 rounded text-xs font-semibold text-slate-800 focus:outline-hidden cursor-pointer"
                      >
                        <option value="Ordered">Ordered</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL */}
      {(isAddModalOpen || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 my-8">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-semibold text-sm">
                {editingProduct ? `Edit Product: ${editingProduct.name.slice(0, 24)}...` : 'Add New Expo Product'}
              </h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingProduct(null);
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Aura Wireless Active Earbuds"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g. AeroSound"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Offer Price (₹) *</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono-tabular"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Original MRP (₹) *</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono-tabular"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Stock Count *</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono-tabular"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed product features, materials, and warranty information..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Image URL (Optional)</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="Leave blank to use default fallback image"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-bold shadow-xs"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
