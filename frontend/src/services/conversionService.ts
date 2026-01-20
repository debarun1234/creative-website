import axios from 'axios';
import { ConversionOptions } from '../store/appStore';

const API_BASE_URL = 'http://localhost:5000/api';

export interface ConversionResponse {
  success: boolean;
  art: string;
  error?: string;
}

export const convertImage = async (
  file: File,
  options: ConversionOptions
): Promise<ConversionResponse> => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', options.type);
    formData.append('width', options.width.toString());
    formData.append('invertColors', options.invertColors.toString());
    formData.append('contrast', options.contrast.toString());

    const response = await axios.post<ConversionResponse>(
      `${API_BASE_URL}/convert`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        art: '',
        error: error.response?.data?.error || 'Failed to convert image',
      };
    }
    return {
      success: false,
      art: '',
      error: 'An unexpected error occurred',
    };
  }
};
