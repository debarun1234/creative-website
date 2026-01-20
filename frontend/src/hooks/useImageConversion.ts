import { useAppStore } from '../store/appStore';
import { convertImage } from '../services/conversionService';

export const useImageConversion = () => {
  const {
    selectedImage,
    conversionOptions,
    setConvertedArt,
    setIsConverting,
    setError,
  } = useAppStore();

  const handleConvert = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setIsConverting(true);
    setError(null);
    setConvertedArt(null);

    try {
      const response = await convertImage(selectedImage, conversionOptions);

      if (response.success) {
        setConvertedArt(response.art);
      } else {
        setError(response.error || 'Conversion failed');
      }
    } catch (error) {
      setError('An unexpected error occurred during conversion');
    } finally {
      setIsConverting(false);
    }
  };

  return { handleConvert };
};
