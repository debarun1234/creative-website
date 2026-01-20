import { Card, CardBody } from '@heroui/card';
import { motion } from 'framer-motion';

export const Features = () => {
  const features = [
    {
      icon: '🚀',
      title: 'Lightning Fast',
      description: 'Convert images in seconds with our optimized processing engine',
    },
    {
      icon: '🎯',
      title: 'High Quality Output',
      description: 'Get crisp, detailed text art that captures your image perfectly',
    },
    {
      icon: '🎨',
      title: 'Multiple Styles',
      description: 'Choose from ASCII, Alphanumeric, or Binary art styles',
    },
    {
      icon: '⚙️',
      title: 'Customizable',
      description: 'Fine-tune width, contrast, and color settings to your liking',
    },
    {
      icon: '💾',
      title: 'Easy Download',
      description: 'Download your art as a text file or copy to clipboard instantly',
    },
    {
      icon: '🔒',
      title: 'Privacy First',
      description: 'Your images are auto-deleted after conversion - complete privacy',
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Works perfectly on desktop, tablet, and mobile devices',
    },
    {
      icon: '🌙',
      title: 'Dark Mode',
      description: 'Beautiful dark theme for comfortable night-time use',
    },
  ];

  return (
    <section id="features" className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to create stunning text art from your images
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardBody className="text-center p-6">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
