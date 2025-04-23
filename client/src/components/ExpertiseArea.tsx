import { Cpu, Wifi, Briefcase, GraduationCap } from "lucide-react";

interface ExpertiseAreaProps {
  title: string;
  description: string;
  icon: string;
  borderColor: string;
}

const ExpertiseArea = ({ title, description, icon, borderColor }: ExpertiseAreaProps) => {
  const getIcon = () => {
    switch(icon) {
      case 'cpu':
        return <Cpu className="w-6 h-6" />;
      case 'wifi':
        return <Wifi className="w-6 h-6" />;
      case 'briefcase':
        return <Briefcase className="w-6 h-6" />;
      case 'graduation-cap':
        return <GraduationCap className="w-6 h-6" />;
      default:
        return <Cpu className="w-6 h-6" />;
    }
  };

  return (
    <div className={`service-card bg-neutral-50 rounded-lg p-6 shadow-md transition-all duration-300 border-t-4 ${borderColor} text-center`}>
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
        {getIcon()}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-neutral-600">{description}</p>
    </div>
  );
};

export default ExpertiseArea;
