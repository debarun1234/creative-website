import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/appStore';
import { useState } from 'react';

export const ArtOutput = () => {
  const { convertedArt, isConverting, error } = useAppStore();
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    if (!convertedArt) return;

    const blob = new Blob([convertedArt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ascii-art.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    if (!convertedArt) return;
    try {
      await navigator.clipboard.writeText(convertedArt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (isConverting) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Card className="shadow-xl">
          <CardBody className="flex items-center justify-center py-20">
            <div className="text-center space-y-6">
              <motion.div
                className="text-6xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                ✨
              </motion.div>
              <motion.p
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Creating Magic...
              </motion.p>
              <p className="text-sm text-gray-500">Processing your image</p>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-3 border-red-500 shadow-xl bg-red-50 dark:bg-red-950/20">
          <CardBody className="text-center py-12">
            <motion.div
              className="text-7xl mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              ⚠️
            </motion.div>
            <p className="text-xl text-red-600 dark:text-red-400 font-bold mb-2">
              Oops! Something went wrong
            </p>
            <p className="text-md text-red-500 dark:text-red-400">{error}</p>
          </CardBody>
        </Card>
      </motion.div>
    );
  }

  if (!convertedArt) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-3 border-dashed border-gray-300 dark:border-gray-700 shadow-lg">
          <CardBody className="text-center py-20">
            <motion.div
              className="text-8xl mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎨
            </motion.div>
            <p className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              Your Art Awaits
            </p>
            <p className="text-md text-gray-500 dark:text-gray-400">
              Upload an image and convert it to see the magic
            </p>
          </CardBody>
        </Card>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-2xl">
          <CardHeader className="flex justify-between items-center bg-gradient-to-r from-green-500/10 to-blue-500/10 border-b border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              ✨ Your Masterpiece
            </h3>
            <div className="flex gap-3">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  size="lg"
                  color="primary"
                  variant="flat"
                  onPress={handleCopy}
                  startContent={<span className="text-xl">{copied ? '✅' : '📋'}</span>}
                  className="font-bold"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  size="lg"
                  color="primary"
                  onPress={handleDownload}
                  startContent={<span className="text-xl">💾</span>}
                  className="font-bold shadow-lg"
                >
                  Download
                </Button>
              </motion.div>
            </div>
          </CardHeader>
          <CardBody className="p-6">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-white p-6 rounded-2xl overflow-auto max-h-[600px] shadow-inner border-2 border-gray-300"
            >
              <pre className="text-black text-[8px] leading-[8px] font-mono whitespace-pre">
                {convertedArt}
              </pre>
            </motion.div>
          </CardBody>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};
