# DigiLeaf Technologies Website

A futuristic website for DigiLeaf Technologies, showcasing their robotics innovations with smooth animations and modern UI.

![DigiLeaf Technologies](https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)

## Features

- Futuristic and modern UI design
- Particle and 3D animations using Three.js
- Smooth scroll and parallax effects
- Interactive UI elements with hover animations
- Fully responsive layout for all devices
- Dark theme with glowing accents

## Tech Stack

- React.js
- Styled Components for styling
- Framer Motion for animations
- Three.js for 3D elements
- GSAP for advanced animations
- React Intersection Observer for scroll animations

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/digileaf-website.git
```

2. Navigate to the project directory
```bash
cd digileaf-website
```

3. Install dependencies
```bash
npm install
```

4. Start the development server
```bash
npm start
```

The website will be available at http://192.168.0.217:3000

## Project Structure

```
digileaf-website/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Hero.js
│   │   ├── About.js
│   │   ├── RoboticsPlatform.js
│   │   ├── Products.js
│   │   ├── Research.js
│   │   ├── Contact.js
│   │   └── Footer.js
│   ├── assets/
│   │   └── ...
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Build for Production

To build the website for production, run:

```bash
npm run build
```

This will create a `build` directory with optimized production-ready files.

## Customization

### Colors

The main color scheme can be modified in `src/index.css` by changing the CSS variables in the `:root` selector.

### Content

To update the website content, modify the respective component files in the `src/components` directory. Each component contains its own content that can be easily edited.

### Images

Replace the placeholder images with your own by updating the image URLs in each component.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Three.js](https://threejs.org/) for 3D graphics
- [Framer Motion](https://www.framer.com/motion/) for animations
- [GSAP](https://greensock.com/gsap/) for advanced animations
- [Styled Components](https://styled-components.com/) for styling
- [Font Awesome](https://fontawesome.com/) for icons
- [Unsplash](https://unsplash.com/) for placeholder images
