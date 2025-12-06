import { motion } from "framer-motion";
import { HeroHighlight } from "@/app/components/ui/HeroHighlight";

export function GameHeader() {
    return (
        <div className="text-center mb-8">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-7xl font-black"
            >
                {/* Game Title */}
                <HeroHighlight>
                    <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                        CONNECT 4
                    </span>
                </HeroHighlight>
            </motion.h1>
            {/* Game Subtitle */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 font-light text-base text-cyan-300 tracking-[0.25em] max-w-lg mx-auto"
            >
                DROP DISCS. MAKE LINES.
            </motion.p>
        </div>
    );
}
