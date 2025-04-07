import { motion } from "framer-motion";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { title, description, imageUrl, technologies, projectUrl } = project;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="project-card bg-white border border-gray-100 rounded-sm overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:shadow-lg"
      variants={cardVariants}
    >
      <div className="aspect-video bg-gray-100 relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, i) => (
            <span key={i} className="text-xxs uppercase tracking-wider bg-gray-100 px-2 py-1 font-mono">
              {tech}
            </span>
          ))}
        </div>
        <a href={projectUrl} className="text-black text-sm font-medium flex items-center">
          View Project <i className="fas fa-arrow-right ml-2 text-xs"></i>
        </a>
      </div>
    </motion.div>
  );
}
