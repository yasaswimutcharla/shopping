import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { MapPin, X, Check } from 'lucide-react';

const POPULAR_LOCATIONS = [
  { city: 'Mumbai', pinCode: '400076', state: 'Maharashtra' },
  { city: 'Bengaluru', pinCode: '560001', state: 'Karnataka' },
  { city: 'New Delhi', pinCode: '110001', state: 'Delhi' },
  { city: 'Hyderabad', pinCode: '500081', state: 'Telangana' },
  { city: 'Pune', pinCode: '411004', state: 'Maharashtra' },
  { city: 'Chennai', pinCode: '600001', state: 'Tamil Nadu' }
];

export const LocationModal: React.FC = () => {
  const {
    isLocationModalOpen,
    setIsLocationModalOpen,
    deliveryLocation,
    setDeliveryLocation,
    showToast
  } = useShop();

  const [pinInput, setPinInput] = useState(deliveryLocation.pinCode);
  const [cityInput, setCityInput] = useState(deliveryLocation.city);

  if (!isLocationModalOpen) return null;

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim().length !== 6) {
      showToast('Please enter a valid 6-digit Indian PIN code.', 'warning');
      return;
    }
    const cleanCity = cityInput.trim() || 'Selected Hub';
    setDeliveryLocation({ city: cleanCity, pinCode: pinInput.trim() });
    setIsLocationModalOpen(false);
    showToast(`Delivery location set to ${cleanCity} - ${pinInput}.`, 'success');
  };

  const handleSelectPreset = (loc: { city: string; pinCode: string }) => {
    setDeliveryLocation({ city: loc.city, pinCode: loc.pinCode });
    setIsLocationModalOpen(false);
    showToast(`Delivery location updated to ${loc.city} - ${loc.pinCode}.`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-sky-400" />
            <h3 className="font-semibold text-base">Choose Delivery Location</h3>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-slate-600 mb-4">
            Select your location to view simulated delivery availability, transit times, and free shipping eligibility.
          </p>

          <form onSubmit={handleApplyCustom} className="mb-6">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  City / Town
                </label>
                <input
                  type="text"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  placeholder="e.g. Mumbai"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  PIN Code (6 digits)
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 400076"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Apply Location
            </button>
          </form>

          <div className="border-t border-slate-200 pt-4">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
              Popular Expo Demonstration Hubs
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {POPULAR_LOCATIONS.map((loc) => {
                const isSelected = deliveryLocation.pinCode === loc.pinCode;
                return (
                  <button
                    key={loc.pinCode}
                    type="button"
                    onClick={() => handleSelectPreset(loc)}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-left text-xs transition-colors ${
                      isSelected
                        ? 'border-sky-600 bg-sky-50 text-sky-900 font-semibold'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-medium">{loc.city}</div>
                      <div className="text-[11px] text-slate-500">{loc.pinCode}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-sky-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
