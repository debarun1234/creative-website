import { useCallback, useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/appStore';

export const ImageUploadArea = () => {
  const { selectedImage, setSelectedImage, setImagePreview, setError } = useAppStore();
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      if (file.size > 30 * 1024 * 1024) {
        setError('Image size must be less than 30MB');
        return;
      }

      setSelectedImage(file);
      setError(null);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    },
    [setSelectedImage, setImagePreview, setError]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <CardHeader>
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            📤 Upload Image
          </h3>
        </CardHeader>
        <CardBody>
          <motion.div
            className={`border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
              isDragging
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 scale-105'
                : selectedImage
                ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="space-y-6">
              <motion.div
                className="text-7xl"
                animate={{ rotate: isDragging ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {selectedImage ? '✅' : isDragging ? '📥' : '📁'}
              </motion.div>
              <div>
                <p className="text-2xl font-bold mb-2">
                  {selectedImage ? 'Image Ready!' : 'Drop your image here'}
                </p>
                <p className="text-md text-gray-600 dark:text-gray-400 mb-4">
                  {selectedImage ? selectedImage.name : 'or click to browse'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Supports: JPG, PNG, GIF, WebP • Max size: 30MB
                </p>
              </div>
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
              <Button
                as="label"
                htmlFor="file-upload"
                color="primary"
                size="lg"
                className="cursor-pointer font-bold text-lg px-8 py-6 shadow-lg"
                startContent={<span>🖼️</span>}
              >
                {selectedImage ? 'Change Image' : 'Select Image'}
              </Button>
            </div>
          </motion.div>
        </CardBody>
      </Card>
    </motion.div>
  );
};
