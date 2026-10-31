import DashboardStats from "./_components/DashboardStats";
import DashboardWelcome from "./_components/DashboardWelcome";
import RecentOrders from "./_components/RecentOrders";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardWelcome />
      <DashboardStats />
      <RecentOrders />
    </div>
  );
}
