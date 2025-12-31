import { updateDoc } from "firebase/firestore";
import { getDocRef } from "../config/firebase";

export const saveSettings = async (tempSettings) => {
	if (tempSettings.courierPin.length < 4) throw new Error("PIN Kurir minimal 4 digit");
	if (tempSettings.officePin.length < 4) throw new Error("PIN Pusat minimal 4 digit");
	if (!tempSettings.targetWA.startsWith("62")) throw new Error("Nomor WA harus diawali 62");

	try {
		await updateDoc(getDocRef("settings", "app_config_v3"), tempSettings);
		return true;
	} catch (err) {
		console.error(err);
		throw new Error("Gagal menyimpan pengaturan.");
	}
};

export const backupData = (products, orders, appSettings) => {
	const dataStr =
		"data:text/json;charset=utf-8," +
		encodeURIComponent(
			JSON.stringify({
				generatedAt: new Date().toISOString(),
				products,
				orders,
				settings: appSettings,
			})
		);
	const node = document.createElement("a");
	node.setAttribute("href", dataStr);
	node.setAttribute("download", "BACKUP_FULL_" + new Date().toISOString().slice(0, 10) + ".json");
	document.body.appendChild(node);
	node.click();
	node.remove();
};
