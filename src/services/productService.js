import { addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { getCollectionRef, getDocRef } from "../config/firebase";

export const saveProduct = async (formData, editingProduct) => {
	const cleanPrice = String(formData.price).replace(/[^0-9]/g, "");
	const productData = {
		...formData,
		price: parseInt(cleanPrice) || 0,
		updatedAt: Date.now(),
	};

	if (editingProduct) {
		await updateDoc(getDocRef("products", editingProduct.id), productData);
	} else {
		await addDoc(getCollectionRef("products"), {
			...productData,
			createdAt: Date.now(),
		});
	}
};

export const deleteProduct = async (id) => {
	if (window.confirm("Apa kamu yakin hapus produk ini?")) {
		try {
			await deleteDoc(getDocRef("products", id));
		} catch (err) {
			console.error("Delete Error:", err);
			alert("Gagal menghapus: " + err.message);
		}
	}
};
