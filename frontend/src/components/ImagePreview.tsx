import { Card, CardBody, CardHeader } from '@heroui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/appStore';

export const ImagePreview = () => {
  const { imagePreview } = useAppStore();

  return (
    <AnimatePresence>
      {imagePreview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="mt-6"
        >
          <Card className="shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
              <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🖼️ Preview
              </h3>
            </CardHeader>
            <CardBody className="p-6">
              <motion.div
                className="flex justify-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full max-h-96 object-contain rounded-xl shadow-xl border-2 border-gray-200 dark:border-gray-700"
                />
              </motion.div>
            </CardBody>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
