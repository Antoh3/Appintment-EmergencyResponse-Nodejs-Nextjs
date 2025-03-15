"use client";
import { motion } from 'framer-motion'
import { FaUser } from 'react-icons/fa';
import Link from 'next/link';

function Header() {
    return (
        <header>
            <div className="header_item">
                <img className="logo" src="/favicon.ico" width={50} height={50} alt="Care pulse Logo" />

                <ul className="header_links" id="header_links">
                    <li>About</li>
                    <li>Contact</li>

                    <motion.li
                        whileTap={{ scale: 0.8 }}
                        style={{ display: "flex", alignItems: "center", gap: "0.5rem" }} 
                    >
                        <Link href={"/auth/login"}>Login</Link><FaUser />
                    </motion.li>
                </ul>
            </div>
        </header>
    )
}

export default Header