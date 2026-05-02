import { useState, useRef, type FormEvent } from 'react'
import { useInView } from '../hooks/useInView'
import Hero from '../components/Hero'
import { services } from '../data/services'
import Seo from '../components/Seo'
import './Home.css'

const whyUs = [
  { title: 'Affordable Pricing', desc: 'Transparent, competitive rates with no hidden fees. Starting from just £5 per bin and £40 for patios.' },
  { title: 'Teenage Owned Business', desc: 'Supporting local youth enterprise. Every booking helps a young entrepreneur build something great.' },
  { title: 'Reliable & Punctual', desc: 'We show up on time, work hard, and deliver results you can see. No shortcuts.' },
  { title: 'Free No-Obligation Quotes', desc: 'Just message or call and we will get back to you quickly with a fair price.' },
]

const steps = [
  { num: '01', title: 'Message for a Quote', desc: 'Tell us what you need and get a free, no-obligation quote quickly — usually within a few hours.' },
  { num: '02', title: 'We Arrange a Visit', desc: 'We schedule a time that suits you and arrive fully equipped and ready to work.' },
  { num: '03', title: 'Sit Back & Enjoy', desc: 'Watch your driveway, patio or bins transform. We tidy up and leave everything spotless.' },
]

const aboutFeatures = [
  { title: 'Affordable Prices', desc: 'Quality results without breaking the bank.' },
  { title: 'Reliable Service', desc: 'We show up on time and deliver what we promise.' },
  { title: 'Free Quotes', desc: 'Message any time for a no-obligation price.' },
]

const testimonials = [
  { name: 'Mark R.', location: 'Local Customer', text: 'My driveway looks brand new! Couldn\'t believe the difference — all the oil stains and moss completely gone. Great job and very reasonable price.', rating: 5 },
  { name: 'Julie S.', location: 'Local Customer', text: 'Had my patio and bins done. Excellent results and a really friendly, hard-working young lad. Will definitely be booking again.', rating: 5 },
  { name: 'Dave T.', location: 'Local Customer', text: 'Fence looked awful with green algae. Messaged for a quote, got a quick reply, and within a few days it was done. Looks fantastic. Highly recommend.', rating: 5 },
]

export default function Home() {
  const servicesRef = useInView<HTMLElement>()
  const aboutRef = useInView<HTMLElement>()
  const journeyRef = useInView<HTMLElement>()
  const testimonialsRef = useInView<HTMLElement>()
  const contactRef = useInView<HTMLElement>()

  // Contact form state
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    setSubmitting(true)
    const form = formRef.current!
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | null)?.value || ''
    const payload = {
      firstName: get('contact-name'),
      lastName: '',
      email: '',
      phone: get('contact-phone'),
      instructions: get('contact-message'),
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Server error')
      setSubmitted(true)
    } catch {
      setSubmitError('Something went wrong. Please call us directly on 07555 653736.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="home-page home-page--compact">
      <Seo
        title="LV Exterior Cleaning – Exterior Cleaning Services"
        description="LV Exterior Cleaning — teenage-owned exterior cleaning business. Driveways, patios, fences, bin cleaning and more. Message for a FREE quote: 07555 653736."
        canonical="/"
      />
      <Hero />

      {/* ===== Services ===== */}
      <section className="section home-services" ref={servicesRef} id="services">
        <div className="container">
          <span className="section-eyebrow fade-in">What We Offer</span>
          <h2 className="section-title fade-in">Cleaning Services</h2>
          <p className="section-subtitle fade-in">
            From driveways to dustbins — we provide reliable, affordable exterior cleaning that makes your property shine.
          </p>
          <div className="home-services__grid stagger-children">
            {services.map((s) => (
              <div className="home-svc-card zoom-pop" key={s.slug}>
                <div className="home-svc-card__body">
                  <div className="home-svc-card__price-badge">{s.price}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <a
                    href="#contact"
                    className="home-svc-card__link"
                    onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                  >
                    Get a Quote
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== About ===== */}
      <section className="section home-about-breezyee" ref={aboutRef} id="about">
        <div className="container home-about-breezyee__inner">
          <div className="home-about-breezyee__image slide-in-left float-anim" aria-hidden="true" />
          <div className="home-about-breezyee__content slide-in-right">
            <span className="home-about-breezyee__eyebrow">About Us</span>
            <h2 className="home-about-breezyee__title">LV Exterior Cleaning</h2>
            <p className="home-about-breezyee__text">
              LV Exterior Cleaning is a teenage-owned business providing reliable, affordable, and high-quality exterior cleaning services. We take pride in transforming outdoor spaces and delivering great results — one driveway, patio or fence at a time.
            </p>
            <div className="home-about-breezyee__features stagger-children">
              {aboutFeatures.map((f) => (
                <div className="home-about-breezyee__feature fade-in" key={f.title}>
                  <div className="home-about-breezyee__feature-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div>
                    <strong>{f.title}</strong>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="home-about-breezyee__logo-row">LV Exterior Cleaning</div>
            <a
              href="#contact"
              className="btn btn-primary fade-in"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              Message for a Free Quote
            </a>
          </div>
        </div>
      </section>

      {/* ===== Why + How ===== */}
      <section className="section home-journey" ref={journeyRef}>
        <div className="container">
          <span className="section-eyebrow fade-in">Why Choose Us</span>
          <h2 className="section-title fade-in">The standard you deserve, made simple</h2>
          <p className="section-subtitle fade-in">
            High standards, clear process, and reliable results every time.
          </p>
          <div className="home-journey__layout">
            <div className="home-journey__panel home-journey__panel--why stagger-children">
              <h3 className="home-journey__panel-title fade-in">Why People Book LV</h3>
              <div className="why-grid">
                {whyUs.map((item, i) => (
                  <div className="why-card flip-in-left" key={item.title}>
                    <span className="why-card__num">0{i + 1}</span>
                    <h4 className="why-card__title">{item.title}</h4>
                    <p className="why-card__desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="home-journey__panel home-journey__panel--steps stagger-children">
              <h3 className="home-journey__panel-title fade-in">How It Works</h3>
              <div className="steps-grid">
                {steps.map((step) => (
                  <div className="step-card slide-in-up" key={step.num}>
                    <span className="step-card__num">{step.num}</span>
                    <h4 className="step-card__title">{step.title}</h4>
                    <p className="step-card__desc">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="section home-testimonials" ref={testimonialsRef}>
        <div className="container">
          <span className="section-eyebrow fade-in">Reviews</span>
          <h2 className="section-title fade-in">What Our Customers Say</h2>
          <p className="section-subtitle fade-in">
            Don't just take our word for it — hear from people we've helped.
          </p>
          <div className="testimonials-grid stagger-children">
            {testimonials.map((t) => (
              <div className="testimonial-card rotate-in" key={t.name}>
                <div className="testimonial-card__stars">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  ))}
                </div>
                <p className="testimonial-card__text">"{t.text}"</p>
                <div className="testimonial-card__author">
                  <strong>{t.name}</strong>
                  <span>{t.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section className="section home-contact" ref={contactRef} id="contact">
        <div className="container">
          <span className="section-eyebrow fade-in">Get In Touch</span>
          <h2 className="section-title fade-in">Message Me for a FREE Quote</h2>
          <p className="section-subtitle fade-in">
            Tell me what needs cleaning and I'll get back to you with a free, no-obligation quote.
          </p>
          <div className="home-contact__grid">
            {/* Form */}
            <div className="home-contact__form-wrap slide-in-left">
              {submitted ? (
                <div className="home-contact__success">
                  <div className="home-contact__success-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <h3>Message Sent!</h3>
                  <p>Thanks for getting in touch! I'll get back to you shortly with your free quote. Or call me directly on <a href="tel:07555653736">07555 653736</a>.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="home-contact__form" ref={formRef}>
                  <div className="home-contact__field">
                    <label htmlFor="contact-name">Your Name <span>*</span></label>
                    <input type="text" id="contact-name" name="contact-name" required placeholder="John Smith" />
                  </div>
                  <div className="home-contact__field">
                    <label htmlFor="contact-phone">Phone Number <span>*</span></label>
                    <input type="tel" id="contact-phone" name="contact-phone" required placeholder="07xxx xxxxxx" />
                  </div>
                  <div className="home-contact__field">
                    <label htmlFor="contact-message">What Needs Cleaning?</label>
                    <textarea
                      id="contact-message"
                      name="contact-message"
                      rows={4}
                      placeholder="E.g. driveway about 40m², patio, and 2 bins..."
                    />
                  </div>
                  {submitError && <p className="home-contact__error">{submitError}</p>}
                  <button type="submit" className="btn btn-primary home-contact__submit" disabled={submitting}>
                    {submitting ? 'Sending…' : 'Send Message'}
                    {!submitting && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="home-contact__sidebar slide-in-right">
              <div className="home-contact__info-card">
                <h3>Or call me directly</h3>
                <a href="tel:07555653736" className="home-contact__phone">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  07555 653736
                </a>
                <p>Available 7 days a week</p>
              </div>
              <div className="home-contact__info-card">
                <h3>Services &amp; Prices</h3>
                <ul className="home-contact__price-list">
                  <li><span>Driveway Pressure Washing</span><strong>From £60</strong></li>
                  <li><span>Patio Pressure Washing</span><strong>From £40</strong></li>
                  <li><span>Fence / Wall Washing</span><strong>From £40</strong></li>
                  <li><span>Bin Cleaning</span><strong>From £5/bin</strong></li>
                  <li><span>Other Odd Jobs</span><strong>Message for price</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

