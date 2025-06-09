import { useState } from "react";

import Navbar from "./static/Navbar";
import Footer from "./static/Footer";
import Sidebar from "./static/Sidebar";

export default function Layout ({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex">
            <div className="fixed top-0 left-0 z-60">
                <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>

            <div className="flex flex-col min-h-screen flex-1 lg:ml-[290px]">
                <Navbar setIsOpen={setIsOpen} isOpen={isOpen} />
                <main className="flex-grow flex-1 relative">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
}