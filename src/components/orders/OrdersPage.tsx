import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Order, OrderStatus } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Printer,
  X,
  ExternalLink,
  MapPin,
  Calendar,
  AlertCircle,
  FileText
} from 'lucide-react';

const ORDER_STAGES: OrderStatus[] = [
  'Ordered',
  'Confirmed',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered'
];

export const OrdersPage: React.FC = () => {
  const { orders, setCurrentPage, openProductDetail } = useShop();

  const [activeTab, setActiveTab] = useState<'all' | 'transit' | 'delivered'>('all');
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState<Order | null>(null);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((ord) => {
    if (activeTab === 'delivered') return ord.status === 'Delivered';
    if (activeTab === 'transit') return ord.status !== 'Delivered' && ord.status !== 'Cancelled';
    return true;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-md flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
          </span>
        );
      case 'Shipped':
      case 'Out for Delivery':
        return (
          <span className="px-2.5 py-1 bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold rounded-md flex items-center gap-1">
            <Truck className="w-3.5 h-3.5" /> In Transit ({status})
          </span>
        );
      case 'Packed':
      case 'Confirmed':
      case 'Ordered':
      default:
        return (
          <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold rounded-md flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Your Orders & Simulated Shipments
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track package delivery timelines and review past order invoices
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'all'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('transit')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'transit'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            In Transit
          </button>
          <button
            onClick={() => setActiveTab('delivered')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'delivered'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Delivered
          </button>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-900 text-sm mb-1">
            No orders found under this filter
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            Place a simulated order through our product catalogue to see it appear here immediately with live tracking status.
          </p>
          <button
            onClick={() => setCurrentPage('catalog')}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const formattedDate = new Date(order.date).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            });

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs"
              >
                {/* Order Top Meta Bar */}
                <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex flex-wrap items-center gap-6">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Order Placed
                      </span>
                      <span className="font-semibold text-slate-800">{formattedDate}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Total Amount
                      </span>
                      <span className="font-bold text-slate-900 font-mono-tabular">
                        ₹{order.total.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Ship To
                      </span>
                      <span className="font-semibold text-slate-800">
                        {order.shippingAddress.fullName.split(' ')[0]} ({order.shippingAddress.city})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-slate-500">
                      ID: {order.id}
                    </span>
                    <button
                      onClick={() => setSelectedInvoiceOrder(order)}
                      className="text-xs text-sky-600 hover:text-sky-700 font-semibold hover:underline flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Invoice</span>
                    </button>
                  </div>
                </div>

                {/* Order Body */}
                <div className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  {/* Left: Items preview */}
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2">
                      {getStatusBadge(order.status)}
                      <span className="text-xs text-slate-600">
                        Estimated: <strong>{order.estimatedDelivery}</strong>
                      </span>
                    </div>

                    <div className="space-y-2 pt-1">
                      {order.items.map(({ product, quantity }) => (
                        <div key={product.id} className="flex items-center gap-3">
                          <div
                            onClick={() => openProductDetail(product.id)}
                            className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 cursor-pointer border border-slate-200"
                          >
                            <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="text-xs">
                            <h4
                              onClick={() => openProductDetail(product.id)}
                              className="font-semibold text-slate-900 hover:text-sky-600 cursor-pointer line-clamp-1"
                            >
                              {product.name}
                            </h4>
                            <p className="text-slate-500">
                              Qty: {quantity} · ₹{product.price.toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedTrackingOrder(order)}
                      className="py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                    >
                      <Truck className="w-4 h-4" />
                      <span>Track Package</span>
                    </button>

                    <button
                      onClick={() => setSelectedInvoiceOrder(order)}
                      className="py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>View Receipt</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TRACKING TIMELINE MODAL */}
      {selectedTrackingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-sky-400" />
                <div>
                  <h3 className="font-semibold text-sm">Tracking #{selectedTrackingOrder.id}</h3>
                  <p className="text-xs text-slate-300">Simulated Express Logistics</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTrackingOrder(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-sky-950">Current Status:</span>
                  {getStatusBadge(selectedTrackingOrder.status)}
                </div>
                <p className="text-slate-600">
                  Estimated Delivery: <strong>{selectedTrackingOrder.estimatedDelivery}</strong>
                </p>
                <p className="text-slate-600">
                  Destination: {selectedTrackingOrder.shippingAddress.city} - {selectedTrackingOrder.shippingAddress.pinCode}
                </p>
              </div>

              {/* Progress Steps Indicator */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Progress Pipeline
                </h4>
                <div className="grid grid-cols-5 gap-1 text-center">
                  {ORDER_STAGES.filter((s) => s !== 'Cancelled').map((stage, idx) => {
                    const stageIndex = ORDER_STAGES.indexOf(stage);
                    const currentStageIndex = ORDER_STAGES.indexOf(selectedTrackingOrder.status);
                    const isDone = stageIndex <= currentStageIndex;

                    return (
                      <div key={stage} className="flex flex-col items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mb-1 ${
                            isDone ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {isDone ? '✓' : idx + 1}
                        </div>
                        <span className="text-[10px] leading-tight text-slate-600 font-medium">
                          {stage}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Event Logs Timeline */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Logistics Milestones
                </h4>
                <div className="border-l-2 border-sky-300 ml-3 pl-4 space-y-4 text-xs">
                  {selectedTrackingOrder.trackingHistory.map((item, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-sky-600 ring-4 ring-white" />
                      <div className="flex justify-between items-center font-bold text-slate-900">
                        <span>{item.status}</span>
                        <span className="text-[11px] text-slate-400 font-normal">{item.timestamp}</span>
                      </div>
                      <p className="text-slate-700 text-[11px] mt-0.5">{item.description}</p>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {item.location}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => setSelectedTrackingOrder(null)}
                  className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg"
                >
                  Close Tracking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAX INVOICE MODAL */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <h3 className="font-semibold text-sm">Tax Invoice Summary</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print
                </button>
                <button
                  onClick={() => setSelectedInvoiceOrder(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6 text-xs max-h-[75vh] overflow-y-auto">
              {/* Header Info */}
              <div className="flex justify-between pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-lg font-black text-slate-900">ShopSphere Retail Demo</h2>
                  <p className="text-slate-500">GSTIN: 27AABCS1429B1Z8 (Simulated)</p>
                  <p className="text-slate-500">Tech Park, Powai, Mumbai - 400076</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900 font-mono">Invoice #{selectedInvoiceOrder.id}</p>
                  <p className="text-slate-500">Date: {new Date(selectedInvoiceOrder.date).toLocaleDateString('en-IN')}</p>
                  <p className="text-emerald-700 font-semibold uppercase">{selectedInvoiceOrder.status}</p>
                </div>
              </div>

              {/* Billing / Shipping */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">
                    Billed / Shipped To:
                  </h4>
                  <p className="font-semibold text-slate-900">{selectedInvoiceOrder.shippingAddress.fullName}</p>
                  <p className="text-slate-600">{selectedInvoiceOrder.shippingAddress.addressLine1}</p>
                  <p className="text-slate-600">{selectedInvoiceOrder.shippingAddress.city}, {selectedInvoiceOrder.shippingAddress.state} - {selectedInvoiceOrder.shippingAddress.pinCode}</p>
                  <p className="text-slate-500 mt-1">Contact: {selectedInvoiceOrder.shippingAddress.phone}</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">
                    Payment & Delivery:
                  </h4>
                  <p className="text-slate-800 uppercase font-semibold">Method: {selectedInvoiceOrder.paymentMethod}</p>
                  <p className="text-slate-600">{selectedInvoiceOrder.paymentDetailsSummary || 'Simulated transaction'}</p>
                  <p className="text-slate-600 mt-1">Delivery: {selectedInvoiceOrder.deliveryMethod === 'express' ? 'Express Next-Day' : 'Standard 2-3 Days'}</p>
                </div>
              </div>

              {/* Line items table */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-700">
                    <tr>
                      <th className="p-2.5">Item Description</th>
                      <th className="p-2.5 text-center">Qty</th>
                      <th className="p-2.5 text-right">Price</th>
                      <th className="p-2.5 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedInvoiceOrder.items.map(({ product, quantity }) => (
                      <tr key={product.id}>
                        <td className="p-2.5">
                          <p className="font-semibold text-slate-900">{product.name}</p>
                          <span className="text-[10px] text-slate-400 uppercase">{product.brand} · SKU: {product.id}</span>
                        </td>
                        <td className="p-2.5 text-center font-mono-tabular">{quantity}</td>
                        <td className="p-2.5 text-right font-mono-tabular">₹{product.price.toLocaleString('en-IN')}</td>
                        <td className="p-2.5 text-right font-mono-tabular font-bold">
                          ₹{(product.price * quantity).toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="flex justify-end">
                <div className="w-64 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span className="font-mono-tabular">₹{selectedInvoiceOrder.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {selectedInvoiceOrder.discount > 0 && (
                    <div className="flex justify-between text-rose-600">
                      <span>Discount:</span>
                      <span className="font-mono-tabular">-₹{selectedInvoiceOrder.discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {selectedInvoiceOrder.couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Promo Coupon:</span>
                      <span className="font-mono-tabular">-₹{selectedInvoiceOrder.couponDiscount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Delivery Fee:</span>
                    <span className="font-mono-tabular">
                      {selectedInvoiceOrder.deliveryFee === 0 ? 'FREE' : `₹${selectedInvoiceOrder.deliveryFee}`}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                    <span>Final Amount:</span>
                    <span className="font-mono-tabular">₹{selectedInvoiceOrder.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 text-[11px] text-center">
                This is a computer-generated simulated receipt for college expo evaluation. No physical goods or actual payments apply.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
