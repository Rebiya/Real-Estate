project:
  name: "NovaNest 🏡 - Your Ultimate Real Estate Solution"
  description: >
    NovaNest is a modern, role-based real estate platform designed to streamline property listings,
    bookings, and management. Built with a cutting-edge tech stack, it offers an intuitive interface
    for both users and admins, ensuring a seamless real estate experience.
  demo_video: "https://www.youtube.com/watch?v=UuRmdEgsE14"

features:
  users:
    - "Browse available properties with detailed descriptions and images"
    - "Schedule property bookings via Calendly"
    - "Book properties and track their status"
  admins:
    - "View a list of booked properties"
    - "Manage the state of properties: Sold properties are removed, Pending properties can be marked as Available"
    - "Upload new properties with images and details"
    - "Manage user bookings via the Mantine Core UI"

tech_stack:
  frontend:
    - React 18
    - Mantine Core
    - Leaflet
    - Esri Leaflet Geocoder
    - Framer Motion
    - Swiper
    - React Query
    - Tailwind CSS
    - React Icons
  backend:
    - Node.js
    - Express (backend required but not in repo)
    - Auth0 (for role-based authentication & authorization)
    - Axios
    - MySQL or MongoDB (configurable)

installation:
  clone_repository:
    - git clone https://github.com/Rebiya/Real-Estate.git
    - cd novanest
  install_dependencies:
    - npm install
  environment_variables:
    - VITE_API_URL=your_api_endpoint
    - VITE_AUTH0_DOMAIN=your_auth0_domain
    - VITE_AUTH0_CLIENT_ID=your_auth0_client_id
  run_dev_server:
    - npm run dev

authentication:
  role_based_access:
    users:
      - "Browse properties"
      - "Book homes"
      - "Track booking status"
    admins:
      - "Approve/reject bookings"
      - "Mark homes as sold or available"
      - "Upload new properties"

contact:
  email: "rebum.19@gmail.com"
  website: "https://full-stack-real-estate-youtube-sooty.vercel.app/"
  linkedin: "https://www.linkedin.com/in/rebiya/"
