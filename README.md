# Real Estate Listing App 🏡

This is a real estate web app built with **Next.js 14 App Router**, using **ShadCN UI** components. Users can browse, view, and create property listings.

---

## 🚀 Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/toony10/real-estate-task
cd real-estate-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Add `.env.local`**

```env
NEXT_PUBLIC_API_BASE_URL=https://683a33cb43bb370a86721a5d.mockapi.io/api/v1
```

4. **Run the app locally**

```bash
npm run dev
```

---

## 🧠 Structure & Choices

- **Next.js 15 (App Router)**  
  Used for SSR/SSG and server/client component separation.

- **ShadCN UI**  
  For clean and accessible UI components (form, card, pagination, dialog, etc.).

- **MockAPI**  
  Used as the backend for CRUD operations (properties listing).

- **Routing & Pages**
  - `/properties`: List all properties with pagination.
  - `/properties/[id]`: View property details.
  - `/admin/properties/create`: Create new property.
  - `/admin/properties/[id]/edit`: Edit existing property.

- **Pagination**  
  Done using server-side data + dynamic page query.