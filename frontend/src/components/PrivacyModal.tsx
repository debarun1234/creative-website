import { Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/modal';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal = ({ isOpen, onClose }: PrivacyModalProps) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="3xl"
      scrollBehavior="inside"
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col items-center gap-2 pb-6 pt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Privacy Policy
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Last updated: January 20, 2026</p>
        </ModalHeader>
        
        <ModalBody className="p-8 md:p-12 space-y-6 pb-8">
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">🔒 Your Privacy Matters</h3>
              <p className="leading-relaxed">
                At ArtConvert, we take your privacy seriously. Actually, we take it SO seriously that we don't even want your data. No tracking, no storing, no funny business.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">📸 Image Processing</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your images are processed entirely on our server for conversion</li>
                <li>Images are stored temporarily in memory during processing</li>
                <li><strong>Auto-deletion:</strong> All converted files are automatically deleted after 5 minutes</li>
                <li>We do not save, store, or analyze your images in any way</li>
                <li>No image metadata is collected or retained</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">🍪 Cookies & Tracking</h3>
              <p className="leading-relaxed">
                We don't use cookies (unless you count the chocolate chip ones we eat while coding). No analytics, no tracking scripts, no third-party advertisers. Your browsing is completely private.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">📊 Data Collection</h3>
              <p className="leading-relaxed">
                <strong>What we collect:</strong> Absolutely nothing. Nada. Zilch. Zero.
              </p>
              <p className="leading-relaxed mt-2">
                We don't collect emails, names, IP addresses, or any personal information. This is a free tool for everyone to use anonymously.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">🔐 Data Security</h3>
              <p className="leading-relaxed">
                All data transmission happens over HTTPS. Your images are processed server-side and immediately discarded. We implement industry-standard security practices to ensure your uploaded images are handled safely during the brief processing period.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">🌍 Third-Party Services</h3>
              <p className="leading-relaxed">
                We don't integrate with any third-party services, analytics platforms, or advertising networks. What happens in ArtConvert, stays in ArtConvert.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">📧 Contact</h3>
              <p className="leading-relaxed">
                Have questions about privacy? Concerned about how your data is handled? Feel free to reach out via the contact information in the About section.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm leading-relaxed">
                <strong>TL;DR:</strong> Your images are converted and deleted within 5 minutes. We don't track you, we don't store your data, and we don't sell anything. It's just a fun, free tool. Enjoy! 🎨
              </p>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
