# Portfolio Website

This is a simple static portfolio website for Arabboy Abdurasulov (aka Web Developer A).
It showcases skills, services, and example projects. The site is built with HTML, CSS, and vanilla JavaScript.

## Structure

- `index.html` – main page
- `style.css` – all styles (dark theme, responsive layout)
- `script.js` – interactive behaviours (custom cursor, smooth scrolling, contact form, etc.)
- `images/` – project thumbnails, logo, avatar photo, etc.

## Contact form

The contact section uses [EmailJS](https://www.emailjs.com/) to send messages without a custom backend. The following IDs are present in `script.js`:

- User ID: `i3EQ1T80MaHezU6yr`
- Service ID: `service_tp5tqzf`
- Template ID: `template_71uy5yn`

These values are not sensitive credentials, but you may want to replace them with your own account information if you fork or reuse this project. Do not commit any private API keys or passwords to the repository.

## Deployment

The site can be hosted on GitHub Pages, Netlify, Vercel, or any static file server. Just push the repository to GitHub and enable pages from the `main` branch (or `gh-pages` branch if you prefer).

## Privacy and Security

No passwords, API keys, or other confidential data are stored in this repo. The only external dependency is EmailJS, which uses publicly-initialised IDs. If you add new services, handle secrets using environment variables or server-side code and make sure to add them to `.gitignore`.

## License

Feel free to use and modify this code as you like. Attribution is appreciated but not required.
