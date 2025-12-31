import { addDoc } from "firebase/firestore";
import { ADMIN_FEE, PRODUCTION_URL } from "../config/constants";
import { getCollectionRef } from "../config/firebase";
import { generateOrderId } from "../utils/helpers";

export const createOrder = async (cart, totalProductPrice, totalStores, user) => {
	const orderId = generateOrderId();

	if (user) {
		await addDoc(getCollectionRef("orders"), {
			orderId,
			items: cart,
			totalProduct: totalProductPrice,
			storeCount: totalStores,
			createdAt: Date.now(),
			userId: user.uid,
			status: "Baru",
			adminFee: ADMIN_FEE,
		});
	}

	return orderId;
};

export const generateWhatsAppMessage = (cart, totalProductPrice, totalStores, orderId, appSettings) => {
	let message = `${appSettings.waHeader}\n\n`;
	message += `*ID ORDER: ${orderId}*\n`;
	message += `--------------------------------\n`;

	const itemsByStore = cart.reduce((acc, item) => {
		if (!acc[item.store]) acc[item.store] = [];
		acc[item.store].push(item);
		return acc;
	}, {});

	Object.keys(itemsByStore).forEach((store) => {
		message += `🏠 *${store.toUpperCase()}*\n`;
		itemsByStore[store].forEach((item) => {
			message += `• ${item.name} (${item.qty}x)\n`;
			if (item.note) message += `  _Catatan: ${item.note}_\n`;
			message += `   @ Rp ${(item.price * item.qty).toLocaleString("id-ID")}\n`;
		});
		message += `\n`;
	});

	message += `--------------------------------\n`;
	message += `Total Belanja: Rp ${totalProductPrice.toLocaleString("id-ID")}\n`;
	message += `Jumlah Lapak: ${totalStores} Lokasi\n`;
	message += `Ongkir: (Diisi Kurir)\n`;
	message += `--------------------------------\n`;
	message += `${appSettings.waFooter}\n\n`;
	message += `Alamat Pengiriman:\n...`;

	return message;
};

export const sendWhatsAppMessage = (message, targetNumber) => {
	const number = targetNumber || "6285194578200";
	window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank");
};

export const shareApp = async () => {
	const urlToShare = PRODUCTION_URL && PRODUCTION_URL !== "" ? PRODUCTION_URL : window.location.href;
	try {
		if (navigator.share) {
			await navigator.share({ title: "Antar Belanja", url: urlToShare });
		} else {
			await navigator.clipboard.writeText(urlToShare);
			alert(`Link disalin!`);
		}
	} catch (err) {
		console.log(err);
	}
};
