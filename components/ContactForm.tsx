'use client'

import { useState } from "react"
import { motion } from "framer-motion";

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('sending');

        const formData = new FormData(e.currentTarget);

        try {
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
            },

            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message'),
            }),
          });
             
          if (res.ok) {
            setStatus('success');
            setMessage('Message sent successfully! 🎉');
          } else {
            setStatus('error');
            setMessage('Something went wrong. Please try again.');
          }

        } catch (err) {
            setStatus('error');
            setMessage('Network error. Please check your connection.');
        }
    };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Name */}
        <div>
         <input
         type="text"
         name="name"
         placeholder="Your Name"
         required
         className="w-full px-6 py-4 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 rounded-2xl focus:outline-none focus:border-violet-500 dark:focus:border-violet-500 transition-colors duration-200"
         />
    </div>

    {/*  */}
  <div>
    <input
    type="email"
    name="email"
    placeholder="Your Email"
    required
    className="w-full px-6 py-4 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 rounded-2xl focus:ouline-none focus:border-violet-500 dark:focus:border-violet-500 transition-colors duration-200"
    />

  </div>

  {/* Message */}
    <div>
        <textarea
         name="message"
         rows={6}
         placeholder="Your Message"
         required
         className="w-full px-6 py-4 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 rounded-2xl focus:outline-none focus:border-violet-500 dark:focus:border-violet-500 transition-colors duration-200 resize-y"
        />
    </div>

     {/* Submit Button */}
    <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    type="submit"
    disabled={status === 'sending'}
    className="w-full py-4 bg-violet-600 hover:bg-violet-700 disabled:bg-zinc-300 dark:bg-disabled:text-zinc-700 disabled:text-zinc-500 dark:disabled:text-zinc-400 disabled:cursor-not-allowed text-white rounded-2xl font-medium transition-colors duration-200"
    >
       {status === 'sending' ? 'Sending...' : 'Send Message'}
       </motion.button> 

      {/* Status Message */}
      {message && (
        <p className={`text-center font-medium ${
        status === 'success'
         ? 'text-green-400'
         : 'text-red-400'
         }`}>
        {message}
        </p>
      )}
      
    </form>
  );
}
