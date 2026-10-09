import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been sent to customer support!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#6F9F54] uppercase tracking-widest block">
          We Are Here To Help
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#242B25]">
          Contact Customer Support
        </h1>
        <p className="text-sm text-[#687168]">
          Have questions about your order, delivery slots, or farmer partnership? Drop us a line below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Info */}
        <div className="bg-[#163D2A] text-white p-8 sm:p-10 rounded-3xl space-y-8">
          <h3 className="font-serif font-bold text-2xl">Get in touch</h3>
          <div className="space-y-6 text-sm text-[#E8EFE3]/90">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-[#6F9F54] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white mb-1">Fulfillment Hub</strong>
                <span>Shamshabad & Gachibowli Distribution Centers, Hyderabad, Telangana 500032</span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-[#6F9F54] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white mb-1">Helpline</strong>
                <span>+91 (040) 2345 6789 / +91 98480 12345</span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-[#6F9F54] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white mb-1">Email Support</strong>
                <span>support@farmtohome.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white p-8 sm:p-10 rounded-3xl border border-[#E4E8DF] shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-[#E8EFE3] text-[#214E34] rounded-full flex items-center justify-center mx-auto text-2xl">
                ✓
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#242B25]">Message Received!</h3>
              <p className="text-sm text-[#687168] max-w-md mx-auto">
                Thank you for reaching out. Our support team will get back to you within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-[#214E34] text-white px-6 py-2.5 rounded-xl text-sm font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#687168] mb-2">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ananya Sharma"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#214E34]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#687168] mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="ananya@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#214E34]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#687168] mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98123 45678"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#214E34]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#687168] mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="Order enquiry / Farmer registration"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#214E34]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#687168] mb-2">Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we help you?"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full bg-[#F8F6EE] border border-[#E4E8DF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#214E34]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#214E34] text-white py-4 rounded-xl font-bold text-sm hover:bg-[#163D2A] transition shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
