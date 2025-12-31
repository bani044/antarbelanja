import { KeyRound, MessageSquare, Save, Settings } from "lucide-react";

const SettingsTab = ({ tempSettings, setTempSettings, onSaveSettings }) => {
  return (
    <div className="p-4 space-y-6">
      <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
        <Settings /> Pengaturan Aplikasi
      </h3>

      <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-200">
        <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <KeyRound size={16} /> Akses PIN
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 block mb-1">
              PIN Kurir
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg font-mono"
              value={tempSettings.courierPin}
              onChange={(e) =>
                setTempSettings({
                  ...tempSettings,
                  courierPin: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">
              PIN Pusat
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg font-mono"
              value={tempSettings.officePin}
              onChange={(e) =>
                setTempSettings({
                  ...tempSettings,
                  officePin: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-sm border border-green-200">
        <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <MessageSquare size={16} /> Format Pesan WhatsApp
        </h4>
        <div className="mb-4">
          <label className="text-xs text-gray-500 block mb-1 font-bold">
            Nomor WA Tujuan
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg font-mono"
            placeholder="628..."
            value={tempSettings.targetWA}
            onChange={(e) =>
              setTempSettings({
                ...tempSettings,
                targetWA: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-3">
          <label className="text-xs text-gray-500 block mb-1 font-bold">
            1. Kalimat Pembuka (Header)
          </label>
          <textarea
            className="w-full p-2 border rounded-lg h-20 text-sm bg-gray-50"
            value={tempSettings.waHeader}
            onChange={(e) =>
              setTempSettings({
                ...tempSettings,
                waHeader: e.target.value,
              })
            }
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="text-xs text-gray-500 block mb-1 font-bold">
            2. Kalimat Penutup (Footer)
          </label>
          <textarea
            className="w-full p-2 border rounded-lg h-20 text-sm bg-gray-50"
            value={tempSettings.waFooter}
            onChange={(e) =>
              setTempSettings({
                ...tempSettings,
                waFooter: e.target.value,
              })
            }
          ></textarea>
        </div>
      </div>

      <button
        onClick={onSaveSettings}
        className="w-full bg-black text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
      >
        <Save size={18} /> Simpan Semua Pengaturan
      </button>
    </div>
  );
};

export default SettingsTab;
