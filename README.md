This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, clone the following repository into another file and deploy it : [Novarift-back](https://github.com/AcePeed/novarift_backend)

Second, copy the `.env.local.example` file to `.env.local` using the following commands : 
```bash
cp .env.local.example .env.local
```
And change the environment variables according to your needs, to understand those variables, reffer to this [section](#environment-variables).

Third, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Environment Variables
The `.env` files contains the following variables : 

 - FRONT_HOST : (Optionnal) The url for your front-end
 - API_HOST : (Required) The url for your backend/api from this app, example : 'localhost:3333'
 - API_HOST_EXT : (Required) The url for your backend/api from an external person visiting the website, example : 'www.novarift.com/api'

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
