export default function Navbar({ isAdmin, onLoginClick, onLogout }) {
  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b bg-white">
      <h1 className="text-lg font-semibold">System Status</h1>

      <div>
        {isAdmin ? (
          <button
            onClick={onLogout}
            className="text-sm border px-4 py-1 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={onLoginClick}
            className="text-sm border px-4 py-1 rounded hover:bg-gray-100"
          >
            Admin Login
          </button>
        )}
      </div>
    </nav>
  );
}
