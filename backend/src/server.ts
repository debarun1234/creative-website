import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import { ImageConverter } from './utils/imageConverter';
import { ConversionOptions } from './utils/constants';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 30 * 1024 * 1024 // 30MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Store converted files temporarily with auto-delete
const convertedFiles = new Map<string, { art: string, timestamp: number }>();

// Auto-delete files after 5 minutes
setInterval(() => {
  const now = Date.now();
  const fiveMinutes = 5 * 60 * 1000;
  for (const [id, data] of convertedFiles.entries()) {
    if (now - data.timestamp > fiveMinutes) {
      convertedFiles.delete(id);
      console.log(`Auto-deleted converted file: ${id}`);
    }
  }
}, 60000); // Check every minute

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Backend server is running', api: 'http://localhost:5000/api' });
});

app.get('/api', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'API is running', endpoints: ['/api/health', '/api/convert'] });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.post('/api/convert', upload.single('image'), async (req: Request, res: Response) => {
  try {
    // Validate request
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Parse conversion options
    const options: ConversionOptions = {
      type: (req.body.type || 'ascii') as 'ascii' | 'alphanumeric' | 'binary',
      width: Math.min(Math.max(parseInt(req.body.width) || 80, 20), 200),
      includeSpecial: req.body.includeSpecial === 'true' || req.body.includeSpecial === true,
      includeExtended: req.body.includeExtended === 'true' || req.body.includeExtended === true,
      contrast: Math.min(Math.max(parseFloat(req.body.contrast) || 1, 0.5), 2)
    };

    // Validate options
    if (!['ascii', 'alphanumeric', 'binary'].includes(options.type)) {
      return res.status(400).json({ error: 'Invalid conversion type' });
    }

    // Create converter and process image
    const converter = new ImageConverter();
    await converter.loadImage(req.file.buffer);
    const result = await converter.convert(options);

    // Return result
    res.json({
      success: true,
      data: result,
      options
    });
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`API available at http://localhost:${port}/api`);
});
