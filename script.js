// Character sets for different conversion types
const CHARACTER_SETS = {
    ascii: {
        basic: '@%#*+=-:. ',
        special: '@%#*+=-:;^~`\'",.<>?/\\|!()[]{}$&',
        extended: '@%#*+=-:;^~`\'",.<>?/\\|!()[]{}$&@#$%^&*()_+-=[]{}|;:,.<>?'
    },
    alphanumeric: {
        basic: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        special: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?',
        extended: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`\'"'
    },
    binary: {
        basic: '01 ',
        special: '01 ',
        extended: '01 '
    }
};

// Image processing and conversion
class ImageConverter {
    constructor() {
        this.imageData = null;
        this.canvas = null;
        this.ctx = null;
    }

    loadImage(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    this.canvas = document.createElement('canvas');
                    this.ctx = this.canvas.getContext('2d');
                    this.canvas.width = img.width;
                    this.canvas.height = img.height;
                    this.ctx.drawImage(img, 0, 0);
                    this.imageData = this.ctx.getImageData(0, 0, img.width, img.height);
                    resolve(img);
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    getPixelBrightness(data, index) {
        // Convert RGB to grayscale using luminosity method for better accuracy
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        // Standard luminosity coefficients for better detail preservation
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    }

    resizeImage(width, aspect = 2) {
        // Resize canvas to specified width while maintaining aspect ratio
        const height = Math.round(width / aspect);
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = width;
        tempCanvas.height = height;
        
        tempCtx.drawImage(this.canvas, 0, 0, width, height);
        return tempCtx.getImageData(0, 0, width, height);
    }

    applyContrast(imageData, contrast) {
        // Apply contrast to enhance details
        const data = imageData.data;
        const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
        
        for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128));
            data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128));
            data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128));
        }
        
        return imageData;
    }

    getCharsetForBrightness(brightness, charset) {
        // Map brightness (0-1) to character index for accurate representation
        const index = Math.round(brightness * (charset.length - 1));
        return charset[Math.max(0, Math.min(index, charset.length - 1))];
    }

    convertToASCII(width, includeSpecial, includeExtended, contrast) {
        // Select appropriate character set
        let charset;
        if (includeExtended) {
            charset = CHARACTER_SETS.ascii.extended;
        } else if (includeSpecial) {
            charset = CHARACTER_SETS.ascii.special;
        } else {
            charset = CHARACTER_SETS.ascii.basic;
        }

        // Resize and process image
        const resizedData = this.resizeImage(width, 2.5); // Account for character aspect ratio
        let processedData = this.applyContrast(resizedData, contrast - 1);
        const data = processedData.data;
        
        let result = '';
        const imageWidth = width;
        const imageHeight = Math.round(width / 2.5);

        for (let i = 0; i < data.length; i += 4) {
            const brightness = this.getPixelBrightness(data, i);
            // Invert brightness for ASCII (dark pixels get denser characters)
            const char = this.getCharsetForBrightness(1 - brightness, charset);
            result += char;

            // Add newline at end of each row
            if ((i / 4 + 1) % imageWidth === 0) {
                result += '\n';
            }
        }

        return result;
    }

    convertToAlphanumeric(width, includeSpecial, includeExtended, contrast) {
        // Select appropriate character set
        let charset;
        if (includeExtended) {
            charset = CHARACTER_SETS.alphanumeric.extended;
        } else if (includeSpecial) {
            charset = CHARACTER_SETS.alphanumeric.special;
        } else {
            charset = CHARACTER_SETS.alphanumeric.basic;
        }

        // Resize and process image
        const resizedData = this.resizeImage(width, 2.5);
        let processedData = this.applyContrast(resizedData, contrast - 1);
        const data = processedData.data;
        
        let result = '';
        const imageWidth = width;

        for (let i = 0; i < data.length; i += 4) {
            const brightness = this.getPixelBrightness(data, i);
            const char = this.getCharsetForBrightness(1 - brightness, charset);
            result += char;

            // Add newline at end of each row
            if ((i / 4 + 1) % imageWidth === 0) {
                result += '\n';
            }
        }

        return result;
    }

    convertToBinary(width, includeSpecial, includeExtended, contrast) {
        // Binary conversion - use threshold-based approach
        const resizedData = this.resizeImage(width, 2.5);
        let processedData = this.applyContrast(resizedData, contrast - 1);
        const data = processedData.data;
        
        let result = '';
        const imageWidth = width;
        let binaryIndex = 0;

        for (let i = 0; i < data.length; i += 4) {
            const brightness = this.getPixelBrightness(data, i);
            // Use brightness threshold for binary (0.5 is midpoint)
            const char = brightness > 0.5 ? '1' : '0';
            result += char;
            binaryIndex++;

            // Add space every 8 bits for readability (like bytes)
            if (binaryIndex % 8 === 0) {
                result += ' ';
            }

            // Add newline at end of each row
            if ((i / 4 + 1) % imageWidth === 0) {
                result += '\n';
                binaryIndex = 0;
            }
        }

        return result;
    }

    convertImage(type, width, includeSpecial, includeExtended, contrast) {
        try {
            if (type === 'ascii') {
                return this.convertToASCII(width, includeSpecial, includeExtended, contrast);
            } else if (type === 'alphanumeric') {
                return this.convertToAlphanumeric(width, includeSpecial, includeExtended, contrast);
            } else if (type === 'binary') {
                return this.convertToBinary(width, includeSpecial, includeExtended, contrast);
            }
            return '';
        } catch (error) {
            console.error('Conversion error:', error);
            throw error;
        }
    }
}

// UI Controller
class UIController {
    constructor() {
        this.converter = new ImageConverter();
        this.currentImage = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        const imageInput = document.getElementById('imageInput');
        const uploadArea = document.querySelector('.upload-area');
        const convertBtn = document.getElementById('convertBtn');
        const downloadBtn = document.getElementById('downloadBtn');
        const copyBtn = document.getElementById('copyBtn');
        const resolutionSlider = document.getElementById('resolutionSlider');
        const resolutionValue = document.getElementById('resolutionValue');

        // File upload handling
        imageInput.addEventListener('change', (e) => this.handleFileSelect(e));

        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            if (e.dataTransfer.files.length > 0) {
                imageInput.files = e.dataTransfer.files;
                this.handleFileSelect({ target: imageInput });
            }
        });

        // Convert button
        convertBtn.addEventListener('click', () => this.convertImage());

        // Download button
        downloadBtn.addEventListener('click', () => this.downloadArt());

        // Copy button
        copyBtn.addEventListener('click', () => this.copyToClipboard());

        // Resolution slider
        resolutionSlider.addEventListener('input', (e) => {
            resolutionValue.textContent = e.target.value;
        });
    }

    handleFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            this.converter.loadImage(file).then((img) => {
                this.currentImage = img;
                this.previewImage(img);
                document.getElementById('convertBtn').disabled = false;
            }).catch((error) => {
                alert('Error loading image: ' + error.message);
            });
        }
    }

    previewImage(img) {
        const previewCanvas = document.getElementById('imagePreview');
        const ctx = previewCanvas.getContext('2d');
        
        // Calculate dimensions to fit canvas
        const maxWidth = 400;
        const maxHeight = 300;
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
            if (width > maxWidth) {
                height = Math.round(height * maxWidth / width);
                width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                width = Math.round(width * maxHeight / height);
                height = maxHeight;
            }
        }
        
        previewCanvas.width = width;
        previewCanvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        previewCanvas.classList.add('loaded');
    }

    convertImage() {
        if (!this.currentImage) {
            alert('Please load an image first');
            return;
        }

        try {
            const conversionType = document.querySelector('input[name="conversionType"]:checked').value;
            const includeSpecial = document.getElementById('includeSpecial').checked;
            const includeExtended = document.getElementById('includeExtended').checked;
            const width = parseInt(document.getElementById('resolutionSlider').value);
            const contrast = parseFloat(document.getElementById('contrastSlider').value);

            const output = this.converter.convertImage(
                conversionType,
                width,
                includeSpecial,
                includeExtended,
                contrast
            );

            const outputElement = document.getElementById('output');
            outputElement.textContent = output;

            // Enable download and copy buttons
            document.getElementById('downloadBtn').disabled = false;
            document.getElementById('copyBtn').disabled = false;
        } catch (error) {
            alert('Error converting image: ' + error.message);
            console.error(error);
        }
    }

    downloadArt() {
        const output = document.getElementById('output').textContent;
        if (!output) {
            alert('No art to download. Please convert an image first.');
            return;
        }

        const conversionType = document.querySelector('input[name="conversionType"]:checked').value;
        const filename = `art_${conversionType}_${Date.now()}.txt`;
        
        const blob = new Blob([output], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    copyToClipboard() {
        const output = document.getElementById('output').textContent;
        if (!output) {
            alert('No art to copy. Please convert an image first.');
            return;
        }

        navigator.clipboard.writeText(output).then(() => {
            const copyBtn = document.getElementById('copyBtn');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✓ Copied!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        }).catch(() => {
            alert('Failed to copy to clipboard');
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new UIController();
});
