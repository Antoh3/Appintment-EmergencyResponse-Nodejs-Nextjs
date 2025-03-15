"use client";

import { motion } from "framer-motion";
import Link from "next/link";

function Tagline() {

    return (
        <div className="homepage_tagline">
            <div className="tagline_text">
                <h1>Kenya's first <br /><b>Emergency Response</b></h1>
                <p>Emergency car, just a tap away</p>
                <motion.button whileTap={{ scale: 0.8 }}><Link href={"/auth/register"}>Signup for free!</Link></motion.button>
            </div>
            <div className="tagline_ambulance">
                <motion.img

                    initial={{
                        y: 200,
                    }}

                    transition={{
                        y: { duration: .6 }
                    }}

                    animate={{
                        x: 0,
                        y: 0,
                        scale: 1,
                        rotate: 0,
                    }}
                    src="/homepage_ambulance.webp" alt="Care pulse - kenya's First " />
            </div>
        </div>
    )
}

export default Tagline
