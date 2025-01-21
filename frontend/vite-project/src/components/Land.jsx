import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./Lamp"; // Import the LampContainer component
import CarouselDemo from "./Carousel"; // Import the Carousel component
import { useNavigate } from 'react-router-dom';

export const Land = () => {
  const slides = [
    { src: "https://images.pexels.com/photos/7595266/pexels-photo-7595266.jpeg?auto=compress&cs=tinysrgb&w=600", button: "View More", title: "Slide 1" },
    { src: "https://images.pexels.com/photos/5052840/pexels-photo-5052840.jpeg?auto=compress&cs=tinysrgb&w=600", button: "Learn More", title: "Slide 2" },
    { src: "https://images.pexels.com/photos/5052840/pexels-photo-5052840.jpeg?auto=compress&cs=tinysrgb&w=600", button: "Learn More", title: "Slide 2" },
    { src: "https://images.pexels.com/photos/5052840/pexels-photo-5052840.jpeg?auto=compress&cs=tinysrgb&w=600", button: "Learn More", title: "Slide 2" },
  ];

  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-300 to-slate-500 overflow-x-hidden overflow-y-hidden font-sans">
      {/* Section with Lamp animation */}
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="pb-15 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-playfair font-medium tracking-tight text-transparent md:text-7xl"
        >
          <div>
            Discover Inspiring Stories <br />
            Learn Advanced Technologies <br />
            with ByteBlog
          </div>
        </motion.h1>

        {/* Explore Button with Transition */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.2, // Delay for smoother effect after text animation
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-center"
        >
          <button
            className="bg-cyan-500 text-white font-medium py-2 px-6 font-playfair hover:bg-cyan-600 transition duration-200"
            onClick={() => navigate('/home')}
          >
            Explore
          </button>
        </motion.div>
      </LampContainer>

      {/* Footer Section */}
      <footer className="footer bg-base-300 text-base-content p-20 p-10 bg-black">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                ></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path
                  d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                ></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path
                  d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                ></path>
              </svg>
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Land;
