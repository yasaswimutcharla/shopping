import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  HelpCircle,
  ChevronDown,
  Mail,
  Send,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Phone
} from 'lucide-react';

const FAQS = [
  {
    q: 'Is ShopSphere a live retail marketplace or an expo simulation?',
    a: 'ShopSphere is an original student engineering capstone project built exclusively for college expo demonstration. All products, brands, orders, and payments are entirely simulated with real-time browser storage.'
  },
  {
    q: 'How does the simulated checkout process work?',
    a: 'You can add any product to your cart, apply demo promo codes like EXPO2026, proceed through our 4-step checkout (address, delivery speed, simulated UPI/Card/COD), and receive an instant simulated order confirmation with full tracking timeline.'
  },
  {
    q: 'How are delivery times and fees calculated?',
    a: 'Standard delivery is free on simulated orders above ₹999 (otherwise ₹99). Express next-day courier adds a ₹99 priority fee. You can test changing your destination city and PIN code in the header at any time.'
  },
  {
    q: 'Can I cancel or return simulated orders?',
    a: 'Yes! From the Orders page you can view real-time tracking logs or test order receipts. In the Store Admin panel, you can promote order statuses between Packed, Shipped, Delivered, or Cancelled.'
  },
  {
    q: 'How can faculty or evaluators test product management?',
    a: 'Click "Admin Portal" in the top bar or use the role switcher to access the Admin Dashboard. You can add brand new products, edit prices or stock counts, and witness the storefront catalog update instantly.'
  }
];

export const SupportPage: React.FC = () => {
  const { showToast, setIsExpoGuideOpen } = useShop();

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('Expo Evaluation Question');
  const [formMessage, setFormMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) {
      showToast('Please fill out all fields before submitting.', 'warning');
      return;
    }

    setSubmitted(true);
    showToast('Your expo enquiry has been recorded successfully!', 'success');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-md">
        <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4" />
          <span>Customer Help & College Expo Information</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
          How can we help your expo walkthrough today?
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Welcome to the ShopSphere support desk. Review answers regarding order simulations, payment testing, shipping calculations, or leave feedback for the student development team.
        </p>

        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap gap-3">
          <button
            onClick={() => setIsExpoGuideOpen(true)}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Open Expo Evaluation Guide</span>
          </button>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-sky-600" />
          <span>Frequently Asked Questions</span>
        </h2>

        <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="bg-white">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-sky-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Form & Student Project Notes */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Contact Form (7 cols) */}
        <div className="md:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-5 h-5 text-sky-600" />
            <h3 className="font-bold text-slate-900 text-sm">
              Send an Expo Feedback Enquiry
            </h3>
          </div>
          <p className="text-xs text-slate-500 mb-5">
            Test our form validation and local demo submission.
          </p>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-slate-900 text-sm">
                Thank You for Your Feedback!
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your message has been captured in local simulation. Our student team appreciates your review at Booth #42.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormMessage('');
                }}
                className="mt-2 text-xs font-bold text-sky-600 hover:underline"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Prof. Arvind Verma"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="evaluator@college.edu"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Subject *
                </label>
                <select
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden bg-white"
                >
                  <option value="Expo Evaluation Question">Expo Evaluation Question</option>
                  <option value="Feature Suggestion">Feature Suggestion</option>
                  <option value="Bug Report">Demonstration Bug Report</option>
                  <option value="General Feedback">General Appreciation & Feedback</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Message / Comments *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Share your thoughts on the ShopSphere e-commerce prototype..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Simulated Feedback</span>
              </button>
            </form>
          )}
        </div>

        {/* Project Attribution (5 cols) */}
        <div className="md:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>About ShopSphere Expo</span>
          </div>

          <p className="text-slate-600 leading-relaxed">
            ShopSphere is a student capstone project demonstrating modern full-stack web engineering, resilient state architectures, and intuitive digital storefront UX.
          </p>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-slate-700">
            <div className="font-semibold text-slate-900">Project Highlights:</div>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>30+ realistic dummy products</li>
              <li>Multi-facet search & filtering</li>
              <li>Interactive cart & discount promo codes</li>
              <li>Multi-step simulated checkout</li>
              <li>Real-time order tracking pipeline</li>
              <li>Role-based store admin dashboard</li>
            </ul>
          </div>

          <div className="pt-2 text-slate-400 text-[11px]">
            Demonstration Venue: College Engineering Expo, Hall C, Booth #42.
          </div>
        </div>
      </div>
    </div>
  );
};
