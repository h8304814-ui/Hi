import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShieldCheck,
  Package,
  ShoppingBag,
  DollarSign,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  Save,
  Download,
  Phone,
  MessageCircle,
  Truck,
  CheckCircle2,
  Settings,
  Search,
} from 'lucide-react';
import { OrderStatus, Product, ProductCategory } from '../types';
import { formatPKR, buildWhatsAppLink } from '../utils/formatters';

export const AdminPortal: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    config,
    updateConfig,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'settings'>('orders');
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState<string>('');

  // Add Product Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProd, setNewProd] = useState({
    name: '',
    nameUrdu: '',
    category: 'ladies-suits' as ProductCategory,
    subcategory: 'Pret',
    price: 5500,
    originalPrice: 6500,
    description: '',
    fabricDetails: 'Pure Pakistani Cotton / Lawn',
    careInstructions: 'Dry clean recommended',
    sizes: 'S, M, L, XL',
    colors: 'Jet Black, Ruby Red',
    stockCount: 15,
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
  });

  // Settings State
  const [tempConfig, setTempConfig] = useState({
    whatsAppNumber: config.contact.whatsAppNumber,
    whatsAppDisplay: config.contact.whatsAppDisplay,
    freeShippingThreshold: config.shipping.freeShippingThreshold,
    standardShippingFee: config.shipping.standardShippingFee,
    bankName: config.bankDetails.bankName,
    accountTitle: config.bankDetails.accountTitle,
    iban: config.bankDetails.iban,
  });

  // Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const lowStockCount = products.filter((p) => p.stockCount <= 10).length;

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    if (orderFilter !== 'all' && o.status !== orderFilter) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      const matchNum = o.orderNumber.toLowerCase().includes(q);
      const matchName = o.customer.fullName.toLowerCase().includes(q);
      const matchPhone = o.customer.phone.includes(q);
      const matchCity = o.customer.city.toLowerCase().includes(q);
      if (!matchNum && !matchName && !matchPhone && !matchCity) return false;
    }
    return true;
  });

  // Export orders to JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(orders, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `hs-collection-orders-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Orders exported to JSON successfully.', 'success');
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name.trim()) return;

    const parsedSizes = newProd.sizes.split(',').map((s) => s.trim()).filter(Boolean);
    const parsedColors = newProd.colors.split(',').map((c) => ({
      name: c.trim(),
      hex: '#222222',
    }));

    const productToAdd: Product = {
      id: `prod-custom-${Date.now()}`,
      sku: `HSC-CUST-${Math.floor(100 + Math.random() * 900)}`,
      name: newProd.name.trim(),
      nameUrdu: newProd.nameUrdu.trim() || undefined,
      category: newProd.category,
      subcategory: newProd.subcategory.trim(),
      price: Number(newProd.price),
      originalPrice: Number(newProd.originalPrice) || undefined,
      discountPercent:
        newProd.originalPrice > newProd.price
          ? Math.round(((newProd.originalPrice - newProd.price) / newProd.originalPrice) * 100)
          : undefined,
      rating: 5.0,
      reviewCount: 1,
      images: [newProd.imageUrl.trim()],
      description: newProd.description.trim() || 'Premium handcrafted design by HS Collection.',
      fabricDetails: newProd.fabricDetails.trim(),
      careInstructions: newProd.careInstructions.trim(),
      sizes: parsedSizes.length > 0 ? parsedSizes : ['Standard'],
      colors: parsedColors.length > 0 ? parsedColors : [{ name: 'Classic', hex: '#111111' }],
      inStock: newProd.stockCount > 0,
      stockCount: Number(newProd.stockCount),
      isNew: true,
    };

    addProduct(productToAdd);
    setShowAddModal(false);
    setNewProd({
      name: '',
      nameUrdu: '',
      category: 'ladies-suits',
      subcategory: 'Pret',
      price: 5500,
      originalPrice: 6500,
      description: '',
      fabricDetails: 'Pure Pakistani Cotton / Lawn',
      careInstructions: 'Dry clean recommended',
      sizes: 'S, M, L, XL',
      colors: 'Jet Black, Ruby Red',
      stockCount: 15,
      imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    });
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      contact: {
        ...config.contact,
        whatsAppNumber: tempConfig.whatsAppNumber,
        whatsAppDisplay: tempConfig.whatsAppDisplay,
      },
      shipping: {
        ...config.shipping,
        freeShippingThreshold: Number(tempConfig.freeShippingThreshold),
        standardShippingFee: Number(tempConfig.standardShippingFee),
      },
      bankDetails: {
        ...config.bankDetails,
        bankName: tempConfig.bankName,
        accountTitle: tempConfig.accountTitle,
        iban: tempConfig.iban,
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAE4D7] pb-6 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
              Store Owner Portal
            </span>
            <span className="text-xs text-stone-500">• Lahore Flagship Studio</span>
          </div>
          <h1 className="font-serif text-2xl min-[360px]:text-3xl sm:text-4xl font-normal text-stone-900 mt-1">
            HS Collection Management
          </h1>
          <p className="text-xs text-stone-500 font-light mt-0.5">
            Oversee customer orders across Pakistan, update inventory & prices, and configure store settings.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 rounded-lg bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer min-h-[40px]"
          >
            <Download className="w-3.5 h-3.5 text-stone-600" />
            <span>Export Orders</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-lg bg-[#111111] hover:bg-black text-[#FDFBF7] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer min-h-[40px]"
          >
            <Plus className="w-4 h-4 text-[#C5A059]" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 mb-8">
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-[#E8E1D0]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Total Orders
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {orders.length}
            </span>
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-[#C5A059]" />
          </div>
          <span className="text-[10px] text-stone-500 mt-1 block">
            Across 15+ Pakistani cities
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-[#E8E1D0]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Recorded Revenue
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {formatPKR(totalRevenue)}
            </span>
            <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
          </div>
          <span className="text-[10px] text-emerald-700 mt-1 block">
            PKR Currency Standard
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-[#E8E1D0]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Pending Dispatch
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-900">
              {pendingOrders}
            </span>
            <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
          </div>
          <span className="text-[10px] text-stone-500 mt-1 block">
            Awaiting courier rider pickup
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-[#E8E1D0]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Active Catalog Items
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {products.length}
            </span>
            <Package className="w-5 h-5 sm:w-6 sm:h-6 text-stone-700" />
          </div>
          <span className="text-[10px] text-amber-700 mt-1 block">
            {lowStockCount} items low in stock (&lt;=10)
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 mb-6 sm:mb-8 overflow-x-auto pb-1 scrollbar-none -mx-3 px-3 sm:mx-0 sm:px-0">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-3 sm:px-4 text-xs font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'orders'
              ? 'border-black text-black'
              : 'border-transparent text-stone-400 hover:text-stone-700'
          }`}
        >
          Customer Orders ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`pb-3 px-3 sm:px-4 text-xs font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'inventory'
              ? 'border-black text-black'
              : 'border-transparent text-stone-400 hover:text-stone-700'
          }`}
        >
          Inventory & Pricing ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 px-3 sm:px-4 text-xs font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'settings'
              ? 'border-black text-black'
              : 'border-transparent text-stone-400 hover:text-stone-700'
          }`}
        >
          Store Settings & WhatsApp
        </button>
      </div>

      {/* TAB 1: ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search Order #, Customer, Phone..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="w-full px-3 py-2 pl-9 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-black font-mono"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-2.5 top-2.5" />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered'].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setOrderFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                      orderFilter === status
                        ? 'bg-black text-white shadow-xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    {status}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Orders Table */}
          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center bg-[#FAF7F0] rounded-2xl border border-[#E8E1D0]">
              <p className="text-xs text-stone-500">No orders found matching your filter criteria.</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-200 border border-stone-200 rounded-2xl bg-white shadow-xs overflow-hidden">
              {filteredOrders.map((ord) => (
                <div key={ord.id} className="p-5 space-y-4 hover:bg-stone-50/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-sm text-stone-900">
                        #{ord.orderNumber}
                      </span>
                      <span className="text-[11px] text-stone-500">
                        {new Date(ord.createdAt).toLocaleString('en-PK', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <span className="text-[10px] bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded border border-amber-200 uppercase">
                        {ord.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}
                      </span>
                    </div>

                    {/* Status updater */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-stone-500">Status:</span>
                      <select
                        value={ord.status}
                        onChange={(e) =>
                          updateOrderStatus(ord.id, e.target.value as OrderStatus)
                        }
                        className="text-xs font-bold bg-white border border-stone-300 rounded-md px-2.5 py-1 focus:outline-none uppercase cursor-pointer"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Customer details & line items */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                    {/* Customer Info (4 cols) */}
                    <div className="md:col-span-4 space-y-1.5 bg-[#FAF7F0] p-3 rounded-xl border border-stone-200">
                      <p className="font-bold text-stone-900 text-sm">{ord.customer.fullName}</p>
                      <p className="text-stone-700 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-stone-500" />
                        <span className="font-mono">{ord.customer.phone}</span>
                        <a
                          href={buildWhatsAppLink(
                            `Salam ${ord.customer.fullName}! Regarding your HS Collection order #${ord.orderNumber}:`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto text-[#25D366] hover:underline flex items-center gap-1 font-semibold"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </p>
                      <p className="text-stone-600">
                        {ord.customer.deliveryAddress}, <strong>{ord.customer.city}</strong>
                      </p>
                      {ord.customer.orderNotes && (
                        <p className="text-stone-500 italic bg-white p-1.5 rounded border border-stone-200">
                          "{ord.customer.orderNotes}"
                        </p>
                      )}
                    </div>

                    {/* Items (5 cols) */}
                    <div className="md:col-span-5 space-y-2">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <img
                            src={it.image}
                            alt=""
                            className="w-10 h-12 object-cover object-top rounded bg-stone-100"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-stone-900 line-clamp-1">{it.productName}</p>
                            <p className="text-stone-500 text-[11px]">
                              Size: {it.selectedSize} • {it.selectedColor} • Qty: {it.quantity}
                            </p>
                          </div>
                          <span className="font-mono font-medium">
                            {formatPKR(it.price * it.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Total (3 cols) */}
                    <div className="md:col-span-3 flex flex-col justify-between border-t md:border-t-0 md:border-l border-stone-200 md:pl-4 pt-2 md:pt-0">
                      <div className="space-y-1">
                        <div className="flex justify-between text-stone-500">
                          <span>Subtotal</span>
                          <span>{formatPKR(ord.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-stone-500">
                          <span>Delivery</span>
                          <span>{ord.shippingFee === 0 ? 'FREE' : formatPKR(ord.shippingFee)}</span>
                        </div>
                        {ord.discount > 0 && (
                          <div className="flex justify-between text-emerald-700">
                            <span>Discount</span>
                            <span>-{formatPKR(ord.discount)}</span>
                          </div>
                        )}
                      </div>
                      <div className="border-t pt-2 flex justify-between font-serif font-bold text-sm text-black">
                        <span>Total</span>
                        <span>{formatPKR(ord.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: INVENTORY & CATALOG */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-xs text-stone-600">
              Manage product pricing, real-time stock levels, and product visibility.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-black text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Design</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-stone-200 rounded-2xl bg-white shadow-xs">
            <table className="w-full min-w-[620px] text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-100 border-b border-stone-200 text-stone-600 uppercase tracking-wider font-semibold">
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price (PKR)</th>
                  <th className="p-3">Stock Units</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt=""
                          className="w-12 h-14 object-cover object-top rounded bg-stone-100"
                        />
                        <div>
                          <p className="font-bold text-stone-900">{p.name}</p>
                          <p className="text-stone-400 font-mono text-[10px]">SKU: {p.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 capitalize font-medium text-stone-700">
                      {p.category.replace('-', ' ')}
                    </td>
                    <td className="p-3 font-serif font-bold text-stone-900">
                      <input
                        type="number"
                        value={p.price}
                        onChange={(e) =>
                          updateProduct(p.id, { price: Number(e.target.value) })
                        }
                        className="w-24 px-2 py-1 bg-stone-50 border border-stone-300 rounded font-mono text-xs focus:outline-none focus:bg-white"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={p.stockCount}
                        onChange={(e) =>
                          updateProduct(p.id, {
                            stockCount: Number(e.target.value),
                            inStock: Number(e.target.value) > 0,
                          })
                        }
                        className={`w-20 px-2 py-1 bg-stone-50 border rounded font-mono text-xs focus:outline-none focus:bg-white ${
                          p.stockCount <= 10 ? 'border-amber-400 text-amber-900 font-bold' : 'border-stone-300'
                        }`}
                      />
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => updateProduct(p.id, { inStock: !p.inStock })}
                        className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                          p.inStock
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {p.inStock ? 'Available' : 'Out of Stock'}
                      </button>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: STORE SETTINGS & WHATSAPP */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="max-w-2xl bg-[#FAF7F0] p-6 sm:p-8 rounded-2xl border border-[#E8E1D0] space-y-6">
          <div className="border-b border-stone-200 pb-3">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              WhatsApp & Logistics Settings
            </h3>
            <p className="text-xs text-stone-500 font-light mt-0.5">
              Customize the destination number for customer orders and set your delivery fees.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* WhatsApp configuration */}
            <div className="space-y-1">
              <label className="font-bold text-stone-800">
                Business WhatsApp Number (International format without '+' or spaces)
              </label>
              <input
                type="text"
                value={tempConfig.whatsAppNumber}
                onChange={(e) =>
                  setTempConfig((prev) => ({ ...prev, whatsAppNumber: e.target.value }))
                }
                placeholder="923001234567"
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg font-mono focus:outline-none"
              />
              <p className="text-[11px] text-stone-500">
                Example for Pakistani phone 0300-1234567: enter <strong>923001234567</strong>.
              </p>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-800">WhatsApp Display Label</label>
              <input
                type="text"
                value={tempConfig.whatsAppDisplay}
                onChange={(e) =>
                  setTempConfig((prev) => ({ ...prev, whatsAppDisplay: e.target.value }))
                }
                placeholder="+92 300 1234567"
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg font-mono focus:outline-none"
              />
            </div>

            {/* Shipping thresholds */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <label className="font-bold text-stone-800">Free Delivery Threshold (PKR)</label>
                <input
                  type="number"
                  value={tempConfig.freeShippingThreshold}
                  onChange={(e) =>
                    setTempConfig((prev) => ({
                      ...prev,
                      freeShippingThreshold: Number(e.target.value),
                    }))
                  }
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg font-mono focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-800">Standard Delivery Fee (PKR)</label>
                <input
                  type="number"
                  value={tempConfig.standardShippingFee}
                  onChange={(e) =>
                    setTempConfig((prev) => ({
                      ...prev,
                      standardShippingFee: Number(e.target.value),
                    }))
                  }
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg font-mono focus:outline-none"
                />
              </div>
            </div>

            {/* Bank details */}
            <div className="pt-2 border-t border-stone-200 space-y-3">
              <h4 className="font-bold text-stone-900 text-sm">Official Bank Account (for Direct Transfers)</h4>
              
              <div className="space-y-1">
                <label className="text-stone-700">Bank Name</label>
                <input
                  type="text"
                  value={tempConfig.bankName}
                  onChange={(e) =>
                    setTempConfig((prev) => ({ ...prev, bankName: e.target.value }))
                  }
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-stone-700">Account Title</label>
                <input
                  type="text"
                  value={tempConfig.accountTitle}
                  onChange={(e) =>
                    setTempConfig((prev) => ({ ...prev, accountTitle: e.target.value }))
                  }
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-stone-700">IBAN Number</label>
                <input
                  type="text"
                  value={tempConfig.iban}
                  onChange={(e) =>
                    setTempConfig((prev) => ({ ...prev, iban: e.target.value }))
                  }
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg font-mono focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-black text-white text-xs uppercase font-bold tracking-wider hover:bg-stone-800 transition-colors flex items-center gap-1.5"
          >
            <Save className="w-4 h-4 text-[#C5A059]" />
            <span>Save Settings</span>
          </button>
        </form>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-[#FDFBF7] rounded-2xl shadow-2xl p-4 sm:p-6 overflow-y-auto max-h-[90vh] space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                Add New Design to Catalog
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-stone-500 hover:text-black cursor-pointer rounded-full"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-stone-800">Design Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Meher - Embroidered Organza 3-Piece"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-800">Category</label>
                  <select
                    value={newProd.category}
                    onChange={(e) =>
                      setNewProd({ ...newProd, category: e.target.value as ProductCategory })
                    }
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg cursor-pointer"
                  >
                    <option value="ladies-suits">Ladies Suits</option>
                    <option value="gents-suits">Gents Suits</option>
                    <option value="accessories">Fashion Accessories</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-800">Subcategory</label>
                  <input
                    type="text"
                    placeholder="e.g. Festive Pret, Lawn, Kurta"
                    value={newProd.subcategory}
                    onChange={(e) => setNewProd({ ...newProd, subcategory: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-800">Price in PKR *</label>
                  <input
                    type="number"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-800">Original Price (for Sale)</label>
                  <input
                    type="number"
                    value={newProd.originalPrice}
                    onChange={(e) =>
                      setNewProd({ ...newProd, originalPrice: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-800">Image URL</label>
                <input
                  type="url"
                  required
                  value={newProd.imageUrl}
                  onChange={(e) => setNewProd({ ...newProd, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-800">Sizes (comma separated)</label>
                  <input
                    type="text"
                    value={newProd.sizes}
                    onChange={(e) => setNewProd({ ...newProd, sizes: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-800">Stock Count</label>
                  <input
                    type="number"
                    value={newProd.stockCount}
                    onChange={(e) => setNewProd({ ...newProd, stockCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-800">Fabric Composition</label>
                <input
                  type="text"
                  value={newProd.fabricDetails}
                  onChange={(e) => setNewProd({ ...newProd, fabricDetails: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg"
                />
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 rounded-lg border border-stone-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-black text-white font-bold uppercase tracking-wider"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
