export const prepRequestStatuses = [
  "Submitted",
  "Under Review",
  "Completed",
  "Correction Required",
] as const;

export type PrepRequestStatus = (typeof prepRequestStatuses)[number];

export type PrepRequest = {
  id: string;
  submittedAt: string;
  dateKey: string;
  fileName: string;
  fileSize: string;
  status: PrepRequestStatus;
  correctionNotes?: string[];
};

export const prepRequests: PrepRequest[] = [
  {
    id: "MR-3PL-2025-00123",
    submittedAt: "Oct 24, 2025 · 10:45 AM",
    dateKey: "2025-10",
    fileName: "inventory_prep.csv",
    fileSize: "2.4 MB",
    status: "Submitted",
  },
  {
    id: "MR-3PL-2025-00122",
    submittedAt: "Oct 22, 2025 · 02:12 PM",
    dateKey: "2025-10",
    fileName: "prep_file.tsv",
    fileSize: "1.8 MB",
    status: "Under Review",
  },
  {
    id: "MR-3PL-2025-00120",
    submittedAt: "Oct 18, 2025 · 09:15 AM",
    dateKey: "2025-10",
    fileName: "inventory.tsv",
    fileSize: "3.1 MB",
    status: "Completed",
  },
  {
    id: "MR-3PL-2025-00119",
    submittedAt: "Oct 15, 2025 · 04:20 PM",
    dateKey: "2025-10",
    fileName: "prep_file.csv",
    fileSize: "2.4 MB",
    status: "Correction Required",
    correctionNotes: [
      'Missing value in the "quantity" column for row 12',
      "Invalid SKU format in row 28",
    ],
  },
  {
    id: "MR-3PL-2025-00118",
    submittedAt: "Sep 28, 2025 · 11:35 AM",
    dateKey: "2025-09",
    fileName: "fall_inventory.csv",
    fileSize: "1.2 MB",
    status: "Correction Required",
    correctionNotes: [
      "Several product descriptions are missing",
      "Please verify the SKU values in rows 6 and 14",
    ],
  },
];

export function getPrepRequest(requestId: string) {
  return prepRequests.find((request) => request.id === requestId);
}
