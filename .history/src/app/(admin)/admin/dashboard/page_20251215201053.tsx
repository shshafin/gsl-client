export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard Overview</h1>
      <p className="text-gray-500">Welcome to the GSL Export Admin Panel.</p>

      {/* Placeholder Stats */}
      <div className="grid grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-gray-500 text-sm">Total Products</h3>
          <p className="text-3xl font-bold mt-2">120</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-gray-500 text-sm">Total Messages</h3>
          <p className="text-3xl font-bold mt-2">5</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-gray-500 text-sm">System Status</h3>
          <p className="text-3xl font-bold mt-2 text-green-500">Active</p>
        </div>
      </div>
    </div>
  );
}
