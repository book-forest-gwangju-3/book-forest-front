/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-1": "#FEF9EB",
        "color-2": "#EFEADA",
        "color-3": "#E2DBC8",
        "color-4": "#C0966C",
        "color-5": "#867C61",
        "color-6": "#D1E8A1",
        "color-7": "#ACDB80",
        "color-8": "#74AA6B",
        "color-9": "#4F7561",
        "color-10": "#335643",
        "color-11": "#F9D84C",
        "color-12": "#F82F62",
        "color-13": "#E16D75",
        "color-14": "#80C7A8",
        "color-15": "#193018",
        "color-16": "#EFEFEF",
        "color-17": "#C4C4C4",
        "color-18": "#A1A1A1",
        "color-19": "#BCB5A3",
        "color-20": "#6E6E6E",
        "color-21": "#0064AD",
        "color-22": "#617A3A",
        "color-23": "#F2F2F2",
        "color-24": "#DDEAF3",
        "color-25": "#CA9472",
        "color-26": "#D6E8D3",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.underline-after': {
          position: 'relative',
          '&::after': {
            content: '""',
            display: 'block',
            borderBottom: '4px solid #617A3A',
            width: '100%',
            position: 'absolute',
            bottom: '-12px',
            left: '0',
          },
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
