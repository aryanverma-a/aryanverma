import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/types";

export default function WorkSection() {
  // Project data (in a real app, this would likely come from an API)
  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Dashboard",
      description: "A comprehensive analytics dashboard for online retailers",
      imageUrl: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&w=800&h=450&q=80",
      technologies: ["React", "TypeScript", "Tailwind"],
      projectUrl: "#"
    },
    {
      id: 2,
      title: "FinTech Application",
      description: "Mobile banking platform with portfolio management",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=450&q=80",
      technologies: ["Vue.js", "Vuex", "SCSS"],
      projectUrl: "#"
    },
    {
      id: 3,
      title: "Wellness Tracker",
      description: "Health and fitness application with personalized coaching",
      imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&h=450&q=80",
      technologies: ["React Native", "Redux", "Firebase"],
      projectUrl: "#"
    },
    {
      id: 4,
      title: "Productivity Suite",
      description: "Task management and collaboration tools for remote teams",
      imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&h=450&q=80",
      technologies: ["Angular", "Node.js", "MongoDB"],
      projectUrl: "#"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5
      }
    }
  };

  return (
    <section id="work" className="py-20">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl font-bold mb-12 relative text-center mx-auto"
            variants={headerVariants}
          >
            my project.
            <span className="absolute bottom-0 left-0 right-0 mx-auto w-20 h-1 bg-black mt-2"></span>
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
