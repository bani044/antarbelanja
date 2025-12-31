const LoginModal = ({
  pinInput,
  setPinInput,
  loginError,
  onClose,
  onSubmit,
}) => {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white p-6 rounded-2xl w-full max-w-xs shadow-2xl">
        <h3 className="text-lg font-bold text-center mb-4">Akses Admin</h3>
        <form onSubmit={onSubmit}>
          <input
            type="password"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            placeholder="PIN"
            className="w-full text-center text-lg p-3 border rounded-xl mb-2"
            autoFocus
          />
          {loginError && (
            <p className="text-red-500 text-xs text-center mb-2">
              {loginError}
            </p>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-gray-100 rounded-lg"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-black text-white rounded-lg"
            >
              Masuk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
