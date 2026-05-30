import React from 'react';

// Define tus tecnologías aquí
const technologies = [
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'Prisma', icon: 'prisma' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'Express', icon: 'express' },
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'React', icon: 'react' },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'Docker', icon: 'docker' },
  { name: 'Nest', icon: 'nestjs' },
  { name: 'Astro', icon: 'astro' },
  { name: 'HTML', icon: 'html5' },
  { name: 'CSS', icon: 'css3' },
  { name: 'Tailwind', icon: 'tailwindcss' },
  { name: 'MySQL', icon: 'mysql' },
  { name: 'Redis', icon: 'redis' },
  { name: 'Git', icon: 'git' },
  { name: 'GitHub', icon: 'github' },
  { name: 'Linux', icon: 'linux' },
  { name: 'VS Code', icon: 'vscode' },
  { name: 'Neovim', icon: 'neovim' },
  { name: 'Vercel', icon: 'vercel' },
  { name: 'Railway', icon: 'railway' },
  { name: 'Postman', icon: 'postman' },
  { name: 'Vite', icon: 'vitejs'}
];

const TechCard = ({ icon , name }: { icon: string; name: string }) => (
  <div 
    className="
      w-20 h-20 sm:w-24 sm:h-24 
      flex flex-col items-center justify-center 
      rounded-2xl z-900 
      
      bg-white/5 
      backdrop-blur-xl 
      border border-white/10 
      
      hover:border-[#b697ee]
      shadow-[0_4px_12px_rgba(0,0,0,0.2)]
      transition-all duration-150 ease-in-out
      hover:bg-white/10  hover:scale-110
      cursor-pointer
    "
  >
    <img
      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-original.svg`}
      alt={name}
      className="w-8 h-8 sm:w-10 sm:h-10 mb-2"
    />
    <span className="text-[10px] font-medium text-white/70">
      {name}
    </span>
  </div>
);

export const TechGrid = () => {
  return (
    <section className="bg-[#0a0512] text-white py-20 px-4">
      <h2 className="text-center text-4xl font-bold mb-16">TECH STACK</h2>
      
      {/* Grid container: Ajusta el numero de columnas segun el ancho */}
      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {technologies.map((tech) => (
          <TechCard key={tech.name} name={tech.name} icon={tech.icon} />
        ))}
      </div>
    </section>
  );
};
