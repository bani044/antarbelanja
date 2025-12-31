import { useState } from "react";

export const useCart = () => {
	const [cart, setCart] = useState([]);

	const addToCart = (product) => {
		setCart((prev) => {
			const existing = prev.find((item) => item.id === product.id);
			const thumbnail = product.images && product.images.length > 0 ? product.images[0] : "";
			if (existing) {
				return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
			}
			return [...prev, { ...product, image: thumbnail, qty: 1, note: "" }];
		});
	};

	const updateQty = (id, delta) => {
		setCart((prev) => prev.map((item) => (item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item)).filter((item) => item.qty > 0));
	};

	const updateNote = (id, text) => setCart((prev) => prev.map((item) => (item.id === id ? { ...item, note: text } : item)));

	const clearCart = () => setCart([]);

	const removeFromCart = (id) => setCart(cart.filter((c) => c.id !== id));

	const totalProductPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

	const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

	const totalStores = [...new Set(cart.map((item) => item.store))].length;

	return {
		cart,
		addToCart,
		updateQty,
		updateNote,
		clearCart,
		removeFromCart,
		totalProductPrice,
		totalItems,
		totalStores,
	};
};
