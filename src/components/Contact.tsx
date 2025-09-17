import React from "react";
import {FaGithub} from "react-icons/fa";
import {HiMail, HiPhone, HiLocationMarker} from "react-icons/hi";

const Contact: React.FC = () => {
    return (
        <section id="contacto" className="bg-gray-900 text-white">
            {" "}
            <div className="container mx-auto max-w-2xl text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">Contacto</h2>
                <p className="text-base text-gray-400 mb-12">Si te ha gustado mi trabajo, no dudes en contactarme.</p>
                <div className="flex flex-col items-center space-y-6 md:space-y-8">
                    <div className="flex items-center space-x-4">
                        <HiMail size={28} className="text-gray-400" />
                        <a
                            href="mailto:dcesar664@gmail.com"
                            className="text-lg md:text-xl text-white font-medium hover:text-blue-500 transition-colors duration-200"
                        >
                            dcesar664@gmail.com
                        </a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <HiPhone size={28} className="text-gray-400" />
                        <a
                            href="tel:4171307288"
                            className="text-lg md:text-xl text-white font-medium hover:text-blue-500 transition-colors duration-200"
                        >
                            417 130 7288
                        </a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaGithub size={28} className="text-gray-400" />
                        <a
                            href="https://github.com/Cesaredmyt"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg md:text-xl text-white font-medium hover:text-blue-500 transition-colors duration-200"
                        >
                            Cesaredmyt
                        </a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <HiLocationMarker size={28} className="text-gray-400" />
                        <span className="text-lg md:text-xl text-gray-400 font-medium">Morelia, Michoacán</span>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <div className="w-full text-center mt-24 text-gray-400 text-sm md:text-base">
                <p>© 2025 Cesar Enrique Diaz Maldonado.</p>
            </div>
        </section>
    );
};

export default Contact;
