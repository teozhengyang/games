import React from "react";

export type NeonBorderProps = {
    children?: React.ReactNode;
    className?: string;
};

export const NeonBorder: React.FC<NeonBorderProps> = ({ children, className = "" }) => {
    return (
        <div className={`relative ${className}`}>
            <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 opacity-80 blur-[6px] animate-flicker" />
            <div className="relative bg-black rounded-xl overflow-hidden border-2 border-cyan-400/50">
                {children}
            </div>
            <style>{`
                @keyframes flicker {
                0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
                20%, 22%, 24%, 55% { opacity: 0.4; }
                }
                .animate-flicker {
                animation: flicker 2s infinite;
                }
            `}</style>
        </div>
    );
};
