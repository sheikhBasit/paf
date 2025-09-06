"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";


const NEWS_API =
  "https://gnews.io/api/v4/search?q=sports&country=pk&lang=en&max=6&apikey=f65e1a6fe6d5334e06c4734662e51c9c";

// Sports data
const sports = [
  {
    title: "Athletics",
    gender: "Men & Women",
    img: "/hurdle.jpg",
    desc: "Athletics covers a wide range of track and field events including sprints, middle and long-distance running, hurdles, high jump, long jump, and throwing disciplines like javelin and discus. It forms the foundation of competitive sports, focusing on speed, endurance, strength, and agility."
  },
  {
    title: "Swimming",
    gender: "Men & Women",
    img: "/swimming.jpg",
    desc: "Swimming competitions include freestyle, butterfly, breaststroke, and backstroke events across various distances. It develops cardiovascular strength, endurance, and body coordination while preparing athletes for both national and international championships."
  },
  {
    title: "Football",
    gender: "Men & Women",
    img: "/football.jpg",
    desc: "Football, the world's most popular team sport, is played by 11 players on each side. The game emphasizes teamwork, tactical awareness, passing, and shooting skills, with leagues and tournaments fostering strong competitive spirit and unity."
  },
  {
    title: "Hockey",
    gender: "Men & Women",
    img: "/hockey.jpg",
    desc: "Hockey is Pakistan's national sport and a symbol of its sporting legacy. The game requires stamina, stick-handling, sharp reflexes, and teamwork, with national and international competitions serving as a stage for athletic pride."
  },
  {
    title: "Basketball",
    gender: "Men & Women",
    img: "/basketball.jpg",
    desc: "Basketball is a fast-paced indoor and outdoor game played by two teams of five. It builds explosive speed, agility, and teamwork, with core skills including dribbling, passing, and shooting skills."
  },
  {
    title: "Volleyball",
    gender: "Men & Women",
    img: "/volleyball.jpg",
    desc: "Volleyball is a dynamic team game played across a net, focusing on spiking, blocking, setting, and serving. It emphasizes reflexes, timing, and coordination, often played in both indoor and beach formats."
  },
  {
    title: "Wrestling",
    gender: "Men",
    img: "/wrestling.jpg",
    desc: "Wrestling is one of the oldest combat sports, testing raw strength, stamina, and technical mastery. Freestyle and traditional wrestling competitions are held under strict rules, where athletes demonstrate discipline and resilience."
  },
  {
    title: "Gymnastics",
    gender: "Women",
    img: "/gymnastics.jpg",
    desc: "Gymnastics is a graceful yet highly demanding sport involving artistic, rhythmic, and floor routines. Athletes combine strength, flexibility, and balance, performing routines that showcase elegance and physical mastery."
  },
  {
    title: "Martial Arts",
    gender: "Men & Women",
    img: "/judo.jpg",
    desc: "Martial arts encompass a wide range of combat systems and traditions, focusing on self-defense, discipline, and physical fitness. It teaches respect, control, and strategy while building strength, agility, and mental focus."
  },
];

export default function Home() {
  const [news, setNews] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobileMenuOpen = isMenuOpen; // For consistency with your provided code

  // Refs for the carousel
  const carouselRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Fetch Sports News
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(NEWS_API);
        const data = await res.json();
        setNews(data.articles || []);
      } catch (err) {
        console.error("Error fetching news", err);
      }
    };
    fetchNews();
  }, []);

  // Calculate card width and cards per view based on screen size
  useEffect(() => {
    const updateCardDimensions = () => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.offsetWidth;
        
        // Determine cards per view based on screen width
        if (containerWidth >= 1024) {
          setCardsPerView(3);
        } else if (containerWidth >= 768) {
          setCardsPerView(2);
        } else {
          setCardsPerView(1);
        }
        
        // Calculate card width based on container width and gap
        const gap = 32; // 8 * 4 (gap-8 = 32px)
        const cardWidth = (containerWidth - (gap * (cardsPerView - 1))) / cardsPerView;
        setCardWidth(cardWidth);
      }
    };

    updateCardDimensions();
    window.addEventListener('resize', updateCardDimensions);
    
    return () => {
      window.removeEventListener('resize', updateCardDimensions);
    };
  }, [cardsPerView]);

  // Calculate total slides
  const totalSlides = Math.ceil(sports.length / cardsPerView);

  // Navigation functions
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  // Go to specific slide
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, totalSlides]);

  return (
    <div className="bg-gradient-to-b from-green-600 via-white to-gray-100 text-gray-900 text-lg font-sans">
      {/* Navbar */}
<nav className="fixed top-0 w-full bg-white shadow-lg z-50 transition-all duration-300">
  <div className="container px-2 md:px-6 py-2 flex justify-between items-center">
    
    {/* Logo and Brand Name (left) */}
    <div className="flex items-center w-full  ">
      <a href="/" className="flex items-center no-underline">
        <Image
          src="/logo.svg"   // ✅ SVG file in /public
          alt="Pakistan Sports Federation Logo"
          width={65}
          height={65}
          className="rounded-full"
        />
        <h1 className="font-extrabold text-green-700 text-2xl pb-3 uppercase tracking-wide hidden sm:block ">
          Pakistan Sports Federation
        </h1>
      </a>
    </div>
    {/* Navigation Links (right on desktop) */}
    <div className="hidden md:flex ml-10 items-center pl-3 space-x-8 font-semibold text-gray-700">
      {["About", "Programs", "News", "Achievements", "Contact"].map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          className="hover:text-green-600 transition-colors duration-300 relative group"
        >
          {item}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
        </a>
      ))}
    </div>

    {/* Mobile Menu Button (right on mobile) */}
    <button
      onClick={toggleMenu}
      className="md:hidden text-gray-700 focus:outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-menu"
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    </button>
  </div>

  {/* Mobile Menu */}
  <motion.div
    initial={{ y: "-100%" }}
    animate={{ y: isMenuOpen ? "0%" : "-100%" }}
    transition={{ type: "spring", stiffness: 100, damping: 20 }}
    className="md:hidden bg-white shadow-lg absolute w-full top-16 left-0 px-4 pb-4"
  >
    <div className="flex flex-col space-y-4 font-semibold text-gray-700">
      {["About", "Programs", "News", "Achievements", "Contact"].map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          className="hover:text-green-600 transition-colors duration-300"
          onClick={toggleMenu}
        >
          {item}
        </a>
      ))}
    </div>
  </motion.div>
</nav>

      {/* Hero */}
      <section
        className="relative h-[98vh] flex items-center justify-center text-center text-white overflow-hidden"
        style={{
          backgroundImage: "url('/hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-4xl px-6"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Pakistan Sports Federation
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-10 font-medium tracking-wide drop-shadow-md">
            Representing Pakistan with pride in the International School Sport Federation (ISF).
            Fostering talent, building champions, and promoting sportsmanship.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <motion.a
              href="#programs"
              className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              aria-label="Join Our Programs"
            >
              Join Us
            </motion.a>
            <motion.a
              href="#about"
              className="bg-yellow-500 hover:bg-yellow-600 px-8 py-4 rounded-full text-black font-bold text-lg transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              aria-label="Learn More About Us"
            >
              Learn More
            </motion.a>
          </div>
        </motion.div>
      </section>
      
      {/* About */}
      <section id="about" className="py-24 px-6 md:px-12 bg-white font-sans">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
              About Us
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The <span className="font-bold text-green-700">Pakistan Sports Federation</span> (PSF) is a leading national body dedicated to
              developing young athletes, fostering school-level competitions,
              and building pathways for international excellence. We work
              alongside schools, coaches, and international bodies to ensure
              Pakistan's presence and success in global sports.
            </p>
            <ul className="mt-6 space-y-4 text-lg font-medium text-gray-800">
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevrons-right text-green-600">
                  <path d="m9 18 6-6-6-6" />
                  <path d="m15 18 6-6-6-6" />
                </svg>
                Over 10,000 athletes trained
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevrons-right text-green-600">
                  <path d="m9 18 6-6-6-6" />
                  <path d="m15 18 6-6-6-6" />
                </svg>
                50+ international medals won
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevrons-right text-green-600">
                  <path d="m9 18 6-6-6-6" />
                  <path d="m15 18 6-6-6-6" />
                </svg>
                Partnering with 200+ schools nationwide
              </li>
            </ul>
          </div>
          <div className="relative">
            <Image 
              src="/about.png" 
              alt="About Pakistan Sports Federation" 
              width={750} 
              height={550} 
              className="rounded-3xl shadow-2xl w-full h-auto transform transition-transform duration-500 hover:scale-105" 
            />
            {/* Green Overlay */}
          </div>
        </div>
      </section>
      
      {/* Programs Carousel */}
      <section id="programs" className="py-20 px-6 font-sans bg-gray-100">
        <div className="container mx-auto relative">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-gray-800">
            Our Sports Programs
          </h2>
          
          {/* Carousel Container */}
          <div className="relative overflow-hidden" ref={carouselRef}>
            {/* Carousel Track */}
            <motion.div
              className="flex"
              animate={{ x: -currentIndex * (cardWidth * cardsPerView + 32) }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {Array.from({ length: totalSlides }).map((_, groupIndex) => (
                <div
                  key={groupIndex}
                  className="flex gap-8 pr-8"
                  style={{ minWidth: `${cardWidth * cardsPerView + 32 * (cardsPerView - 1)}px` }}
                >
                  {sports.slice(groupIndex * cardsPerView, groupIndex * cardsPerView + cardsPerView).map((sport, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                      className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col"
                      style={{ width: `${cardWidth}px`, height: "520px" }}
                    >
                      {/* IMAGE SECTION */}
                      <div className="relative w-full h-[300px] overflow-hidden">
                        <Image
                          src={sport.img}
                          width={cardWidth}
                          height={300}
                          alt={sport.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      {/* TEXT SECTION */}
                      <div className="p-6 flex flex-col flex-grow justify-between">
                        <div>
                          <h3 className="font-bold text-2xl text-gray-900 leading-tight">{sport.title}</h3>
                          <p className="text-sm font-medium text-gray-500 mt-2">Eligible: {sport.gender}</p>
                          <p className="mt-4 text-gray-700 leading-relaxed line-clamp-4">{sport.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 focus:outline-none z-10"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 focus:outline-none z-10"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-green-700' : 'bg-gray-300'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section id="achievements" className="py-24 px-6 md:px-12 bg-gray-50 font-sans">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-12">
            Our Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
              whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
              className="p-8 bg-white rounded-3xl shadow-lg transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-5xl font-bold text-green-700">10,000+</h3>
              <p className="mt-2 text-gray-600 text-lg">Athletes Trained</p>
            </motion.div>
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
              whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
              className="p-8 bg-white rounded-3xl shadow-lg transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3 className="text-5xl font-bold text-green-700">50+</h3>
              <p className="mt-2 text-gray-600 text-lg">International Medals</p>
            </motion.div>
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.6 }}
              whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
              className="p-8 bg-white rounded-3xl shadow-lg transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <path d="M12 20.94a9 9 0 0 1-7.5-15.04c.83-.93 1.85-1.74 3-2.4l2 4.4L12 18l-1-4-2-4.4c1.15.66 2.17 1.47 3 2.4l2-4.4c.83.93 1.85 1.74 3 2.4l-2 4.4 1 4 2 4.4c-1.15-.66-2.17-1.47-3-2.4z" />
                </svg>
              </div>
              <h3 className="text-5xl font-bold text-green-700">200+</h3>
              <p className="mt-2 text-gray-600 text-lg">Schools Partnered</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* News */}
      <section id="news" className="py-24 px-6 md:px-12 bg-gray-100 font-sans">
        <div className="container mx-auto">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 text-center mb-12">
            Latest Sports News
          </h2>
          {news.length === 0 ? (
            <p className="text-center text-gray-500 font-medium text-lg">
              No news articles available right now. Please check back later!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((article, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300"
                >
                  <div className="relative w-full h-56 bg-gray-200">
                    <Image
                      width={600}
                      height={400}
                      src={article.image || "https://via.placeholder.com/600x400.png?text=Image+Not+Available"}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{article.description?.slice(0, 150)}...</p>
                    <a href={article.url} target="_blank" className="text-green-600 hover:text-green-800 text-sm font-semibold inline-flex items-center gap-1 transition-colors duration-300">
                      Read More
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Footer */}
      <footer id="footer" className="bg-[#1a1a1a] text-white py-16 font-sans">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Footer Logo & Brand */}
            <div className="mb-8 md:mb-0 text-center md:text-left flex flex-col items-center md:items-start">
              <a href="/">
                <Image
                  src="/logo.png"
                  alt="PSF Logo"
                  width={110}
                  height={110}
                  className="mx-auto md:mx-0 rounded-full mb-3  transition-transform duration-300 hover:scale-105"
                />
              </a>
            </div>
            
            {/* Contact Info & Socials */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0">
              <p className="text-gray-300 text-lg mb-2">
                <a href="mailto:info@psf.org.pk" className="hover:text-green-500 transition-colors">
                  Email: info@psf.org.pk
                </a>
              </p>
              <p className="text-gray-300 text-lg">
                <a href="tel:+923001234567" className="hover:text-green-500 transition-colors">
                  Phone: +92 300 1234567
                </a>
              </p>
              <div className="mt-6 flex gap-4">
                {["facebook", "instagram", "twitter", "linkedin"].map((sm, i) => (
                  <a
                    key={i}
                    href={`https://www.${sm}.com/pakistansportsfederation`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${sm} profile`}
                    className="flex items-center justify-center bg-white rounded-full hover:scale-110 transition-transform duration-300"
                  >
                    <Image src={`/${sm}.png`} alt={`${sm} icon`} width={28} height={28} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Pakistan Sports Federation. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
