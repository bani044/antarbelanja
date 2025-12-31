// =================================================================================
// KONFIGURASI CONSTANT
// =================================================================================

export const PRODUCTION_URL = import.meta.env.VITE_PRODUCTION_URL || "";
export const ADMIN_FEE = 500;

// Default Settings
export const DEFAULT_SETTINGS = {
	courierPin: "123456",
	officePin: "777555",
	targetWA: "6285194578200",
	waHeader: "Halo Admin, saya mau pesan orderan berikut dari Aplikasi:",
	waFooter: "Mohon info total harga dan ongkirnya ya. Terima kasih.",
};
