import { Button } from '@heroui/button';
import { motion } from 'framer-motion';

export const Hero = () => {
  const scrollToConverter = () => {
    const element = document.getElementById('converter');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8 inline-block rounded-full border-4 border-gray-300 dark:border-gray-700 p-4">
            <img src="/logo.png" alt="ArtConvert Logo" className="w-80 h-50 mx-auto rounded-full" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              ArtConvert
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-4 font-medium">
            Transform Images into Stunning Text Art
          </p>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
            Create beautiful ASCII, Alphanumeric, or Binary art from your images in seconds.
            Professional quality, easy to use, and completely free!
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Button
              size="lg"
              color="primary"
              className="text-xl px-12 py-8 font-bold shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onPress={scrollToConverter}
            >
              Start Converting Now ✨
            </Button>
            <Button
              size="lg"
              variant="bordered"
              className="text-xl px-12 py-8 font-bold border-2"
              onPress={() => {
                const element = document.getElementById('how-to-use');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Learn How 📚
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">30MB</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Max File Size</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">3</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Art Styles</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">∞</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Free Forever</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
