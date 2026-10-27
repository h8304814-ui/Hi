import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Check, Sparkles } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    setSubscribed(true);
    showToast('Subscribed! Use code WELCOME10 for 10% off your first order.', 'success');
  };

  return (
    <section className="bg-[#1A1A1A] text-[#FDFBF7] py-12 sm:py-16 border-t border-stone-800">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 text-center space-y-4 sm:space-y-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-[#E7C67D] border border-white/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The HS Collection Circle</span>
        </div>

        <h2 className="font-serif text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
          Join Our Exclusive Fashion Circle
        </h2>

        <p className="text-stone-400 text-xs sm:text-sm font-light max-w-lg mx-auto leading-relaxed">
          Be the first to preview new luxury lawn drops, festive pret releases, and private VIP sales in Pakistan. Receive an instant 10% promo code in your inbox.
        </p>

        {subscribed ? (
          <div className="p-4 bg-emerald-950/80 border border-emerald-700/60 rounded-2xl max-w-md mx-auto text-xs text-emerald-200 flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Welcome to the circle! Use code <strong>WELCOME10</strong> at checkout.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col min-[420px]:flex-row gap-2 max-w-md mx-auto pt-2">
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 pl-10 text-xs bg-stone-900 border border-stone-700 rounded-xl focus:outline-none focus:border-[#C5A059] text-white placeholder:text-stone-500"
              />
              <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-3 sm:top-3.5" />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 sm:py-3 rounded-xl bg-[#FDFBF7] hover:bg-[#EAE5D9] text-[#111111] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer whitespace-nowrap min-h-[44px]"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-[10px] text-stone-500">
          We respect your privacy. Unsubscribe at any time with a single click.
        </p>
      </div>
    </section>
  );
};
