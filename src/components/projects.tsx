// src/components/Projects.tsx
import React from "react";

const Projects: React.FC = () => {
    return (
        <section id="proyectos" className="bg-gray-900 text-white py-2 px-2 md:py-2">
            {" "}
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 tracking-tight">Proyectos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {/* Proyecto 1 */}
                    <div className="bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                        <figure className="relative aspect-video bg-gray-700 rounded-t-lg">
                            <img
                                src="/img/Projexus.jpg"
                                alt="Imagen del proyecto ProjeXus"
                                className="w-full h-full object-cover rounded-t-lg"
                            />
                        </figure>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">ProjeXus</h3>
                            <p className="text-base text-gray-400 mb-4">
                                Plataforma web para la gestión integral de proyectos académicos y la coordinación de
                                concursos.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">
                                    Next.js
                                </span>
                                <span className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">
                                    SpringBoot
                                </span>
                                <span className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">
                                    PostgreSQL
                                </span>
                            </div>
                            <a
                                href="https://github.com/TonyMed12/ProjeXus"
                                className="inline-block px-5 py-2 mt-4 font-semibold text-gray-300 rounded-lg border border-gray-500 hover:bg-gray-700 transition-colors duration-200"
                            >
                                Ver Proyecto
                            </a>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                        <figure className="relative aspect-video bg-gray-700 rounded-t-lg">
                            <img
                                src="/img/hotel.png"
                                alt="Imagen del proyecto ProjeXus"
                                className="w-full h-full object-cover rounded-t-lg"
                            />
                        </figure>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">Aquamarine Resort</h3>
                            <p className="text-base text-gray-400 mb-4">
                                Diseño y desarrollo de un sitio web para un concepto de hotelería.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">
                                    HTML
                                </span>
                                <span className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">
                                    CSS
                                </span>
                                <span className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">
                                    PHP
                                </span>
                            </div>
                            <br />
                            <a
                                href="https://github.com/Cesaredmyt/Aquamarine-Resort"
                                className="inline-block px-5 py-2 mt-4 font-semibold text-gray-300 rounded-lg border border-gray-500 hover:bg-gray-700 transition-colors duration-200"
                            >
                                Ver Proyecto
                            </a>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                        <figure className="relative aspect-video bg-gray-700 rounded-t-lg">
                            <img
                                src="/public/img/biblioteca.jpg"
                                alt="Imagen del proyecto ProjeXus"
                                className="w-full h-full object-cover rounded-t-lg"
                            />
                        </figure>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">Biblioteca Digital</h3>
                            <p className="text-base text-gray-400 mb-4">
                                Sistema de gestión de bibliotecas para optimizar el inventario y la administración de
                                préstamos. 
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">
                                    Java
                                </span>
                                <span className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">
                                    PHP
                                </span>
                                <span className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">
                                    MySQL
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Projects;
