import React from 'react';

// Define tus tecnologías aquí
const technologies = [
  { name: 'Python', icon: '🐍' },
  { name: 'JavaScript', icon: 'JS' },
  { name: 'TypeScript', icon: 'TS' },
  // ... añade el resto de tus tecnologías
];

const TechCard = ({ icon, name }: { icon: string; name: string }) => (
  <div className="flex flex-col items-center justify-center p-4 bg-gray-800/50 backdrop-blur-md border border-white/10 rounded-xl hover:bg-purple-600/30 transition-all cursor-pointer">
    <span className="text-2xl mb-2">{icon}</span>
    <span className="text-[10px] font-bold text-gray-300">{name}</span>
  </div>
);

export const TechGrid = () => {
  return (
    <section className="bg-[#0a0512] text-white py-20 px-4">
      <h2 className="text-center text-4xl font-bold mb-16">TECH STACK</h2>
      
      {/* Grid container: Ajusta el numero de columnas segun el ancho */}
      <div className="max-w-4xl mx-auto grid grid-cols-4 md:grid-cols-8 gap-4 justify-items-center">
        {technologies.map((tech) => (
          <TechCard key={tech.name} name={tech.name} icon={tech.icon} />
        ))}
      </div>
    </section>
  );
};
