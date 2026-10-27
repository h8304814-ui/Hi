/**
 * HS Collection - Store Configuration
 * Centralized settings for business contact, delivery rules, currency, and bank details.
 * You can easily customize these values for your real store operations.
 */

export interface StoreConfig {
  storeName: string;
  legalName: string;
  tagline: string;
  taglineUrdu: string;
  currency: {
    symbol: string;
    code: string;
    label: string;
  };
  contact: {
    // WhatsApp number in international format without spaces or '+' for wa.me URL
    // REPLACE THIS WITH YOUR REAL PAKISTANI BUSINESS WHATSAPP NUMBER (e.g. "923001234567")
    whatsAppNumber: string;
    whatsAppDisplay: string;
    phone: string;
    email: string;
    address: string;
    operatingHours: string;
    instagram: string;
    facebook: string;
    tiktok: string;
  };
  shipping: {
    freeShippingThreshold: number; // in PKR
    standardShippingFee: number; // in PKR
    expressShippingFee: number; // in PKR
    deliveryEstimate: string;
    courierPartners: string[];
    cashOnDeliveryAvailable: boolean;
  };
  bankDetails: {
    bankName: string;
    accountTitle: string;
    accountNumber: string;
    iban: string;
    branchCode: string;
  };
  announcements: string[];
  popularCities: string[];
}

export const STORE_CONFIG: StoreConfig = {
  storeName: "HS Collection",
  legalName: "HS Collection Apparel & Pret Ltd.",
  tagline: "Timeless Elegance & Contemporary Pakistani Couture",
  taglineUrdu: "روایت اور خوبصورتی کا منفرد سنگم",
  currency: {
    symbol: "Rs.",
    code: "PKR",
    label: "Pakistani Rupee",
  },
  contact: {
    // Replace with your real business WhatsApp number (format: country code + number without leading 0)
    whatsAppNumber: "923001234567",
    whatsAppDisplay: "+92 300 1234567",
    phone: "+92 42 35789123",
    email: "concierge@hscollection.pk",
    address: "Gulberg III, MM Alam Road, Lahore, Pakistan",
    operatingHours: "Monday – Saturday: 11:00 AM – 10:00 PM (PKT)",
    instagram: "https://instagram.com/hscollection.pk",
    facebook: "https://facebook.com/hscollectionpk",
    tiktok: "https://tiktok.com/@hscollection.pk",
  },
  shipping: {
    freeShippingThreshold: 3500, // Orders over Rs. 3,500 enjoy free nationwide delivery
    standardShippingFee: 250, // Standard delivery fee in PKR
    expressShippingFee: 450, // Overnight / 24hr in major cities
    deliveryEstimate: "3 to 5 business days nationwide",
    courierPartners: ["TCS Courier", "Leopards Courier", "Trax Logistics", "Call Courier"],
    cashOnDeliveryAvailable: true,
  },
  bankDetails: {
    bankName: "Meezan Bank Limited",
    accountTitle: "HS COLLECTION APPAREL",
    accountNumber: "0201-0105849301",
    iban: "PK42MEZN0002010105849301",
    branchCode: "0201 (MM Alam Branch, Lahore)",
  },
  announcements: [
    "✨ Free Nationwide Delivery on all orders above Rs. 3,500",
    "🇵🇰 Cash on Delivery (COD) Available Across All Cities in Pakistan",
    "💬 Need styling advice or custom sizing? Order directly via WhatsApp",
    "🌙 Festive Pret & Luxury Lawn '26 Collection Now Live",
  ],
  popularCities: [
    "Lahore",
    "Karachi",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Peshawar",
    "Quetta",
    "Sialkot",
    "Gujranwala",
    "Hyderabad",
    "Abbottabad",
    "Bahawalpur",
    "Sargodha",
    "Sukkur",
    "Mirpur (AJK)",
    "Wah Cantt",
    "Sheikhupura",
    "Jhelum",
    "Mardan",
  ],
};
