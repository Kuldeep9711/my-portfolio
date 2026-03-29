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
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message'),
            }),
          }) ;
             
          if (res.ok) {
            setStatus('success');
            setMessage('Message sent successfully! 🎉');
          }
        } catch (err) {
            setStatus('error');
            setMessage('Network error. Please check your connection.');
        }
    };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
        <div>
         <input
         type="text"
         name="name"
         placeholder="Your Name"
         required
         className="w-full px-6 py-4 bg-zinc-950 border border-zinc-700 rounded-2xl focus:outline-none focus:border-violet-500 transition"
         />
    </div>
    <div>
        <textarea
         name="message"
         rows={6}
         placeholder="Your Message"
         required
         className="w-full px-6 py-4 bg-zinc-950 border border-zinc-700 rounded-2xl focus:outline-none focus:border-violet-500 transition resize-y"
        />
    </div>

    <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    type="submit"
    disabled={status === 'sending'}
    className="w-full py-4 bg-violet-600 hover:bg-violet-700 disabled:bg-zinc-700 rounded-2xl font-medium transition"
    >
       {status === 'sending' ? 'Sending...' : 'Send Message'}
       </motion.button> 

      {message && (
        <p className={`text-center ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
        {message}
        </p>
      )}
    </form>
  );
}
