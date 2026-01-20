import { Card, CardBody } from '@heroui/card';
import { motion } from 'framer-motion';

export const HowToUse = () => {
  const steps = [
    {
      number: '1',
      title: 'Upload Your Image',
      description: 'Drag and drop or click to select an image from your device (up to 30MB)',
      emoji: '📤',
      color: 'from-blue-500 to-cyan-500',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="240" height="180" viewBox="0 0 240 180"%3E%3Crect width="240" height="180" fill="%23dbeafe"/%3E%3Crect x="70" y="70" width="100" height="80" rx="10" fill="%233b82f6" opacity="0.3"/%3E%3Cpath d="M 120 55 L 120 110 M 100 90 L 120 70 L 140 90" stroke="%230284c7" stroke-width="6" fill="none" stroke-linecap="round"/%3E%3C/svg%3E'
    },
    {
      number: '2',
      title: 'Choose Conversion Type',
      description: 'Select ASCII, Alphanumeric, or Binary art style',
      emoji: '🎨',
      color: 'from-purple-500 to-pink-500',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="240" height="180" viewBox="0 0 240 180"%3E%3Crect width="240" height="180" fill="%23fae8ff"/%3E%3Crect x="40" y="60" width="50" height="60" rx="8" fill="%239333ea" opacity="0.6"/%3E%3Crect x="95" y="60" width="50" height="60" rx="8" fill="%23c026d3" opacity="0.6"/%3E%3Crect x="150" y="60" width="50" height="60" rx="8" fill="%23db2777" opacity="0.6"/%3E%3C/svg%3E'
    },
    {
      number: '3',
      title: 'Customize Settings',
      description: 'Adjust width, contrast, and color inversion to perfect your art',
      emoji: '⚙️',
      color: 'from-pink-500 to-rose-500',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="240" height="180" viewBox="0 0 240 180"%3E%3Crect width="240" height="180" fill="%23ffe4e6"/%3E%3Crect x="40" y="50" width="160" height="12" rx="6" fill="%23f43f5e" opacity="0.4"/%3E%3Ccircle cx="160" cy="56" r="14" fill="%23f43f5e"/%3E%3Crect x="40" y="84" width="160" height="12" rx="6" fill="%23ec4899" opacity="0.4"/%3E%3Ccircle cx="100" cy="90" r="14" fill="%23ec4899"/%3E%3Crect x="40" y="118" width="160" height="12" rx="6" fill="%23fb7185" opacity="0.4"/%3E%3Ccircle cx="140" cy="124" r="14" fill="%23fb7185"/%3E%3C/svg%3E'
    },
    {
      number: '4',
      title: 'Convert & Download',
      description: 'Click convert and download your masterpiece as a text file',
      emoji: '✨',
      color: 'from-green-500 to-emerald-500',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="240" height="180" viewBox="0 0 240 180"%3E%3Crect width="240" height="180" fill="%23d1fae5"/%3E%3Crect x="90" y="40" width="60" height="60" rx="8" fill="%2310b981" opacity="0.5"/%3E%3Cpath d="M 120 115 L 120 60 M 100 80 L 120 60 L 140 80" stroke="%2310b981" stroke-width="6" fill="none" stroke-linecap="round"/%3E%3Crect x="80" y="125" width="80" height="8" rx="4" fill="%2306d6a0"/%3E%3C/svg%3E'
    },
  ];

  return (
    <section id="how-to-use" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            How to Use
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Transform your images into stunning text art in just four simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-700 overflow-hidden group">
                <CardBody className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Image Section - Fixed for proper SVG rendering */}
                    <div className="relative w-full md:w-2/5 overflow-hidden bg-white dark:bg-gray-900">
                      {/* Subtle gradient backdrop - behind SVG, not over it */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-10`} />
                      
                      {/* SVG Container - proper aspect ratio and centering */}
                      <div className="relative w-full aspect-[4/3] flex items-center justify-center p-4">
                        <img 
                          src={step.image} 
                          alt={step.title}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      
                      {/* Number Badge - Clean minimal design */}
                      <div className={`absolute top-4 left-4 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} shadow-xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                        <span className="text-white font-black text-3xl">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-6 md:p-8">
                      <div className="flex items-start gap-3 mb-4">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Visual Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-white dark:bg-gray-800 px-8 py-4 rounded-full shadow-xl">
            <span className="text-3xl">📤</span>
            <span className="text-2xl text-gray-400">→</span>
            <span className="text-3xl">🎨</span>
            <span className="text-2xl text-gray-400">→</span>
            <span className="text-3xl">⚙️</span>
            <span className="text-2xl text-gray-400">→</span>
            <span className="text-3xl">✨</span>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Quick and Easy • No Sign-up Required • Completely Free
          </p>
        </motion.div>
      </div>
    </section>
  );
};
