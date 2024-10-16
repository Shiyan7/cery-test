Тестове завдання
Мета: Додати до таблиці функціонал сортування, пагінації, фільтрації елементів

Основні вимоги:

1. Кожну колонку таблиці можна відсортувати у прямому або зворотньому порядку
2. Значення кожної з колонок таблиці можна відфільтрувати відповідними фільтрами.
   Якщо колонка має обмежений список можливих значень - користувач має змогу знайти та обрати одне
   або декілька із цих значень із випадаючого списку.
3. В таблиці можна гортати сторінки(в кожній сторінці має бути до 25 елементів)
4. Код відформатований, чистий, типізований і зрозумілий. В консолі немає помилок
5. Усі фільтри, сортування та пагінація відображаються у рядку URL

Додатково (розглядається як + якщо 1-5 зроблено):

6. У рядку URL відображаються лише ті фільтри, які користувач застосував(усі дефолтні налаштування не відображаються)
7. Якщо після застосування фільтрів у таблиці немає жодного елемента - користувач бачить замість тіла таблиці
   кнопку Reset Filters, яка скидає фільтри
8. Мінімізовано використання сторонніх бібліотек для зменьшення розміру бандла
9. Хедер таблиці прилипає до гори під час скролу вниз(поведінка така сама, як у блока пагінації)

Корисна інформація:
Використовувати для рішення задач ШІ - це ок, якщо Ви розумієте, що він пише і не копіюєте помилки, які він допускає.
Техлід дуже цінує іменування пропсів, коли коллбеки-реакції на якісь дії іменуються `onDoSomething`

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
