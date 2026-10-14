import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { ShippingAddress, DeliveryMethod, PaymentMethod, Order } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';
import {
  CheckCircle2,
  MapPin,
  Truck,
  CreditCard,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  QrCode,
  AlertCircle,
  PackageCheck
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscountSavings,
    appliedCoupon,
    placeOrder,
    currentUser,
    setCurrentPage,
    showToast
  } = useShop();

  // Multi-step: 1 = Address, 2 = Delivery, 3 = Payment, 4 = Review, 5 = Placed
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Step 1: Address
  const [address, setAddress] = useState<ShippingAddress>(() => {
    return (
      currentUser.defaultAddress || {
        fullName: currentUser.name || 'Rohan Sharma',
        phone: currentUser.phone || '+91 98765 43210',
        email: currentUser.email || 'rohan.sharma@college.edu',
        addressLine1: 'Room 304, Campus Tech Hostel',
        addressLine2: 'Engineering College Campus, Powai',
        city: 'Mumbai',
        state: 'Maharashtra',
        pinCode: '400076',
        addressType: 'Home'
      }
    );
  });

  const [addressErrors, setAddressErrors] = useState<Record<string, string>>({});

  // Step 2: Delivery Speed
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('standard');

  // Step 3: Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('rohan@oksbi');
  const [cardHolder, setCardHolder] = useState('Rohan Sharma');
  const [cardDigits, setCardDigits] = useState('4532 8920 1029 4821');

  // Calculations
  const deliveryBaseFee = cartSubtotal >= 999 ? 0 : 99;
  const expressFee = deliveryMethod === 'express' ? 99 : 0;
  const totalDeliveryFee = deliveryBaseFee + expressFee;

  const couponDiscount = appliedCoupon
    ? Math.round((cartSubtotal * appliedCoupon.discountPercentage) / 100)
    : 0;

  const checkoutTotal = Math.max(0, cartSubtotal - couponDiscount + totalDeliveryFee);

  // Address validation
  const validateAddress = () => {
    const errors: Record<string, string> = {};
    if (!address.fullName.trim()) errors.fullName = 'Full name is required';
    if (!address.phone.trim() || address.phone.length < 10) errors.phone = 'Valid 10-digit phone is required';
    if (!address.email.trim() || !address.email.includes('@')) errors.email = 'Valid email is required';
    if (!address.addressLine1.trim()) errors.addressLine1 = 'Street address is required';
    if (!address.city.trim()) errors.city = 'City is required';
    if (!address.state.trim()) errors.state = 'State is required';
    if (!address.pinCode.trim() || address.pinCode.length !== 6) errors.pinCode = '6-digit PIN code required';

    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextFromAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAddress()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showToast('Please fix the errors in the shipping form.', 'warning');
    }
  };

  const handlePlaceOrder = () => {
    let paymentDetailsSummary = 'Cash on Delivery (Verified upon doorstep simulation)';
    if (paymentMethod === 'upi') {
      paymentDetailsSummary = `Simulated UPI ID: ${upiId || 'test@upi'}`;
    } else if (paymentMethod === 'card') {
      paymentDetailsSummary = `Simulated Card ending in ${cardDigits.slice(-4)}`;
    }

    const newOrder = placeOrder({
      items: cart,
      shippingAddress: address,
      deliveryMethod,
      deliveryFee: totalDeliveryFee,
      paymentMethod,
      paymentDetailsSummary,
      subtotal: cartSubtotal,
      discount: cartDiscountSavings,
      couponDiscount,
      total: checkoutTotal,
      estimatedDelivery: deliveryMethod === 'express' ? 'Tomorrow by 1 PM' : 'In 2-3 business days'
    });

    setCreatedOrder(newOrder);
    setCurrentStep(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If cart is empty and not on placed order screen
  if (cart.length === 0 && currentStep !== 5) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-xs my-8">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h2 className="text-base font-bold text-slate-900 mb-2">No Items in Cart for Checkout</h2>
        <p className="text-xs text-slate-500 mb-5">
          Add one or more products from the catalogue to simulate the checkout flow.
        </p>
        <button
          onClick={() => setCurrentPage('catalog')}
          className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs rounded-lg"
        >
          Browse Catalogue
        </button>
      </div>
    );
  }

  // STEP 5: Success screen
  if (currentStep === 5 && createdOrder) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 my-6 animate-in fade-in">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-10 text-center shadow-xs space-y-5">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Simulated Order Confirmed
            </span>
            <h1 className="text-2xl font-black text-slate-900 mt-1">
              Thank You for Your Order!
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Order ID: <strong className="font-mono text-slate-900 font-bold">{createdOrder.id}</strong>
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-left text-xs space-y-3">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Estimated Delivery:</span>
              <strong className="text-emerald-700">{createdOrder.estimatedDelivery}</strong>
            </div>

            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Delivery Address:</span>
              <span className="text-slate-800 text-right">
                {createdOrder.shippingAddress.fullName}, {createdOrder.shippingAddress.city} - {createdOrder.shippingAddress.pinCode}
              </span>
            </div>

            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Payment Simulation:</span>
              <span className="text-slate-800 uppercase font-semibold">
                {createdOrder.paymentMethod} · Paid ₹{createdOrder.total.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex justify-between pt-1">
              <span className="text-slate-500">Items Ordered:</span>
              <span className="font-semibold text-slate-900">
                {createdOrder.items.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                setCurrentPage('orders');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex-1 py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Truck className="w-4 h-4" />
              <span>Track Order Live</span>
            </button>

            <button
              onClick={() => {
                setCurrentPage('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors"
            >
              Continue Shopping
            </button>
          </div>

          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">
            * This simulated order has been saved to your local browser storage. You can view its real-time tracking timeline or manage it in the Admin Dashboard.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in">
      {/* Checkout Step Progress Bar */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {[
            { step: 1, label: 'Shipping', icon: <MapPin className="w-4 h-4" /> },
            { step: 2, label: 'Delivery Speed', icon: <Truck className="w-4 h-4" /> },
            { step: 3, label: 'Payment', icon: <CreditCard className="w-4 h-4" /> },
            { step: 4, label: 'Review & Place', icon: <FileCheck className="w-4 h-4" /> }
          ].map((s) => {
            const isCompleted = currentStep > s.step;
            const isCurrent = currentStep === s.step;
            return (
              <div key={s.step} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : s.icon}
                </div>
                <span
                  className={`text-xs font-semibold hidden md:inline ${
                    isCurrent ? 'text-slate-900' : 'text-slate-400'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2-Column Checkout Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form Area (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
          {/* STEP 1: Shipping Address Form */}
          {currentStep === 1 && (
            <form onSubmit={handleNextFromAddress} className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Step 1: Enter Shipping Address
                  </h2>
                  <p className="text-xs text-slate-500">Where should we simulate delivering this order?</p>
                </div>

                {/* 1-Click Demo Fill */}
                <button
                  type="button"
                  onClick={() => {
                    setAddress({
                      fullName: 'Rohan Sharma (Student)',
                      phone: '9876543210',
                      email: 'rohan.sharma@college.edu',
                      addressLine1: 'Room 304, Campus Tech Hostel',
                      addressLine2: 'Engineering College Campus, Powai',
                      city: 'Mumbai',
                      state: 'Maharashtra',
                      pinCode: '400076',
                      addressType: 'Home'
                    });
                    setAddressErrors({});
                    showToast('Populated demo student shipping details.', 'info');
                  }}
                  className="px-3 py-1.5 text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 rounded-lg hover:bg-sky-100 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  <span>Auto-Fill Demo Profile</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-hidden ${
                      addressErrors.fullName ? 'border-rose-400' : 'border-slate-300'
                    }`}
                  />
                  {addressErrors.fullName && (
                    <span className="text-[11px] text-rose-600">{addressErrors.fullName}</span>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="text"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-hidden ${
                      addressErrors.phone ? 'border-rose-400' : 'border-slate-300'
                    }`}
                  />
                  {addressErrors.phone && (
                    <span className="text-[11px] text-rose-600">{addressErrors.phone}</span>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Email Address (for order status notifications) *
                  </label>
                  <input
                    type="email"
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-hidden ${
                      addressErrors.email ? 'border-rose-400' : 'border-slate-300'
                    }`}
                  />
                  {addressErrors.email && (
                    <span className="text-[11px] text-rose-600">{addressErrors.email}</span>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Flat, House no., Building, Company, Apartment *
                  </label>
                  <input
                    type="text"
                    value={address.addressLine1}
                    onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-hidden ${
                      addressErrors.addressLine1 ? 'border-rose-400' : 'border-slate-300'
                    }`}
                  />
                  {addressErrors.addressLine1 && (
                    <span className="text-[11px] text-rose-600">{addressErrors.addressLine1}</span>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Area, Street, Sector, Village (Optional)
                  </label>
                  <input
                    type="text"
                    value={address.addressLine2 || ''}
                    onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Town / City *
                  </label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-hidden ${
                      addressErrors.city ? 'border-rose-400' : 'border-slate-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-hidden ${
                      addressErrors.state ? 'border-rose-400' : 'border-slate-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    6-Digit PIN Code *
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={address.pinCode}
                    onChange={(e) => setAddress({ ...address, pinCode: e.target.value.replace(/\D/g, '') })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-hidden font-mono-tabular ${
                      addressErrors.pinCode ? 'border-rose-400' : 'border-slate-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Address Type
                  </label>
                  <div className="flex gap-4 pt-1">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="addressType"
                        checked={address.addressType === 'Home'}
                        onChange={() => setAddress({ ...address, addressType: 'Home' })}
                        className="text-sky-600"
                      />
                      <span>Home (7 AM - 9 PM delivery)</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="addressType"
                        checked={address.addressType === 'Work'}
                        onChange={() => setAddress({ ...address, addressType: 'Work' })}
                        className="text-sky-600"
                      />
                      <span>Office / Commercial</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="py-2.5 px-6 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>Continue to Delivery Speed</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Delivery Speed Selection */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div className="pb-3 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-900">
                  Step 2: Select Delivery Speed
                </h2>
                <p className="text-xs text-slate-500">Choose simulated logistics priority</p>
              </div>

              <div className="space-y-3">
                <label
                  onClick={() => setDeliveryMethod('standard')}
                  className={`p-4 rounded-xl border flex items-start justify-between cursor-pointer transition-all ${
                    deliveryMethod === 'standard'
                      ? 'border-sky-600 bg-sky-50/50 ring-1 ring-sky-600'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={deliveryMethod === 'standard'}
                      onChange={() => setDeliveryMethod('standard')}
                      className="mt-1 text-sky-600"
                    />
                    <div>
                      <span className="font-bold text-sm text-slate-900 block">
                        Standard Delivery
                      </span>
                      <span className="text-xs text-slate-500 block mt-0.5">
                        Estimated arrival: 2 to 3 business days
                      </span>
                      <span className="text-[11px] text-emerald-700 font-semibold mt-1 inline-block">
                        {cartSubtotal >= 999 ? 'FREE Delivery Eligible' : '₹99 Delivery Fee'}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono-tabular text-slate-900">
                    {cartSubtotal >= 999 ? 'FREE' : '₹99'}
                  </span>
                </label>

                <label
                  onClick={() => setDeliveryMethod('express')}
                  className={`p-4 rounded-xl border flex items-start justify-between cursor-pointer transition-all ${
                    deliveryMethod === 'express'
                      ? 'border-sky-600 bg-sky-50/50 ring-1 ring-sky-600'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={deliveryMethod === 'express'}
                      onChange={() => setDeliveryMethod('express')}
                      className="mt-1 text-sky-600"
                    />
                    <div>
                      <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                        Express Next-Day Delivery
                        <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">
                          Priority
                        </span>
                      </span>
                      <span className="text-xs text-slate-500 block mt-0.5">
                        Guaranteed arrival: Tomorrow by 1:00 PM
                      </span>
                      <span className="text-[11px] text-sky-700 font-semibold mt-1 inline-block">
                        Dispatched via express air courier
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono-tabular text-slate-900">
                    +₹99
                  </span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Address</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="py-2.5 px-6 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Simulated Payment Method Selection */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div className="pb-3 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-900">
                  Step 3: Choose Simulated Payment Method
                </h2>
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg mt-2 text-amber-900 text-xs flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Demo Simulation Only:</strong> No real payment gateway is integrated. No financial information or OTPs are collected.
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {/* UPI Option */}
                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-sky-600 bg-sky-50/40 ring-1 ring-sky-600'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2.5 font-bold text-xs text-slate-900 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="text-sky-600"
                      />
                      <span>UPI Simulation (Google Pay / PhonePe / Paytm)</span>
                    </label>
                    <QrCode className="w-4 h-4 text-slate-400" />
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="mt-3 pt-3 border-t border-sky-200 text-xs space-y-2">
                      <p className="text-slate-600">Enter a test UPI ID or use demo handle:</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="yourname@upi"
                          className="flex-1 px-3 py-1.5 border border-slate-300 rounded text-xs font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setUpiId('student@okhdfc')}
                          className="px-2.5 py-1.5 bg-sky-100 text-sky-800 rounded font-semibold text-[11px]"
                        >
                          Use Test VPA
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Option */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-sky-600 bg-sky-50/40 ring-1 ring-sky-600'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2.5 font-bold text-xs text-slate-900 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="text-sky-600"
                      />
                      <span>Credit / Debit Card Simulation</span>
                    </label>
                    <CreditCard className="w-4 h-4 text-slate-400" />
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="mt-3 pt-3 border-t border-sky-200 text-xs space-y-2">
                      <p className="text-slate-600">Preset test dummy card (safe numbers):</p>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          readOnly
                          value={cardDigits}
                          className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded font-mono text-[11px] text-slate-600"
                        />
                        <input
                          type="text"
                          readOnly
                          value="EXP: 12/28 · CVV: ***"
                          className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded font-mono text-[11px] text-slate-600"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Cash on Delivery Option */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-sky-600 bg-sky-50/40 ring-1 ring-sky-600'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <label className="flex items-center gap-2.5 font-bold text-xs text-slate-900 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-sky-600"
                    />
                    <span>Cash on Delivery (Pay at simulated delivery)</span>
                  </label>
                  <p className="text-[11px] text-slate-500 ml-6 mt-1">
                    Pay with simulated cash or UPI QR upon courier arrival at {address.city}.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Speed</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="py-2.5 px-6 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <span>Review Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Review and Place Order */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-900">
                  Step 4: Review Your Order Details
                </h2>
                <p className="text-xs text-slate-500">
                  Double check your simulated shipping destination and order items before confirming
                </p>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                    <span>Shipping Address</span>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-sky-600 text-[11px] hover:underline"
                    >
                      Change
                    </button>
                  </div>
                  <p className="text-slate-800 font-medium">{address.fullName}</p>
                  <p className="text-slate-600">{address.addressLine1}</p>
                  {address.addressLine2 && <p className="text-slate-600">{address.addressLine2}</p>}
                  <p className="text-slate-600">{address.city}, {address.state} - {address.pinCode}</p>
                  <p className="text-slate-500 mt-1">Ph: {address.phone}</p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                    <span>Payment & Speed</span>
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="text-sky-600 text-[11px] hover:underline"
                    >
                      Change
                    </button>
                  </div>
                  <p className="text-slate-800 font-medium uppercase">
                    Method: {paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod.toUpperCase()}
                  </p>
                  <p className="text-slate-600 mt-0.5">
                    Speed: {deliveryMethod === 'express' ? 'Express Next-Day' : 'Standard 2-3 Days'}
                  </p>
                  <p className="text-emerald-700 font-semibold mt-1">
                    Safe simulated checkout ready
                  </p>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                  Items in this simulated shipment
                </h3>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {cart.map(({ product, quantity }) => (
                    <div key={product.id} className="p-3 flex items-center justify-between text-xs bg-white">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                          <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 line-clamp-1">{product.name}</h4>
                          <span className="text-slate-500">Qty: {quantity} × ₹{product.price.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900 font-mono-tabular">
                        ₹{(product.price * quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="py-3 px-8 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-black text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <PackageCheck className="w-5 h-5" />
                  <span>Place Simulated Order</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Sticky Summary (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
            Order Total Preview
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Items Subtotal</span>
              <span className="font-mono-tabular">₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>

            {cartDiscountSavings > 0 && (
              <div className="flex justify-between text-rose-600">
                <span>Catalogue Savings</span>
                <span className="font-mono-tabular">-₹{cartDiscountSavings.toLocaleString('en-IN')}</span>
              </div>
            )}

            {appliedCoupon && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Promo ({appliedCoupon.code})</span>
                <span className="font-mono-tabular">-₹{couponDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-600">
              <span>Delivery Charges</span>
              <span className="font-mono-tabular">
                {totalDeliveryFee === 0 ? (
                  <span className="text-emerald-700 font-bold">FREE</span>
                ) : (
                  `₹${totalDeliveryFee}`
                )}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
              <span className="font-bold text-slate-900 text-sm">Order Total</span>
              <span className="text-xl font-black text-slate-900 font-mono-tabular">
                ₹{checkoutTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-[11px] text-sky-900 space-y-1">
            <p className="font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              Demo Safe Guarantee
            </p>
            <p className="text-slate-600">
              Placing this simulated order will instantly create a tracking record in your order history and update inventory counts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
