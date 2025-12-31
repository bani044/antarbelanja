import { Download, FileText } from "lucide-react";

const BackupTab = ({ onBackupData }) => {
  return (
    <div className="p-4 text-center">
      <FileText size={48} className="mx-auto text-gray-300 mb-4" />
      <button
        onClick={onBackupData}
        className="bg-gray-800 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 mx-auto w-full max-w-xs shadow-lg"
      >
        <Download size={20} /> Download Backup (.JSON)
      </button>
    </div>
  );
};

export default BackupTab;
