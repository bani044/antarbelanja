import { onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { DEFAULT_SETTINGS } from "../config/constants";
import { getCollectionRef, getDocRef } from "../config/firebase";

export const useFirestore = (user, adminLevel) => {
	const [products, setProducts] = useState([]);
	const [orders, setOrders] = useState([]);
	const [appSettings, setAppSettings] = useState(DEFAULT_SETTINGS);
	const [tempSettings, setTempSettings] = useState(DEFAULT_SETTINGS);
	const [isLoadingData, setIsLoadingData] = useState(true);

	useEffect(() => {
		if (!user) return;

		setIsLoadingData(true);

		// Settings listener
		const settingsDocRef = getDocRef("settings", "app_config_v3");
		const unsubSettings = onSnapshot(settingsDocRef, (docSnap) => {
			if (docSnap.exists()) {
				const data = docSnap.data();
				setAppSettings({ ...DEFAULT_SETTINGS, ...data });
				setTempSettings({ ...DEFAULT_SETTINGS, ...data });
			} else {
				setDoc(settingsDocRef, DEFAULT_SETTINGS).catch((err) => console.log("Init settings err", err));
			}
		});

		// Products listener
		const unsubProd = onSnapshot(getCollectionRef("products"), (snapshot) => {
			const prodList = snapshot.docs.map((doc) => {
				const data = doc.data();
				if (data.image && (!data.images || data.images.length === 0)) {
					data.images = [data.image];
				}
				return { id: doc.id, ...data };
			});
			prodList.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
			setProducts(prodList);
			setIsLoadingData(false);
		});

		// Orders listener (only for admin)
		let unsubOrders = () => {};
		if (adminLevel > 0) {
			unsubOrders = onSnapshot(getCollectionRef("orders"), (snapshot) => {
				const orderList = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				orderList.sort((a, b) => b.createdAt - a.createdAt);
				setOrders(orderList);
			});
		}

		return () => {
			unsubSettings();
			unsubProd();
			unsubOrders();
		};
	}, [user, adminLevel]);

	return {
		products,
		orders,
		appSettings,
		tempSettings,
		setTempSettings,
		isLoadingData,
	};
};
