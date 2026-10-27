/**
 * Utility functions for currency formatting, phone validation, and WhatsApp ordering
 */

import { STORE_CONFIG } from '../config/storeConfig';
import { CartItem, Order, Product } from '../types';

/**
 * Format numeric value into standard Pakistani Rupee representation
 * Example: 4500 -> "Rs. 4,500"
 */
export function formatPKR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return 'Rs. 0';
  }
  return `Rs. ${amount.toLocaleString('en-PK')}`;
}

/**
 * Validates a Pakistani mobile number.
 * Standard formats:
 * - 03001234567 (11 digits starting with 03)
 * - 0300 1234567
 * - +923001234567
 * - 923001234567
 */
export function validatePakistaniPhone(phone: string): { isValid: boolean; message: string; formatted: string } {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  
  if (!cleaned) {
    return { isValid: false, message: 'Phone number is required for courier delivery.', formatted: '' };
  }

  // Check 11 digit standard 03XXXXXXXXX
  const localPattern = /^03[0-9]{9}$/;
  // Check +923XXXXXXXXX
  const intlPattern = /^\+?923[0-9]{9}$/;

  if (localPattern.test(cleaned)) {
    return {
      isValid: true,
      message: 'Valid Pakistani mobile number',
      formatted: cleaned,
    };
  }

  if (intlPattern.test(cleaned)) {
    // Normalize to standard local format for courier label
    const standard = '0' + cleaned.replace(/^\+?92/, '');
    return {
      isValid: true,
      message: 'Valid Pakistani mobile number',
      formatted: standard,
    };
  }

  return {
    isValid: false,
    message: 'Please enter a valid 11-digit Pakistani mobile number (e.g. 0300 1234567)',
    formatted: cleaned,
  };
}

/**
 * Generates an official WhatsApp chat link with pre-filled message
 */
export function buildWhatsAppLink(message: string): string {
  const number = STORE_CONFIG.contact.whatsAppNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedText}`;
}

/**
 * Generates a WhatsApp message template for a single product inquiry/order
 */
export function createProductWhatsAppMessage(
  product: Product,
  selectedSize?: string,
  selectedColor?: string,
  quantity: number = 1
): string {
  const lines = [
    `*Hello HS Collection!* ✨`,
    `I would like to order / inquire about this item:`,
    ``,
    `*Product:* ${product.name}`,
    `*SKU:* ${product.sku}`,
    `*Price:* ${formatPKR(product.price)}`,
    selectedSize ? `*Size:* ${selectedSize}` : ``,
    selectedColor ? `*Color:* ${selectedColor}` : ``,
    `*Quantity:* ${quantity}`,
    `*Subtotal:* ${formatPKR(product.price * quantity)}`,
    ``,
    `Please confirm if this is available for delivery to my city via Cash on Delivery. Thank you!`,
  ].filter(line => line !== null);

  return lines.join('\n');
}

/**
 * Generates a WhatsApp message for an entire cart
 */
export function createCartWhatsAppMessage(
  items: CartItem[],
  subtotal: number,
  shippingFee: number,
  discount: number,
  total: number,
  couponCode?: string
): string {
  const itemLines = items.map((item, idx) => {
    return `${idx + 1}. *${item.product.name}* (${item.selectedSize}, ${item.selectedColor.name}) x ${item.quantity} = ${formatPKR(item.product.price * item.quantity)}`;
  });

  const lines = [
    `*Salam HS Collection Team!* 🇵🇰`,
    `I have selected the following items from your online store and would like to proceed with my order:`,
    ``,
    `*--- Order Details ---*`,
    ...itemLines,
    ``,
    `*Subtotal:* ${formatPKR(subtotal)}`,
    `*Shipping:* ${shippingFee === 0 ? 'FREE Delivery' : formatPKR(shippingFee)}`,
    discount > 0 ? `*Discount (${couponCode || 'Promo'}):* -${formatPKR(discount)}` : '',
    `*Estimated Total:* ${formatPKR(total)}`,
    ``,
    `*Payment Preference:* Cash on Delivery (COD)`,
    ``,
    `Kindly confirm stock availability and let me know the estimated delivery timeframe.`,
  ].filter(line => line !== '');

  return lines.join('\n');
}

/**
 * Generates a WhatsApp message for an already placed order
 */
export function createOrderWhatsAppMessage(order: Order): string {
  const itemLines = order.items.map((item, idx) => {
    return `${idx + 1}. ${item.productName} (${item.selectedSize}, ${item.selectedColor}) x ${item.quantity}`;
  });

  const lines = [
    `*Salam HS Collection!* 🛍️`,
    `I have just placed an order on your website and would like to confirm it:`,
    ``,
    `*Order Ref:* #${order.orderNumber}`,
    `*Customer Name:* ${order.customer.fullName}`,
    `*Phone:* ${order.customer.phone}`,
    `*Delivery City:* ${order.customer.city}`,
    `*Address:* ${order.customer.deliveryAddress}`,
    ``,
    `*Items:*`,
    ...itemLines,
    ``,
    `*Total Amount:* ${formatPKR(order.total)}`,
    `*Payment Method:* ${order.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : order.paymentMethod === 'bank_transfer' ? 'Direct Bank Transfer' : 'Online'}`,
    order.customer.orderNotes ? `*Customer Notes:* ${order.customer.orderNotes}` : '',
    ``,
    `Please dispatch this at your earliest convenience. Thank you!`,
  ].filter(line => line !== '');

  return lines.join('\n');
}

/**
 * Generate unique order reference number
 * Example: HSC-2026-8942
 */
export function generateOrderNumber(): string {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `HSC-2026-${random}`;
}
