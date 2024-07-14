/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    '../client/src/components/Login.jsx',
    '../client/src/components/Login2.jsx',
    '../client/src/components/menu/ForgotPassword.jsx',
    '../client/src/components/menu/Sidebar.jsx',
    '../client/src/components/general/SelectCountry.jsx',
    '../client/src/components/general/Popup.jsx',
    '../client/src/components/Comments/GetComments.jsx',
    '../client/src/components/Comments/CreateComments.jsx',
    '../client/src/components/Home.jsx',
    "../client/src/components/Profile/UserProfile.jsx",
    "../client/src/components/Profile/OtherProfiles.jsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

