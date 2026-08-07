export type Severity = "none" | "mild" | "moderate" | "severe" | "critical";

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender?: string;
  medicalRecordNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Scan {
  id: string;
  patientId: string;
  type: string;
  status: "pending" | "processing" | "completed" | "failed";
  fileUrl?: string;
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Upload {
  id: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  status: "queued" | "uploading" | "completed" | "failed";
  progress: number;
  patientId?: string;
  createdAt: string;
}

export interface Heatmap {
  id: string;
  scanId: string;
  data: number[][];
  width: number;
  height: number;
  severity: Severity;
  createdAt: string;
}

export interface Progress {
  current: number;
  total: number;
  percentage: number;
  status: "idle" | "in_progress" | "completed" | "failed";
  message?: string;
}

export interface Dashboard {
  totalPatients: number;
  totalScans: number;
  pendingUploads: number;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }>;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: Pagination;
}
