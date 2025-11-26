"use client";

import { BackgroundGradient } from "./ui/background-gradient";
import { motion } from "framer-motion";
import Link from "next/link";

interface GameCardProps {
    title: string;
    description: string;
    href: string;
    delay?: number;
}

export function GameCard({ title, description, href, delay = 0 }: GameCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
        >
            <Link href={href}>
                <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-white dark:bg-zinc-900 hover:scale-105 transition-transform duration-300">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <h3 className="text-2xl font-bold text-black dark:text-white">
                            {title}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            {description}
                        </p>
                    </div>
                </BackgroundGradient>
            </Link>
        </motion.div>
    );
}
