import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Facebook,
  Calendar,
  Globe,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Heart,
  Users,
  Send,
  Menu,
  X,
  ChevronRight,
  CheckCircle2
} from 'lucide-react'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isNavScrolled, setIsNavScrolled] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const hobbiesRef = useRef<HTMLDivElement>(null)
  const refereesRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  // Scroll Progress Bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalScroll) * 100
      setScrollProgress(progress)
      setIsNavScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animations
      gsap.fromTo('.hero-greeting', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: 'expo.out' }
      )
      gsap.fromTo('.hero-name',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.4, ease: 'expo.out' }
      )
      gsap.fromTo('.hero-title',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.8, ease: 'expo.out' }
      )
      gsap.fromTo('.hero-desc',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 1, ease: 'smooth' }
      )
      gsap.fromTo('.hero-cta',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, delay: 1.2, ease: 'elastic.out(1, 0.5)' }
      )
      gsap.fromTo('.hero-social',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, delay: 1.4, stagger: 0.08, ease: 'elastic.out(1, 0.5)' }
      )
      gsap.fromTo('.hero-image',
        { rotateY: 15, x: 100, opacity: 0 },
        { rotateY: 0, x: 0, opacity: 1, duration: 1, delay: 0.6, ease: 'expo.out' }
      )

      // Scroll-triggered sections
      const sections = ['.about-section', '.experience-section', '.education-section', '.skills-section', '.hobbies-section', '.referees-section', '.contact-section']
      
      sections.forEach((section) => {
        gsap.fromTo(`${section} .reveal-item`,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        )
      })

      // Timeline animation
      gsap.fromTo('.timeline-card',
        { rotateY: (i) => i % 2 === 0 ? -45 : 45, x: (i) => i % 2 === 0 ? -100 : 100, opacity: 0 },
        {
          rotateY: 0,
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.3,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 70%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Education cards
      gsap.fromTo('.education-card',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.education-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Skill tags
      gsap.fromTo('.skill-tag-anim',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: '.skills-container',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  // Smooth scroll to section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  // Download CV Function – Updated to use the existing cv.docx file from public folder
  const downloadCV = () => {
    const link = document.createElement('a')
    link.href = '/cv.docx'                // Path to the file in public folder
    link.download = 'Geoffrey_G_Kinyaki_CV.docx'  // Suggested filename for download
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isNavScrolled ? 'glass shadow-lg py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button onClick={() => scrollToSection(heroRef)} className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gold-gradient rounded-lg flex items-center justify-center text-white font-bold text-lg transition-transform duration-300 group-hover:scale-105">
                GK
              </div>
              <span className="font-semibold text-[#1a1a1a] hidden sm:block">Geoffrey Kinyaki</span>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection(heroRef)} className="nav-link">Home</button>
              <button onClick={() => scrollToSection(aboutRef)} className="nav-link">About</button>
              <button onClick={() => scrollToSection(experienceRef)} className="nav-link">Experience</button>
              <button onClick={() => scrollToSection(educationRef)} className="nav-link">Education</button>
              <button onClick={() => scrollToSection(contactRef)} className="nav-link">Contact</button>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button onClick={downloadCV} className="btn-primary flex items-center gap-2 text-sm">
                <Download size={16} />
                Download CV
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass-dark absolute top-full left-0 right-0 py-6 px-4">
            <div className="flex flex-col gap-4">
              <button onClick={() => scrollToSection(heroRef)} className="text-white py-2 text-left">Home</button>
              <button onClick={() => scrollToSection(aboutRef)} className="text-white py-2 text-left">About</button>
              <button onClick={() => scrollToSection(experienceRef)} className="text-white py-2 text-left">Experience</button>
              <button onClick={() => scrollToSection(educationRef)} className="text-white py-2 text-left">Education</button>
              <button onClick={() => scrollToSection(contactRef)} className="text-white py-2 text-left">Contact</button>
              <button onClick={downloadCV} className="btn-primary flex items-center gap-2 justify-center mt-4">
                <Download size={16} />
                Download CV
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#c9a962] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#8b7355] opacity-5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
              <p className="hero-greeting text-[#c9a962] font-medium mb-4 tracking-wide">Hello, I'm</p>
              <h1 className="hero-name text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-4 leading-tight">
                Geoffrey G. <span className="text-gold-gradient">Kinyaki</span>
              </h1>
              <p className="hero-title text-xl sm:text-2xl text-[#666666] mb-6 font-medium">
                Procurement Professional
              </p>
              <p className="hero-desc text-[#666666] mb-8 max-w-lg leading-relaxed">
                Dedicated Purchasing Officer & Stores Supervisor with extensive experience in procurement, 
                inventory management, and supply chain optimization. Committed to delivering excellence 
                in every aspect of supply chain operations.
              </p>
              
              {/* CTA Buttons */}
              <div className="hero-cta flex flex-wrap gap-4 mb-8">
                <button onClick={downloadCV} className="btn-primary flex items-center gap-2">
                  <Download size={18} />
                  Download My CV
                </button>
                <button onClick={() => scrollToSection(contactRef)} className="btn-outline flex items-center gap-2">
                  <Send size={18} />
                  Get In Touch
                </button>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hero-social social-icon">
                  <Linkedin size={18} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hero-social social-icon">
                  <Twitter size={18} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hero-social social-icon">
                  <Facebook size={18} />
                </a>
                <a href="mailto:jeffgikundi@rocketmail.com" className="hero-social social-icon">
                  <Mail size={18} />
                </a>
              </div>
            </div>

            {/* Profile Image */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="hero-image relative">
                <div className="absolute inset-0 bg-gold-gradient rounded-2xl transform rotate-6 opacity-20" />
                <img 
                  src="/IMG-20260316-WA0011.jpg"
                  alt="Geoffrey G. Kinyaki" 
                  className="relative w-72 h-96 sm:w-80 sm:h-[28rem] object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gold-gradient rounded-full flex items-center justify-center">
                      <Briefcase className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-[#666666]">Experience</p>
                      <p className="font-bold text-[#1a1a1a]">10+ Years</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="about-section py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title gold-underline reveal-item">About Me</h2>
            <p className="section-subtitle reveal-item">Get to know the person behind the professional</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Personal Info Cards */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-6 reveal-item">Personal Information</h3>
              
              {[
                { icon: User, label: 'Full Name', value: 'Geoffrey G. Kinyaki', href: null },
                { icon: Calendar, label: 'Date of Birth', value: 'May 7, 1986', href: null },
                { icon: Globe, label: 'Nationality', value: 'Kenyan', href: null },
                { icon: MapPin, label: 'Languages', value: 'English, Kiswahili, Kimeru', href: null },
                { icon: Phone, label: 'Phone', value: '+254 729 239 608', href: 'tel:+254729239608' },
                { icon: Mail, label: 'Email', value: 'jeffgikundi@rocketmail.com', href: 'mailto:jeffgikundi@rocketmail.com' },
              ].map((item, index) => (
                <div key={index} className="reveal-item flex items-center gap-4 p-4 bg-[#f5f5f5] rounded-xl card-hover">
                  <div className="w-12 h-12 bg-gold-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-[#999999]">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-medium text-[#1a1a1a] hover:text-[#c9a962] transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-medium text-[#1a1a1a]">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bio & Career Objective */}
            <div className="space-y-8">
              <div className="reveal-item">
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">Personal Profile</h3>
                <p className="text-[#666666] leading-relaxed mb-4">
                  I am a hardworking, self-motivated and ambitious individual who is willing, ready and able to learn 
                  new skills and tasks quickly. I demonstrate passion, enthusiasm, and work effectively in any given 
                  condition with minimal supervision, always maintaining the zeal to attain my goals.
                </p>
                <p className="text-[#666666] leading-relaxed">
                  My approach combines attention to detail with strategic thinking, ensuring that every procurement 
                  decision adds value to the organization while maintaining the highest ethical standards.
                </p>
              </div>

              <div className="reveal-item p-6 bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Award className="text-[#c9a962]" size={24} />
                  Career Objective
                </h3>
                <p className="text-[#cccccc] leading-relaxed">
                  To be part of a highly motivated organizational team in a growing, dynamic and challenging work environment. 
                  I aim to develop and enhance my skills and competency level in a professional and ethical manner with 
                  outstanding decision-making capabilities. I am committed to continuous learning in recognition of today's 
                  dynamic procurement landscape.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section ref={experienceRef} className="experience-section py-20 px-4 sm:px-6 lg:px-8 bg-[#f5f5f5]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title gold-underline reveal-item">Work Experience</h2>
            <p className="section-subtitle reveal-item">My professional journey in procurement and supply chain</p>
          </div>

          <div className="timeline-container relative">
            {/* Timeline Line */}
            <div className="hidden md:block timeline-line" />

            {/* Experience Entries */}
            {[
              {
                position: 'Purchasing Officer & Stores Supervisor',
                company: 'Seven Restaurant Ltd & The Kenyan Good Food Company',
                period: 'July 2015 - Present',
                location: 'Nairobi, Kenya',
                duties: [
                  'Maintaining records of goods ordered and received',
                  'Locating vendors and determining product availability',
                  'Preparing and processing requisitions and purchase orders',
                  'Controlling purchasing department budgets',
                  'Reviewing purchase order claims and contracts',
                  'Analyzing market and delivery systems',
                  'Developing purchasing and contract management policies',
                  'Negotiating contracts with suppliers',
                  'Preparing daily food costing reports',
                  'Maintaining updated suppliers terms sheet'
                ]
              },
              {
                position: 'Purchasing Assistant & Store Clerk',
                company: 'Seven Restaurant ABC Place',
                period: '2012 - 2014',
                location: 'Nairobi, Kenya',
                duties: [
                  'Reporting to Operations & Office Manager',
                  'Ensuring adequate stock records',
                  'Maintaining supplier records',
                  'Ensuring store security',
                  'Receiving & checking stock quality',
                  'General security including staff searches',
                  'Liaising with Executive Chef for kitchen requisites'
                ]
              },
              {
                position: 'Salesman / Shop Attendant',
                company: 'House of Leather',
                period: '2007 - 2011',
                location: 'Nairobi, Kenya',
                duties: [
                  'Customer sales and service',
                  'Stock compilation and reporting',
                  'Reorder level monitoring'
                ]
              }
            ].map((exp, index) => (
              <div key={index} className="timeline-card relative mb-12 md:mb-0">
                {/* Timeline Node */}
                <div className="hidden md:block timeline-node" style={{ top: '24px' }} />
                
                <div className={`md:w-[45%] ${index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8'}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg card-hover">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#1a1a1a]">{exp.position}</h3>
                        <p className="text-[#c9a962] font-medium">{exp.company}</p>
                      </div>
                      <span className="px-3 py-1 bg-[#f5f5f5] text-[#666666] text-sm rounded-full">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-[#999999] text-sm mb-4 flex items-center gap-1">
                      <MapPin size={14} /> {exp.location}
                    </p>
                    <ul className="space-y-2">
                      {exp.duties.map((duty, dIndex) => (
                        <li key={dIndex} className="flex items-start gap-2 text-[#666666] text-sm">
                          <ChevronRight className="text-[#c9a962] flex-shrink-0 mt-0.5" size={16} />
                          {duty}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section ref={educationRef} className="education-section py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title gold-underline reveal-item">Education & Training</h2>
            <p className="section-subtitle reveal-item">Academic qualifications and professional certifications</p>
          </div>

          <div className="education-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { year: '2003-2007', institution: 'Kiurani High School', qualification: 'KCSE (C Plain)', icon: GraduationCap },
              { year: '1995-2002', institution: 'Maguma Primary School', qualification: 'KCPE (C Plus)', icon: GraduationCap },
              { year: '2012-2014', institution: 'Nairobi Institute of Business Studies (NIBS)', qualification: 'UK Examination Body', icon: Award },
              { year: '2011', institution: 'Stonebic Campus', qualification: 'Diploma in Graphics Design (CorelDraw, Photoshop, Illustrator, QuarkXPress)', icon: Award },
              { year: '2009', institution: 'Emanuel Computer College', qualification: 'Basic IT Concepts (Windows, Office Suite, Internet)', icon: Briefcase },
              { year: '2008', institution: 'Senior Driving School', qualification: 'Class BCE Driving License', icon: CheckCircle2 },
            ].map((edu, index) => (
              <div key={index} className="education-card bg-[#f5f5f5] rounded-2xl p-6 card-hover group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold-gradient rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <edu.icon className="text-white" size={22} />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 bg-white text-[#c9a962] text-xs font-medium rounded-full mb-2">
                      {edu.year}
                    </span>
                    <h3 className="font-bold text-[#1a1a1a] mb-1">{edu.institution}</h3>
                    <p className="text-[#666666] text-sm">{edu.qualification}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="skills-section py-20 px-4 sm:px-6 lg:px-8 bg-[#f5f5f5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title gold-underline reveal-item">Skills & Expertise</h2>
            <p className="section-subtitle reveal-item">Key competencies developed throughout my career</p>
          </div>

          <div className="skills-container grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                category: 'Procurement & Supply Chain',
                icon: Briefcase,
                skills: ['Vendor Management', 'Purchase Order Processing', 'Contract Negotiation', 'Budget Control', 'Market Analysis', 'Inventory Management', 'Supplier Relations']
              },
              {
                category: 'Technical Skills',
                icon: Award,
                skills: ['Microsoft Office Suite', 'Point of Sale Systems', 'Graphics Design', 'Database Management', 'Internet & Email']
              },
              {
                category: 'Soft Skills',
                icon: Users,
                skills: ['Customer Relations', 'Team Leadership', 'Communication', 'Problem Solving', 'Time Management', 'Attention to Detail']
              },
              {
                category: 'Languages',
                icon: Globe,
                skills: ['English (Fluent)', 'Kiswahili (Fluent)', 'Kimeru (Native)']
              }
            ].map((cat, index) => (
              <div key={index} className="reveal-item bg-white rounded-2xl p-6 shadow-lg card-hover">
                <div className="w-14 h-14 bg-gold-gradient rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <cat.icon className="text-white" size={28} />
                </div>
                <h3 className="text-lg font-bold text-[#1a1a1a] text-center mb-4">{cat.category}</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {cat.skills.map((skill, sIndex) => (
                    <span key={sIndex} className="skill-tag-anim skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hobbies Section */}
      <section ref={hobbiesRef} className="hobbies-section py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title gold-underline reveal-item">Hobbies & Interests</h2>
            <p className="section-subtitle reveal-item">What I enjoy outside of work</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Inspirational Speakers', icon: Users },
              { name: 'Themed Movies', icon: Award },
              { name: 'Listening to Music', icon: Heart },
              { name: 'Singing', icon: CheckCircle2 },
              { name: 'Traveling', icon: MapPin },
            ].map((hobby, index) => (
              <div key={index} className="reveal-item bg-[#f5f5f5] rounded-2xl p-6 text-center card-hover group">
                <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <hobby.icon className="text-white" size={28} />
                </div>
                <h3 className="font-medium text-[#1a1a1a]">{hobby.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Referees Section */}
      <section ref={refereesRef} className="referees-section py-20 px-4 sm:px-6 lg:px-8 bg-[#f5f5f5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title gold-underline reveal-item">Referees</h2>
            <p className="section-subtitle reveal-item">Professional references available upon request</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sammy Kamundi',
                title: 'Chairman, Kimathi University',
                contact: 'P.O.Box 11791-00100, Nairobi Kenya',
                phone: '+254-722956929 / 0733-865154',
                phoneHref: 'tel:+254722956929',
                linkedin: 'https://www.linkedin.com/in/geoff-kinyaki-99657b3b2',
                facebook: 'https://www.facebook.com/photo/?fbid=6994802820538751&set=a.796199137065848'
              },
              {
                name: 'Edith Ndanu',
                title: 'Account Assistant, The Good Food Company / Seven Restaurant Ltd',
                contact: 'Nairobi, Kenya',
                phone: '+254 723 607 980',
                phoneHref: 'tel:+254723607980',
                linkedin: 'https://www.linkedin.com/in/geoff-kinyaki-99657b3b2',
                facebook: 'https://www.facebook.com/photo/?fbid=6994802820538751&set=a.796199137065848'
              },
              {
                name: 'Samson Yamba',
                title: 'Operations Manager, The Good Food Company / Seven Restaurants Ltd',
                contact: 'ABC Place, Waiyaki Way, Nairobi, Kenya',
                phone: '+254 723 692878',
                phoneHref: 'tel:+254723692878',
                linkedin: 'https://www.linkedin.com/in/geoff-kinyaki-99657b3b2',
                facebook: 'https://www.facebook.com/photo/?fbid=6994802820538751&set=a.796199137065848'
              }
            ].map((referee, index) => (
              <div key={index} className="reveal-item bg-white rounded-2xl p-6 shadow-lg card-hover">
                <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] text-center mb-2">{referee.name}</h3>
                <p className="text-[#c9a962] text-center text-sm mb-4">{referee.title}</p>
                <div className="space-y-2 text-sm">
                  <p className="text-[#666666] text-center">{referee.contact}</p>
                  <a 
                    href={referee.phoneHref}
                    className="text-[#666666] text-center flex items-center justify-center gap-2 hover:text-[#c9a962] transition-colors"
                  >
                    <Phone size={14} className="text-[#c9a962]" />
                    {referee.phone}
                  </a>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <a 
                      href={referee.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f5f5f5] text-[#666666] hover:bg-[#0077b5] hover:text-white transition-all"
                      title="LinkedIn"
                    >
                      <Linkedin size={14} />
                    </a>
                    <a 
                      href={referee.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f5f5f5] text-[#666666] hover:bg-[#1877f2] hover:text-white transition-all"
                      title="Facebook"
                    >
                      <Facebook size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="contact-section py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title gold-underline reveal-item">Get In Touch</h2>
            <p className="section-subtitle reveal-item">Let's discuss how I can contribute to your organization</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="reveal-item">
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {[
                    { icon: Phone, label: 'Phone', value: '+254 729 239 608', href: 'tel:+254729239608' },
                    { icon: Mail, label: 'Email', value: 'jeffgikundi@rocketmail.com', href: 'mailto:jeffgikundi@rocketmail.com' },
                    { icon: MapPin, label: 'Location', value: 'Nairobi, Kenya', href: 'https://maps.google.com/?q=Nairobi,Kenya' },
                    { icon: Briefcase, label: 'Availability', value: 'Open to new opportunities', href: null },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-[#f5f5f5] rounded-xl card-hover">
                      <div className="w-12 h-12 bg-gold-gradient rounded-lg flex items-center justify-center">
                        <item.icon className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-[#999999]">{item.label}</p>
                        {item.href ? (
                          <a 
                            href={item.href} 
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="font-medium text-[#1a1a1a] hover:text-[#c9a962] transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-medium text-[#1a1a1a]">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="reveal-item">
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Follow Me</h3>
                <div className="flex gap-3">
                  <a href="https://www.linkedin.com/in/geoff-kinyaki-99657b3b2" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <Linkedin size={18} />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <Twitter size={18} />
                  </a>
                  <a href="https://www.facebook.com/photo/?fbid=6994802820538751&set=a.796199137065848" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <Facebook size={18} />
                  </a>
                  <a href="mailto:jeffgikundi@rocketmail.com" className="social-icon">
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="reveal-item bg-[#f5f5f5] rounded-2xl p-8">
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-6">Send a Message</h3>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Message sent! I will get back to you soon.'); }}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#666666] mb-2">Full Name *</label>
                    <input type="text" required className="form-input" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#666666] mb-2">Email Address *</label>
                    <input type="email" required className="form-input" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[#666666] mb-2">Phone Number</label>
                  <input type="tel" className="form-input" placeholder="+254..." />
                </div>
                <div>
                  <label className="block text-sm text-[#666666] mb-2">Subject</label>
                  <input type="text" className="form-input" placeholder="How can I help?" />
                </div>
                <div>
                  <label className="block text-sm text-[#666666] mb-2">Message *</label>
                  <textarea required rows={4} className="form-input resize-none" placeholder="Your message..." />
                </div>
                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          {/* Footer Line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#c9a962] to-transparent mb-8" />
          
          <div className="flex flex-col items-center text-center">
            {/* Logo */}
            <div className="w-16 h-16 bg-gold-gradient rounded-xl flex items-center justify-center text-white font-bold text-2xl mb-4">
              GK
            </div>
            <p className="text-[#c9a962] font-medium mb-2">Procurement Professional</p>
            
            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-6 my-6">
              <button onClick={() => scrollToSection(heroRef)} className="text-[#999999] hover:text-white transition-colors">Home</button>
              <button onClick={() => scrollToSection(aboutRef)} className="text-[#999999] hover:text-white transition-colors">About</button>
              <button onClick={() => scrollToSection(experienceRef)} className="text-[#999999] hover:text-white transition-colors">Experience</button>
              <button onClick={() => scrollToSection(contactRef)} className="text-[#999999] hover:text-white transition-colors">Contact</button>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 mb-6">
              <a href="https://www.linkedin.com/in/geoff-kinyaki-99657b3b2" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2d2d2d] text-[#999999] hover:bg-[#c9a962] hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2d2d2d] text-[#999999] hover:bg-[#c9a962] hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="https://www.facebook.com/photo/?fbid=6994802820538751&set=a.796199137065848" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2d2d2d] text-[#999999] hover:bg-[#c9a962] hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="mailto:jeffgikundi@rocketmail.com" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2d2d2d] text-[#999999] hover:bg-[#c9a962] hover:text-white transition-all">
                <Mail size={18} />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-[#666666] text-sm">
              © {new Date().getFullYear()} Build by Shim. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
