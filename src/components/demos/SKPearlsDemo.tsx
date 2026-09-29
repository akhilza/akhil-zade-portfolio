"use client";

import React, { useState } from "react";
import { ShoppingBag, Sparkles, Filter, X, Plus, Minus, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import confetti from "canvas-confetti";

interface Product {
  id: string;
  name: string;
  variety: "Akoya" | "Tahitian" | "South Sea";
  grade: "AAA Luster" | "Flawless GEM" | "Baroque Royal";
  origin: string;
  priceUsd: number;
  rating: number;
  accentColor: string;
  description: string;
}

const PRODUCTS: Product[] = [
  {
    id: "pearl-1",
    name: "Tahitian Midnight Black Pearl Pendant",
    variety: "Tahitian",
    grade: "Flawless GEM",
    origin: "French Polynesia",
    priceUsd: 480,
    rating: 4.9,
    accentColor: "from-emerald-400 to-teal-700",
    description: "11mm peacock overtone Tahitian pearl set in 18k recycled white gold bezel.",
  },
  {
    id: "pearl-2",
    name: "Akoya Royal Empress Triple Strand",
    variety: "Akoya",
    grade: "AAA Luster",
    origin: "Mie Prefecture, Japan",
    priceUsd: 1250,
    rating: 5.0,
    accentColor: "from-rose-200 to-indigo-300",
    description: "Mirror-like overtone Akoya pearls hand-knotted on pure Japanese silk thread.",
  },
  {
    id: "pearl-3",
    name: "Golden South Sea Champagne Solitaire",
    variety: "South Sea",
    grade: "Baroque Royal",
    origin: "Palawan, Philippines",
    priceUsd: 890,
    rating: 4.85,
    accentColor: "from-amber-200 to-yellow-500",
    description: "Rare 13mm natural golden South Sea cultured pearl with deep honey radiance.",
  },
  {
    id: "pearl-4",
    name: "Oceanic Tahitian Baroque Drop Earrings",
    variety: "Tahitian",
    grade: "AAA Luster",
    origin: "Tahiti Lagoon",
    priceUsd: 620,
    rating: 4.95,
    accentColor: "from-teal-300 to-emerald-600",
    description: "Symmetrical drop pearls with eggplant and emerald iridescence on platinum wires.",
  },
];

type Currency = "USD" | "EUR" | "INR";

const RATES: Record<Currency, { symbol: string; rate: number }> = {
  USD: { symbol: "$", rate: 1 },
  EUR: { symbol: "€", rate: 0.92 },
  INR: { symbol: "₹", rate: 86.5 },
};

export function SKPearlsDemo() {
  const [filterVariety, setFilterVariety] = useState<string>("All");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([
    { product: PRODUCTS[0], qty: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("AKHIL20");
  const [couponApplied, setCouponApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const filteredProducts =
    filterVariety === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.variety === filterVariety);

  const formatPrice = (usdAmount: number) => {
    const { symbol, rate } = RATES[currency];
    const converted = Math.round(usdAmount * rate);
    return `${symbol}${converted.toLocaleString()}`;
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: Product; qty: number }[]
    );
  };

  const rawTotalUsd = cart.reduce((acc, curr) => acc + curr.product.priceUsd * curr.qty, 0);
  const discountUsd = couponApplied ? rawTotalUsd * 0.2 : 0;
  const finalTotalUsd = rawTotalUsd - discountUsd;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      setCart([]);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    }, 1000);
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl overflow-hidden relative">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-slate-950/70 px-5 py-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-500 p-[1px] shadow-lg shadow-cyan-500/20">
            <div className="h-full w-full rounded-xl bg-slate-950 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-cyan-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight">SKPearls Luxury E-Commerce</h3>
              <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[11px] font-semibold text-cyan-400 border border-cyan-500/20">
                Tissa Tech Production
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Redis catalog caching (-40% latency) & TanStack Query optimistic cart updates
            </p>
          </div>
        </div>

        {/* Currency & Cart Trigger */}
        <div className="flex items-center gap-2">
          {/* Currency Switcher */}
          <div className="flex items-center bg-slate-950 rounded-lg p-0.5 border border-white/10 text-xs">
            {(["USD", "EUR", "INR"] as Currency[]).map((cur) => (
              <button
                key={cur}
                onClick={() => setCurrency(cur)}
                className={`px-2 py-1 rounded font-medium transition-all ${
                  currency === cur
                    ? "bg-indigo-600 text-white font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {cur}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative flex items-center gap-1.5 rounded-lg bg-indigo-600/30 border border-indigo-500/40 px-3 py-1.5 text-xs font-semibold text-indigo-200 hover:bg-indigo-600/50 transition-colors"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Bag</span>
            <span className="ml-1 rounded-full bg-indigo-500 text-white px-1.5 py-0.2 text-[10px] font-bold">
              {cart.reduce((a, b) => a + b.qty, 0)}
            </span>
          </button>
        </div>
      </div>

      {/* Main Catalog View */}
      <div className="p-5 space-y-4">
        {/* Variety Filter Pills & Latency Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-3">
          <div className="flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-xs text-slate-400 mr-1">Variety:</span>
            {["All", "Akoya", "Tahitian", "South Sea"].map((variety) => (
              <button
                key={variety}
                onClick={() => setFilterVariety(variety)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  filterVariety === variety
                    ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/20"
                    : "bg-slate-950 text-slate-400 border border-white/5 hover:border-white/20"
                }`}
              >
                {variety}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-mono">
              <Zap className="h-3 w-3" /> Redis Cache Hit (12ms)
            </span>
            <span className="hidden sm:inline">• AWS CloudFront Asset CDN</span>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group rounded-xl border border-white/10 bg-slate-950/60 p-4 flex flex-col justify-between hover:border-indigo-500/40 hover:bg-slate-950/90 transition-all shadow-md"
            >
              <div>
                {/* Visual Pearl Sphere Mockup */}
                <div className="relative h-32 w-full rounded-lg bg-gradient-to-b from-slate-900 to-slate-950 border border-white/5 flex items-center justify-center overflow-hidden mb-3">
                  <div
                    className={`h-20 w-20 rounded-full bg-gradient-to-tr ${product.accentColor} shadow-2xl relative flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300`}
                  >
                    <div className="absolute top-2 left-3 h-5 w-5 rounded-full bg-white/60 blur-[2px]" />
                    <div className="absolute bottom-2 right-2 h-7 w-7 rounded-full bg-black/40 blur-[4px]" />
                  </div>
                  <span className="absolute top-2 right-2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/20">
                    {product.grade}
                  </span>
                </div>

                <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-400">
                  {product.origin}
                </div>
                <h4 className="text-sm font-semibold text-white mt-1 leading-snug group-hover:text-cyan-300 transition-colors">
                  {product.name}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Direct Vault</div>
                  <div className="text-sm font-bold text-white font-mono">
                    {formatPrice(product.priceUsd)}
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/30"
                >
                  <Plus className="h-3 w-3" /> Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide-out / Overlaid Cart Drawer */}
      {isCartOpen && (
        <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-30 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-indigo-400" />
                <h4 className="text-sm font-bold text-white">Your SKPearls Bag ({cart.length} items)</h4>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Optimistic RTK Query Active
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {orderComplete ? (
              <div className="py-10 text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h5 className="text-base font-bold text-white">Payment & Reservation Confirmed!</h5>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Stripe Checkout webhook triggered inventory hold in AWS DynamoDB & sent automated customer receipt.
                </p>
                <button
                  onClick={() => {
                    setOrderComplete(false);
                    setIsCartOpen(false);
                    setCart([{ product: PRODUCTS[0], qty: 1 }]);
                  }}
                  className="rounded-lg bg-indigo-600 text-white px-4 py-2 text-xs font-semibold"
                >
                  Return to Storefront
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                Your luxury bag is empty. Select a pearl piece above.
              </div>
            ) : (
              <div className="divide-y divide-white/5 max-h-[220px] overflow-y-auto mt-2">
                {cart.map(({ product, qty }) => (
                  <div key={product.id} className="py-3 flex items-center justify-between text-xs">
                    <div className="space-y-0.5 max-w-[60%]">
                      <div className="font-semibold text-white truncate">{product.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {formatPrice(product.priceUsd)} each • {product.variety}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-slate-900 border border-white/10 rounded-lg p-1">
                        <button
                          onClick={() => updateQty(product.id, -1)}
                          className="h-5 w-5 flex items-center justify-center text-slate-400 hover:text-white"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="font-mono text-xs text-white font-bold px-1">{qty}</span>
                        <button
                          onClick={() => updateQty(product.id, 1)}
                          className="h-5 w-5 flex items-center justify-center text-slate-400 hover:text-white"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="font-mono font-bold text-white w-20 text-right">
                        {formatPrice(product.priceUsd * qty)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {!orderComplete && cart.length > 0 && (
            <div className="border-t border-white/10 pt-4 space-y-3">
              {/* Coupon row */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Enter Coupon (e.g. AKHIL20)"
                  className="rounded-lg bg-slate-900 border border-white/10 px-3 py-1.5 text-xs font-mono text-white flex-1 focus:outline-none focus:border-indigo-500 uppercase"
                />
                <button
                  onClick={() => setCouponApplied(couponCode === "AKHIL20")}
                  className="rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1.5 font-semibold hover:bg-indigo-500/30"
                >
                  {couponApplied ? "Applied (20% Off)" : "Apply Code"}
                </button>
              </div>

              {/* Total Summary */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Subtotal ({cart.reduce((a, b) => a + b.qty, 0)} items)</span>
                <span className="font-mono text-white font-bold">{formatPrice(finalTotalUsd)}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 hover:opacity-95 active:scale-95 transition-all"
              >
                {isCheckingOut ? (
                  "Processing Secure Stripe Checkout..."
                ) : (
                  <>
                    <span>Proceed to Simulated Checkout</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Footer architectural note */}
      <div className="border-t border-white/5 bg-slate-950/80 px-5 py-2.5 flex items-center justify-between text-[11px] text-slate-400">
        <div>
          <span>Architecture: <strong className="text-slate-200">MySQL + AWS DynamoDB + Redis Caching</strong></span>
          <span className="ml-3 hidden sm:inline text-cyan-400 font-mono">Query latency cut by 40%</span>
        </div>
        <span className="text-slate-500">Tissa Technology Experience</span>
      </div>
    </div>
  );
}
