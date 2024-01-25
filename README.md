# Bridge Hotel Reservations

This project uses cleaned and filtered data from https://www.kaggle.com/datasets/PromptCloudHQ/indian-hotels-on-cleartrip

Tech used:

- Next JS (React + Drizzle + Tailwind + shadcn UI)
- Postgres

---

### What's missing:

- Frontend Validations
- Test
- Better UI
- more filtering options (would be similar to location filter in case of the states being pulled to the url)
- Pagination (show only top 12 hotels)

---

### What's included

- Full expected functionality
  - Hotel listing
  - Hotel booking on different page
  - Nagvigating back to hotel list with filters retained
- Backend validations for not booking on same dates
- Responsiveness
- React Server components ✨
- Data from database

Steps to Run

It's assumed that you have docker installed.

```
docker compose --env-file .env.local up
```
