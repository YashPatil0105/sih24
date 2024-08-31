// import React, { useState, useEffect } from 'react';
// import { Wind, Zap, TreeDeciduous, BarChart2 } from 'lucide-react';

// const CarbonParticle = ({ x, y }) => (
//   <div 
//     className="absolute w-2 h-2 bg-gray-500 rounded-full opacity-50 transition-all duration-1000"
//     style={{ left: `${x}%`, top: `${y}%` }}
//   />
// );

// export const LandingPage = () => {
//   const [particles, setParticles] = useState([]);
//   const [reducedParticles, setReducedParticles] = useState(0);

//   useEffect(() => {
//     const initialParticles = Array.from({ length: 50 }, () => ({
//       x: Math.random() * 100,
//       y: Math.random() * 100,
//     }));
//     setParticles(initialParticles);
//   }, []);

//   const handleReduceCarbon = () => {
//     const remainingParticles = Math.max(0, particles.length - 10);
//     setParticles(particles.slice(0, remainingParticles));
//     setReducedParticles(prev => prev + 10);
//   };

//   const FeatureCard = ({ icon: Icon, title, description }) => (
//     <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
//       <Icon className="w-12 h-12 text-blue-500 mb-4" />
//       <h3 className="text-xl font-semibold mb-2">{title}</h3>
//       <p className="text-gray-600">{description}</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden">
//       {particles.map((particle, index) => (
//         <CarbonParticle key={index} x={particle.x} y={particle.y} />
//       ))}
      
//       <div className="container mx-auto px-4 py-12">
//         <header className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-800 mb-4">
//             Carbon Neutrality Simulator
//           </h1>
//           <p className="text-xl text-gray-600 mb-8">
//             Empower your coal mine's journey to sustainability
//           </p>
//           <button
//             onClick={handleReduceCarbon}
//             className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
//           >
//             Reduce Carbon Emissions
//           </button>
//           <p className="mt-4 text-lg font-semibold text-green-600">
//             Carbon Reduced: {reducedParticles} units
//           </p>
//         </header>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//           <FeatureCard
//             icon={BarChart2}
//             title="Emission Estimation"
//             description="Calculate and track your mine's carbon footprint with precision."
//           />
//           <FeatureCard
//             icon={Wind}
//             title="Carbon Neutrality Pathways"
//             description="Simulate strategies to achieve carbon neutrality effectively."
//           />
//           <FeatureCard
//             icon={Zap}
//             title="Clean Technologies"
//             description="Explore the impact of adopting innovative clean technologies."
//           />
//           <FeatureCard
//             icon={TreeDeciduous}
//             title="Afforestation Offsets"
//             description="Estimate the land required for tree plantations to offset emissions."
//           />
//         </div>

//         <div className="text-center">
//           <a
//             href="/carbonNeutralitySimulator"
//             className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
//           >
//             Launch Simulator
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';
import { Wind, Zap, TreeDeciduous, BarChart2, ChevronDown, ChevronUp } from 'lucide-react';
import{Map}from './Map';

const CarbonParticle = ({ x, y }) => (
  <div 
    className="absolute w-2 h-2 bg-gray-500 rounded-full opacity-50 transition-all duration-1000"
    style={{ left: `${x}%`, top: `${y}%` }}
  />
);

export const Home = () => {
  const [particles, setParticles] = useState([]);
  const [reducedParticles, setReducedParticles] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState(null);

  useEffect(() => {
    const initialParticles = Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(initialParticles);
  }, []);

  const handleReduceCarbon = () => {
    const remainingParticles = Math.max(0, particles.length - 10);
    setParticles(particles.slice(0, remainingParticles));
    setReducedParticles(prev => prev + 10);
  };

  const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
      <Icon className="w-12 h-12 text-blue-500 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  const Testimonial = ({ quote, author, company }) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <p className="text-gray-600 italic mb-4">"{quote}"</p>
      <p className="font-semibold">{author}</p>
      <p className="text-sm text-gray-500">{company}</p>
    </div>
  );

  const TimelineEvent = ({ year, event }) => (
    <div className="flex items-center mb-8">
      <div className="w-24 text-right mr-4">
        <span className="font-bold text-blue-500">{year}</span>
      </div>
      <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
      <div className="flex-1 bg-white rounded-lg shadow-md p-4">
        <p>{event}</p>
      </div>
    </div>
  );

  const AccordionItem = ({ title, content, isActive, onToggle }) => (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 px-6 text-left"
        onClick={onToggle}
      >
        <span className="font-semibold">{title}</span>
        {isActive ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isActive && <div className="py-4 px-6 bg-gray-50">{content}</div>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden">
      {particles.map((particle, index) => (
        <CarbonParticle key={index} x={particle.x} y={particle.y} />
      ))}
      
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Carbon Neutrality Simulator
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Empower your coal mine's journey to sustainability
          </p>
          <button
            onClick={handleReduceCarbon}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Reduce Carbon Emissions
          </button>
          <p className="mt-4 text-lg font-semibold text-green-600">
            Carbon Reduced: {reducedParticles} units
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          <FeatureCard
            icon={BarChart2}
            title="Emission Estimation"
            description="Calculate and track your mine's carbon footprint with precision."
          />
          <FeatureCard
            icon={Wind}
            title="Carbon Neutrality Pathways"
            description="Simulate strategies to achieve carbon neutrality effectively."
          />
          <FeatureCard
            icon={Zap}
            title="Clean Technologies"
            description="Explore the impact of adopting innovative clean technologies."
          />
          <FeatureCard
            icon={TreeDeciduous}
            title="Afforestation Offsets"
            description="Estimate the land required for tree plantations to offset emissions."
          />
        </div>

        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Testimonial
              quote="This simulator has been instrumental in our journey towards carbon neutrality. It's user-friendly and provides actionable insights."
              author="John Doe"
              company="EcoMine Industries"
            />
            <Testimonial
              quote="The carbon credit estimation feature alone has saved us thousands. It's an essential tool for any forward-thinking mining operation."
              author="Jane Smith"
              company="GreenDig Mining Co."
            />
          </div>
        </section>
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Map</h2>
          <div className="max-w-2xl mx-auto">
           <Map/>
          </div>
        </section>
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Carbon Reduction Timeline</h2>
          <div className="max-w-2xl mx-auto">
            <TimelineEvent year="2025" event="Implement clean technologies, reducing emissions by 20%" />
            <TimelineEvent year="2030" event="Achieve 50% carbon neutrality through combined strategies" />
            <TimelineEvent year="2035" event="Expand afforestation efforts, offsetting 75% of remaining emissions" />
            <TimelineEvent year="2040" event="Reach carbon neutrality goal" />
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md">
            <AccordionItem
              title="How accurate is the emission estimation?"
              content="Our emission estimation is based on the latest research and industry standards, providing accuracy within 5% of actual emissions."
              isActive={activeAccordion === 0}
              onToggle={() => setActiveAccordion(activeAccordion === 0 ? null : 0)}
            />
            <AccordionItem
              title="Can the simulator handle different types of coal mines?"
              content="Yes, our simulator is designed to be scalable and can accommodate various types of coal mines, including open-cast and underground operations."
              isActive={activeAccordion === 1}
              onToggle={() => setActiveAccordion(activeAccordion === 1 ? null : 1)}
            />
            <AccordionItem
              title="How often is the carbon credit market data updated?"
              content="We update our carbon credit market data daily to ensure you have the most current information for your estimations."
              isActive={activeAccordion === 2}
              onToggle={() => setActiveAccordion(activeAccordion === 2 ? null : 2)}
            />
          </div>
        </section>

        <div className="text-center">
          <a
            href="/carbonNeutralitySimulator"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Launch Simulator
          </a>
        </div>
      </div>
    </div>
  );
};

// export default LandingPage;