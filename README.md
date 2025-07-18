# MedEasy
---

## Website Overview

MedEasy is a full-stack pharmacy e-commerce platform designed for customers, sellers, and admins. It provides smooth product browsing, secure authentication, cart and checkout functionality with Stripe payment integration, and comprehensive dashboards for admin and sellers to manage products, users, payments, and advertisements.

---

## Credentials

| Role    | Email               | Password       |
|---------|---------------------|----------------|
| Admin   | admin@gmail.com   | 123456 |
| Seller  | seller@gmail.com  | 123456 |
| Customer  | customer@gmail.com  | 123456 |

---

## Live Site

🔗 [Live Site URL](https://your-live-site-url.com)

---

## Features

### General

- Responsive design optimized for mobile, tablet, and desktop devices, including dashboards.
- Multi-role user system: Customers, Sellers, and Admins.
- Authentication & Authorization with Firebase and JWT tokens stored in localStorage.
- Smooth user registration and login with Email/Password and Google Sign-In.
- Role-based UI and API access control for secure private routes.
- React-hot-toast notifications for all CRUD operations, login/signup, and errors.
- Environment variables securely hide Firebase config and MongoDB credentials.
- TanStack Query implemented for efficient and reactive data fetching (GET requests).
- Dynamic page titles using `react-helmet`

### Home Page

- Navbar with logo, site name, Home, Shop, Cart icon, languages dropdown, Join Us / User Profile dropdown.
- Product slider section with SwiperJS showing admin-managed advertisement slides.
- Category cards displaying name, image, and medicine count; clicking navigates to category details.
- Category details page listing medicines in a table with view and select buttons.
- Discounted products section with draggable multi-card slider.
- Two custom content sections relevant to the pharmacy domain.
- Fully responsive footer.

### Shop Page

- All medicines displayed in a sortable, searchable, paginated table.
- Modal detail views for each medicine.
- Select button to add items to the cart.

### Cart Page

- Table view of selected medicines with quantity management, delete item, clear all.
- Checkout button navigates to checkout page.

### Checkout Page

- Stripe payment integration for grand total purchase.
- Upon successful payment, user is redirected to invoice page.
- Payment status is initially `pending` and must be accepted by Admin for internal policy.
- Cart and checkout data cleared after payment.

### Invoice Page

- Detailed invoice with website logo, user info, purchase details.
- Print/download PDF functionality.

---

## User Dashboard

- View all past payment history with transaction IDs and payment statuses (`pending` / `paid`).

---

## Admin Dashboard

- Dashboard homepage with total sales revenue, including paid and pending amounts.
- Manage Users: promote/demote users (to admin/seller/customer).
- Manage Categories: add, update, delete categories with image upload support.
- Payment Management: view pending payments; accept to mark as paid, which moves the record.
- Sales Report: tabular sales info with date-range filtering and XLSX download.
- Manage Banner Advertisements: approve or remove seller advertisement requests to display on homepage slider.

---

## Seller Dashboard

- Dashboard homepage showing seller-specific total sales (paid and pending).
- Manage Medicines: add, edit, view medicines with comprehensive details.
- Payment History: view buyer payment history with statuses.
- Ask For Advertisement: request advertisement for medicines, with review modal.

---

## Challenge Features

- Medicine tables across the site implement pagination, price sorting, and search by name/generic/company.
- JWT access tokens stored in localStorage and verified on every private route API call.
- Download sales reports in PDF and Excel formats.
- Date range filters for sales reports.
- React Hook Form used for all form validations and submissions.
- Dynamic titles implemented with `react-helmet` and `re-title`.

---

## Technologies Used

- Frontend: React, React Router, React Hook Form, React Helmet, TanStack Query, SwiperJS, React-hot-toast, Stripe, Firebase Authentication.
- Backend: Node.js, Express.js, MongoDB, JWT, Stripe API.
- Deployment: firebase and vercel.

---

## How to Run Locally

1. Clone the client and server repositories.
2. Setup `.env` files with Firebase config, MongoDB URI, JWT secret, and Stripe keys.
3. Run `npm install` in both client and server directories.
4. Start server: `nodemon index.js`.
5. Start client: `npm run dev`.

---

## GitHub Repositories

- Client Side: [https://github.com/yourusername/medeasy-client](https://github.com/yourusername/medeasy-client)
- Server Side: [https://github.com/yourusername/medeasy-server](https://github.com/yourusername/medeasy-server)

---

Thank you for checking out **MedEasy** — your trusted online pharmacy platform!

---

