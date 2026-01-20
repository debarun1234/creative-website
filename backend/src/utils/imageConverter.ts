import sharp from 'sharp';
import { ConversionOptions, getPixelBrightness, getCharset, getCharsetForBrightness } from './constants';

export class ImageConverter {
  private imageBuffer: Buffer | null = null;
  private width: number = 0;
  private height: number = 0;
  private imageData: Uint8ClampedArray | null = null;

  async loadImage(buffer: Buffer): Promise<void> {
    try {
      this.imageBuffer = buffer;
      const metadata = await sharp(buffer).metadata();
      this.width = metadata.width || 0;
      this.height = metadata.height || 0;
    } catch (error) {
      throw new Error('Failed to load image');
    }
  }

  async resizeImage(targetWidth: number, aspectRatio: number = 2.5): Promise<{
    data: Uint8Array;
    width: number;
    height: number;
  }> {
    if (!this.imageBuffer) {
      throw new Error('No image loaded');
    }

    const targetHeight = Math.round(targetWidth / aspectRatio);

    const resizedBuffer = await sharp(this.imageBuffer)
      .resize(targetWidth, targetHeight, {
        fit: 'fill'
      })
      .raw()
      .toBuffer({ resolveWithObject: true });

    return {
      data: resizedBuffer.data,
      width: targetWidth,
      height: targetHeight
    };
  }

  applyContrast(data: Uint8Array, contrast: number): Uint8Array {
    const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
    const processedData = new Uint8Array(data.length);

    for (let i = 0; i < data.length; i += 3) {
      processedData[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128));
      processedData[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128));
      processedData[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128));
    }

    return processedData;
  }

  convertToASCII(
    data: Uint8Array,
    width: number,
    height: number,
    charset: string,
    contrast: number
  ): string {
    const processedData = this.applyContrast(data, contrast - 1);
    let result = '';

    for (let i = 0; i < processedData.length; i += 3) {
      const brightness = getPixelBrightness(
        processedData[i],
        processedData[i + 1],
        processedData[i + 2]
      );
      const char = getCharsetForBrightness(1 - brightness, charset);
      result += char;

      if (((i / 3) + 1) % width === 0) {
        result += '\n';
      }
    }

    return result;
  }

  convertToAlphanumeric(
    data: Uint8Array,
    width: number,
    height: number,
    charset: string,
    contrast: number
  ): string {
    const processedData = this.applyContrast(data, contrast - 1);
    let result = '';

    for (let i = 0; i < processedData.length; i += 3) {
      const brightness = getPixelBrightness(
        processedData[i],
        processedData[i + 1],
        processedData[i + 2]
      );
      const char = getCharsetForBrightness(1 - brightness, charset);
      result += char;

      if (((i / 3) + 1) % width === 0) {
        result += '\n';
      }
    }

    return result;
  }

  convertToBinary(
    data: Uint8Array,
    width: number,
    height: number,
    contrast: number
  ): string {
    const processedData = this.applyContrast(data, contrast - 1);
    let result = '';
    let binaryIndex = 0;

    for (let i = 0; i < processedData.length; i += 3) {
      const brightness = getPixelBrightness(
        processedData[i],
        processedData[i + 1],
        processedData[i + 2]
      );
      const char = brightness > 0.5 ? '1' : '0';
      result += char;
      binaryIndex++;

      if (binaryIndex % 8 === 0) {
        result += ' ';
      }

      if (((i / 3) + 1) % width === 0) {
        result += '\n';
        binaryIndex = 0;
      }
    }

    return result;
  }

  async convert(options: ConversionOptions): Promise<string> {
    if (!this.imageBuffer) {
      throw new Error('No image loaded');
    }

    const resized = await this.resizeImage(options.width, 2.5);
    const charset = getCharset(options.type, options.includeSpecial, options.includeExtended);

    switch (options.type) {
      case 'ascii':
        return this.convertToASCII(resized.data, resized.width, resized.height, charset, options.contrast);
      case 'alphanumeric':
        return this.convertToAlphanumeric(resized.data, resized.width, resized.height, charset, options.contrast);
      case 'binary':
        return this.convertToBinary(resized.data, resized.width, resized.height, options.contrast);
      default:
        throw new Error('Unknown conversion type');
    }
  }
}
