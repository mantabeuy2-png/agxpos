import React, { useState, useMemo } from 'react';
import {
  Store,
  LayoutDashboard,
  Receipt,
  Clock,
  Package,
  Truck,
  FileText,
  Tag,
  BarChart3,
  TrendingDown,
  Users,
  Search,
  Maximize2,
  Minimize2,
  Plus,
  Minus,
  X,
  QrCode,
  Banknote,
  CreditCard,
  Wallet,
  Split,
  Pause,
  ShoppingBasket,
  UserCheck,
  CheckCircle2,
  Printer,
  ChevronLeft,
  ChevronRight,
  ScanLine,
} from 'lucide-react';
import {
  KasirProduct,
  CartItem,
  KASIR_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_CART_ITEMS,
} from '../data/mockKasirData';

interface TabletKasirAppProps {
  isEmbedded?: boolean;
  onFullscreenToggle?: () => void;
  isFullscreen?: boolean;
  onTrialClick?: () => void;
}

export const TabletKasirApp: React.FC<TabletKasirAppProps> = ({
  isEmbedded = false,
  onFullscreenToggle,
  isFullscreen = false,
  onTrialClick,
}) => {
  const [activeMenu, setActiveMenu] = useState<string>('Kasir');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBranch, setSelectedBranch] = useState<string>('Toko Makmur Jaya');
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [activeCustomer, setActiveCustomer] = useState<string | null>(null);

  // Modals
  const [showQrisModal, setShowQrisModal] = useState<boolean>(false);
  const [showTunaiModal, setShowTunaiModal] = useState<boolean>(false);
  const [showCustomerModal, setShowCustomerModal] = useState<boolean>(false);
  const [showReceiptModal, setShowReceiptModal] = useState<boolean>(false);
  const [lastPaymentMethod, setLastPaymentMethod] = useState<string>('QRIS');
  const [cashGiven, setCashGiven] = useState<number>(700000);
  const [holdNotice, setHoldNotice] = useState<string | null>(null);

  // Filter products by category & search
  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((prod) => {
      const matchCat =
        selectedCategory === 'Semua' || prod.category === selectedCategory;
      const matchSearch =
        !searchQuery.trim() ||
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Calculations
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    return Math.round((subtotal * discountPercent) / 100);
  }, [subtotal, discountPercent]);

  const grandTotal = useMemo(() => {
    return Math.max(0, subtotal - discountAmount);
  }, [subtotal, discountAmount]);

  const totalQuantity = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.qty, 0);
  }, [cartItems]);

  const changeDue = useMemo(() => {
    return Math.max(0, cashGiven - grandTotal);
  }, [cashGiven, grandTotal]);

  // Handlers
  const handleAddToCart = (product: KasirProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) {
        return prev.map((item) =>
          item.name === product.name ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `c_${Date.now()}_${product.id}`,
          name: product.name,
          price: product.price,
          qty: 1,
          discount: 0,
        },
      ];
    });
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.qty + delta;
            return nextQty > 0 ? { ...item, qty: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleHoldOrder = () => {
    setHoldNotice('Transaksi berhasil ditahan (Hold). Dapat dipanggil kembali.');
    setTimeout(() => setHoldNotice(null), 3500);
  };

  const handleCompleteQrisPayment = () => {
    setShowQrisModal(false);
    setLastPaymentMethod('QRIS Dinamis');
    setShowReceiptModal(true);
  };

  const handleCompleteTunaiPayment = () => {
    setShowTunaiModal(false);
    setLastPaymentMethod('Tunai');
    setShowReceiptModal(true);
  };

  const handleResetAfterCheckout = () => {
    setShowReceiptModal(false);
    setCartItems(INITIAL_CART_ITEMS);
    setDiscountPercent(0);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white text-slate-900 select-none overflow-hidden font-sans">
      {/* Notice Toast */}
      {holdNotice && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs px-4 py-2 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2 animate-bounce">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>{holdNotice}</span>
        </div>
      )}

      {/* Main Grid: Left Sidebar + Center Workspace + Right Cart */}
      <div className="flex-1 flex overflow-hidden">
        {/* 1. LEFT SIDEBAR (Dark Blue matching screenshot #072545) */}
        <aside className="w-44 sm:w-48 bg-[#072545] text-slate-200 flex flex-col justify-between shrink-0 border-r border-[#0e3b68]">
          <div>
            {/* Brand Header */}
            <div className="p-3.5 border-b border-[#0e3b68]/80 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white shadow-xs">
                <Store className="w-5 h-5" />
              </div>
              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white tracking-tight">AgxPOS</span>
                  <span className="px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30 text-[9px] font-semibold">
                    Ver 1.1.5
                  </span>
                </div>
                <div className="text-[10px] text-sky-200/70 truncate">Sistem Kasir UMKM</div>
              </div>
            </div>

            {/* Sidebar Navigation */}
            <nav className="p-2 space-y-0.5 text-xs font-medium">
              {[
                { name: 'Dashboard', icon: LayoutDashboard },
                { name: 'Kasir', icon: Store, active: true },
                { name: 'Transaksi', icon: Receipt },
                { name: 'Shift & Z', icon: Clock },
                { name: 'Produk & Stok', icon: Package },
                { name: 'Supplier', icon: Truck },
                { name: 'Purchase Order', icon: FileText },
                { name: 'Promo', icon: Tag },
                { name: 'Laporan', icon: BarChart3 },
                { name: 'Pengeluaran', icon: TrendingDown },
                { name: 'Pelanggan', icon: Users },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.name;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setActiveMenu(item.name)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all ${
                      isActive
                        ? 'bg-sky-500 text-white font-bold shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-sky-300/80'}`} />
                    <span className="truncate">{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom User Info */}
          <div className="p-3 border-t border-[#0e3b68]/80 bg-[#051c36] flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0 ring-2 ring-amber-300/40">
              A
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate">Admin AgxPOS</div>
              <div className="text-[10px] text-sky-200/70 capitalize">owner</div>
            </div>
          </div>
        </aside>

        {/* 2. CENTER AREA: Top Bar, Catalog & Products Grid */}
        <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-hidden">
          {/* Top Bar */}
          <header className="h-12 bg-white border-b border-slate-200 px-4 flex items-center justify-between shrink-0 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <Store className="w-4 h-4 text-sky-600" />
                <span>Kasir</span>
              </div>

              {/* Branch Selector */}
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 hover:bg-slate-100 cursor-pointer focus:outline-none focus:ring-1 focus:ring-sky-500"
              >
                <option value="Toko Makmur Jaya">Toko Makmur Jaya</option>
                <option value="Toko Makmur Jaya - Cabang 2">Toko Makmur Jaya - Cabang 2</option>
              </select>

              {/* Fullscreen Toggle */}
              {onFullscreenToggle && (
                <button
                  type="button"
                  onClick={onFullscreenToggle}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-sky-200 text-sky-700 bg-sky-50 hover:bg-sky-100 text-xs font-medium transition-colors"
                >
                  {isFullscreen ? (
                    <>
                      <Minimize2 className="w-3.5 h-3.5" />
                      <span>Kecilkan</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>[ ] Penuh</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="text-xs text-slate-500 font-medium">
                18 Sep 2026, 11.57
              </div>
              {onTrialClick && (
                <button
                  type="button"
                  onClick={onTrialClick}
                  className="hidden sm:inline-flex px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-xs transition-colors"
                >
                  Coba Gratis 7 Hari
                </button>
              )}
            </div>
          </header>

          {/* Search & Category Filter Section */}
          <div className="p-3.5 space-y-2.5 bg-white border-b border-slate-200 shrink-0">
            {/* Search Input Bar */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari produk / scan barcode lalu Enter..."
                  className="w-full bg-slate-50/90 border border-slate-200 rounded-lg pl-3 pr-9 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <ScanLine className="w-3.5 h-3.5" />
                </button>
              </div>
              <button
                type="button"
                className="px-4 py-1.5 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
              >
                Cari
              </button>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs no-scrollbar">
              {KASIR_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg whitespace-nowrap text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#072545] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="flex-1 p-3.5 overflow-y-auto">
            {filteredProducts.length === 0 ? (
              <div className="h-48 flex flex-col items-center justify-center text-slate-400 text-xs">
                <Package className="w-8 h-8 mb-2 text-slate-300" />
                <span>Tidak ada produk yang cocok dengan pencarian "{searchQuery}"</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {filteredProducts.map((prod) => (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => handleAddToCart(prod)}
                    className="bg-white border border-slate-200/90 rounded-xl p-2.5 text-left flex flex-col justify-between hover:border-sky-500 hover:shadow-md active:scale-[0.98] transition-all group relative overflow-hidden"
                  >
                    {/* Image Container with natural aspect */}
                    <div className="w-full h-24 bg-slate-50 rounded-lg mb-2 overflow-hidden flex items-center justify-center p-1 relative">
                      <img
                        src={prod.imageUrl}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                      />
                      <span className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-sky-500 text-white rounded-full p-0.5 shadow-xs transition-opacity">
                        <Plus className="w-3 h-3" />
                      </span>
                    </div>

                    {/* Title & Price */}
                    <div>
                      <h4 className="text-[11px] font-semibold text-slate-800 line-clamp-2 leading-tight group-hover:text-sky-600 transition-colors">
                        {prod.name}
                      </h4>
                      <div className="text-xs font-bold text-sky-600 mt-1">
                        Rp {prod.price.toLocaleString('id-ID')}
                      </div>
                      <div className="text-[9px] text-slate-400 mt-0.5">
                        stok {prod.stock} pcs
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Pagination Bar matching screenshot */}
          <div className="h-10 bg-white border-t border-slate-200 px-4 flex items-center justify-between text-xs text-slate-500 shrink-0">
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="w-6 h-6 rounded flex items-center justify-center border border-slate-200 hover:bg-slate-100 text-slate-600 disabled:opacity-40"
                disabled
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                className="w-6 h-6 rounded flex items-center justify-center border border-slate-200 hover:bg-slate-100 text-slate-600"
              >
                1
              </button>
              <button
                type="button"
                className="w-6 h-6 rounded flex items-center justify-center bg-sky-600 text-white font-bold"
              >
                2
              </button>
              <button
                type="button"
                className="w-6 h-6 rounded flex items-center justify-center border border-slate-200 hover:bg-slate-100 text-slate-600"
              >
                3
              </button>
              <button
                type="button"
                className="w-6 h-6 rounded flex items-center justify-center border border-slate-200 hover:bg-slate-100 text-slate-600"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="text-[11px] font-medium text-slate-400">Total 33</div>
          </div>
        </div>

        {/* 3. RIGHT PANEL: Keranjang (Cart) matching screenshot */}
        <aside className="w-72 sm:w-80 md:w-96 bg-white border-l border-slate-200 flex flex-col justify-between shrink-0 shadow-2xs">
          {/* Cart Header */}
          <div className="p-3 border-b border-slate-200 flex items-center justify-between shrink-0 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <ShoppingBasket className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800">Keranjang</span>
              <span className="px-1.5 py-0.2 rounded-full bg-sky-600 text-white text-[10px] font-bold">
                {totalQuantity}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowCustomerModal(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-sky-600" />
              <span>{activeCustomer || 'Pelanggan'}</span>
            </button>
          </div>

          {/* Cart Table Items */}
          <div className="flex-1 overflow-y-auto p-2 text-xs">
            <div className="grid grid-cols-12 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 border-b border-slate-100">
              <div className="col-span-5">Item</div>
              <div className="col-span-3 text-center">Jml</div>
              <div className="col-span-1 text-center">Disc</div>
              <div className="col-span-3 text-right">Total</div>
            </div>

            {cartItems.length === 0 ? (
              <div className="h-40 flex flex-col items-center justify-center text-slate-400 text-xs">
                <span>Keranjang kosong</span>
                <span className="text-[10px] text-slate-400 mt-1">Pilih produk di katalog</span>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-2 px-2 hover:bg-slate-50/80 rounded-lg group transition-colors">
                    <div className="grid grid-cols-12 items-center gap-1">
                      {/* Name & price */}
                      <div className="col-span-5 pr-1 truncate">
                        <div className="font-semibold text-slate-800 truncate text-[11px]">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Rp {item.price.toLocaleString('id-ID')}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="col-span-3 flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleUpdateQty(item.id, -1)}
                          className="w-5 h-5 rounded border border-slate-200 hover:bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="w-4 text-center font-bold text-slate-800 text-xs">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateQty(item.id, 1)}
                          className="w-5 h-5 rounded border border-slate-200 hover:bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold"
                        >
                          +
                        </button>
                      </div>

                      {/* Disc */}
                      <div className="col-span-1 text-center text-[11px] text-slate-400">
                        {item.discount}
                      </div>

                      {/* Subtotal & Delete button */}
                      <div className="col-span-3 flex items-center justify-end gap-1.5">
                        <span className="font-bold text-slate-800 text-[11px]">
                          Rp {(item.price * item.qty).toLocaleString('id-ID')}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-slate-300 hover:text-rose-500 transition-colors"
                          title="Hapus item"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Bottom: Discount, Total & Payment Actions */}
          <div className="p-3 bg-slate-50/70 border-t border-slate-200 shrink-0 space-y-2.5">
            {/* Discount total row matching screenshot */}
            <div className="flex items-center justify-between gap-1 text-xs">
              <span className="text-slate-600 text-[11px] font-medium shrink-0">Diskon total</span>
              <div className="flex items-center gap-1 overflow-x-auto">
                {[0, 5, 10, 15, 20].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDiscountPercent(pct)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border transition-all ${
                      discountPercent === pct
                        ? 'bg-sky-600 text-white border-sky-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            {/* Total Amount Big Text */}
            <div className="text-right pt-1">
              <span className="text-xl sm:text-2xl font-black text-[#0284c7] tracking-tight">
                Rp {grandTotal.toLocaleString('id-ID')}
              </span>
            </div>

            {/* Main 2 Buttons: Tunai & QRIS (Matching screenshot colors) */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setShowTunaiModal(true)}
                disabled={cartItems.length === 0}
                className="py-2.5 px-3 rounded-xl bg-[#10b981] hover:bg-[#059669] active:scale-[0.98] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-40"
              >
                <Banknote className="w-4 h-4" />
                <span>Tunai</span>
              </button>

              <button
                type="button"
                onClick={() => setShowQrisModal(true)}
                disabled={cartItems.length === 0}
                className="py-2.5 px-3 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] active:scale-[0.98] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-40"
              >
                <QrCode className="w-4 h-4" />
                <span>QRIS</span>
              </button>
            </div>

            {/* Secondary Buttons: Transfer, E-Wallet, Split, Hold */}
            <div className="grid grid-cols-4 gap-1 text-[10px]">
              <button
                type="button"
                onClick={() => {
                  setLastPaymentMethod('Transfer Bank');
                  setShowReceiptModal(true);
                }}
                className="py-1.5 px-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-medium flex items-center justify-center gap-1 truncate"
              >
                <CreditCard className="w-3 h-3 text-sky-600 shrink-0" />
                <span className="truncate">Transfer</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setLastPaymentMethod('E-Wallet (GoPay/OVO/ShopeePay)');
                  setShowReceiptModal(true);
                }}
                className="py-1.5 px-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-medium flex items-center justify-center gap-1 truncate"
              >
                <Wallet className="w-3 h-3 text-amber-500 shrink-0" />
                <span className="truncate">E-Wallet</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setHoldNotice('Fitur Split Bill aktif: Tagihan dibagi merata.');
                  setTimeout(() => setHoldNotice(null), 3000);
                }}
                className="py-1.5 px-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-medium flex items-center justify-center gap-1 truncate"
              >
                <Split className="w-3 h-3 text-indigo-500 shrink-0" />
                <span className="truncate">Split</span>
              </button>
              <button
                type="button"
                onClick={handleHoldOrder}
                className="py-1.5 px-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-medium flex items-center justify-center gap-1"
                title="Tahan Pesanan (Hold)"
              >
                <Pause className="w-3 h-3 text-slate-600 shrink-0" />
                <span>||</span>
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* 4. MODALS: QRIS, Tunai, Pelanggan, Receipt */}

      {/* QRIS Modal */}
      {showQrisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <QrCode className="w-4 h-4 text-sky-600" />
                <span>QRIS Dinamis Nasional</span>
              </div>
              <button
                type="button"
                onClick={() => setShowQrisModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <div className="text-xs text-slate-500">Total Pembayaran</div>
              <div className="text-2xl font-black text-sky-600">
                Rp {grandTotal.toLocaleString('id-ID')}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">{selectedBranch}</div>
            </div>

            {/* QR Code Graphic */}
            <div className="p-4 bg-white border-2 border-slate-800 rounded-2xl inline-block shadow-inner">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=00020101021226590014ID.LINKAJA.WWW01189360091100213038160208912345675204541153033605802ID5916Toko+Makmur+Jaya6007Jakarta630465B2"
                alt="QRIS AgxPOS"
                className="w-44 h-44 object-contain mx-auto"
              />
            </div>

            <p className="text-[11px] text-slate-500">
              Pindai menggunakan BCA, Mandiri, BRI, GoPay, OVO, ShopeePay, atau DANA.
            </p>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setShowQrisModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleCompleteQrisPayment}
                className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-600/20 flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Simulasi Bayar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tunai (Cash) Modal */}
      {showTunaiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Banknote className="w-4 h-4 text-emerald-600" />
                <span>Pembayaran Tunai (Cash)</span>
              </div>
              <button
                type="button"
                onClick={() => setShowTunaiModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <div className="text-xs text-slate-500">Tagihan Belanja:</div>
              <div className="text-2xl font-black text-slate-900">
                Rp {grandTotal.toLocaleString('id-ID')}
              </div>
            </div>

            {/* Quick cash options */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-slate-600">
                Uang Diterima dari Pelanggan:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => setCashGiven(grandTotal)}
                  className={`py-2 px-1 text-xs rounded-xl font-bold border ${
                    cashGiven === grandTotal
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Uang Pas
                </button>
                <button
                  type="button"
                  onClick={() => setCashGiven(700000)}
                  className={`py-2 px-1 text-xs rounded-xl font-bold border ${
                    cashGiven === 700000
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Rp700.000
                </button>
                <button
                  type="button"
                  onClick={() => setCashGiven(1000000)}
                  className={`py-2 px-1 text-xs rounded-xl font-bold border ${
                    cashGiven === 1000000
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Rp1.000.000
                </button>
              </div>

              {/* Custom Cash input */}
              <input
                type="number"
                value={cashGiven}
                onChange={(e) => setCashGiven(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 text-right focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            {/* Kembalian Calculation */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-800">Kembalian:</span>
              <span className="text-base font-black text-emerald-700">
                Rp {changeDue.toLocaleString('id-ID')}
              </span>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setShowTunaiModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleCompleteTunaiPayment}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Selesaikan Transaksi</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer / Pelanggan Modal */}
      {showCustomerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Users className="w-4 h-4 text-sky-600" />
                <span>Pilih Pelanggan / Member</span>
              </div>
              <button
                type="button"
                onClick={() => setShowCustomerModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { name: 'Umum (Non-Member)', tier: 'Standard', discount: 0 },
                { name: 'Rudi Hartono', tier: 'Member Gold (500 poin)', discount: 5 },
                { name: 'Siti Rahmawati', tier: 'Member Platinum (1.200 poin)', discount: 10 },
                { name: 'Budi Santoso', tier: 'Member Silver (120 poin)', discount: 0 },
              ].map((cust) => (
                <button
                  key={cust.name}
                  type="button"
                  onClick={() => {
                    setActiveCustomer(cust.name === 'Umum (Non-Member)' ? null : cust.name);
                    if (cust.discount > 0) setDiscountPercent(cust.discount);
                    setShowCustomerModal(false);
                  }}
                  className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50/50 text-left flex items-center justify-between transition-colors"
                >
                  <div>
                    <div className="font-bold text-slate-900">{cust.name}</div>
                    <div className="text-[10px] text-slate-500">{cust.tier}</div>
                  </div>
                  {cust.discount > 0 && (
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                      Diskon {cust.discount}%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Receipt Preview Modal */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="text-center space-y-1">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Transaksi Berhasil!</h3>
              <p className="text-xs text-slate-500">Struk siap dicetak ke printer thermal</p>
            </div>

            {/* Receipt Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-[11px] font-mono space-y-2 text-slate-700">
              <div className="text-center border-b border-dashed border-slate-300 pb-2">
                <div className="font-bold text-slate-900">{selectedBranch}</div>
                <div className="text-[10px] text-slate-500">Jl. Malioboro No. 42, Yogyakarta</div>
                <div className="text-[9px] text-slate-400 mt-1">
                  Nota: #AGX-{Math.floor(100000 + Math.random() * 900000)} • 18 Sep 2026, 11.58
                </div>
              </div>

              <div className="space-y-1 py-1 max-h-36 overflow-y-auto">
                {cartItems.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="truncate pr-2">
                      {item.qty}x {item.name}
                    </span>
                    <span className="shrink-0">
                      Rp {(item.price * item.qty).toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
                {cartItems.length > 5 && (
                  <div className="text-slate-400 text-center text-[10px]">
                    +{cartItems.length - 5} item lainnya...
                  </div>
                )}
              </div>

              <div className="border-t border-dashed border-slate-300 pt-2 space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Metode Bayar:</span>
                  <span>{lastPaymentMethod}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 text-xs pt-1 border-t border-slate-200">
                  <span>TOTAL:</span>
                  <span>Rp {grandTotal.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={handleResetAfterCheckout}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={handleResetAfterCheckout}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Struk (58/80mm)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
