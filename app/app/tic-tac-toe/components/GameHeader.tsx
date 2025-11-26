import { motion } from "framer-motion";

export function GameHeader() {
    return (
        <div className="text-center mb-8">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
            >
                Tic-Tac-Toe
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 font-normal text-base text-neutral-300 max-w-lg mx-auto"
            >
                Challenge your friends or agent to a game
            </motion.p>
        </div>
    );
}
