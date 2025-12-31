import { ClipboardList, Database, Lock, Package, Settings } from "lucide-react";
import { useState } from "react";
import BackupTab from "./BackupTab";
import OrdersTab from "./OrdersTab";
import ProductFormModal from "./ProductFormModal";
import ProductsTab from "./ProductsTab";
import SettingsTab from "./SettingsTab";

const AdminPanel = ({
  adminLevel,
  handleLogout,
  orders,
  products,
  isLoadingData,
  appSettings,
  tempSettings,
  setTempSettings,
  onSaveSettings,
  onBackupData,
  onSaveProduct,
  onDeleteProduct,
  onEditProduct,
}) => {
  const [adminTab, setAdminTab] = useState("orders");
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    onEditProduct(product);
    setIsProductFormOpen(true);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsProductFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-20 px-4 py-3 flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="font-bold text-gray-800 flex items-center gap-2">
            <Lock
              size={18}
              className={adminLevel === 2 ? "text-red-600" : "text-blue-600"}
            />
            {adminLevel === 2 ? "Super Admin (Pusat)" : "Admin Cabang"}
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="text-gray-500 text-sm font-bold bg-gray-200 px-3 py-1 rounded-lg"
        >
          Keluar
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-white border-t border-gray-100 overflow-x-auto">
        <button
          onClick={() => setAdminTab("orders")}
          className={`flex-1 py-3 flex flex-col items-center gap-1 text-xs font-medium ${
            adminTab === "orders"
              ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
              : "text-gray-500"
          }`}
        >
          <ClipboardList size={18} /> Laporan
        </button>
        <button
          onClick={() => setAdminTab("products")}
          className={`flex-1 py-3 flex flex-col items-center gap-1 text-xs font-medium ${
            adminTab === "products"
              ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
              : "text-gray-500"
          }`}
        >
          <Package size={18} /> Produk
        </button>

        {adminLevel === 2 && (
          <>
            <button
              onClick={() => setAdminTab("settings")}
              className={`flex-1 py-3 flex flex-col items-center gap-1 text-xs font-medium ${
                adminTab === "settings"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-500"
              }`}
            >
              <Settings size={18} /> Pengaturan
            </button>
            <button
              onClick={() => setAdminTab("backup")}
              className={`flex-1 py-3 flex flex-col items-center gap-1 text-xs font-medium ${
                adminTab === "backup"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-500"
              }`}
            >
              <Database size={18} /> Backup
            </button>
          </>
        )}
      </div>

      {/* Tab Content */}
      {adminTab === "orders" && <OrdersTab orders={orders} />}

      {adminTab === "products" && (
        <ProductsTab
          products={products}
          isLoadingData={isLoadingData}
          onAddProduct={handleAddProduct}
          onEditProduct={handleEditProduct}
          onDeleteProduct={onDeleteProduct}
        />
      )}

      {adminTab === "settings" && adminLevel === 2 && (
        <SettingsTab
          tempSettings={tempSettings}
          setTempSettings={setTempSettings}
          onSaveSettings={onSaveSettings}
        />
      )}

      {adminTab === "backup" && adminLevel === 2 && (
        <BackupTab onBackupData={onBackupData} />
      )}

      {/* Product Form Modal */}
      {isProductFormOpen && (
        <ProductFormModal
          editingProduct={editingProduct}
          onClose={() => setIsProductFormOpen(false)}
          onSave={onSaveProduct}
        />
      )}
    </div>
  );
};

export default AdminPanel;
