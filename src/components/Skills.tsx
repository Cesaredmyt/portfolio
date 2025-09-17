import React from 'react';
import { 
    FaJava, 
    FaHtml5, 
    FaCss3Alt, 
    FaJs, 
    FaPhp, 
    FaCode 
} from 'react-icons/fa';
import { SiPostgresql, SiMysql, SiSpringboot } from 'react-icons/si';
import { TbBrandNextjs } from 'react-icons/tb';


const Skills: React.FC = () => {
    return (
        <section id="habilidades" className="bg-gray-900 text-white py-5 px-2 md:py-16">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 tracking-tight">
                    Habilidades
                </h2>
                <div className="mb-12">
                    <h3 className="text-center text-xl font-bold mb-6 tracking-wide text-gray-400">Lenguajes de Programación</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 justify-items-center">
                        <div className="flex flex-col items-center justify-center p-4 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl rounded-lg">
                            <FaJava size={48} className="text-gray-300 mb-2 hover:text-white transition-colors duration-200" />
                            <span className="text-sm font-medium text-gray-400">Java</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl rounded-lg">
                            <FaHtml5 size={48} className="text-gray-300 mb-2 hover:text-white transition-colors duration-200" />
                            <span className="text-sm font-medium text-gray-400">HTML</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl rounded-lg">
                            <FaCss3Alt size={48} className="text-gray-300 mb-2 hover:text-white transition-colors duration-200" />
                            <span className="text-sm font-medium text-gray-400">CSS</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl rounded-lg">
                            <FaJs size={48} className="text-gray-300 mb-2 hover:text-white transition-colors duration-200" />
                            <span className="text-sm font-medium text-gray-400">JavaScript</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl rounded-lg">
                            <FaPhp size={48} className="text-gray-300 mb-2 hover:text-white transition-colors duration-200" />
                            <span className="text-sm font-medium text-gray-400">PHP</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl rounded-lg">
                            <FaCode size={48} className="text-gray-300 mb-2 hover:text-white transition-colors duration-200" />
                            <span className="text-sm font-medium text-gray-400">C#</span>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <h3 className="text-center text-xl font-bold mb-6 tracking-wide text-gray-400">Frameworks & Tecnologías</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 justify-items-center">
                        <div className="flex flex-col items-center justify-center p-4 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl rounded-lg">
                            <SiSpringboot size={48} className="text-gray-300 mb-2 hover:text-white transition-colors duration-200" />
                            <span className="text-sm font-medium text-gray-400">SpringBoot</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl rounded-lg">
                            <TbBrandNextjs size={48} className="text-gray-300 mb-2 hover:text-white transition-colors duration-200" />
                            <span className="text-sm font-medium text-gray-400">Next.js</span>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <h3 className="text-center text-xl font-bold mb-6 tracking-wide text-gray-400">Bases de Datos</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 justify-items-center">
                        <div className="flex flex-col items-center justify-center p-4 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl rounded-lg">
                            <SiPostgresql size={48} className="text-gray-300 mb-2 hover:text-white transition-colors duration-200" />
                            <span className="text-sm font-medium text-gray-400">PostgreSQL</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl rounded-lg">
                            <SiMysql size={48} className="text-gray-300 mb-2 hover:text-white transition-colors duration-200" />
                            <span className="text-sm font-medium text-gray-400">MySQL</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;