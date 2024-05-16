import React from 'react';
import "@/app/globals.css"

const LoadingWave: React.FC = () => {
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500'];
    return (
        <div className={"absolute h-full w-full flex justify-center"}>
            <div className="relative flex justify-around self-center items-center w-1/2 h-full">
                {colors.map((item, index) => (
                    <div
                        key={index}
                        className={"w-5 h-5 rounded "+item}
                        style={{
                            animation: `wave 1.2s infinite ease-in-out ${index * 0.15}s`,
                        }}
                    />
                ))}
            </div>
        </div>

    );
};

export default LoadingWave;

