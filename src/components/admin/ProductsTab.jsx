import {
  Edit,
  Loader2,
  Package,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

const ProductsTab = ({
  products,
  isLoadingData,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
}) => {
  return (
    <div className="p-4">
      <button
        onClick={onAddProduct}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold mb-4 flex items-center justify-center gap-2 shadow-sm"
      >
        <Plus size={18} /> Tambah Produk Baru
      </button>

      {isLoadingData ? (
        <div className="text-center py-10 text-gray-400 flex flex-col items-center">
          <Loader2 className="animate-spin mb-2" />
          Memuat Data...
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-10 opacity-50">
          <ShoppingBag className="w-16 h-16 mx-auto mb-2 text-gray-400" />
          <p>Belum ada produk.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 flex gap-3"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                {prod.images && prod.images.length > 0 ? (
                  <img
                    src={prod.images[0]}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Package size={16} />
                  </div>
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                <h4 className="font-bold text-gray-800 text-sm truncate">
                  {prod.name}
                </h4>
                <p className="text-xs text-gray-500 truncate">{prod.store}</p>
                <p className="text-blue-600 font-bold text-sm">
                  Rp {parseInt(prod.price).toLocaleString("id-ID")}
                </p>
                <p className="text-[10px] text-gray-400 mt-1">
                  {prod.category}
                </p>
              </div>
              <div className="flex flex-col justify-between">
                <button
                  onClick={() => onEditProduct(prod)}
                  className="text-blue-500 p-1 bg-blue-50 rounded mb-1"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDeleteProduct(prod.id)}
                  className="text-red-500 p-1 bg-red-50 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsTab;
