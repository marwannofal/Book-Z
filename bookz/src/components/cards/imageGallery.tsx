import Image from "next/image";

const ImageGallery: React.FC = () => {
  const images = [
    { id: 1, src: "/assets/exchangePP.jpg", alt: "Image 1" },
    { id: 2, src: "/assets/exchange2.jpg", alt: "Image 2" },
    { id: 3, src: "/assets/exchangePP.jpg", alt: "Image 3" },
  ];

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-lg mb-16 fade-in opacity-0 transition-opacity duration-600">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Explore Our Platform
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <Image
                src={image.src}
                alt={image.alt}
                layout="responsive"
                width={400}
                height={250}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-semibold">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
