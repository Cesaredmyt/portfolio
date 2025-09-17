// src/components/Header.tsx
import React from "react";
import {FaGithub, FaLinkedin} from "react-icons/fa";

const Header: React.FC = () => {
    return (
        <header className="bg-gray-900 text-white py-10 px-4 md:py-12 md:px-8">
            <div className="container mx-auto max-w-4xl text-left">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-1 tracking-tight">
                    Cesar Enrique Diaz Maldonado
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 font-light mb-2">
                    Estudiante de Ingeniería en Sistemas
                </p>
                <p className="text-base text-gray-500 font-light mb-8">
                    Instituto Tecnológico de Morelia
                </p>
                <p className="text-base text-gray-300 max-w-3xl mb-12">
                    Me apasiona el desarrollo de software, con un enfoque en backend y bases de datos, y estoy
                    en un proceso de aprendizaje constante. En este portafolio, comparto mis proyectos más relevantes
                    para demostrar cómo aplico las tecnologías que domino en la construcción de soluciones.
                </p>
                <div className="flex space-x-4">
                    <a
                        href="https://github.com/Cesaredmyt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 font-semibold text-blue-400 rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2"
                    >
                        <FaGithub size={20}/>
                        <span>GitHub</span>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/cesar-enrique-diaz-maldonado-3748672a8/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 font-semibold text-blue-400 rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2"
                    >
                        <FaLinkedin size={20}/>
                        <span>LinkedIn</span>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;