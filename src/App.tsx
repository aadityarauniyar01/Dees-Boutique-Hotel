import { FormEvent, useEffect, useState } from "react"

type Page = "home" | "stay" | "airport" | "dining" | "wellness" | "events" | "gallery" | "location"

const HOTEL_IMAGES = {
  exterior: "https://deeshotel.com/wp-content/uploads/2024/04/front-image.jpg",
  deluxe:
    "https://deeshotel.com/wp-content/uploads/2024/04/DSC_0605-scaled.jpg",
  superDeluxe: "https://deeshotel.com/wp-content/uploads/2024/03/555547587.jpg",
  suite: "https://deeshotel.com/wp-content/uploads/2024/03/DSC00261-scaled.jpg",
  suiteAlt:
    "https://deeshotel.com/wp-content/uploads/2024/03/DSC00283-scaled.jpg",
  pool: "https://deeshotel.com/wp-content/uploads/2025/06/Swimming-pool-960x604.jpg",
  bar: "https://deeshotel.com/wp-content/uploads/2025/12/BAR-960x604.jpg",
  banquet:
    "https://deeshotel.com/wp-content/uploads/2025/12/BANQUET-HALL-4-960x604.jpg",
  dining:
    "https://deeshotel.com/wp-content/uploads/2025/12/DSC00821-768x512.jpg",
  food: "https://deeshotel.com/wp-content/uploads/2025/12/CORDON-BLUE-768x576.png",
  gallery1:
    "https://deeshotel.com/wp-content/uploads/2024/03/IMG-20240321-WA0077.jpg",
  gallery2:
    "https://deeshotel.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-24-at-16.56.12.jpeg",
  rooftopView:
    "https://deeshotel.com/wp-content/uploads/2025/12/pic1-scaled.jpg",
  rooftopLounge:
    "https://deeshotel.com/wp-content/uploads/2025/12/pic2-scaled.jpg",
  restaurantOpenKitchen:
    "https://deeshotel.com/wp-content/uploads/2025/12/pic3-scaled.jpg",
  restaurant:
    "https://deeshotel.com/wp-content/uploads/2025/12/pic4-scaled.jpg",
  observatory:
    "https://deeshotel.com/wp-content/uploads/2025/12/pic7-scaled.jpg",
}

const DESTINATION_IMAGES = {
  kathmandu:
    "https://images.unsplash.com/photo-1765562711191-b16677f714e0?auto=format&fit=crop&w=1800&q=85",
  detail:
    "https://images.unsplash.com/photo-1650137918743-25b56e27df65?auto=format&fit=crop&w=1200&q=85",
  temple:
    "https://images.unsplash.com/photo-1765562710670-fd50a387e0dd?auto=format&fit=crop&w=1400&q=85",
}

const rooms = [
  {
    name: "Deluxe Room",
    image: HOTEL_IMAGES.deluxe,
    size: "260 sq. ft.",
    bed: "Queen bed",
    guests: "2 adults · 1 child",
    copy: "A composed city retreat balancing warm natural textures, thoughtful comfort and an uplifting Kathmandu outlook.",
  },
  {
    name: "Super Deluxe",
    image: HOTEL_IMAGES.superDeluxe,
    size: "260 sq. ft.",
    bed: "King bed",
    guests: "2 adults · 1 child",
    copy: "Elevated detailing, a generous king bed and attentive service for travellers who appreciate a little more.",
  },
  {
    name: "Dees Suite",
    image: HOTEL_IMAGES.suite,
    size: "700 sq. ft.",
    bed: "King bed",
    guests: "Family friendly",
    copy: "One of only three expansive suites with a private balcony overlooking the garden and the energy of the city.",
  },
]

function Icon({ name, size = 20 }: { name: string size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    pool: (
      <>
        <path d="M2 17c2.3 1.4 4.7 1.4 7 0s4.7-1.4 7 0 4.7 1.4 7 0M2 21c2.3 1.4 4.7 1.4 7 0s4.7-1.4 7 0 4.7 1.4 7 0M8 14V5a3 3 0 0 1 6 0M8 9h6" />
      </>
    ),
    wifi: (
      <>
        <path d="M5 12.6a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" />
        <circle cx="12" cy="20" r="1" />
      </>
    ),
    car: (
      <>
        <path d="M5 17h14l1-5-3-5H7l-3 5 1 5Z" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
        <path d="M7 7 5 3M17 7l2-4" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    map: (
      <>
        <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
        <path d="M9 3v15M15 6v15" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#/home"
      className={`wordmark ${light ? "wordmark-light" : ""}`}
      aria-label="Dees Boutique Hotel home"
    >
      <span className="wordmark-icon">D</span>
      <span>
        <b>DEES</b>
        <small>BOUTIQUE HOTEL</small>
      </span>
    </a>
  )
}

function Header({ page, openBooking }: { page: Page openBooking: () => void }) {
  const [menu, setMenu] = useState(false)
  const links: { id: Page label: string }[] = [
    { id: "stay", label: "Stay" },
    { id: "airport", label: "Airport" },
    { id: "dining", label: "Dine" },
    { id: "wellness", label: "Wellness" },
    { id: "events", label: "Gather" },
    { id: "location", label: "Explore" },
  ]
  return (
    <header className="site-header">
      <Wordmark />
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map((link) => (
          <a
            key={link.id}
            href={`#/${link.id}`}
            className={page === link.id ? "active" : ""}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <button className="book-header" onClick={openBooking}>
        Book your stay <Icon name="arrow" size={18} />
      </button>
      <button
        className="menu-button"
        aria-label="Open navigation"
        onClick={() => setMenu(true)}
      >
        <Icon name="menu" />
      </button>
      {menu && (
        <div className="mobile-menu">
          <div className="mobile-menu-top">
            <Wordmark light />
            <button
              aria-label="Close navigation"
              onClick={() => setMenu(false)}
            >
              <Icon name="close" />
            </button>
          </div>
          <nav>
            {links.map((link, index) => (
              <a
                key={link.id}
                href={`#/${link.id}`}
                onClick={() => setMenu(false)}
              >
                <span>0{index + 1}</span>
                {link.label}
              </a>
            ))}
          </nav>
          <button
            className="button button-gold"
            onClick={() => {
              setMenu(false)
              openBooking()
            }}
          >
            Check availability
          </button>
        </div>
      )}
    </header>
  )
}

function BookingBar({ openBooking }: { openBooking: () => void }) {
  const today = new Date()
  const tomorrow = new Date(today.getTime() + 86400000)
  const fmt = (date: Date) =>
    date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
  return (
    <div className="booking-bar">
      <div>
        <span>Arrival</span>
        <strong>{fmt(today)}</strong>
      </div>
      <div>
        <span>Departure</span>
        <strong>{fmt(tomorrow)}</strong>
      </div>
      <div>
        <span>Guests</span>
        <strong>2 Guests</strong>
      </div>
      <button onClick={openBooking}>
        Check availability <Icon name="arrow" size={18} />
      </button>
    </div>
  )
}

function SectionIntro({
  eyebrow,
  title,
  copy,
  center = false,
}: {
  eyebrow: string
  title: string
  copy?: string
  center?: boolean
}) {
  return (
    <div className={`section-intro ${center ? "center" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  )
}

function RoomCard({
  room,
  index,
  openBooking,
}: {
  room: typeof rooms[number]
  index: number
  openBooking: () => void
}) {
  return (
    <article className="room-card">
      <a href="#/stay" className="room-image-wrap">
        <img src={room.image} alt={`${room.name} at Dees Boutique Hotel`} />
        <span>0{index + 1}</span>
      </a>
      <div className="room-body">
        <div className="room-meta">
          <span>{room.size}</span>
          <span>{room.bed}</span>
        </div>
        <h3>{room.name}</h3>
        <p>{room.copy}</p>
        <div className="room-actions">
          <button className="text-link" onClick={openBooking}>
            Reserve this room <Icon name="arrow" size={17} />
          </button>
          <span>{room.guests}</span>
        </div>
      </div>
    </article>
  )
}

function Home({ openBooking }: { openBooking: () => void }) {
  return (
    <>
      <section className="hero">
        <img
          src={HOTEL_IMAGES.exterior}
          alt="Dees Boutique Hotel exterior in Koteshwor, Kathmandu"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <span className="eyebrow light">
            Approx. 1 km from Kathmandu airport
          </span>
          <h1>
            Land. Exhale.
            <br />
            <em>You’re almost home.</em>
          </h1>
          <p>
            A calm boutique stay in Koteshwor for international arrivals,
            business trips, layovers and unhurried Kathmandu escapes.
          </p>
          <div className="hero-actions">
            <button className="button button-light" onClick={openBooking}>
              Book near the airport <Icon name="arrow" size={18} />
            </button>
            <a className="hero-text-link" href="#/airport">
              Airport stays
            </a>
          </div>
        </div>
        <div className="hero-aside">
          <span>27.67° N, 85.35° E</span>
          <span>Koteshwor · Kathmandu</span>
        </div>
        <BookingBar openBooking={openBooking} />
      </section>

      <section className="airport-ribbon">
        <div>
          <Icon name="clock" size={25} />
          <span>
            <small>Early arrival or delayed flight?</small>
            Stay close, reset properly, travel onward refreshed.
          </span>
        </div>
        <a href="#/airport">
          Explore airport stays <Icon name="arrow" size={18} />
        </a>
      </section>

      <section className="welcome section">
        <div className="welcome-copy">
          <SectionIntro
            eyebrow="The Dees experience"
            title="A quieter kind of luxury, close to everything."
          />
          <p className="lead">
            Arrive from the airport and exhale. Dees brings considered design,
            all-day ease and instinctive hospitality together under one intimate
            roof.
          </p>
          <a href="#/location" className="text-link">
            Our story & location <Icon name="arrow" size={17} />
          </a>
        </div>
        <div className="welcome-visual">
          <img
            src={HOTEL_IMAGES.suiteAlt}
            alt="Warmly appointed suite interior at Dees Boutique Hotel"
          />
          <div className="image-note">
            <strong>01</strong>
            <span>
              Designed for
              <br />
              unhurried stays
            </span>
          </div>
        </div>
      </section>

      <section className="rooms section">
        <div className="section-heading-row">
          <SectionIntro
            eyebrow="Rooms & suites"
            title="Rest, beautifully."
            copy="Three distinct ways to settle into Kathmandu—each with generous comfort, city views and attentive service."
          />
          <a href="#/stay" className="text-link">
            Explore all rooms <Icon name="arrow" size={17} />
          </a>
        </div>
        <div className="room-grid">
          {rooms.map((room, index) => (
            <RoomCard
              key={room.name}
              room={room}
              index={index}
              openBooking={openBooking}
            />
          ))}
        </div>
      </section>

      <section className="split-feature">
        <div className="split-image">
          <img
            src={HOTEL_IMAGES.rooftopLounge}
            alt="Dees Boutique Hotel rooftop terrace overlooking Kathmandu at night"
          />
        </div>
        <div className="split-content dark">
          <SectionIntro
            eyebrow="Rooftop dining"
            title="Dinner comes with a view."
          />
          <p>
            Rise above the city for terrace evenings, Himalayan horizons and
            Nepalese, Indian, Chinese and international favourites made with
            carefully sourced produce.
          </p>
          <div className="feature-list">
            <span>Nepali Thali</span>
            <span>Chicken Cordon Bleu</span>
            <span>Tandoori Pizza</span>
          </div>
          <a href="#/dining" className="button button-outline">
            Explore dining <Icon name="arrow" size={18} />
          </a>
        </div>
      </section>

      <section className="experience section">
        <SectionIntro
          center
          eyebrow="Make time for yourself"
          title="Everything you need. Nothing you don’t."
        />
        <div className="experience-grid">
          {[
            [
              "pool",
              "Indoor pool",
              "A calm, all-weather space to reset after the city.",
            ],
            [
              "wifi",
              "Always connected",
              "Reliable complimentary Wi-Fi throughout your stay.",
            ],
            [
              "car",
              "Airport convenience",
              "A notably easy arrival, approximately 1 km from the airport.",
            ],
            [
              "clock",
              "Here when needed",
              "Warm, attentive support throughout your time with us.",
            ],
          ].map(([icon, title, text]) => (
            <article key={title}>
              <Icon name={icon} size={30} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="destination-banner">
        <img
          src={DESTINATION_IMAGES.kathmandu}
          alt="Traditional architecture in Kathmandu Valley"
        />
        <div className="destination-content">
          <span className="eyebrow light">Beyond our doors</span>
          <h2>
            Your Kathmandu
            <br />
            story starts here.
          </h2>
          <p>
            Ancient courtyards, sacred stupas and a living culture—let our team
            help you experience the valley with local insight.
          </p>
          <a href="#/location" className="button button-light">
            Explore Kathmandu <Icon name="arrow" size={18} />
          </a>
        </div>
      </section>
    </>
  )
}

function Airport({ openBooking }: { openBooking: () => void }) {
  return (
    <>
      <section className="airport-hero">
        <div className="airport-hero-image">
          <img
            src={HOTEL_IMAGES.exterior}
            alt="Dees Boutique Hotel reception team welcoming international travellers in Kathmandu"
          />
        </div>
        <div className="airport-hero-copy">
          <span className="eyebrow">Kathmandu airport hotel</span>
          <h1>
            From arrivals
            <br />
            to <em>real rest.</em>
          </h1>
          <p>
            Approximately one kilometre from Tribhuvan International Airport,
            Dees is a reassuring first stop, final night or comfortable pause
            between flights.
          </p>
          <button className="button button-gold" onClick={openBooking}>
            Check airport-stay availability <Icon name="arrow" size={18} />
          </button>
          <div className="airport-proof">
            <span>
              <strong>Approx. 1 km</strong> from the airport
            </span>
            <span>
              <strong>Koteshwor</strong> Kathmandu
            </span>
            <span>
              <strong>Direct help</strong> from our team
            </span>
          </div>
        </div>
      </section>

      <section className="section airport-intro">
        <SectionIntro
          center
          eyebrow="A softer landing"
          title="The right room at the right moment."
          copy="Built for travellers who value time, comfort and a genuinely warm welcome after the airport."
        />
        <div className="airport-use-grid">
          {[
            [
              "01",
              "Late-night arrivals",
              "Skip the long cross-city journey. Settle into a comfortable room close to the airport and begin Kathmandu rested.",
            ],
            [
              "02",
              "Layovers & delays",
              "When plans change, trade the terminal for a proper bed, a restorative swim and a satisfying meal.",
            ],
            [
              "03",
              "Early departures",
              "Make your final night simple, with a convenient Koteshwor base and direct support from our hotel team.",
            ],
          ].map(([number, title, text]) => (
            <article key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="flight-change">
        <div>
          <span className="eyebrow light">Plans changed?</span>
          <h2>
            Flight delayed?
            <br />
            Come in from the terminal.
          </h2>
          <p>
            Call our team directly for same-day room availability. We’ll help
            you find the most suitable room and answer questions about getting
            to the hotel.
          </p>
          <div className="flight-actions">
            <a className="button button-light" href="tel:+97715920235">
              Call +977 1 5920235
            </a>
            <button className="button button-outline" onClick={openBooking}>
              Request a room
            </button>
          </div>
        </div>
        <img
          src={HOTEL_IMAGES.pool}
          alt="Indoor swimming pool for travellers at Dees Boutique Hotel"
        />
      </section>

      <section className="section airport-journey">
        <div>
          <SectionIntro
            eyebrow="Everything in one stay"
            title="Reset before what’s next."
          />
          <p className="lead">
            A hot meal, a quiet room, reliable Wi-Fi and time in the indoor
            pool—small comforts that make a long journey feel lighter.
          </p>
          <div className="amenities airport-amenities">
            <span>
              <Icon name="check" size={16} /> Restaurant & rooftop
            </span>
            <span>
              <Icon name="check" size={16} /> Complimentary Wi-Fi
            </span>
            <span>
              <Icon name="check" size={16} /> Indoor swimming pool
            </span>
            <span>
              <Icon name="check" size={16} /> Sauna & fitness centre
            </span>
          </div>
          <button className="button button-dark" onClick={openBooking}>
            Plan your airport stay <Icon name="arrow" size={18} />
          </button>
        </div>
        <div className="airport-journey-image">
          <img
            src={HOTEL_IMAGES.superDeluxe}
            alt="King room near Kathmandu airport"
          />
          <span>Rest close. Travel easy.</span>
        </div>
      </section>

      <section className="airport-seo section">
        <SectionIntro
          eyebrow="Hotel near Tribhuvan International Airport"
          title="A connected base in Koteshwor."
        />
        <div>
          <p>
            Dees Boutique Hotel offers rooms and suites near Kathmandu airport
            for transit passengers, international visitors, business travellers
            and families beginning or ending a Nepal journey.
          </p>
          <p>
            Contact the hotel before arrival to discuss your flight schedule,
            current room availability and transport options.
          </p>
        </div>
      </section>
    </>
  )
}

function PageHero({
  eyebrow,
  title,
  copy,
  image,
  position = "center",
}: {
  eyebrow: string
  title: string
  copy: string
  image: string
  position?: string
}) {
  return (
    <section className="page-hero">
      <img src={image} alt="" style={{ objectPosition: position }} />
      <div className="hero-shade" />
      <div className="page-hero-copy">
        <span className="eyebrow light">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
    </section>
  )
}

function Stay({ openBooking }: { openBooking: () => void }) {
  return (
    <>
      <PageHero
        eyebrow="Sleep well in Kathmandu"
        title="Rooms & Suites"
        copy="A thoughtful retreat for every kind of journey."
        image={HOTEL_IMAGES.suite}
      />
      <section className="section page-intro">
        <SectionIntro
          center
          eyebrow="Your room, your rhythm"
          title="Space to arrive, pause and feel at home."
          copy="Calm interiors, considered essentials and the warmth of personal service come as standard."
        />
      </section>
      <section className="room-list section">
        {rooms.map((room, index) => (
          <article
            className={`room-detail ${index % 2 ? "reverse" : ""}`}
            key={room.name}
          >
            <div className="room-detail-image">
              <img src={room.image} alt={room.name} />
              <span>0{index + 1}</span>
            </div>
            <div className="room-detail-copy">
              <span className="eyebrow">{room.guests}</span>
              <h2>{room.name}</h2>
              <p>{room.copy}</p>
              <div className="details-row">
                <span>
                  <small>Room size</small>
                  {room.size}
                </span>
                <span>
                  <small>Sleep</small>
                  {room.bed}
                </span>
                <span>
                  <small>View</small>
                  {index === 2 ? "Garden & city" : "Kathmandu city"}
                </span>
              </div>
              <div className="amenities">
                <span>
                  <Icon name="check" size={16} /> Complimentary Wi-Fi
                </span>
                <span>
                  <Icon name="check" size={16} /> Flat-screen TV
                </span>
                <span>
                  <Icon name="check" size={16} /> Daily housekeeping
                </span>
                {index === 2 && (
                  <span>
                    <Icon name="check" size={16} /> Private balcony
                  </span>
                )}
              </div>
              <button className="button button-dark" onClick={openBooking}>
                Check availability <Icon name="arrow" size={18} />
              </button>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}

function Dining() {
  return (
    <>
      <PageHero
        eyebrow="Rooftop · Restaurant · Bar"
        title="Kathmandu at your table."
        copy="Himalayan horizons, city lights and a menu that travels from Nepal to the world."
        image={HOTEL_IMAGES.rooftopView}
        position="center 62%"
      />
      <section className="rooftop-story section">
        <div>
          <SectionIntro
            eyebrow="The rooftop"
            title="The view is only the beginning."
          />
          <p className="lead">
            On clear days, the Himalaya draws a line across the horizon. After
            dark, Kathmandu becomes a field of lights beneath the terrace.
          </p>
          <p>
            Come up for an unhurried drink, dinner in the evening air or a quiet
            moment above the rhythm of Koteshwor.
          </p>
          <a
            href="mailto:info@deeshotel.com.np?subject=Rooftop table reservation"
            className="button button-dark"
          >
            Reserve a rooftop table <Icon name="arrow" size={18} />
          </a>
        </div>
        <div className="rooftop-collage">
          <img
            src={HOTEL_IMAGES.rooftopLounge}
            alt="Terrace lounge at Dees Boutique Hotel"
          />
          <img
            src={HOTEL_IMAGES.observatory}
            alt="Rooftop observatory seating with Kathmandu city view"
          />
          <span>360° valley atmosphere</span>
        </div>
      </section>

      <section className="restaurant-showcase">
        <img
          src={HOTEL_IMAGES.restaurantOpenKitchen}
          alt="Fine dining restaurant and open kitchen at Dees Boutique Hotel"
        />
        <div>
          <span className="eyebrow light">Mitho Swad · Fine dining</span>
          <h2>
            From our farm
            <br />
            to your table.
          </h2>
          <p>
            Our kitchen brings together organic harvests from the hotel’s farm,
            premium local produce and a broad repertoire of Nepalese, Indian,
            Chinese and international cooking.
          </p>
          <div className="dining-moments">
            <span>Breakfast before a flight</span>
            <span>Family lunches</span>
            <span>Rooftop evenings</span>
          </div>
        </div>
      </section>

      <section className="menu-section section">
        <div className="menu-heading">
          <SectionIntro
            eyebrow="Menu highlights"
            title="Familiar flavours. Dees character."
            copy="A preview of guest favourites from our kitchen, served across the restaurant and rooftop."
          />
          <a
            href="mailto:info@deeshotel.com.np?subject=Current restaurant menu"
            className="text-link"
          >
            Request the current menu <Icon name="arrow" size={17} />
          </a>
        </div>
        <div className="proper-menu">
          <div className="menu-column">
            <span className="menu-category">To begin</span>
            <article>
              <div>
                <h3>Cheese & beetroot kebab</h3>
                <span>Vegetarian</span>
              </div>
              <p>Earthy beetroot, gentle spice and a crisp finish.</p>
            </article>
            <article>
              <div>
                <h3>Tandoori chicken pizza</h3>
                <span>From the oven</span>
              </div>
              <p>Smoky tandoori flavour on a shareable house pizza.</p>
            </article>
            <article>
              <div>
                <h3>Pork chop</h3>
                <span>Grill</span>
              </div>
              <p>Richly seasoned and carefully grilled.</p>
            </article>
          </div>
          <div className="menu-column">
            <span className="menu-category">Main plates</span>
            <article>
              <div>
                <h3>Nepali thali set</h3>
                <span>Local favourite</span>
              </div>
              <p>A generous, traditional expression of Nepal.</p>
            </article>
            <article>
              <div>
                <h3>Chicken biryani</h3>
                <span>Indian</span>
              </div>
              <p>Fragrant basmati rice, warm spice and slow-cooked flavour.</p>
            </article>
            <article>
              <div>
                <h3>Chicken cordon bleu</h3>
                <span>Continental</span>
              </div>
              <p>A classic international favourite, expertly prepared.</p>
            </article>
          </div>
        </div>
        <p className="menu-note">
          This is a selection of hotel specialties, not the full menu. Dishes
          may change with season and availability. Please ask our team about
          dietary requirements and the current menu.
        </p>
      </section>
      <section className="split-feature bar-feature dining-room-feature">
        <div className="split-image">
          <img
            src={HOTEL_IMAGES.restaurant}
            alt="Mitho Swad restaurant dining room"
          />
        </div>
        <div className="split-content dark">
          <SectionIntro
            eyebrow="Restaurant & bar"
            title="Stay for one more course."
          />
          <p>
            Warm timber, an open-kitchen energy and attentive service create an
            easy setting for everything from breakfast to celebrations.
          </p>
          <a
            href="mailto:info@deeshotel.com.np?subject=Table reservation"
            className="button button-outline"
          >
            Reserve a table <Icon name="arrow" size={18} />
          </a>
        </div>
      </section>
    </>
  )
}

function Wellness() {
  return (
    <>
      <PageHero
        eyebrow="Pool · Sauna · Fitness"
        title="Return to yourself."
        copy="Small rituals to restore your energy between journeys."
        image={HOTEL_IMAGES.pool}
      />
      <section className="section page-intro">
        <SectionIntro
          center
          eyebrow="Wellbeing at Dees"
          title="Move. Float. Exhale."
          copy="An indoor pool, sauna and fitness centre give you the freedom to keep your rhythm—or slow it down."
        />
      </section>
      <section className="facility-grid section">
        {[
          [
            HOTEL_IMAGES.pool,
            "Indoor pool",
            "Swim year-round in a serene, sheltered setting designed for an easy reset.",
          ],
          [
            HOTEL_IMAGES.gallery2,
            "Sauna",
            "Let travel tension dissolve in restorative warmth and quiet.",
          ],
          [
            HOTEL_IMAGES.gallery1,
            "Fitness centre",
            "Stay active with the essentials for a focused workout away from home.",
          ],
        ].map(([img, title, text], i) => (
          <article key={title}>
            <img src={img} alt={title} />
            <div>
              <span>0{i + 1}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="wellness-note">
        <span className="eyebrow">For resident guests</span>
        <h2>Wellbeing, woven into your stay.</h2>
        <p>
          Please ask our team for current operating hours and access guidance.
        </p>
      </section>
    </>
  )
}

function Events() {
  return (
    <>
      <PageHero
        eyebrow="Meetings · Celebrations · Banquets"
        title="Gather beautifully."
        copy="A welcoming setting for milestone moments and purposeful meetings."
        image={HOTEL_IMAGES.banquet}
      />
      <section className="section editorial-grid events-copy">
        <div>
          <SectionIntro
            eyebrow="The banquet hall"
            title="Your occasion, attentively hosted."
          />
          <p className="lead">
            From intimate celebrations to business gatherings, our flexible
            banquet setting pairs practical planning with the warmth of Dees
            hospitality.
          </p>
          <a
            href="mailto:info@deeshotel.com.np?subject=Event enquiry"
            className="button button-dark"
          >
            Plan your event <Icon name="arrow" size={18} />
          </a>
        </div>
        <div className="event-stats">
          <div>
            <strong>Central</strong>
            <span>Koteshwor location</span>
          </div>
          <div>
            <strong>Tailored</strong>
            <span>Food & beverage</span>
          </div>
          <div>
            <strong>Connected</strong>
            <span>Near the airport</span>
          </div>
        </div>
      </section>
      <section className="event-types section">
        {[
          "Corporate meetings",
          "Private celebrations",
          "Social gatherings",
        ].map((x, i) => (
          <article key={x}>
            <span>0{i + 1}</span>
            <h3>{x}</h3>
            <p>
              Thoughtful setups, attentive service and menus shaped around your
              occasion.
            </p>
            <a
              href="mailto:info@deeshotel.com.np?subject=Event enquiry"
              className="text-link"
            >
              Make an enquiry <Icon name="arrow" size={17} />
            </a>
          </article>
        ))}
      </section>
    </>
  )
}

function Gallery() {
  const images = [
    [HOTEL_IMAGES.exterior, "The hotel"],
    [HOTEL_IMAGES.rooftopView, "Himalayan rooftop view"],
    [HOTEL_IMAGES.rooftopLounge, "Terrace lounge"],
    [HOTEL_IMAGES.suite, "Suite living"],
    [HOTEL_IMAGES.pool, "Indoor pool"],
    [HOTEL_IMAGES.restaurantOpenKitchen, "Fine dining"],
    [HOTEL_IMAGES.superDeluxe, "Room details"],
    [HOTEL_IMAGES.observatory, "Observatory seating"],
  ]
  return (
    <>
      <div className="gallery-title section">
        <SectionIntro
          center
          eyebrow="A glimpse of Dees"
          title="See yourself here."
          copy="Spaces to rest, connect, celebrate and feel at home in Kathmandu."
        />
      </div>
      <section className="gallery-grid">
        {images.map(([img, label], i) => (
          <figure key={img} className={`gallery-item item-${i + 1}`}>
            <img src={img} alt={label} />
            <figcaption>
              <span>0{i + 1}</span>
              {label}
            </figcaption>
          </figure>
        ))}
      </section>
    </>
  )
}

function Location() {
  return (
    <>
      <PageHero
        eyebrow="Koteshwor · Kathmandu"
        title="Close to arrival. Connected to the city."
        copy="A convenient base for discovering the cultural heart of the Kathmandu Valley."
        image={DESTINATION_IMAGES.temple}
        position="center 58%"
      />
      <section className="location-grid section">
        <div>
          <SectionIntro
            eyebrow="Find your way"
            title="Kathmandu at your doorstep."
          />
          <p className="lead">
            Dees Boutique Hotel is located on Shree Shanti Marga in Koteshwor,
            approximately one kilometre from Tribhuvan International Airport.
          </p>
          <p>
            Our location offers easy access for early arrivals and onward
            journeys, with the capital’s rich cultural experiences within reach.
          </p>
          <a
            className="button button-dark"
            href="https://maps.google.com/?q=Dees+Boutique+Hotel+Koteshwor+Kathmandu"
            target="_blank"
            rel="noreferrer"
          >
            Open in Google Maps <Icon name="map" size={18} />
          </a>
        </div>
        <div className="location-card">
          <span className="eyebrow">The address</span>
          <h3>Dees Boutique Hotel</h3>
          <p>
            Koteshwor, Shree Shanti Marga
            <br />
            Kathmandu, Nepal
          </p>
          <hr />
          <p>
            <Icon name="phone" size={18} /> +977 1 5920235 / 36
          </p>
          <p>
            <Icon name="mail" size={18} /> info@deeshotel.com.np
          </p>
        </div>
      </section>
      <section className="nearby section">
        <SectionIntro
          eyebrow="Discover nearby"
          title="The valley, within reach."
        />
        <div className="nearby-grid">
          {[
            [
              "Tribhuvan Airport",
              "Approx. 1 km",
              "A smooth beginning and end to your journey.",
            ],
            [
              "Patan Durbar Square",
              "Cultural landmark",
              "Centuries of Newari architecture and living heritage.",
            ],
            [
              "Boudhanath Stupa",
              "Sacred Kathmandu",
              "One of the world’s great centres of Tibetan Buddhism.",
            ],
          ].map(([x, y, z]) => (
            <article key={x}>
              <span>{y}</span>
              <h3>{x}</h3>
              <p>{z}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function BookingModal({ close }: { close: () => void }) {
  const [step, setStep] = useState(1)
  const [room, setRoom] = useState("Super Deluxe")
  const submit = (e: FormEvent) => {
    e.preventDefault()
    setStep(2)
  }
  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Book your stay"
    >
      <div className="booking-modal">
        <button
          className="modal-close"
          aria-label="Close booking"
          onClick={close}
        >
          <Icon name="close" />
        </button>
        {step === 1 ? (
          <>
            <span className="eyebrow">Direct booking</span>
            <h2>Plan your stay.</h2>
            <p>
              Share your dates and our team will confirm the best available room
              and rate directly.
            </p>
            <form onSubmit={submit}>
              <div className="form-row">
                <label>
                  Check in
                  <input required type="date" />
                </label>
                <label>
                  Check out
                  <input required type="date" />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Guests
                  <select>
                    <option>1 guest</option>
                    <option>2 guests</option>
                    <option>3 guests</option>
                    <option>Family</option>
                  </select>
                </label>
                <label>
                  Room
                  <select
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                  >
                    {rooms.map((x) => (
                      <option key={x.name}>{x.name}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                Email address
                <input required type="email" placeholder="you@example.com" />
              </label>
              <button className="button button-gold full" type="submit">
                Request availability <Icon name="arrow" size={18} />
              </button>
            </form>
            <small>
              Best available direct rate · Personal confirmation · No booking
              fee
            </small>
          </>
        ) : (
          <div className="success">
            <span>
              <Icon name="check" size={32} />
            </span>
            <h2>Your Kathmandu stay starts here.</h2>
            <p>
              Thank you. Our reservations team will reply with availability for
              the {room} and the best direct rate.
            </p>
            <button className="button button-dark" onClick={close}>
              Return to the hotel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function Footer({ openBooking }: { openBooking: () => void }) {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <Wordmark light />
          <p>
            A considered boutique stay in
            <br />
            the heart of Kathmandu.
          </p>
        </div>
        <div>
          <span className="footer-label">Explore</span>
          <a href="#/stay">Rooms & suites</a>
          <a href="#/airport">Airport stays</a>
          <a href="#/dining">Dining</a>
          <a href="#/wellness">Wellness</a>
          <a href="#/events">Events</a>
          <a href="#/gallery">Gallery</a>
        </div>
        <div>
          <span className="footer-label">Visit</span>
          <p>
            Koteshwor, Shree Shanti Marga
            <br />
            Kathmandu, Nepal
          </p>
          <a href="tel:+97715920235">+977 1 5920235 / 36</a>
          <a href="mailto:info@deeshotel.com.np">info@deeshotel.com.np</a>
        </div>
        <div className="footer-cta">
          <span className="footer-label">Stay with us</span>
          <h2>
            Make Kathmandu
            <br />
            feel like yours.
          </h2>
          <button className="text-link light-link" onClick={openBooking}>
            Book direct <Icon name="arrow" size={18} />
          </button>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Dees Boutique Hotel</span>
        <span>Kathmandu, Nepal</span>
        <span>Privacy · Terms</span>
      </div>
    </footer>
  )
}

export default function App() {
  const getPage = (): Page => {
    const value = window.location.hash.replace("#/", "") as Page
    return [
      "home",
      "stay",
      "airport",
      "dining",
      "wellness",
      "events",
      "gallery",
      "location",
    ].includes(value)
      ? value
      : "home"
  }
  const [page, setPage] = useState<Page>(getPage)
  const [booking, setBooking] = useState(false)
  useEffect(() => {
    const change = () => {
      setPage(getPage())
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
    window.addEventListener("hashchange", change)
    return () => window.removeEventListener("hashchange", change)
  }, [])
  useEffect(() => {
    const titles: Record<Page, string> = {
      home: "Dees Boutique Hotel | Kathmandu",
      stay: "Rooms & Suites | Dees Boutique Hotel",
      airport: "Hotel Near Kathmandu Airport | Dees Boutique Hotel",
      dining: "Rooftop Restaurant in Kathmandu | Dees Boutique Hotel",
      wellness: "Pool & Wellness | Dees Boutique Hotel",
      events: "Events & Banquets | Dees Boutique Hotel",
      gallery: "Gallery | Dees Boutique Hotel",
      location: "Koteshwor Location | Dees Boutique Hotel",
    }
    document.title = titles[page]
    const descriptions: Record<Page, string> = {
      home: "Stay at Dees Boutique Hotel in Koteshwor, approximately 1 km from Kathmandu airport, with rooms, rooftop dining, indoor pool and warm Nepali hospitality.",
      stay: "Explore Deluxe, Super Deluxe and spacious Suite accommodation at Dees Boutique Hotel in Kathmandu.",
      airport:
        "Hotel near Tribhuvan International Airport in Kathmandu for late arrivals, early departures, layovers and delayed flights. Contact Dees Boutique Hotel directly.",
      dining:
        "Discover rooftop dining with Himalayan views, Nepalese specialties and international favourites at Dees Boutique Hotel in Koteshwor, Kathmandu.",
      wellness:
        "Indoor pool, sauna and fitness facilities at Dees Boutique Hotel in Kathmandu.",
      events:
        "Host meetings, celebrations and banquets at Dees Boutique Hotel in Koteshwor, Kathmandu.",
      gallery:
        "View rooms, rooftop views, dining, pool and event spaces at Dees Boutique Hotel in Kathmandu.",
      location:
        "Find Dees Boutique Hotel on Shree Shanti Marga, Koteshwor, approximately 1 km from Tribhuvan International Airport.",
    }
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", descriptions[page])
  }, [page])
  const openBooking = () => setBooking(true)
  return (
    <div className="app">
      <Header page={page} openBooking={openBooking} />
      <main>
        {page === "home" && <Home openBooking={openBooking} />}
        {page === "stay" && <Stay openBooking={openBooking} />}
        {page === "airport" && <Airport openBooking={openBooking} />}
        {page === "dining" && <Dining />}
        {page === "wellness" && <Wellness />}
        {page === "events" && <Events />}
        {page === "gallery" && <Gallery />}
        {page === "location" && <Location />}
      </main>
      <Footer openBooking={openBooking} />
      <button className="mobile-book" onClick={openBooking}>
        Book your stay <Icon name="arrow" size={18} />
      </button>
      {booking && <BookingModal close={() => setBooking(false)} />}
    </div>
  )
}
