// "use client"

// export const Icon = () => {
//     return (
//         <img 
//             src="/JYC_icon_frame2.png" 
//             alt="Boy Taking Notes" 
//             className="w-48 h-48 mx-auto mb-6 rounded-full shadow-md"
//           />

//     );
// }

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function BoyLogo() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div 
      className="w-48 h-48 mx-auto mb-6 relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Default frantic note-taking boy */}
      {!isHovering && (
        <Image 
          src="/JYC_icon.png"
          alt="Boy taking frantic notes"
          className = "rounded-full shadow-md"
          layout="fill"
          objectFit="contain"
        />
      )}

      {/* Waving boy animation on hover */}
      {isHovering && (
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 20, -20, 20, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
          className="w-full h-full"
        >
          <Image 
            src="/JYC_icon_frame2.png" // <-- You'll need to create a second image of the boy gathering his notes and waving
            alt="Boy waving"
            className = "rounded-full shadow-md"
            layout="fill"
            objectFit="contain"
          />
        </motion.div>
      )}
    </div>
  );
}
