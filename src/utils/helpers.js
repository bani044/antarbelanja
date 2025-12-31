// =================================================================================
// UTILITIES
// =================================================================================

export const generateOrderId = () => {
	const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	let result = "";
	for (let i = 0; i < 5; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return "ORD-" + result;
};

export const formatDateID = (timestamp) => {
	if (!timestamp) return "-";
	return new Date(timestamp).toLocaleDateString("id-ID", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

// FITUR BARU V10: KOMPRESI GAMBAR OTOMATIS
export const compressImage = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (event) => {
			const img = new Image();
			img.src = event.target.result;
			img.onload = () => {
				const canvas = document.createElement("canvas");
				const maxWidth = 800;
				const scaleSize = maxWidth / img.width;
				const finalWidth = img.width > maxWidth ? maxWidth : img.width;
				const finalHeight = img.width > maxWidth ? img.height * scaleSize : img.height;

				canvas.width = finalWidth;
				canvas.height = finalHeight;

				const ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

				const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
				resolve(dataUrl);
			};
			img.onerror = (err) => reject(err);
		};
		reader.onerror = (err) => reject(err);
	});
};
