# 📘 README Structure for NovaNest

project:
  name: "🏡 NovaNest – Your Ultimate Real Estate Solution"
  description: >
    NovaNest is a modern, role-based real estate platform designed to streamline property listings,
    bookings, and management. Built with a cutting-edge tech stack, it provides a seamless and intuitive 
    experience for both users and admins.
  demo_video: "https://www.youtube.com/watch?v=UuRmdEgsE14"

features:
  users:
    - "🔍 Browse properties with detailed descriptions and images"
    - "📅 Schedule bookings via Calendly"
    - "📦 Track the status of their bookings"
  admins:
    - "📋 View booked properties"
    - "🟢 Mark pending properties as available or remove sold properties"
    - "📤 Upload new properties with full descriptions and images"
    - "🧩 Manage bookings through Mantine Core UI"

tech_stack:
  frontend:
    - "⚛️ React 18"
    - "🎨 Mantine Core"
    - "🗺️ Leaflet & Esri Geocoder"
    - "🎞️ Framer Motion"
    - "🖼️ Swiper"
    - "🔄 React Query"
    - "🧵 Tailwind CSS"
    - "⭐ React Icons"
  backend:
    - "🧠 Node.js & Express (external backend)"
    - "🔐 Auth0 (role-based authentication)"
    - "🌍 Axios (API handling)"
    - "🗄️ MySQL or MongoDB (choose one)"

installation:
  clone_repo:
    - "git clone https://github.com/Rebiya/Real-Estate.git"
    - "cd novanest"
  install_dependencies:
    - "npm install"
  setup_env:
    - "Create `.env` file with the following:"
    - "VITE_API_URL=your_api_endpoint"
    - "VITE_AUTH0_DOMAIN=your_auth0_domain"
    - "VITE_AUTH0_CLIENT_ID=your_auth0_client_id"
  run_project:
    - "npm run dev"

authentication:
  roles:
    user:
      - "👤 Browse properties"
      - "📆 Book homes"
      - "📦 Track bookings"
    admin:
      - "🛠 Approve or reject bookings"
      - "📌 Mark homes as sold or available"
      - "📤 Upload new property listings"

contact:
  email: "📧 rebum.19@gmail.com"
  website: "🌐 https://full-stack-real-estate-youtube-sooty.vercel.app/"
  linkedin: "🔗 https://www.linkedin.com/in/rebiya/"

note: >
  Backend is not included in this repository but required for full functionality.
  Configure APIs and database accordingly.
