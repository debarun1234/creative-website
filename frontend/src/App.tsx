import { useState } from 'react';
import { Navbar } from './components/navbar';
import { Hero } from './components/Hero';
import { HowToUse } from './components/HowToUse';
import { Features } from './components/Features';
import { AboutModal } from './components/AboutModal.tsx';
import { PrivacyModal } from './components/PrivacyModal.tsx';
import { TermsModal } from './components/TermsModal.tsx';
import { ImageUploadArea } from './components/ImageUploadArea';
import { ImagePreview } from './components/ImagePreview';
import { ConversionOptions } from './components/ConversionOptions';
import { ArtOutput } from './components/ArtOutput';
import { motion } from 'framer-motion';

function App() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <Navbar onAboutClick={() => setAboutOpen(true)} />
      
      <Hero />
      
      <HowToUse />
      
      <Features />
      
      {/* Converter Section */}
      <section id="converter" className="py-20 px-4 md:px-8">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Start Converting
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Upload your image and create beautiful text art
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column: Upload & Preview */}
            <div className="space-y-6">
              <ImageUploadArea />
              <ImagePreview />
            </div>

            {/* Middle Column: Conversion Options */}
            <div>
              <ConversionOptions />
            </div>

            {/* Right Column: Art Output */}
            <div>
              <ArtOutput />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-12 px-4 bg-gray-100 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <img src="/logo.png" alt="ArtConvert Logo" className="w-8 h-8" />
                <h3 className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ArtConvert
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Transform your images into stunning text art with our powerful converter.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Features</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>✨ Multiple Art Styles</li>
                <li>⚙️ Customizable Settings</li>
                <li>💾 Easy Download</li>
                <li>🔒 Auto-Delete Privacy</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Links</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><button onClick={() => setAboutOpen(true)} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">👨‍💻 About Creator</button></li>
                <li><button onClick={() => setPrivacyOpen(true)} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">🔒 Privacy Policy</button></li>
                <li><button onClick={() => setTermsOpen(true)} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">📜 Terms & Conditions</button></li>
                <li><a href="#converter" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">🎨 Converter</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Made with ❤️ by <button onClick={() => setAboutOpen(true)} className="font-bold text-purple-600 dark:text-purple-400 hover:underline">Debarun Ghosh</button> • Using HeroUI & React
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Your files are automatically deleted after 5 minutes for your privacy • © 2026 ArtConvert
            </p>
          </div>
        </div>
      </motion.footer>

      {/* Modals */}
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <TermsModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />
    </div>
  );
}

export default App;
