import React from 'react';
import { Image as LucideImage } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';

// Import images using a more maintainable pattern
const imageImports = Array.from({ length: 20 }, (_, i) => ({
  path: require(`../assets/image-${i + 1}.jpg`),
  id: `img-${i + 1}`
}));

interface ImageContainerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imagePath: StaticImageData) => void;
}

const ImageContainer = ({ isOpen, onClose, onSelectImage }: ImageContainerProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 flex justify-between">
          <LucideImage size={32} color="#0e9d5e" />
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 text-black rounded"
          >
            x
          </button>
        </h2>
        <span className="text-black font-bold">Select design to link</span>

        <div className="grid grid-cols-5 gap-4">
          {imageImports.map(({ path, id }) => (
            <div
              key={id}
              className="cursor-pointer hover:opacity-80 transition-opacity relative w-full pt-[100%]"
              onClick={() => {
                onSelectImage(path);
                onClose();
              }}
            >
              <Image
                src={path}
                alt={`Design ${id}`}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageContainer;