import React from "react";

export const HeroHighlight: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-pink-500/20 to-purple-500/20 blur-3xl" />
            {children}
        </div>
    );
};
