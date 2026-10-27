import React from 'react';
import { SAMPLE_REVIEWS } from '../data/products';
import { Star, CheckCircle2, Quote, Sparkles } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-20 bg-[#FAF7F0] border-t border-[#EAE4D7]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#F0ECE1] text-[#705826] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customer Testimonials</span>
          </div>
          <h2 className="font-serif text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
            Loved Across Pakistan
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-3 sm:mt-4 mb-3" />
          <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
            From Karachi to Islamabad, hear what our patrons have to say about our fabric purity, stitching accuracy, and swift Cash on Delivery experience.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {SAMPLE_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FDFBF7] p-4 sm:p-6 rounded-2xl border border-[#E8E1D0] shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Stars and date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">{rev.date}</span>
                </div>

                {/* Comment quote */}
                <p className="text-xs sm:text-sm text-stone-700 font-light leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & City info */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-stone-900">
                    {rev.author}
                  </h4>
                  <p className="text-[11px] text-stone-500">{rev.city}</p>
                </div>

                {rev.verifiedBuyer && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified Buyer</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
