import React, { useState, useEffect } from 'react';

export const Loader = () => {
  const [visibleChars, setVisibleChars] = useState(0);
  const text = "GreenMines";

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleChars((prev) => (prev < text.length ? prev + 1 : 0));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="text-6xl font-bold">
        {text.split('').map((char, index) => (
          <span
            key={index}
            className={`inline-block transition-all duration-200 ${
              index < visibleChars
                ? 'opacity-100 transform scale-110'
                : 'opacity-0 transform scale-90'
            } ${index < 5 ? 'text-green-400' : 'text-yellow-600'}`}
            style={{
              animationName: index < visibleChars ? 'pulse' : 'none',
              animationDuration: '1s',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
            }}
          >
            {char}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

// export default Loader;