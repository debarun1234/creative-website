import { Card, CardBody, CardHeader } from '@heroui/card';
import { Slider } from '@heroui/slider';
import { Radio, RadioGroup } from '@heroui/radio';
import { Switch } from '@heroui/switch';
import { Button } from '@heroui/button';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/appStore';
import { useImageConversion } from '../hooks/useImageConversion';

export const ConversionOptions = () => {
  const { conversionOptions, setConversionOptions, isConverting, selectedImage } =
    useAppStore();
  const { handleConvert } = useImageConversion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="shadow-xl sticky top-6">
        <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ⚙️ Conversion Settings
          </h3>
        </CardHeader>
        <CardBody className="space-y-8 p-6">
        <RadioGroup
          label="Conversion Type"
          value={conversionOptions.type}
          onValueChange={(value) => setConversionOptions({ type: value as any })}
        >
          <Radio value="ascii">ASCII Art</Radio>
          <Radio value="alphanumeric">Alphanumeric</Radio>
          <Radio value="binary">Binary</Radio>
        </RadioGroup>

        <Slider
          label="Width (characters)"
          value={conversionOptions.width}
          onChange={(value) =>
            setConversionOptions({ width: Array.isArray(value) ? value[0] : value })
          }
          minValue={50}
          maxValue={200}
          step={10}
          showTooltip
          className="max-w-full"
        />

        <Slider
          label="Contrast"
          value={conversionOptions.contrast}
          onChange={(value) =>
            setConversionOptions({
              contrast: Array.isArray(value) ? value[0] : value,
            })
          }
          minValue={0.5}
          maxValue={2.0}
          step={0.1}
          showTooltip
          className="max-w-full"
        />

        <Switch
          isSelected={conversionOptions.invertColors}
          onValueChange={(checked) => setConversionOptions({ invertColors: checked })}
        >
          Invert Colors
        </Switch>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            color="primary"
            size="lg"
            className="w-full font-bold text-lg py-7 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onPress={handleConvert}
            isLoading={isConverting}
            isDisabled={!selectedImage || isConverting}
            startContent={!isConverting && <span className="text-2xl">✨</span>}
          >
            {isConverting ? 'Converting Magic...' : 'Convert to Art'}
          </Button>
        </motion.div>
      </CardBody>
    </Card>
    </motion.div>
  );
};
