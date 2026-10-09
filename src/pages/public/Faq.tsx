import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const Faq: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How is Farm to Home different from traditional grocery apps?',
      a: 'We source directly from verified farmers in Telangana without middleman brokers. Produce is harvested at dawn and delivered within 24 hours, ensuring peak freshness and fair compensation for farmers.'
    },
    {
      q: 'What areas do you currently deliver to?',
      a: 'We currently deliver across Hyderabad and Secunderabad, including Gachibowli, Madhapur, Kondapur, Banjara Hills, Jubilee Hills, and Kukatpally.'
    },
    {
      q: 'Are all your products organic?',
      a: 'We clearly indicate whether produce is naturally grown, organic-certified, or traditional. We partner with farmers practicing sustainable, low-chemical agriculture.'
    },
    {
      q: 'What are the delivery charges?',
      a: 'We charge a nominal delivery fee of ₹30 for orders below ₹499. Delivery is completely free for orders of ₹499 and above.'
    },
    {
      q: 'Can I pay cash on delivery (COD)?',
      a: 'Yes! We support both Cash on Delivery (COD) and secure online payment options (UPI, Credit/Debit cards, Net Banking via Razorpay simulation).'
    },
    {
      q: 'How can farmers join Farm to Home?',
      a: 'Farmers can register via our Farmer Portal by submitting their farm details, location, and produce categories. Our team verifies farm credentials before onboarding.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-[#6F9F54] uppercase tracking-widest block">
          Got Questions?
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#242B25]">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-[#687168]">
          Find quick answers about sourcing, delivery, payments, and farmer partnerships.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-[#E4E8DF] overflow-hidden shadow-2xs">
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full p-6 text-left flex items-center justify-between font-serif font-bold text-base text-[#242B25] hover:bg-[#F8F6EE] transition"
            >
              <span>{faq.q}</span>
              {openIdx === idx ? <ChevronUp className="w-5 h-5 text-[#214E34]" /> : <ChevronDown className="w-5 h-5 text-[#687168]" />}
            </button>
            {openIdx === idx && (
              <div className="px-6 pb-6 text-sm text-[#687168] leading-relaxed border-t border-[#E4E8DF] pt-4">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
