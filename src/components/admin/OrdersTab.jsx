import { useMemo } from "react";
import { ADMIN_FEE } from "../../config/constants";
import { formatDateID } from "../../utils/helpers";

const OrdersTab = ({ orders }) => {
  const dailyReport = useMemo(() => {
    const report = {};
    orders.forEach((order) => {
      const dateKey = formatDateID(order.createdAt);
      if (!report[dateKey])
        report[dateKey] = {
          date: dateKey,
          count: 0,
          totalSetoran: 0,
          orderIds: [],
        };
      report[dateKey].count += 1;
      report[dateKey].totalSetoran += order.adminFee || 0;
      report[dateKey].orderIds.push(order.orderId);
    });
    return Object.values(report);
  }, [orders]);

  return (
    <div className="p-4 space-y-4">
      <div className="bg-blue-600 text-white p-4 rounded-xl shadow-lg">
        <h3 className="font-bold text-lg mb-1">Total Setoran</h3>
        <p className="text-2xl font-bold mt-2">
          Rp{" "}
          {orders
            .reduce((acc, curr) => acc + (curr.adminFee || 0), 0)
            .toLocaleString("id-ID")}
        </p>
      </div>
      <h3 className="font-bold text-gray-700">Riwayat Harian</h3>
      {dailyReport.map((day, idx) => (
        <div
          key={idx}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-800 text-sm">{day.date}</span>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">
              Rp {day.totalSetoran.toLocaleString("id-ID")}
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-600 flex justify-between">
            <span>
              {day.count} Transaksi x Rp {ADMIN_FEE}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersTab;
