'use client'

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Moon, Sun } from 'lucide-react'
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import ContactForm from "@/components/ContactForm";


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
   
    setDarkMode(!darkMode);
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

    const section = document.querySelectorAll('section[id]');
    section.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  };

  const porjects = [
    {
      title: "Project One",
      desc: "Fullstack app with Next.js, Prisma, and PostgrsSQL",
      tech: ["Next.js", "TypeScript", "Tailwind"],
      link: "#",
      github: "#",
    },
    // Later add 3-4 real/improved projects here
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300">

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
         <motion.div
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         className="text-2xl font-bold text-zinc-900 dark:text-white"
         >
         Kuldeep<span className="text-violet-500">.</span>
         </motion.div>

         <div className="hidden md:flex items-center gap-8">
         {[
          { id: 'home', label: 'Home' },
           { id: 'projects', label: 'Projects' },
            { id: 'about', label: 'About' },
             { id: 'contact', label: 'Contact' },
         ].map((item) => (
          <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className={`transition hover:text-violet-500 dark:hover:text-violet-400 ${
            activeSection === item.id
            ? 'text-violet-500 dark:text-violet-400 font-medium'
            : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
          {item.label}
          </button>
         ))}

      <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-zinc-600 dark:text-zinc-300"
      >
        {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
      </button>
         </div>
        </div>
      </nav>

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
          <a href="#project" className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-full font-medium transition">
           View My Work 
          </a>
          <a href="#contact" className="px-8 py-3 border border-zinc-700 dark:text-zinc-300 rounded-full font-medium transition">
           Get In Touch 
          </a>
           </motion.div>
      </div>
      </section>

      {/* Project Section with Stagger Animation */}
         <section id="projects" className="py-24 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
          <div className="max-w-6xl max-auto px-6">
               <motion.h2
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               className="text-4xl font-bold mb-12 text-center text-zinc-900 dark:text-white"
               >
                 Featured Projects 
               </motion.h2>

               <div className="grid md:grid-cols-2 gap-6">
                 {porjects.map((project, index) => (
                  <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl group transition-colors duration-300"
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
         <section id="about" className="py-24 bg-white dark:bg-zinc-950 transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-6 text-center">
           <h2 className="text-4xl font-bold mb-8 text-zinc-900 dark:text-white">About Me</h2>
           <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
         I'm a passionate fullstack developer specialization in Next.js, TypeScript, Prisma, and modern backend tools.
         I love turning ideas into clean, scalable web applications. Currently improving my Github projects with unique features.
           </p>
          </div>
         </section>
        
        {/* Contact Section with Working form */}
        <section id="contact" className="py-24 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
          <div className="max-w-2xl mx-auto px-6"> {/* it is good looking */}
           <h2 className="text-4xl font-bold mb-12 text-center text-zinc-900 dark:text-white">Let's Connect</h2>
       <ContactForm />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800 text-center text-zinc-400 dark:text-zinc-500 bg-white dark:bg-zinc-950 transition-colors duration-300">
          <div className="flex justify-center gap-6 mb-4">
             <a href="#" className="hover:text-violet-500 dark:hover:text-violet-400 transition">
               <FaLinkedin size={20} />
             </a>
             <a href="#" className="hover:text-violet-500 dark:hover:text-violet-400 transition">
              <FaGithub size={20} />
             </a>
             <a href="#" className="hover:text-violet-500 dark:hover:text-violet-400 transition">
              <FaTwitter size={20} /> 
             </a>
          </div>
          <p>© 2026 Kuldeep Saini • Built with Next.js + Framer Motion</p>
        </footer>
    </div>
  );
} 
