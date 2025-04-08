import { motion } from "framer-motion";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real application, this would send data to the backend
      await apiRequest("POST", "/api/contact", formData);
      
      toast({
        title: "Message Sent",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <section id="contact" className="py-20 bg-white">
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
            get in Touch.
            <span className="absolute bottom-0 left-0 right-0 mx-auto w-20 h-1 bg-black mt-2"></span>
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div variants={itemVariants}>
              <p className="text-lg mb-6">
                Interested in working together? Feel free to reach out for collaborations or just a friendly hello.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="text-black w-6 text-center">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <a href="mailto:aryanverma9704@gmail.com" className="text-gray-900 hover:text-black transition-colors">
                    aryanverma9704@gmail.com
                  </a>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-black w-6 text-center">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <span className="text-gray-700">India</span>
                </div>
              </div>
              
              <div className="flex space-x-5">
                <a href="https://github.com/aryanverma-a" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black transition-colors" aria-label="GitHub">
                  <i className="fab fa-github text-xl"></i>
                </a>
                <a href="https://www.linkedin.com/in/aryan-verma-867933279?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black transition-colors" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in text-xl"></i>
                </a>
                <a href="https://www.instagram.com/aryanverma_._?igsh=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black transition-colors" aria-label="Instagram">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="https://t.snapchat.com/gNduWSjE" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black transition-colors" aria-label="Snapchat">
                  <i className="fab fa-snapchat-ghost text-xl"></i>
                </a>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-sm px-4 py-3 bg-background focus:ring-0"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-sm px-4 py-3 bg-background focus:ring-0"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4} 
                    className="w-full border border-gray-200 rounded-sm px-4 py-3 bg-background focus:ring-0"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <button 
                    type="submit" 
                    className="w-full px-6 py-3 bg-black text-white font-medium rounded-sm hover:bg-opacity-90 transition-all disabled:opacity-70"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
