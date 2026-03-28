import { useState } from "react"


export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle')
    const [message, setMessage] = useState('';)
  return (
    <div>
      
    </div>
  )
}
