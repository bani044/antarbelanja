import { Loader2, Upload, X } from "lucide-react";
import { useMemo, useState } from "react";
import { compressImage } from "../../utils/helpers";

const ProductFormModal = ({ editingProduct, onClose, onSave }) => {
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [formData, setFormData] = useState({
    name: editingProduct?.name || "",
    price: editingProduct?.price || "",
    category: editingProduct?.category || "Kuliner",
    store: editingProduct?.store || "",
    description: editingProduct?.description || "",
    images: editingProduct?.images || [],
    waLink: editingProduct?.waLink || "#",
    keywords: editingProduct?.keywords || "",
  });

  // Mock categories - in real app this would come from props
  const categoriesToDisplay = useMemo(() => {
    return ["Kuliner", "Sembako"];
  }, []);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setIsCompressing(true);
      try {
        const compressedImages = await Promise.all(
          files.map((file) => compressImage(file))
        );
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...compressedImages],
        }));
      } catch (err) {
        alert("Gagal memproses gambar: " + err.message);
      } finally {
        setIsCompressing(false);
      }
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) return alert("Nama Produk wajib diisi!");
    if (!formData.price) return alert("Harga wajib diisi!");
    if (isSubmitting || isCompressing) return;

    setIsSubmitting(true);
    try {
      await onSave(formData, editingProduct);
      onClose();
    } catch (err) {
      console.error("Save Error:", err);
      alert("Gagal menyimpan: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-sm rounded-2xl p-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="font-bold text-lg mb-4 border-b pb-2">
          {editingProduct ? "Edit Produk" : "Tambah Produk"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Nama Produk"
            className="w-full p-2 border rounded-lg"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Harga"
              className="w-1/2 p-2 border rounded-lg"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
            />
            {isCustomCategory ? (
              <div className="w-1/2 relative">
                <input
                  type="text"
                  placeholder="Ketik Kategori..."
                  className="w-full p-2 border rounded-lg border-blue-500"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => {
                    setIsCustomCategory(false);
                    setFormData({ ...formData, category: "Kuliner" });
                  }}
                  className="absolute right-1 top-1 text-xs text-red-500 p-1"
                >
                  Batal
                </button>
              </div>
            ) : (
              <select
                className="w-1/2 p-2 border rounded-lg"
                value={formData.category}
                onChange={(e) => {
                  if (e.target.value === "ADD_NEW") {
                    setIsCustomCategory(true);
                    setFormData({ ...formData, category: "" });
                  } else {
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    });
                  }
                }}
              >
                {categoriesToDisplay.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
                <option value="ADD_NEW" className="font-bold text-blue-600">
                  + Tambah Kategori Baru
                </option>
              </select>
            )}
          </div>
          <input
            type="text"
            placeholder="Nama Lapak/Toko"
            className="w-full p-2 border rounded-lg"
            value={formData.store}
            onChange={(e) =>
              setFormData({ ...formData, store: e.target.value })
            }
          />

          <textarea
            placeholder="Kata Kunci Tersembunyi (Cth: elpiji, gas, melon)"
            className="w-full p-2 border rounded-lg h-12 text-xs bg-gray-50"
            value={formData.keywords}
            onChange={(e) =>
              setFormData({ ...formData, keywords: e.target.value })
            }
          ></textarea>
          <textarea
            placeholder="Deskripsi Produk"
            className="w-full p-2 border rounded-lg h-20 text-sm"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-3">
            <label className="cursor-pointer block text-center mb-2">
              <div className="flex justify-center mb-1">
                <Upload size={24} className="text-blue-500" />
              </div>
              <span className="text-xs text-blue-600 font-bold">
                {isCompressing ? (
                  <span className="flex items-center justify-center gap-1 text-yellow-600">
                    <Loader2 className="animate-spin" size={12} /> Mengompres
                    Foto...
                  </span>
                ) : (
                  "+ Upload Foto (Bisa Banyak)"
                )}
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
                disabled={isCompressing}
              />
            </label>
            {formData.images.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {formData.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group"
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover"
                      alt="preview"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-bl-lg opacity-80 hover:opacity-100"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-gray-100 rounded-lg font-bold text-gray-600"
              disabled={isSubmitting || isCompressing}
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-bold flex items-center justify-center gap-2"
              disabled={isSubmitting || isCompressing}
            >
              {isSubmitting || isCompressing ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Proses...
                </>
              ) : (
                "Simpan"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
