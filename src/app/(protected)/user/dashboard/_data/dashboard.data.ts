export const dashboardUser = {
  name: "Sarah Johnson",
  email: "sarah@example.com",
  customerType: "Retail Customer",
};

export const dashboardStats = [
  { label: "Total Orders", value: 26 },
  { label: "Active Orders", value: 2 },
];

export const recentOrders = [
  {
    id: "MR-1024",
    date: "Oct 18, 2026",
    itemCount: 3,
    total: 189.99,
    status: "Shipped",
  },
  {
    id: "MR-1021",
    date: "Oct 12, 2026",
    itemCount: 1,
    total: 79.99,
    status: "Delivered",
  },
  {
    id: "MR-1018",
    date: "Oct 5, 2026",
    itemCount: 2,
    total: 149.98,
    status: "Processing",
  },
] as const;
