'use client'

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import ContactForm from "@/components/ContactForm";
import Navbar from "@/components/Navbar";
import { desc } from "framer-motion/client";


export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // load preference from localstorage on mount
   useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    setDarkMode(isDark);
      document.documentElement.classList.toggle("dark", isDark);
   }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
   
    setDarkMode(newDarkMode);
   document.documentElement.classList.toggle("dark", newDarkMode);

   localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-100px 0px -50% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

 
  const projects = [
    {
      title: "Project One",
      desc:"Expense tracker that helps users visualize monthly spending with category breakdown, CSV export, and budget alerts.",
      tech: ["Next.js", "TypeScript", "Tailwind"],
      link: "https://next-expense-tracker-u7sz.vercel.app",
      github: "https://github.com/Kuldeep9711/Next-expense-tracker",
    },

    {
      title: "Project Two",
      desc:  "Movie website for begginer with only play trailer videos",
      tech: ["Next.js", "TypeScript", "Tailwind"],
      link: "https://watchlist-app-psi.vercel.app/",
      github: "https://github.com/Kuldeep9711/watchlist-app",
    },
    //  Add 3-4 real/improved projects here
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300">

      {/* Navbar */}
         <Navbar
           darkMode={darkMode}
         toggleDarkMode={toggleDarkMode}
         activeSection={activeSection}
         />

      {/* Hero Section with Animation */}
      <section id="home" className="min-h-screen flex items-center pt-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
           <motion.h1
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="text-6xl md:text-7xl font-bold mb-6 text-zinc-900 dark:text-white"
           >
            Hi, I'm Kuldeep Saini 
           </motion.h1>

           <motion.p
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.3 }}
           className="text-2xl text-zinc-500 dark:text-zinc-400 mb-8"
           >
           Fullstack Developer crafting modern web experiences with { '' }
           <span className="text-violet-500 dark:text-violet-400">Next.js</span> &amp; TypeScript 
           </motion.p>

           <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5 }}
           className="flex gap-4 justify-center"
           >
          <a href="#projects" className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-full font-medium transition">
           View My Work 
          </a>
          <a href="#contact" className="px-8 py-3 border border-zinc-700 dark:text-zinc-300 rounded-full font-medium transition">
           Get In Touch 
          </a>
           </motion.div>
      </div>
      </section>

      {/* Project Section with Stagger Animation */}
         <section id="projects" className="py-24 bg-zinc-100 dark:bg-zinc-900 transition-colors duration-300">
          <div className="max-w-6xl max-auto px-6">
               <motion.h2
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               className="text-4xl font-bold mb-12 text-center text-zinc-900 dark:text-white"
               >
                 Featured Projects 
               </motion.h2>

               <div className="grid md:grid-cols-2 gap-6">
                 {projects.map((project, index) => (
                  <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-slate-50 dark:bg-zinc-950 border border-zinc-200 shadow-sm hover:shadow-md"
                  >
                   <h3 className="text-2xl font-semibold mb-3 text-zinc-900 dark:text-white">
                     {project.title}
                   </h3>
                   <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                    {project.desc}
                   </p>
                   <div className="flex flex-wrap gap-2 mb-8">
               {project.tech.map((t) => (
                <span key={t} className="text-xs px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-full">{t}</span>
               ))}
                   </div>
                   <div className="flex gap-4">
                    <a href={project.link} className="text-violet-500 dark:text-violet-400 hover:underline">Live Demo →</a>
                    <a href={project.github} className="flex items-center gap-1 text-zinc-400 hover:text-white">
                      <FaGithub size={18} /> Code 
                    </a>
                   </div>
                  </motion.div>
                 ))}
               </div>
          </div>
         </section>

         {/* About Section */}
         <section id="about" className="py-24 bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-6 text-center">
           <h2 className="text-4xl font-bold mb-8 text-zinc-900 dark:text-white">About Me</h2>
           <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
         I'm a passionate fullstack developer specializing in Next.js, TypeScript, Prisma, and modern backend tools.
         I love turning ideas into clean, scalable web applications. Currently improving my Github projects with unique features.
           </p>
          </div>
         </section>
        
        {/* Contact Section with Working form */}
        <section id="contact" className="py-24 bg-zinc-100 dark:bg-zinc-900 transition-colors duration-300">
          <div className="max-w-2xl mx-auto px-6"> {/* it is good looking */}
           <h2 className="text-4xl font-bold mb-12 text-center text-zinc-900 dark:text-white">Let's Connect</h2>
          <ContactForm />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800 text-center text-zinc-400 dark:text-zinc-500 bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
          <div className="flex justify-center gap-6 mb-4">
             <a href="#" className="hover:text-violet-500 dark:hover:text-violet-400 transition">
               <FaLinkedin size={20} />
             </a>
             <a href="https://github.com/Kuldeep9711" className="hover:text-violet-500 dark:hover:text-violet-400 transition">
              <FaGithub size={20} />
             </a>
             <a href="#" className="hover:text-violet-500 dark:hover:text-violet-400 transition">
              <FaTwitter size={20} /> 
             </a>
          </div>
          <p>© {new Date().getFullYear()} Kuldeep Saini • Built with Next.js + Framer Motion</p>
        </footer>
    </div>
  );
} 
