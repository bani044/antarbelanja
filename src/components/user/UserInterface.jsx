import {
  ChefHat,
  Loader2,
  Lock,
  Megaphone,
  Package,
  Plus,
  Search,
  Share2,
  ShoppingBag,
  ShoppingCart,
  Store,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import CartModal from "./CartModal";
import LoginModal from "./LoginModal";

const UserInterface = ({
  products,
  isLoadingData,
  cart,
  totalItems,
  onAddToCart,
  onLogin,
  onShareApp,
  onCheckoutWA,
  onUpdateQty,
  onUpdateNote,
  onRemoveFromCart,
  totalProductPrice,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const adsBanner = [
    {
      id: 1,
      title: "Promo Ongkir Hemat!",
      subtitle: "Khusus pemesanan hari ini",
      color: "bg-red-500",
    },
    {
      id: 2,
      title: "Lapak Baru: Bakso Rudal",
      subtitle: "Cobain sekarang!",
      color: "bg-blue-600",
    },
  ];

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentAdIndex((p) => (p + 1) % adsBanner.length),
      4000
    );
    return () => clearInterval(timer);
  }, [adsBanner]);

  const categoriesToDisplay = useMemo(() => {
    const defaultCats = ["Kuliner", "Sembako"];
    const productCats = products.map((p) => p.category);
    const uniqueCats = [...new Set([...defaultCats, ...productCats])].sort();
    return ["Semua", ...uniqueCats];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(term) ||
        product.store.toLowerCase().includes(term) ||
        (product.description &&
          product.description.toLowerCase().includes(term)) ||
        (product.keywords && product.keywords.toLowerCase().includes(term));
      const matchesCategory =
        selectedCategory === "Semua" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, products]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(pinInput);
    if (success) {
      setIsLoginModalOpen(false);
      setPinInput("");
      setLoginError("");
    } else {
      setLoginError("PIN Salah!");
    }
  };

  const handleCheckout = () => {
    onCheckoutWA();
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24 md:pb-0 relative overflow-hidden">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-yellow-400 shadow-md">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <div className="bg-black text-yellow-400 p-1.5 rounded-lg">
                <ChefHat size={24} />
              </div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                ANTAR BELANJA
                <br />
                <span className="text-sm font-normal">Kuliner & Sembako</span>
              </h1>
            </div>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => {
                  setPinInput("");
                  setLoginError("");
                  setIsLoginModalOpen(true);
                }}
                className="p-2 text-yellow-700/50 hover:text-black transition-colors"
              >
                <Lock size={18} />
              </button>
              <button
                onClick={onShareApp}
                className="p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors text-gray-900"
              >
                <Share2 size={24} />
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors"
              >
                <ShoppingCart className="text-gray-900" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border-none focus:ring-2 focus:ring-black shadow-sm text-gray-800 bg-white/90"
            />
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto">
        {/* IKLAN */}
        <div className="px-4 py-4">
          <div
            className={`relative rounded-xl overflow-hidden shadow-lg h-32 flex items-center px-6 ${adsBanner[currentAdIndex].color} transition-colors duration-500`}
          >
            <div className="text-white z-10">
              <Megaphone className="w-8 h-8 mb-2 opacity-80" />
              <h3 className="text-xl font-bold">
                {adsBanner[currentAdIndex].title}
              </h3>
              <p className="text-sm opacity-90">
                {adsBanner[currentAdIndex].subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* KATEGORI */}
        <div className="px-4 mb-4 overflow-x-auto whitespace-nowrap scrollbar-hide pb-2">
          {categoriesToDisplay.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`mr-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-gray-900 text-yellow-400 shadow-lg scale-105"
                  : "bg-white text-gray-600 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* LIST PRODUK */}
        <div className="px-4 pb-20 space-y-4">
          {isLoadingData ? (
            <div className="text-center py-10 text-gray-400 flex flex-col items-center">
              <Loader2 className="animate-spin mb-2" />
              Memuat Data...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-10 opacity-50">
              <ShoppingBag className="w-16 h-16 mx-auto mb-2 text-gray-400" />
              <p>Belum ada produk.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow"
                >
                  <div className="relative h-32 bg-gray-200 group">
                    {product.images && product.images.length > 0 ? (
                      <div className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                        {product.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            className="w-full h-full object-cover shrink-0 snap-center"
                            alt={product.name}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Package />
                      </div>
                    )}
                    <div className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-0.5 rounded text-gray-900 shadow-sm z-10">
                      {product.category}
                    </div>
                    {product.images && product.images.length > 1 && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1 bg-black/20 px-2 py-0.5 rounded-full z-10">
                        {product.images.map((_, i) => (
                          <div
                            key={i}
                            className="w-1 h-1 rounded-full bg-white/80"
                          ></div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="p-3 flex flex-col grow">
                    <div className="mb-2">
                      <div className="flex items-center gap-1 text-[10px] text-gray-500 mb-1">
                        <Store size={10} />
                        <span className="truncate max-w-25">
                          {product.store}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-800 text-sm leading-tight line-clamp-2">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-[10px] text-gray-500 mt-1 line-clamp-2 bg-gray-50 p-1 rounded">
                          {product.description}
                        </p>
                      )}
                    </div>
                    <div className="mt-auto pt-2">
                      <p className="text-yellow-600 font-extrabold text-sm mb-3">
                        Rp {parseInt(product.price).toLocaleString("id-ID")}
                      </p>
                      <button
                        onClick={() => onAddToCart(product)}
                        className="w-full bg-gray-900 text-yellow-400 py-2 rounded-lg text-xs font-bold hover:bg-black active:scale-95 transition-transform flex items-center justify-center gap-1"
                      >
                        <Plus size={14} /> + Tambah Keranjang
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CART MODAL */}
      {isCartOpen && (
        <CartModal
          cart={cart}
          totalProductPrice={totalProductPrice}
          onClose={() => setIsCartOpen(false)}
          onUpdateQty={onUpdateQty}
          onUpdateNote={onUpdateNote}
          onRemoveFromCart={onRemoveFromCart}
          onCheckout={handleCheckout}
        />
      )}

      {/* LOGIN MODAL */}
      {isLoginModalOpen && (
        <LoginModal
          pinInput={pinInput}
          setPinInput={setPinInput}
          loginError={loginError}
          onClose={() => setIsLoginModalOpen(false)}
          onSubmit={handleLoginSubmit}
        />
      )}
    </div>
  );
};

export default UserInterface;
