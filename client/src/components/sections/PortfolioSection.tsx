import { useState } from 'react';
import { motion } from 'framer-motion';

// Define a simple interface for portfolio items
interface PortfolioItem {
  id: number;
  imagePath: string;
}

export default function PortfolioSection() {
  // Portfolio items with actual image paths
  const [portfolioItems] = useState<PortfolioItem[]>([
    { id: 1, imagePath: '/attached_assets/1.jpeg' },
    { id: 2, imagePath: '/attached_assets/3.jpeg' },
    { id: 3, imagePath: '/attached_assets/5.jpeg' },
    { id: 4, imagePath: '/attached_assets/6.jpeg' },
    { id: 5, imagePath: '/attached_assets/10.jpeg' },
    { id: 6, imagePath: '/attached_assets/14.JPG' },
  ]);

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold mb-12 text-center relative">
          portfolio
          <span className="absolute bottom-0 left-0 right-0 mx-auto w-20 h-1 bg-black mt-2"></span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map(item => (
            <motion.div 
              key={item.id}
              className="portfolio-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Display the actual photo with natural aspect ratio */}
              <div className="w-full overflow-hidden">
                <img 
                  src={item.imagePath} 
                  alt={`Portfolio item ${item.id}`}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}