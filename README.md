# Logo---The-Art-of-Fallacy
Learn common aristotle fallacies with CES letter statements.
# 🦉 LOGOS — The Art of Fallacy

> *An academic trivia game for LDS apologetics students and critical thinkers*

LOGOS is a browser-based educational game that teaches players to identify logical fallacies using real-world arguments drawn from criticism of the LDS faith. Players progress through three tiers of mastery — from identifying the broad category of a fallacy, to naming the specific fallacy, to writing a full explanation graded by AI.

---

## 📁 Project Structure

```
logos-project/
├── public/
│   └── index.html        ← The complete game (HTML + CSS + JS, single file)
├── api/
│   └── claude.js         ← Vercel serverless proxy for the Anthropic API
├── vercel.json           ← Vercel deployment configuration
└── README.md             ← This file
```

---

## 🚀 Deploying to Vercel

### Prerequisites
- A [Vercel account](https://vercel.com) (free tier works)
- An [Anthropic API key](https://console.anthropic.com)
- [Git](https://git-scm.com) installed on your machine

### Step 1 — Push to GitHub

```bash
# From inside the logos-project folder:
git init
git add .
git commit -m "Initial commit — LOGOS game"
```

Create a new repository on [github.com](https://github.com), then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/logos-fallacies.git
git branch -M main
git push -u origin main
```

### Step 2 — Import into Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your `logos-fallacies` repo
4. Leave all build settings at their defaults — Vercel will detect them via `vercel.json`
5. Click **Deploy**

### Step 3 — Add Your API Key

After the first deploy (it will fail without the key — that's expected):

1. In Vercel, go to your project → **Settings** → **Environment Variables**
2. Add a new variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-...` *(your key from console.anthropic.com)*
   - **Environment:** Production, Preview, Development (check all three)
3. Click **Save**
4. Go to **Deployments** → click the three dots on your latest deployment → **Redeploy**

Your game will now be live at `https://logos-fallacies.vercel.app` (or your custom domain).

---

## 🔧 Running Locally

If you want to test locally before deploying, install the Vercel CLI:

```bash
npm install -g vercel
```

Create a `.env.local` file in the project root:

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Then run:

```bash
vercel dev
```

This starts a local server at `http://localhost:3000` that mimics the Vercel environment, including the `/api/claude` serverless function.

---

## 🎮 How the Game Works

### Three Tiers of Mastery

| Tier | Name | Points | Challenge |
|------|------|--------|-----------|
| I | **Genus** | 5 pts | Select the correct *category* of fallacy |
| II | **Species** | 10 pts | Identify the *specific* fallacy by name |
| III | **Logos** | 20 pts | Write a full explanation, graded by Claude |

**Timer Bonus:** Enable the Hourglass for +10 points per tier if answered within 30 seconds.

### AI Grading Modes

The Tier III explanation is graded by Claude using an adaptive difficulty system:

- **Lenient** — Encouraging; partial understanding earns full credit
- **Strict** — Engaged after 3 consecutive full-credit answers; requires precision
- **Partial Credit** — Engaged after 3 consecutive strict partial-credits; fair middle ground
- System cycles back to Lenient after 3 partial-credit scores in strict/partial modes

### Academic Ranks

Players earn ranks as their score grows:

| Rank | Points Required |
|------|----------------|
| Novice Inquirer | 0 |
| Sophomore | 30 |
| Rhetorician | 75 |
| Dialectician | 150 |
| Logician | 250 |
| Philosopher | 375 |
| Academician | 500 |
| Sophist-Slayer | 650 |
| Peripatetic | 800 |
| Socrates | 1,000 |

---

## 📚 Fallacy Categories Covered

1. **Appeals & Manipulation** — Ad Populum, Appeal to Authority, Appeal to Emotion, Ad Hominem
2. **Causal Fallacies** — Post Hoc, False Cause, Slippery Slope
3. **Structural Fallacies** — False Dilemma, Begging the Question, Circular Reasoning
4. **Genetic & Source Fallacies** — Genetic Fallacy, Tu Quoque, Poisoning the Well
5. **Scope & Quantity Fallacies** — Hasty Generalization, Cherry Picking, Anecdotal Evidence
6. **Language & Definition Fallacies** — Equivocation, Straw Man, Red Herring

---

## 📜 Content Notes

All excerpts are drawn from criticism of the LDS faith and are **steelmanned** — presented with enough context that the argument is shown in its strongest, most charitable form. The goal is to teach players to identify fallacies in *good-faith, well-formed arguments*, not strawmen. This makes the critical thinking skills transfer to real conversations.

Excerpts are displayed neutrally as *"A critic of the restored gospel argues..."* without attribution.

---

## 🗃️ Local Storage

The leaderboard is stored in your browser's `localStorage` under the key `logos_leaderboard`. It persists between sessions on the same device and browser. No data is sent to any server.

To clear the leaderboard, open your browser console and run:
```javascript
localStorage.removeItem('logos_leaderboard');
```

---

## 🛠️ Customization

All game content lives in the `<script>` section of `public/index.html`:

- **`EXCERPTS`** — Add, edit, or remove fallacy excerpts. Each needs: `text`, `category`, `fallacy`, `explanation`
- **`CATEGORIES`** — Add new categories or fallacies within categories
- **`RANKS`** — Adjust rank names, icons, or point thresholds
- **`EXCERPTS` count** — Change `state.totalRounds` (default: 12) to use more or fewer rounds per game

---

## 📄 License

Built for educational and apologetics use. Content may be used freely for non-commercial ministry and teaching purposes.

---

*"The first principle of all things is the knowledge of oneself." — Socrates*
