// API client for prescription scanner backend

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// TypeScript interfaces for API responses
export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  confidence: number;
}

export interface PrescriptionResponse {
  success: boolean;
  medications: Medication[];
  raw_text: string;
  processing_time: number;
}

export interface HealthResponse {
  message: string;
  status: string;
  model_loaded: boolean;
  device?: string;
  cuda_available?: boolean;
}

export interface ModelLoadResponse {
  success: boolean;
  message: string;
  base_model: string;
  adapter_repo: string;
}

// API functions
export const getHealth = async (): Promise<HealthResponse> => {
  const res = await fetch(`${API_BASE_URL}/health`);
  if (!res.ok) {
    throw new Error('Health check failed');
  }
  return res.json();
};

export const loadModel = async (): Promise<ModelLoadResponse> => {
  const params = new URLSearchParams({
    base_model: 'Qwen/Qwen2.5-VL-7B-Instruct',
    adapter_repo: 'Jahriko/prescription_model',
  });
  const res = await fetch(`${API_BASE_URL}/load-model?${params.toString()}`, {
    method: 'POST',
  });
  if (!res.ok) {
    throw new Error('Model load failed');
  }
  return res.json();
};

export const scanPrescription = async (file: File): Promise<PrescriptionResponse> => {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${API_BASE_URL}/scan`, {
    method: 'POST',
    body: form,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const errorMessage = errorData.detail || `Scan failed with status ${res.status}`;
    throw new Error(errorMessage);
  }
  return res.json();
};

