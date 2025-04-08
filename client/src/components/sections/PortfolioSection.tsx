import { useState } from 'react';
import { motion } from 'framer-motion';

// Define a simple interface for portfolio items
interface PortfolioItem {
  id: number;
  title: string;
  category?: string;
}

export default function PortfolioSection() {
  // Sample portfolio items (placeholders for now)
  const [portfolioItems] = useState<PortfolioItem[]>([
    { id: 1, title: 'Project 1', category: 'Design' },
    { id: 2, title: 'Project 2', category: 'Development' },
    { id: 3, title: 'Project 3', category: 'Photography' },
    { id: 4, title: 'Project 4', category: 'Design' },
    { id: 5, title: 'Project 5', category: 'Development' },
    { id: 6, title: 'Project 6', category: 'Photography' },
  ]);

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">Portfolio</h2>
        
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
              {/* Placeholder for photo - this will be a plain box until actual photos are added */}
              <div 
                className="aspect-square w-full mb-4 bg-neutral-100 flex items-center justify-center"
              >
                <p className="text-neutral-400">Photo {item.id}</p>
              </div>
              
              <h3 className="text-xl font-medium">{item.title}</h3>
              {item.category && (
                <p className="text-neutral-600">{item.category}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}