import { create } from 'zustand';

export type ConversionType = 'ascii' | 'alphanumeric' | 'binary';

export interface ConversionOptions {
  type: ConversionType;
  width: number;
  invertColors: boolean;
  contrast: number;
}

export interface AppState {
  selectedImage: File | null;
  imagePreview: string | null;
  conversionOptions: ConversionOptions;
  convertedArt: string | null;
  isConverting: boolean;
  error: string | null;
  setSelectedImage: (file: File | null) => void;
  setImagePreview: (preview: string | null) => void;
  setConversionOptions: (options: Partial<ConversionOptions>) => void;
  setConvertedArt: (art: string | null) => void;
  setIsConverting: (isConverting: boolean) => void;
  setError: (error: string | null) => void;
  resetState: () => void;
}

const defaultOptions: ConversionOptions = {
  type: 'ascii',
  width: 100,
  invertColors: false,
  contrast: 1.0,
};

export const useAppStore = create<AppState>((set) => ({
  selectedImage: null,
  imagePreview: null,
  conversionOptions: defaultOptions,
  convertedArt: null,
  isConverting: false,
  error: null,
  setSelectedImage: (file) => set({ selectedImage: file }),
  setImagePreview: (preview) => set({ imagePreview: preview }),
  setConversionOptions: (options) =>
    set((state) => ({
      conversionOptions: { ...state.conversionOptions, ...options },
    })),
  setConvertedArt: (art) => set({ convertedArt: art }),
  setIsConverting: (isConverting) => set({ isConverting: isConverting }),
  setError: (error) => set({ error: error }),
  resetState: () =>
    set({
      selectedImage: null,
      imagePreview: null,
      conversionOptions: defaultOptions,
      convertedArt: null,
      isConverting: false,
      error: null,
    }),
}));
