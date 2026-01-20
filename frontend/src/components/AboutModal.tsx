import { Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/modal';
import { Button } from '@heroui/button';
import { Link } from '@heroui/link';
import { motion } from 'framer-motion';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal = ({ isOpen, onClose }: AboutModalProps) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="3xl"
      scrollBehavior="inside"
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col items-center gap-4 pb-8 pt-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
          <motion.div
            className="text-8xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            👋
          </motion.div>
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Hey There, Art Lover!
          </h2>
        </ModalHeader>
        
        <ModalBody className="p-8 md:p-12 space-y-6">
          <div className="text-center space-y-4">
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Welcome to <span className="font-bold text-purple-600 dark:text-purple-400">ArtConvert</span>! 🎨
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Ever wondered what your selfie would look like as ASCII art? Or maybe you just want to impress your friends with binary representations of your cat? Well, you've come to the right place! 
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              This little corner of the internet was crafted with ☕ and a dash of creativity by yours truly. No ads, no nonsense—just pure image-to-text magic. Because sometimes, the best things in life are free (and a little nerdy).
            </p>
          </div>

          <div className="border-t-2 border-gray-200 dark:border-gray-700 my-8" />

          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <div className="text-6xl">🧑‍💻</div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Debarun Ghosh
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Creator & Developer
                </p>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 italic max-w-2xl mx-auto">
              "I build things on the internet and sometimes they actually work. This is one of those times!" 😄
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="https://www.linkedin.com/in/debarunghosh2024/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    color="primary"
                    variant="flat"
                    size="lg"
                    className="font-bold"
                    startContent={
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    }
                  >
                    LinkedIn
                  </Button>
                </a>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="https://www.instagram.com/deb_canon80d/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    color="secondary"
                    variant="flat"
                    size="lg"
                    className="font-bold"
                    startContent={
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    }
                  >
                    Instagram
                  </Button>
                </a>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="https://debarunghosh.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    color="success"
                    variant="flat"
                    size="lg"
                    className="font-bold"
                    startContent={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    }
                  >
                    Who Am I?
                  </Button>
                </a>
              </motion.div>
            </div>
          </div>

          <div className="border-t-2 border-gray-200 dark:border-gray-700 my-8" />

          <div className="text-center space-y-3 pb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              💡 <span className="font-semibold">Pro Tip:</span> If you like what you see, feel free to connect! Always happy to chat about code, photography, or why pizza is technically a vegetable. 🍕
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Found a bug? Have a feature idea? Drop me a message—I promise I don't bite (unless you're a syntax error).
            </p>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
