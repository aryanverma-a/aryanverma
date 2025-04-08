import { motion } from "framer-motion";

export default function AboutSection() {
  const skills = [
    "JavaScript",
    "React",
    "Vue.js",
    "HTML/CSS",
    "Tailwind CSS",
    "TypeScript",
    "UI/UX Design",
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          className="max-w-2xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl font-bold mb-12 relative text-center mx-auto"
            variants={itemVariants}
          >
            about me
            <span className="absolute bottom-0 left-0 right-0 mx-auto w-20 h-1 bg-black mt-2"></span>
          </motion.h2>
          
          <div className="space-y-6 text-lg">
            <motion.p 
              className="leading-relaxed"
              variants={itemVariants}
            >
              I'm a frontend developer with a passion for creating elegant, functional interfaces. 
              With over 5 years of experience, I specialize in building responsive web applications
              that blend aesthetics with usability.
            </motion.p>
            
            <motion.p 
              className="leading-relaxed"
              variants={itemVariants}
            >
              My approach emphasizes clean code, modern frameworks, and thoughtful user experiences.
              I believe in minimalism, where every element serves a purpose.
            </motion.p>
            
            <motion.div 
              className="pt-6"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold mb-4">Skills</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.span 
                    key={index}
                    className="px-4 py-2 bg-gray-100 text-black rounded-sm font-mono text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        delay: index * 0.1,
                        duration: 0.4
                      }
                    }}
                    viewport={{ once: true }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
