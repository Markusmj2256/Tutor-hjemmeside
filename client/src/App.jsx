import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right.js'
import Atom from 'lucide-react/dist/esm/icons/atom.js'
import BookOpen from 'lucide-react/dist/esm/icons/book-open.js'
import Calculator from 'lucide-react/dist/esm/icons/calculator.js'
import CalendarClock from 'lucide-react/dist/esm/icons/calendar-clock.js'
import CheckCircle2 from 'lucide-react/dist/esm/icons/check-circle-2.js'
import Clock from 'lucide-react/dist/esm/icons/clock.js'
import FlaskConical from 'lucide-react/dist/esm/icons/flask-conical.js'
import GraduationCap from 'lucide-react/dist/esm/icons/graduation-cap.js'
import Heart from 'lucide-react/dist/esm/icons/heart.js'
import Home from 'lucide-react/dist/esm/icons/home.js'
import Laptop from 'lucide-react/dist/esm/icons/laptop.js'
import Mail from 'lucide-react/dist/esm/icons/mail.js'
import MapPin from 'lucide-react/dist/esm/icons/map-pin.js'
import Medal from 'lucide-react/dist/esm/icons/medal.js'
import Phone from 'lucide-react/dist/esm/icons/phone.js'
import Quote from 'lucide-react/dist/esm/icons/quote.js'
import Send from 'lucide-react/dist/esm/icons/send.js'
import Star from 'lucide-react/dist/esm/icons/star.js'
import Target from 'lucide-react/dist/esm/icons/target.js'
import Trophy from 'lucide-react/dist/esm/icons/trophy.js'
import Users from 'lucide-react/dist/esm/icons/users.js'
import Video from 'lucide-react/dist/esm/icons/video.js'
import { Button } from '@/components/ui/button.jsx'
import { trpc } from '@/lib/trpc'
import './App.css'

const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`
const contactEmail = 'markusmj2256@gmail.com'
const formSubmitEndpoint = `https://formsubmit.co/ajax/${contactEmail}`
const heroIllustration = assetPath('images/tutor_hero_cartoon.jpg')
const mathIllustration = assetPath('images/math_tutoring_cartoon.jpg')
const physicsIllustration = assetPath('images/physics_study_cartoon.jpg')
const campusIllustration = assetPath('images/dtu_campus_cartoon.jpg')
const markusSelfie = assetPath('images/markus-lake-selfie.jpg')
const markusRunning = assetPath('images/markus-running.jpg')

const navItems = [
  { page: 'home', href: '#/', label: 'Forsiden' },
  { page: 'teaching', href: '#/undervisning', label: 'Typer af undervisning' },
  { page: 'about', href: '#/om-mig', label: 'Lidt om mig' },
]

const subjects = [
  { name: 'Matematik', icon: Calculator },
  { name: 'Fysik', icon: Atom },
  { name: 'Kemi', icon: FlaskConical },
  { name: 'Biologi', icon: BookOpen },
  { name: 'Bioteknologi', icon: GraduationCap },
]

const proofPoints = [
  { value: '1000+', label: 'timer 1-1-undervisning' },
  { value: '5+', label: 'års erfaring med lektiehjælp' },
  { value: '30+', label: 'elever løftet markant fagligt' },
  { value: '6', label: 'fag undervist som mentor' },
]

const testimonials = [
  'Hans motivation er steget rigtig meget, og hans karakterer har forbedret sig. Familien er superglad og vil gerne fortsætte.',
  'Hun fik et pænt 10-tal. Hun er virkelig glad og roser dig meget for din måde at forklare tingene på.',
  'Familien har været meget glad. De synes, der er god kemi mellem dig og eleven, så de vil meget gerne fortsætte med dig.',
  'Du virker rigtig dygtig og sød, og familien ser frem til forløbet med dig.',
  'Rigtig fint opstartsmøde. Familien vil gerne starte op, og der er sat 48 timer af til forløbet.',
]

const flowSteps = [
  {
    title: 'Vi finder det faglige hul',
    text: 'Først afdækker jeg, hvor eleven mister grebet: metode, begreber, regneteknik, eksamensform eller selvtillid.',
  },
  {
    title: 'Undervisningen tilpasses eleven',
    text: 'Forklaringer, opgaver og tempo bliver tilpasset elevens niveau, så der skabes succesoplevelser tidligt i forløbet.',
  },
  {
    title: 'Resultaterne bygges stabilt op',
    text: 'Eleven får struktur, træning og konkrete strategier til afleveringer, lektier, prøver og eksamen.',
  },
]

const packages = [
  {
    title: '72 timers klippekort',
    price: '325 kr./time',
    detail: 'Til længere forløb med fast faglig udvikling.',
  },
  {
    title: '20 timers klippekort',
    price: '350 kr./time',
    detail: 'Godt valg til målrettet hjælp over flere uger.',
  },
  {
    title: 'Gang til gang',
    price: '400 kr./time',
    detail: 'Fleksibel hjælp uden klippekort.',
  },
]

const onlinePackages = [
  { title: '72 timer online', price: '300 kr./time' },
  { title: '20 timer online', price: '325 kr./time' },
  { title: 'Gang til gang online', price: '375 kr./time' },
]

function parseRoute() {
  if (typeof window === 'undefined') return { page: 'home', anchor: null }

  const hash = window.location.hash || '#/'

  if (hash.startsWith('#/undervisning/privat') || hash === '#one-to-one') {
    return { page: 'teaching', anchor: 'privat-1-1' }
  }

  if (hash.startsWith('#/undervisning/hold') || hash === '#groups') {
    return { page: 'teaching', anchor: 'holdundervisning' }
  }

  if (hash.startsWith('#/undervisning') || hash === '#priser') {
    return { page: 'teaching', anchor: null }
  }

  if (hash.startsWith('#/om-mig') || hash === '#om-mig') {
    return { page: 'about', anchor: null }
  }

  if (hash.startsWith('#/kontakt') || hash === '#kontakt' || hash === '#kontakt-hero') {
    return { page: 'home', anchor: 'kontakt' }
  }

  return { page: 'home', anchor: null }
}

function useRoute() {
  const [route, setRoute] = useState(parseRoute)

  useEffect(() => {
    const handleHashChange = () => setRoute(parseRoute())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    const scrollTarget = window.setTimeout(() => {
      if (route.anchor) {
        document.getElementById(route.anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 50)

    return () => window.clearTimeout(scrollTarget)
  }, [route.page, route.anchor])

  return route
}

function ContactForm({ title, description, tone = 'light', defaultPackage = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    studentNeeds: '',
    interestedPackage: defaultPackage,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contactMutation = trpc.contact.sendContact.useMutation()
  const isDark = tone === 'dark'
  const isStaticHosting =
    typeof window !== 'undefined' && window.location.hostname.endsWith('github.io')

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Udfyld navn, mail og telefonnummer')
      return
    }

    const sendWithFormSubmit = async () => {
      const selectedPackage = formData.interestedPackage || 'Ikke specificeret'
      const studentNeeds = formData.studentNeeds || 'Ikke specificeret'
      const message = [
        'Ny henvendelse fra tutorsiden',
        '',
        `Navn: ${formData.name}`,
        `Email: ${formData.email}`,
        `Telefon: ${formData.phone}`,
        `Interesse: ${selectedPackage}`,
        '',
        'Beskrivelse af eleven og udfordringerne:',
        studentNeeds,
      ].join('\n')

      const response = await fetch(formSubmitEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        referrerPolicy: 'origin',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _replyto: formData.email,
          Telefon: formData.phone,
          Interesse: selectedPackage,
          'Beskrivelse af eleven og udfordringerne': studentNeeds,
          message,
          _subject: `Ny henvendelse fra tutorsiden: ${formData.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok || result?.success === false || result?.success === 'false') {
        throw new Error(result?.message || 'Formularen kunne ikke sendes')
      }
    }

    setIsSubmitting(true)

    try {
      if (isStaticHosting) {
        await sendWithFormSubmit()
      } else {
        try {
          await contactMutation.mutateAsync(formData)
        } catch (error) {
          await sendWithFormSubmit()
        }
      }

      toast.success('Tak for din henvendelse. Du bliver kontaktet hurtigst muligt.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        studentNeeds: '',
        interestedPackage: defaultPackage,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : ''
      const needsActivation = /activate|confirm|verification|bekræft/i.test(message)

      toast.error(
        needsActivation
          ? 'Formularen skal aktiveres første gang. Tjek indbakken for en bekræftelsesmail fra FormSubmit.'
          : `Beskeden kunne ikke sendes lige nu.${message ? ` Fejl: ${message}` : ''}`
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-lg border p-5 shadow-sm ${
        isDark
          ? 'border-white/15 bg-white/10 text-white'
          : 'border-slate-200 bg-white text-slate-950'
      }`}
    >
      <div className="mb-5">
        <p className={`text-sm font-semibold ${isDark ? 'text-amber-200' : 'text-teal-700'}`}>
          Kontakt
        </p>
        <h3 className="mt-1 text-2xl font-semibold">{title}</h3>
        <p className={`mt-2 text-sm leading-6 ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>
          {description}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium">
          Navn
          <input
            value={formData.name}
            onChange={(event) => updateField('name', event.target.value)}
            className={`h-11 rounded-md border px-3 text-sm outline-none transition focus:ring-2 ${
              isDark
                ? 'border-white/20 bg-white/95 text-slate-950 focus:ring-amber-300'
                : 'border-slate-300 bg-white focus:ring-teal-500'
            }`}
            placeholder="Dit navn"
            required
          />
        </label>

        <label className="grid gap-1 text-sm font-medium">
          Mail
          <input
            type="email"
            value={formData.email}
            onChange={(event) => updateField('email', event.target.value)}
            className={`h-11 rounded-md border px-3 text-sm outline-none transition focus:ring-2 ${
              isDark
                ? 'border-white/20 bg-white/95 text-slate-950 focus:ring-amber-300'
                : 'border-slate-300 bg-white focus:ring-teal-500'
            }`}
            placeholder="din@mail.dk"
            required
          />
        </label>

        <label className="grid gap-1 text-sm font-medium">
          Telefon
          <input
            type="tel"
            value={formData.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            className={`h-11 rounded-md border px-3 text-sm outline-none transition focus:ring-2 ${
              isDark
                ? 'border-white/20 bg-white/95 text-slate-950 focus:ring-amber-300'
                : 'border-slate-300 bg-white focus:ring-teal-500'
            }`}
            placeholder="Dit telefonnummer"
            required
          />
        </label>

        <label className="grid gap-1 text-sm font-medium">
          Interesse
          <select
            value={formData.interestedPackage}
            onChange={(event) => updateField('interestedPackage', event.target.value)}
            className={`h-11 rounded-md border px-3 text-sm outline-none transition focus:ring-2 ${
              isDark
                ? 'border-white/20 bg-white/95 text-slate-950 focus:ring-amber-300'
                : 'border-slate-300 bg-white focus:ring-teal-500'
            }`}
          >
            <option value="">Vælg undervisningstype</option>
            <option value="Proevelektion">Prøvelektion 1-1</option>
            <option value="Fysisk 1-1">Fysisk 1-1</option>
            <option value="Online 1-1">Online 1-1</option>
            <option value="Holdundervisning">Holdundervisning</option>
            <option value="Ved ikke endnu">Ved ikke endnu</option>
          </select>
        </label>
      </div>

      <label className="mt-3 grid gap-1 text-sm font-medium">
        Beskrivelse af eleven og udfordringerne
        <textarea
          value={formData.studentNeeds}
          onChange={(event) => updateField('studentNeeds', event.target.value)}
          className={`min-h-28 rounded-md border px-3 py-3 text-sm outline-none transition focus:ring-2 ${
            isDark
              ? 'border-white/20 bg-white/95 text-slate-950 focus:ring-amber-300'
              : 'border-slate-300 bg-white focus:ring-teal-500'
          }`}
          placeholder="Skriv gerne fag, klassetrin, mål og hvad eleven kæmper med."
        />
      </label>

      <Button
        type="submit"
        className={`mt-4 w-full ${
          isDark
            ? 'bg-amber-300 text-slate-950 hover:bg-amber-200'
            : 'bg-teal-700 text-white hover:bg-teal-800'
        }`}
        disabled={isSubmitting || contactMutation.isPending}
      >
        <Send className="size-4" />
        {isSubmitting || contactMutation.isPending ? 'Sender...' : 'Send henvendelse'}
      </Button>
    </form>
  )
}

function SectionIntro({ label, title, text, light = false }) {
  return (
    <div className="max-w-3xl">
      <p className={`text-sm font-semibold ${light ? 'text-amber-200' : 'text-teal-700'}`}>
        {label}
      </p>
      <h2 className={`mt-2 text-3xl font-semibold ${light ? 'text-white' : 'text-slate-950'}`}>
        {title}
      </h2>
      <p className={`mt-4 text-base leading-7 ${light ? 'text-slate-200' : 'text-slate-600'}`}>
        {text}
      </p>
    </div>
  )
}

function Header({ currentPage }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-stone-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
        <a href="#/" className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-md bg-teal-800 text-white">
            <GraduationCap className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-semibold">Markus Johnsen</span>
            <span className="block truncate text-xs text-slate-500">Naturfaglig lektiehjælp</span>
          </span>
        </a>

        <Button asChild className="shrink-0 bg-teal-700 text-white hover:bg-teal-800">
          <a href="#/kontakt">
            <Phone className="size-4" />
            <span className="hidden sm:inline">Kontakt</span>
          </a>
        </Button>
      </div>

      <nav className="border-t border-slate-200">
        <div className="top-nav-scroll mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-2 text-sm font-medium text-slate-700">
          {navItems.map((item) => (
            <a
              key={item.page}
              href={item.href}
              className={`whitespace-nowrap rounded-md px-3 py-2 transition ${
                currentPage === item.page
                  ? 'bg-teal-700 text-white'
                  : 'hover:bg-white hover:text-teal-700'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}

function SubjectChips() {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {subjects.map((subject) => {
        const Icon = subject.icon
        return (
          <span
            key={subject.name}
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700"
          >
            <Icon className="size-4 text-teal-700" />
            {subject.name}
          </span>
        )
      })}
    </div>
  )
}

function ReviewMarquee({ compact = false }) {
  return (
    <div className={`${compact ? 'rounded-md border border-teal-700' : 'border-y border-teal-900/10'} min-w-0 bg-teal-800 text-white`}>
      <div className="review-marquee">
        <div className={`review-marquee-track ${compact ? 'py-2' : 'py-3'}`}>
          {[...testimonials, ...testimonials].map((quote, index) => (
            <span key={`${quote}-${index}`} className="mx-6 inline-flex items-center gap-3 text-sm">
              <Star className="size-4 shrink-0 fill-amber-300 text-amber-300" />
              <span className="whitespace-nowrap">{quote}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <main id="top">
      <section className="border-b border-slate-200 bg-stone-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="min-w-0">
            <SubjectChips />

            <p className="text-sm font-semibold text-teal-700">1-1 lektiehjælp og holdundervisning</p>
            <h1 className="mt-3 max-w-4xl break-words text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              Undervisning der skaber faglige resultater
            </h1>
            <div className="mt-5">
              <ReviewMarquee compact />
            </div>
            <p className="mt-5 max-w-2xl break-words text-lg leading-8 text-slate-600">
              Har dit barn svært ved lektier, afleveringer eller prøver i de naturfaglige fag?
              Jeg hjælper elever med at forstå stoffet, få struktur på arbejdet og opleve,
              at matematik, fysik, kemi, biologi og bioteknologi kan give mening.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="w-full bg-teal-700 text-white hover:bg-teal-800 sm:w-auto">
                <a href="#/kontakt">
                  Få en vurdering af forløbet
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full border-slate-300 bg-white sm:w-auto">
                <a href="#/undervisning">
                  Se undervisning og priser
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {proofPoints.map((point) => (
                <div key={point.label} className="rounded-lg border border-slate-200 bg-white p-4">
                  <p className="text-3xl font-semibold text-slate-950">{point.value}</p>
                  <p className="mt-1 text-sm leading-5 text-slate-600">{point.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
            <img
              src={markusSelfie}
              alt="Markus ved en sø"
              className="h-full min-h-72 w-full rounded-lg object-cover"
            />
            <img
              src={heroIllustration}
              alt="Illustration af lektiehjælp"
              className="h-full min-h-72 w-full rounded-lg bg-white object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionIntro
            label="Udfordringen"
            title="Når et fag begynder at fylde for meget"
            text="Mange elever mister ikke evnen til at lære. De mister overblikket, selvtilliden eller forbindelsen mellem teori og opgaver. Derfor handler god lektiehjælp ikke kun om at lave dagens opgave færdig."
          />

          <div className="grid gap-4">
            {flowSteps.map((step, index) => (
              <div key={step.title} className="grid gap-4 rounded-lg border border-slate-200 bg-stone-50 p-5 sm:grid-cols-[auto_1fr]">
                <span className="grid size-10 place-items-center rounded-md bg-amber-200 font-semibold text-slate-950">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">{step.title}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#F3F7F4]">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <SectionIntro
            label="Erfaring og resultater"
            title="En undervisning med dokumenteret effekt"
            text="Min undervisning udvikles ud fra det, eleven konkret har svært ved. Det er ikke nødvendigvis almindelig lektiehjælp, men et forløb hvor jeg får indsigt i elevens udfordringer og bygger en skræddersyet plan, der kan skabe målbar faglig fremgang."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <Medal className="size-6 text-teal-700" />
              <h3 className="mt-3 text-xl font-semibold">Skræddersyet forløb</h3>
              <p className="mt-2 leading-7 text-slate-600">
                Jeg finder først ud af, hvor eleven sidder fast, og udvikler undervisningen efter netop de udfordringer.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <GraduationCap className="size-6 text-teal-700" />
              <h3 className="mt-3 text-xl font-semibold">Bachelor på DTU</h3>
              <p className="mt-2 leading-7 text-slate-600">
                Jeg studerer teknisk biomedicin på Danmarks Tekniske Universitet i Lyngby.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <Trophy className="size-6 text-teal-700" />
              <h3 className="mt-3 text-xl font-semibold">MentorDanmark</h3>
              <p className="mt-2 leading-7 text-slate-600">
                Mentor-CV med 710+ registrerede timer, 25 mentees, 7 mikrokurser og 6 undervisningsfag.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <Users className="size-6 text-teal-700" />
              <h3 className="mt-3 text-xl font-semibold">Eduforce på DTU</h3>
              <p className="mt-2 leading-7 text-slate-600">
                Jeg underviser gymnasieklasser ugentligt i naturfaglig undervisning gennem Eduforce på DTU.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <Target className="size-6 text-teal-700" />
              <h3 className="mt-3 text-xl font-semibold">Stærk naturfaglig profil</h3>
              <p className="mt-2 leading-7 text-slate-600">
                Borupgaard Gymnasium med 11+ i snit, A-fag i fysik, matematik og bioteknologi samt bachelor på DTU.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionIntro
              label="Anmeldelser"
              title="Det familier fremhæver"
              text="Tilbagemeldingerne går især på tydelig forklaring, bedre motivation, god kemi og konkrete faglige fremskridt."
            />
            <div className="inline-flex w-fit items-center gap-2 rounded-md bg-amber-100 px-3 py-2 text-sm font-semibold text-slate-800">
              <Star className="size-4 fill-amber-400 text-amber-500" />
              Flere 5-stjernede forløb
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-5">
            {testimonials.map((quote) => (
              <figure key={quote} className="rounded-lg border border-slate-200 bg-stone-50 p-5">
                <Quote className="size-5 text-teal-700" />
                <blockquote className="mt-4 text-sm leading-6 text-slate-700">{quote}</blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-stone-100">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <SectionIntro
            label="Undervisningstyper"
            title="Vælg det forløb der passer til eleven"
            text="Forsiden viser overblikket. Klik videre for at se priser, praktiske rammer og forskellen på privat 1-1, online og holdundervisning."
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <a
              href="#/undervisning/privat"
              className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-600"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="grid size-12 place-items-center rounded-md bg-teal-700 text-white">
                  <Home className="size-6" />
                </span>
                <ArrowRight className="size-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-teal-700" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold">Privat 1-1 undervisning</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Personlig undervisning i hjemmet, i aftalte lokaler eller online. Godt til elever der skal have
                lukket faglige huller, løftet karakterer eller have mere ro omkring skolen.
              </p>
            </a>

            <a
              href="#/undervisning/hold"
              className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-600"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="grid size-12 place-items-center rounded-md bg-[#8A4F2A] text-white">
                  <Users className="size-6" />
                </span>
                <ArrowRight className="size-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-teal-700" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold">Holdundervisning</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Små hold på 4-5 elever, fast ugentlig undervisning og eksamensfokuseret materiale.
                En stærk løsning for gymnasieelever i matematik.
              </p>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1fr_0.75fr] lg:items-center">
          <SectionIntro
            light
            label="Næste skridt"
            title="Start med en prøvelektion"
            text="En prøvelektion på 2 timer giver eleven ro til at mærke formen, og giver mig tid til at vurdere fagligt niveau, læringsstil og den bedste plan fremad."
          />
          <div className="grid gap-3">
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <span className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-sm">
                <CheckCircle2 className="size-4 text-amber-200" />
                2 timer for 650 kr.
              </span>
              <span className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-sm">
                <CheckCircle2 className="size-4 text-amber-200" />
                Fysisk eller online
              </span>
              <span className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-sm">
                <CheckCircle2 className="size-4 text-amber-200" />
                Uforpligtende afklaring
              </span>
            </div>
            <Button asChild className="bg-amber-300 text-slate-950 hover:bg-amber-200">
              <a href="#/kontakt">
                Få en vurdering af forløbet
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section id="kontakt" className="scroll-mt-28 border-t border-slate-200 bg-[#F3F7F4]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-teal-700">Kontakt</p>
            <h2 className="mt-2 text-3xl font-semibold">Få en konkret plan for dit barn</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Skriv en kort besked om fag, klassetrin, nuværende udfordringer og hvad I gerne vil opnå.
              Jeg vender tilbage med næste skridt.
            </p>

            <div className="mt-6 grid gap-3 text-sm text-slate-700">
              <a className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 hover:border-teal-600" href="tel:24259986">
                <Phone className="size-5 text-teal-700" />
                24259986
              </a>
              <a className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 hover:border-teal-600" href="mailto:markusmj2256@gmail.com">
                <Mail className="size-5 text-teal-700" />
                markusmj2256@gmail.com
              </a>
              <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4">
                <MapPin className="size-5 text-teal-700" />
                Gentofte, Lyngby og online
              </div>
            </div>
          </div>

          <ContactForm
            title="Send en henvendelse"
            description="Formularen sender navn, mail, telefon og beskrivelse af elevens udfordringer direkte fra hjemmesiden."
            defaultPackage="Ved ikke endnu"
          />
        </div>
      </section>
    </main>
  )
}

function TeachingPage() {
  return (
    <main>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-teal-700">Typer af undervisning</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-slate-950">
              Holdundervisning og privat 1-1 undervisning
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Her er den praktiske forskel på forløbene, priserne og hvordan undervisningen bliver lagt til rette.
              Målet er det samme: mere ro, bedre forståelse og tydelige faglige resultater.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="bg-teal-700 text-white hover:bg-teal-800">
                <a href="#/undervisning/privat">
                  Privat 1-1
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button asChild variant="outline" className="border-slate-300 bg-white">
                <a href="#/undervisning/hold">
                  Holdundervisning
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <img
              src={mathIllustration}
              alt="Illustration af målrettet matematikundervisning"
              className="h-72 w-full rounded-lg bg-stone-100 object-cover"
            />
            <img
              src={physicsIllustration}
              alt="Illustration af naturfaglig undervisning"
              className="h-72 w-full rounded-lg bg-stone-100 object-cover"
            />
          </div>
        </div>
      </section>

      <section id="privat-1-1" className="scroll-mt-28 bg-stone-50">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold text-teal-700">Privat 1-1</p>
              <h2 className="mt-2 text-3xl font-semibold">Privatundervisning hjemme hos eleven</h2>
              <p className="mt-4 leading-7 text-slate-600">
                1-1 foregår som udgangspunkt i elevens hjem. Hvis familien ønsker det, kan undervisningen også
                foregå online eller i lokaler, som jeg kan hjælpe med at stå for. Timer holdes typisk 1-2 timer
                ad gangen, og klippekort aftales fleksibelt direkte med mig.
              </p>
              <ul className="mt-5 grid gap-3 text-sm text-slate-700">
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-700" />
                  Prøvelektion på 2 timer: 650 kr.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-700" />
                  Tæt på Gentofte/Lyngby som udgangspunkt. Transporttillæg aftales på forhånd ved længere afstand.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-700" />
                  Familien bestemmer selv, hvornår timerne indløses, så længe det passer ind i skemaet.
                </li>
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {packages.map((item) => (
                <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-5">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-2xl font-semibold text-teal-800">{item.price}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-10 rounded-lg border border-slate-200 bg-[#F3F7F4] p-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-md bg-teal-700 text-white">
                  <Video className="size-5" />
                </span>
                <h3 className="text-2xl font-semibold">Online 1-1</h3>
              </div>
              <p className="mt-4 leading-7 text-slate-600">
                Onlineundervisning laves professionelt med både iPad og computer, så jeg kan tegne,
                illustrere og gennemgå opgaver tydeligt. Hvis forløbet kun er online, reduceres prisen med 25 kr. pr. time.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {onlinePackages.map((item) => (
                <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-700">{item.title}</p>
                  <p className="mt-2 text-xl font-semibold text-teal-800">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="holdundervisning" className="scroll-mt-28 border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-md bg-[#8A4F2A] text-white">
                <Users className="size-5" />
              </span>
              <h2 className="text-2xl font-semibold">Holdundervisning i matematik</h2>
            </div>
            <p className="mt-4 leading-7 text-slate-600">
              Holdundervisning foregår privat hos mig med 4-5 elever, 2 timer ad gangen og en fast gang om ugen.
              Det er primært for gymnasieelever i matematik, eller andre fag hvis der er nok efterspørgsel.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-stone-100 p-4">
                <Clock className="size-5 text-[#8A4F2A]" />
                <p className="mt-2 font-semibold">2 timer om ugen</p>
                <p className="text-sm text-slate-600">Fast ugentlig rytme.</p>
              </div>
              <div className="rounded-lg bg-stone-100 p-4">
                <CalendarClock className="size-5 text-[#8A4F2A]" />
                <p className="mt-2 font-semibold">Hel sæson</p>
                <p className="text-sm text-slate-600">Aftalt antal uger.</p>
              </div>
              <div className="rounded-lg bg-stone-100 p-4">
                <Target className="size-5 text-[#8A4F2A]" />
                <p className="mt-2 font-semibold">200 kr./time</p>
                <p className="text-sm text-slate-600">Pr. elev.</p>
              </div>
            </div>
            <p className="mt-5 leading-7 text-slate-600">
              Holdene er eksamensfokuserede og kombinerer fælles gennemgang med custom lektier og materiale,
              der passer til hvor den enkelte elev ligger. Det giver en lavere timepris og et stærkt fagligt fællesskab.
            </p>
          </div>

          <div className="grid gap-4">
            <img
              src={heroIllustration}
              alt="Illustration af undervisning i mindre gruppe"
              className="h-72 w-full rounded-lg bg-stone-100 object-cover"
            />
            <div className="rounded-lg border border-slate-200 bg-[#F3F7F4] p-5">
              <h3 className="text-xl font-semibold">Klar til at høre hvad der passer bedst?</h3>
              <p className="mt-2 leading-7 text-slate-600">
                Send en kort beskrivelse af elevens fag, niveau og mål, så vender jeg tilbage med et konkret forslag.
              </p>
              <Button asChild className="mt-4 bg-teal-700 text-white hover:bg-teal-800">
                <a href="#/kontakt">
                  Få en vurdering af forløbet
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function AboutPage() {
  return (
    <main>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="grid gap-4 sm:grid-cols-2">
            <img
              src={markusRunning}
              alt="Markus efter et løb"
              className="h-full min-h-96 w-full rounded-lg object-cover object-top"
            />
            <div className="grid gap-4">
              <img
                src={campusIllustration}
                alt="Illustration af DTU-campus"
                className="h-48 w-full rounded-lg bg-stone-100 object-cover"
              />
              <img
                src={mathIllustration}
                alt="Illustration af matematikundervisning"
                className="h-48 w-full rounded-lg bg-stone-100 object-cover"
              />
              <img
                src={physicsIllustration}
                alt="Illustration af naturfaglig undervisning"
                className="h-48 w-full rounded-lg bg-stone-100 object-cover"
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-teal-700">Lidt om mig</p>
            <h1 className="mt-2 text-4xl font-semibold leading-tight text-slate-950">
              Fagligt stærk, rolig og menneskelig undervisning
            </h1>
            <p className="mt-5 leading-7 text-slate-600">
              Jeg hedder Markus Johnsen og studerer bachelor i teknisk biomedicin på DTU. Jeg arbejder med
              undervisning, fordi jeg kan lide at gøre svære emner konkrete og se elever få troen på, at de
              faktisk kan løse opgaverne.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              I min fritid kan jeg godt lide at løbe, spille musik og være sammen med venner og familie.
              Jeg går op i at møde eleverne ordentligt og skabe et forløb, hvor både elev og forældre føler sig trygge.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-stone-50 p-4">
                <Heart className="size-5 text-teal-700" />
                <p className="mt-2 font-semibold">Tryg relation</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  God kemi og ro er afgørende, især når et fag har givet nederlag.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-stone-50 p-4">
                <Laptop className="size-5 text-teal-700" />
                <p className="mt-2 font-semibold">Klar formidling</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Jeg bruger visuelle forklaringer, opgavetræning og konkrete metoder.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F3F7F4]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <GraduationCap className="size-6 text-teal-700" />
            <h2 className="mt-3 text-xl font-semibold">DTU og teknisk biomedicin</h2>
            <p className="mt-2 leading-7 text-slate-600">
              Studiet giver en stærk naturfaglig base, som jeg bruger direkte i undervisningen.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <Target className="size-6 text-teal-700" />
            <h2 className="mt-3 text-xl font-semibold">Resultater med ro</h2>
            <p className="mt-2 leading-7 text-slate-600">
              Min undervisning skal både løfte karakterer og gøre hverdagen med faget mindre presset.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <BookOpen className="size-6 text-teal-700" />
            <h2 className="mt-3 text-xl font-semibold">Fag og fritid hænger sammen</h2>
            <p className="mt-2 leading-7 text-slate-600">
              Løb, musik og undervisning har lært mig, at stabil træning og gode forklaringer flytter meget.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 lg:flex-row lg:items-center lg:justify-between">
          <SectionIntro
            light
            label="Kontakt"
            title="Skal vi tale om elevens situation?"
            text="Den bedste start er en kort beskrivelse af fag, klassetrin og hvor eleven sidder fast."
          />
          <Button asChild className="bg-amber-300 text-slate-950 hover:bg-amber-200">
            <a href="#/kontakt">
              Få en vurdering af forløbet
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>
      </section>
    </main>
  )
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-slate-600 lg:flex-row lg:items-center lg:justify-between">
        <p className="font-semibold text-slate-950">Markus Johnsen</p>
        <p>Matematik, fysik, kemi, biologi og bioteknologi</p>
        <p>1-1 i hjemmet, online og små hold</p>
      </div>
    </footer>
  )
}

function App() {
  const route = useRoute()

  return (
    <div className="min-h-screen overflow-x-hidden bg-stone-50 text-slate-950">
      <Header currentPage={route.page} />

      {route.page === 'teaching' ? <TeachingPage /> : null}
      {route.page === 'about' ? <AboutPage /> : null}
      {route.page === 'home' ? <HomePage /> : null}

      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  )
}

export default App
