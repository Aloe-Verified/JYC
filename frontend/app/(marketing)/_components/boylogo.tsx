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
        <motion.div
          key="default"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0">
          <Image 
            src="/JYC_icon.png"
            alt="Boy taking frantic notes"
            className = "rounded-full shadow-md"
            layout="fill"
            objectFit="contain"
          />
      </motion.div>
      )}

      {/* Waving boy animation on hover */}
      {isHovering && (
        <motion.div
          key="wave"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image 
            src="/JYC_icon_frame2.png" // <-- You'll need to create a second image of the boy gathering his notes and waving
            alt="BoyLogo animation"
            className = "rounded-full shadow-md"
            layout="fill"
            objectFit="contain"
          />
        </motion.div>
      )}
    </div>
  );
}
