import { Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/modal';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal = ({ isOpen, onClose }: TermsModalProps) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="3xl"
      scrollBehavior="inside"
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col items-center gap-2 pb-6 pt-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Terms & Conditions
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Last updated: January 20, 2026</p>
        </ModalHeader>
        
        <ModalBody className="p-8 md:p-12 space-y-6 pb-8">
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <div>
              <p className="text-lg leading-relaxed">
                Welcome to ArtConvert! By using this service, you agree to these terms. Don't worry, we kept the legal jargon to a minimum. ⚖️
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">1. 🎨 Service Usage</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>ArtConvert is a free image-to-text art conversion tool</li>
                <li>You can use it for personal, educational, or commercial purposes</li>
                <li>Maximum file size: 30MB per image</li>
                <li>Supported formats: All standard image formats (JPG, PNG, GIF, WebP, etc.)</li>
                <li>One image at a time (no bulk uploads)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">2. 📸 Content Guidelines</h3>
              <p className="leading-relaxed mb-2">You agree NOT to upload images containing:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Illegal, harmful, or offensive content</li>
                <li>Copyright-protected material you don't have rights to use</li>
                <li>Personal information of others without consent</li>
                <li>Malicious code or harmful software</li>
              </ul>
              <p className="leading-relaxed mt-3 text-sm text-gray-600 dark:text-gray-400">
                Be cool. Don't upload anything you wouldn't show your grandma. 👵
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">3. 🗑️ Data Retention</h3>
              <p className="leading-relaxed">
                All uploaded images and converted art are automatically deleted from our servers after 5 minutes. This is not negotiable—it's baked into the system for your privacy.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">4. 💾 Your Rights to Generated Art</h3>
              <p className="leading-relaxed">
                Any ASCII, Alphanumeric, or Binary art generated from your images belongs to you. Download it, share it, frame it, tattoo it on your arm—we don't care (but pics if you do the tattoo thing). We claim no ownership over your converted art.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">5. ⚠️ Disclaimer</h3>
              <p className="leading-relaxed">
                ArtConvert is provided "as is" without any warranties. We do our best to ensure it works smoothly, but hey, we're human (well, I am). Things might break occasionally. No guarantees, no refunds (it's free anyway).
              </p>
              <p className="leading-relaxed mt-2">
                We are not responsible for any issues arising from the use of this service, including but not limited to: existential crises caused by seeing yourself as ASCII art, data loss, or the sudden urge to become a programmer.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">6. 🚫 Prohibited Uses</h3>
              <p className="leading-relaxed mb-2">You may NOT:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Attempt to reverse engineer, hack, or abuse the service</li>
                <li>Overload the server with excessive requests (be kind to the server!)</li>
                <li>Use automated scripts to mass-convert images without permission</li>
                <li>Resell or redistribute this service as your own</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">7. 🔄 Changes to Terms</h3>
              <p className="leading-relaxed">
                We reserve the right to update these terms at any time. If we do, we'll update the "Last updated" date at the top. Continued use of the service means you accept the new terms.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">8. 📧 Contact & Support</h3>
              <p className="leading-relaxed">
                Questions? Concerns? Just want to chat? Reach out via the About section. I'll do my best to respond when I'm not drowning in code or coffee.
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-500">
              <p className="text-sm leading-relaxed">
                <strong>TL;DR:</strong> Use the service responsibly, don't upload anything sketchy, your data gets auto-deleted in 5 minutes, and the converted art is yours to keep. Be nice, have fun, and create cool art! ✨
              </p>
            </div>

            <div className="text-center pt-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                By using ArtConvert, you acknowledge that you've read and agree to these terms.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Now go forth and create some amazing text art! 🎨🚀
              </p>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
