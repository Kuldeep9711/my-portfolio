'use client'

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Moon, Sun, Menu, X } from "lucide-react"



const navItems = [
    { id: 'home', label: 'Home' },
     { id: 'projects', label: 'Projects' },
      { id: 'about', label: 'About' },
       { id: 'contact', label: 'Contact' },
]

interface NavbarProps {
    darkMode: boolean
    toggleDarkMode: () => void
    activeSection: string
}

export default function Navbar({ darkMode, toggleDarkMode, activeSection }: NavbarProps ) {

  const [menuOpen, setMenuOpen] = useState(false)

  //Close menu on resize to desktop
  useEffect(() =>{
    const handleResize = () => {
        if (window.innerWidth >= 768) setMenuOpen(false)
    }
window.addEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)  // close menu after clicking
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
         <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">

         {/* Logo */}
         <motion.div
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         className="text-2xl font-bold text-zinc-900 dark:text-white"
         >
         Kuldeep<span className="text-violet-500">.</span>
         </motion.div>

         {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
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

                {/* Dark mode toggle */}
                <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-zinc-600 dark:text-zinc-300"
              aria-label="Toggle dark mode"
                >
                {darkMode
                ? <Sun size={20} className="text-yellow-400" />
                : <Moon size={20} />
                }
                </button>
            </div>

            {/* Mobile Right - dark toggle + hamburger */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-zinc-600 dark:text-zinc-300"
                aria-label="Toggle dark mode"
              >
               {darkMode
               ? <Sun size={20} className="text-yellow-400" />
               : <Moon size={20} />
               }
              </button>

              <button
               onClick={() => setMenuOpen((prev) => !prev)}
               className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-zinc-700 dark:text-zinc-300"
               aria-label="Toggle menu"
              >
               {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
         </div>

         { /* Mobile Dropdown Menu */}
         <AnimatePresence>
            {menuOpen && (
                <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto'}}
                exit={{ opacity: 1, height: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="md:hidden overflow-hidden bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800"
                >
                 <div className="flex flex-col px-6 py-4 gap-1">
                 {navItems.map((item, index) => (
                    <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left px-4 py-3 rounded-xl font-medium transition-colors duration-200 ${
                        activeSection === item.id
                        ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-500 dark:text-violet-400'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
                        }`}
                    >
                     {item.label}
                    </motion.button>
                 ))}
                 </div>
                </motion.div>
            )}
         </AnimatePresence>
    </nav>
  )
}