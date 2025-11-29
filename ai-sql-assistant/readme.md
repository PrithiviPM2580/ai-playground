## AI SQL Assistant

An Express + Prisma reference app that turns natural-language questions into executable SQL using Google Gemini, runs the query against a MariaDB/MySQL database, and replies with both the SQL and a natural-language summary of the results.

### Why this exists
- Rapidly explore a structured dataset without hand-writing SQL
- Showcase how to combine Gemini 2.5, Prisma, and Express
- Provide a minimal pattern for prompt engineering + database tooling

---

### Highlights
- **Conversational querying** - in-memory conversation history keeps prompts contextual while staying server-side.
- **Raw SQL generation** - Gemini is instructed to answer with plain SQL, ensuring Prisma can execute the output directly.
- **Result summarization** - every query response includes a natural-language recap of the returned rows for readability.
- **MariaDB/MySQL ready** - Prisma schema and generated client target MySQL-compatible databases via the MariaDB adapter.
- **Seedable dataset** - repeatable fixtures for Students, Batches, and Fees to exercise analytical queries quickly.

---

### System architecture
| Layer | Responsibility | Key files |
| --- | --- | --- |
| HTTP API | Accepts prompts, orchestrates AI + DB workflow, exposes `/prompt` endpoint. | `src/index.ts` |
| AI service | Configures Gemini client, builds prompts, manages lightweight memory. | `src/config/gemini.config.ts`, `src/utils/index.ts` |
| Data access | Prisma client w/ MariaDB adapter, schema + migrations, seeding helpers. | `prisma/schema.prisma`, `src/config/prisma.config.ts`, `src/seed/index.ts` |
| Domain data | Entities + fixtures for `Student`, `Batch`, `Fee`. | `src/constants/index.ts`, `src/types/index.d.ts` |

Request flow:
1. Client POSTs `{ prompt }` to `/prompt`.
2. `generateWithMemory` sends prompt (+ history) to Gemini using the `systemPrompt` so only SQL is returned.
3. Prisma executes the SQL via `$queryRawUnsafe`.
4. Results are normalized (`extractDynamic`) and passed back into Gemini for a textual summary.
5. API responds with `{ sql, result, aiResponse }`.

> **Note:** Conversation memory lives in-memory (`generateWithMemory`) and resets when the Node process restarts. Persist if you need cross-request history.

---

### Tech stack
- Node.js 20+ (ESM)
- Express 5
- Prisma 7 + `@prisma/adapter-mariadb`
- Google Gemini 2.5 Flash via `@google/genai`
- pnpm 10 (see `packageManager` field)

---

### Project layout
```
src/
	index.ts              # Express server + routes
	config/
		gemini.config.ts    # Google Gemini SDK wrapper
		prisma.config.ts    # Prisma client w/ MariaDB adapter
	utils/index.ts        # Prompting, memory, SQL execution helpers
	constants/index.ts    # Seed fixtures
	seed/index.ts         # Seed script (ts-node/tsx)
	types/index.d.ts      # Global TypeScript interfaces
prisma/
	schema.prisma         # Prisma schema
	migrations/           # Generated migrations
```

---

### Environment variables
Create `.env` (or update `.env.example`) with the values your stack needs.

| Variable | Required | Purpose |
| --- | --- | --- |
| `PORT` | Optional | HTTP port (defaults to `3000`). |
| `GOOGLE_API_KEY` | Yes | Gemini API key. Matches `src/config/gemini.config.ts`. |
| `DATABASE_URL` | Yes | Prisma connection string (used by CLI + migrations). Example: `mysql://user:pass@host:3306/db`. |
| `DB_HOST` | Yes | MariaDB/MySQL host for the adapter. |
| `DB_PORT` | Yes | Database port (number). |
| `DB_USER` | Yes | Database username. |
| `DB_PASSWORD` | Yes | Database password. |
| `DB_NAME` | Yes | Database name. |

> Tip: keep both `DATABASE_URL` (for Prisma CLI) **and** the discrete `DB_*` vars (for the adapter) in sync. Update `.env.example` similarly for teammates.

---

### Getting started
1. **Install dependencies**
	 ```bash
	 pnpm install
	 ```
2. **Prep environment**
	 - Copy `.env.example` -> `.env`
	 - Fill in the variables listed above
3. **Run database migrations**
	 ```bash
	 pnpm prisma:migrate
	 ```
	 This also regenerates the Prisma client in `src/generated/prisma`.
4. **Seed sample data** (optional but recommended)
	 ```bash
	 pnpm tsx src/seed/index.ts
	 ```
5. **Start the dev server**
	 ```bash
	 pnpm dev
	 ```
6. Send a request:
	 ```bash
	 curl -X POST http://localhost:3000/prompt \
		 -H "Content-Type: application/json" \
		 -d '{"prompt":"Show unpaid students with their batches"}'
	 ```

You should receive JSON containing the generated SQL, raw rows, and the Gemini-written summary.

---

### API surface
| Method | Path | Body | Description |
| --- | --- | --- | --- |
| `GET` | `/` | - | Health-check: returns plain text confirming the service is running. |
| `POST` | `/prompt` | `{ prompt: string }` | Core endpoint-converts the prompt to SQL, runs it, and replies with `{ sql, result, aiResponse }`. |

Example response payload:
```json
{
	"sql": "SELECT name, fees_status FROM Student WHERE fees_status = 'UNPAID';",
	"result": [
		{ "name": "Sita Magar", "fees_status": "UNPAID" },
		{ "name": "Bikram Lama", "fees_status": "UNPAID" }
	],
	"aiResponse": "There are 2 students who still owe fees: Sita Magar and Bikram Lama."
}
```

---

### Development tips
- **Prisma client** - whenever you edit `prisma/schema.prisma`, rerun `pnpm prisma:generate` or `pnpm prisma:migrate`.
- **Safety** - `generateDataWithQuery` uses `$queryRawUnsafe` so the AI must never emit destructive SQL. Consider adding allow-lists or a SQL validator before production use.
- **Prompt tuning** - edit `systemPrompt()` (`src/utils/index.ts`) to refine SQL style, apply row limits, or enforce filters.
- **Memory** - current memory is a simple array. Replace with Redis or a DB if you need multi-instance state.

---

### Troubleshooting
- **Gemini auth errors** - ensure `GOOGLE_API_KEY` is set and the project has access to Gemini 2.5 Flash.
- **Prisma connection failures** - verify both `DATABASE_URL` and `DB_*` vars point to the same reachable database.
- **BigInt serialization** - Express response sanitizes BigInts by converting to Number; adjust if precision matters.
- **Schema drift** - run `pnpm prisma:migrate status` to see if migrations are out of sync.

---

### Next steps / ideas
1. Replace `$queryRawUnsafe` with parameterized helpers or an allow-list to harden production usage.
2. Add authentication & per-user memory persistence.
3. Extend the schema or connect to your own dataset by editing `prisma/schema.prisma` + seeds.
4. Deploy the service (Fly.io, Render, etc.) with managed MariaDB and a secrets manager.

---

