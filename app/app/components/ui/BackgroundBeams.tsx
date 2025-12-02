import React from "react";

export const BackgroundBeams: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className="absolute h-full w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent"
                    style={{
                        left: `${20 + i * 20}%`,
                        animationDelay: `${i * 0.5}s`,
                        animation: "beam 8s linear infinite",
                    }}
                />
            ))}
            <style>{`
                @keyframes beam {
                0%, 100% { opacity: 0; transform: translateY(-100%); }
                50% { opacity: 1; transform: translateY(100%); }
                }
            `}</style>
        </div>
    );
};
