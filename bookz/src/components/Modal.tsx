// components/Modal.tsx
import React, { useEffect, useRef } from "react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imgSrc: string;
  alt: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imgSrc, alt }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="relative bg-white p-4 rounded-lg max-w-4xl mx-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-900"
        >
          &times;
        </button>
        <Image
          src={imgSrc}
          onClick={onClose}
          alt={alt}
          layout="responsive"
          width={800}
          height={600}
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default Modal;
