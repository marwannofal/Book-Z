import Image from "next/image";

const MissionSection: React.FC = () => (
  <div className="relative w-full max-w-screen-lg mb-16 fade-in opacity-0 transition-opacity duration-600">
    <div className="absolute inset-0 z-0">
      <Image
        src="/assets/exchangePP.jpg"
        alt="Mission Background"
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
    <div className="relative z-10 text-center py-20 px-6 bg-black bg-opacity-60 rounded-lg">
      <h2 className="text-4xl font-bold text-white mb-4">Our Mission</h2>
      <p className="text-lg text-gray-200 leading-relaxed">
        Our mission is to empower students by providing a platform where they
        can easily exchange books and summaries. We believe that education
        should be accessible to everyone, and our platform is designed to
        support this vision. By connecting students from various departments, we
        aim to create a vibrant community of learners who support each other’s
        academic journeys.
      </p>
    </div>
  </div>
);

export default MissionSection;
