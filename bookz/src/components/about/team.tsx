import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
}

const TeamSection: React.FC = () => (
  <div className="max-w-screen-lg w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 fade-in opacity-0 transition-opacity duration-600">
    {teamMembers.map((member, index) => (
      <div
        key={index}
        className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center text-center transition-transform transform hover:scale-105"
      >
        <Image
          src={member.image}
          alt={member.name}
          width={150}
          height={150}
          className="rounded-full mb-6"
        />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          {member.name}
        </h2>
        <p className="text-md text-gray-600">{member.role}</p>
        <p className="text-gray-700 mt-4">{member.description}</p>
      </div>
    ))}
  </div>
);

const teamMembers: TeamMember[] = [
  {
    name: "Jane Doe",
    role: "CEO & Founder",
    image: "/assets/team1.jpg",
    description:
      "Jane is the visionary behind our company, leading the team with a focus on innovation and growth.",
  },
  {
    name: "John Smith",
    role: "Chief Technology Officer",
    image: "/assets/team2.jpg",
    description:
      "John drives the technical strategy, ensuring our platform is secure, scalable, and user-friendly.",
  },
  {
    name: "Alice Johnson",
    role: "Lead Designer",
    image: "/assets/team3.jpg",
    description:
      "Alice brings creativity and expertise to our design process, making sure our interface is both beautiful and intuitive.",
  },
];

export default TeamSection;
