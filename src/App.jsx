import { useState } from "react";

// Hooks
import { useAuth } from "./hooks/useAuth";
import { useCart } from "./hooks/useCart";
import { useFirestore } from "./hooks/useFirestore";

// Components
import AdminPanel from "./components/admin/AdminPanel";
import UserInterface from "./components/user/UserInterface";

// Services
import {
  createOrder,
  generateWhatsAppMessage,
  sendWhatsAppMessage,
  shareApp,
} from "./services/orderService";
import { deleteProduct, saveProduct } from "./services/productService";
import { backupData, saveSettings } from "./services/settingsService";

// =================================================================================
// APLIKASI UTAMA
// =================================================================================
export default function App() {
  // State Admin & Login
  const [adminLevel, setAdminLevel] = useState(0); // 0: User, 1: Kurir, 2: Kantor Pusat

  // Hooks
  const { user } = useAuth();
  const {
    products,
    orders,
    appSettings,
    tempSettings,
    setTempSettings,
    isLoadingData,
  } = useFirestore(user, adminLevel);

  const {
    cart,
    addToCart,
    updateQty,
    updateNote,
    clearCart,
    removeFromCart,
    totalProductPrice,
    totalItems,
    totalStores,
  } = useCart();

  // --- ADMIN & AUTH LOGIC ---
  const handleLogin = (pinInput) => {
    const input = String(pinInput).trim();
    if (input === String(appSettings.officePin).trim()) {
      setAdminLevel(2);
      return true;
    } else if (input === String(appSettings.courierPin).trim()) {
      setAdminLevel(1);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setAdminLevel(0);
  };

  // --- PRODUCT CRUD ---
  const handleSaveProduct = async (formData, editingProduct) => {
    await saveProduct(formData, editingProduct);
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
  };

  const handleEditProduct = (product) => {
    // This will be handled by the ProductFormModal
    // The actual form data setup is done in the modal component
  };

  // --- SETTINGS ---
  const handleSaveSettings = async () => {
    try {
      await saveSettings(tempSettings);
      alert("Pengaturan Berhasil Disimpan!");
    } catch (err) {
      alert(err.message);
    }
  };

  // --- BACKUP ---
  const handleBackupData = () => {
    backupData(products, orders, appSettings);
  };

  // --- CHECKOUT & SHARING ---
  const handleCheckoutWA = async () => {
    if (cart.length === 0) return;

    try {
      const orderId = await createOrder(
        cart,
        totalProductPrice,
        totalStores,
        user
      );
      const message = generateWhatsAppMessage(
        cart,
        totalProductPrice,
        totalStores,
        orderId,
        appSettings
      );
      sendWhatsAppMessage(message, appSettings.targetWA);
      clearCart();
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  const handleShareApp = async () => {
    await shareApp();
  };

  // --- RENDER ---
  if (adminLevel > 0) {
    return (
      <AdminPanel
        adminLevel={adminLevel}
        handleLogout={handleLogout}
        orders={orders}
        products={products}
        isLoadingData={isLoadingData}
        appSettings={appSettings}
        tempSettings={tempSettings}
        setTempSettings={setTempSettings}
        onSaveSettings={handleSaveSettings}
        onBackupData={handleBackupData}
        onSaveProduct={handleSaveProduct}
        onDeleteProduct={handleDeleteProduct}
        onEditProduct={handleEditProduct}
      />
    );
  }

  return (
    <UserInterface
      products={products}
      isLoadingData={isLoadingData}
      cart={cart}
      totalItems={totalItems}
      onAddToCart={addToCart}
      onLogin={handleLogin}
      onShareApp={handleShareApp}
      onCheckoutWA={handleCheckoutWA}
      onUpdateQty={updateQty}
      onUpdateNote={updateNote}
      onRemoveFromCart={removeFromCart}
      totalProductPrice={totalProductPrice}
    />
  );
}
