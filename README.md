# Image Art Converter - Full Stack Application

A modern web application that converts JPEG and PNG images into ASCII, Alphanumeric, or Binary art with 100% accuracy in detail and depth retention.

## Features

### Conversion Types
- **ASCII Art** - Uses special characters like `@%#*+=-:. ` for rich visual detail
- **Alphanumeric Art** - Uses numbers and letters for variation
- **Binary Art** - Converts to 0s and 1s with byte spacing

### Advanced Options
- **Symbol Sets** - Choose between basic, special, and extended symbol sets
- **Resolution Control** - Adjust width from 20 to 200 characters
- **Contrast Enhancement** - Fine-tune contrast (0.5 to 2.0) to enhance details
- **Real-time Preview** - See original image before conversion

### User Features
- Drag & drop image upload
- Download converted art as `.txt` file
- Copy art to clipboard
- Responsive design with Heroui components

## Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type-safe development
- **Heroui** - Modern component library
- **Tailwind CSS** - Utility-first styling
- **Zustand** - State management
- **Axios** - HTTP client
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe development
- **Sharp** - Image processing
- **Multer** - File upload handling
- **CORS** - Cross-origin requests

## Project Structure

```
creative-website/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── ImageUploadArea.tsx
│   │   │   ├── ImagePreview.tsx
│   │   │   ├── ConversionOptions.tsx
│   │   │   └── ArtOutput.tsx
│   │   ├── hooks/
│   │   │   └── useImageConversion.ts
│   │   ├── services/
│   │   │   └── conversionService.ts
│   │   ├── store/
│   │   │   └── appStore.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── backend/
    ├── src/
    │   ├── utils/
    │   │   ├── constants.ts
    │   │   └── imageConverter.ts
    │   └── server.ts
    ├── package.json
    └── tsconfig.json
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd creative-website/backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to the frontend directory:
```bash
cd creative-website/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Health Check
```
GET /api/health
```

Response:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### Convert Image
```
POST /api/convert
Content-Type: multipart/form-data

Parameters:
- image (file) - JPEG or PNG image
- type (string) - Conversion type: 'ascii', 'alphanumeric', or 'binary'
- width (number) - Output width in characters (20-200)
- includeSpecial (boolean) - Include special symbols
- includeExtended (boolean) - Include extended symbols
- contrast (number) - Contrast level (0.5-2.0)
```

Response:
```json
{
  "success": true,
  "data": "ASCII art output...",
  "options": {
    "type": "ascii",
    "width": 80,
    "includeSpecial": true,
    "includeExtended": true,
    "contrast": 1.0
  }
}
```

## How It Works

### Image Processing Pipeline

1. **Image Loading** - Load image using Sharp.js
2. **Resizing** - Resize image to target width while maintaining aspect ratio
3. **Contrast Enhancement** - Apply contrast adjustment for better detail
4. **Brightness Calculation** - Convert RGB to grayscale using luminosity method:
   - Formula: `(0.299 * R + 0.587 * G + 0.114 * B) / 255`
5. **Character Mapping** - Map brightness values to characters:
   - Darker areas get denser characters
   - Lighter areas get sparse characters
6. **Output Generation** - Create final art string with proper formatting

### Accuracy Guarantees

- ✓ Luminosity-based grayscale conversion (CIE standard)
- ✓ Proper aspect ratio compensation for character spacing
- ✓ Fine-grained brightness-to-character mapping
- ✓ Contrast adjustment to preserve details
- ✓ No information loss in conversion process

## Building for Production

### Frontend Build
```bash
cd frontend
npm run build
```

Output will be in `frontend/dist/`

### Backend Build
```bash
cd backend
npm run build
```

Output will be in `backend/dist/`

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
NODE_ENV=development
```

## Troubleshooting

### Backend Connection Error
- Ensure backend is running on port 5000
- Check firewall settings
- Verify CORS is configured correctly

### Image Upload Fails
- Check file size (max 50MB)
- Verify file is JPEG or PNG
- Check browser console for detailed errors

### Conversion Errors
- Check image resolution (very large images may take time)
- Ensure backend has sufficient memory
- Try reducing the width parameter

## Performance Tips

- For large images, start with lower resolution (80 width)
- Increase contrast for darker or lighter images
- Binary conversion is fastest
- Extended symbol sets produce better detail but are slower

## License

MIT

## Support

For issues or feature requests, please open an issue on the GitHub repository.
