import {
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";

const CartModal = ({
  cart,
  totalProductPrice,
  onClose,
  onUpdateQty,
  onUpdateNote,
  onRemoveFromCart,
  onCheckout,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-[85vh] sm:h-auto sm:max-h-[80vh] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-yellow-50 rounded-t-2xl">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <ShoppingBag className="text-gray-900" />
            Keranjang Belanja
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ShoppingCart size={48} className="mb-2 opacity-20" />
              <p>Kosong</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col bg-white border border-gray-100 p-3 rounded-xl shadow-sm gap-2"
              >
                <div className="flex gap-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                    {item.images && item.images.length > 0 && (
                      <img
                        src={item.images[0]}
                        className="w-full h-full object-cover"
                        alt="thumb"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-sm line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-yellow-600 font-bold text-sm mt-1">
                      Rp {(item.price * item.qty).toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="text-red-500 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                      <button
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center bg-gray-900 text-white rounded shadow-sm"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Catatan (Cth: Pedas, Tanpa Nasi)..."
                  className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg p-2 focus:ring-1 focus:ring-yellow-400 outline-none"
                  value={item.note || ""}
                  onChange={(e) => onUpdateNote(item.id, e.target.value)}
                />
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="p-4 border-t bg-white">
            <div className="flex justify-between items-center text-xl font-extrabold text-gray-900 mb-4">
              <span>Total</span>
              <span>Rp {totalProductPrice.toLocaleString("id-ID")}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-[#25D366] text-white py-3.5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg"
            >
              Kirim Pesan ke Kurir
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
