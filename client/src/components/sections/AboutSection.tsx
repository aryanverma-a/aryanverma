import { motion } from "framer-motion";

export default function AboutSection() {
  const skills = [
    "Python",
    "Java",
    "C/C++",
    "HTML/CSS",
    "JavaScript",
    "ReactJS",
    "Web Design",
    "Web Development",
    "App Development",
    "AI|ML",
    "Programming",
    "Fitness",
    "Photography",
    "Videography",
    "Photoshop",
    "Communication",
    "Problem Solving",
    "DSA",
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
              Greetings! I am Aryan Verma, an 19-year-old student on a transformative academic journey. 
              My scholastic voyage commenced at Don Bosco Academy, Patna, where I successfully completed my 10th grade. 
              Subsequently, I pursued my higher secondary education at St. Michael's High School, Patna, 
              culminating in the successful completion of my 12th grade. Presently, I find myself immersed in the 
              dynamic realm of Computer Science and Engineering as I pursue my undergraduate degree at Vellore 
              Institute of Technology, Vellore.
            </motion.p>
            
            <motion.p 
              className="leading-relaxed"
              variants={itemVariants}
            >
              I'm a versatile person who likes to keep things balanced and enjoys a good laugh. I handle my studies, 
              work, and downtime without going to extremes. I'm a tech enthusiast, loving to dive into the world 
              of computers and coding, especially when I need a break. Outside of the digital realm, I find happiness 
              in exploring new places, cafe hopping, going on hikes, and soaking in the sights.
            </motion.p>
            
            <motion.p 
              className="leading-relaxed"
              variants={itemVariants}
            >
              In a nutshell, I'm just someone who enjoys a mix of everything and finds happiness in the little things in life.
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
