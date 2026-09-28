# MovieMind — AI Movie Discovery & Recommendation Platform

## 1. Project Overview

MovieMind is a modern AI-powered movie discovery website built for a Fundamentals of AI university final project.

The goal is to help users discover movies through both traditional browsing/search and natural-language AI interaction.

Instead of forcing users to manually browse through hundreds of movies and filters, MovieMind allows users to describe what they want to watch in normal language.

Examples:

- "I want something scary but not too scary."
- "I want a movie like Interstellar but easier to understand."
- "I want something funny to watch with my family."
- "Give me a romantic movie that isn't too cheesy."
- "I only have 90 minutes. What should I watch?"
- "I want an action movie with a really good story."

The AI should understand these preferences and use available movie data to provide relevant recommendations.

The website should feel like a polished modern movie discovery platform rather than simply a chatbot attached to a movie database.

---

# 2. Main Project Goal

The core experience is:

User describes what they want
        ↓
AI understands the request
        ↓
AI identifies relevant preferences
        ↓
Movie database is searched/filtered
        ↓
AI evaluates suitable movies
        ↓
User receives recommendations
        ↓
AI explains WHY each movie was recommended

The AI explanation is an important part of the project.

Example:

User:
"I want something like Interstellar, but less complicated and more emotional."

AI:

1. Understands:
   - Reference movie: Interstellar
   - Genre: Science Fiction
   - Tone: Emotional
   - Complexity: Lower
   - Preference: Space/science themes

2. Searches available movie data.

3. Returns recommendations.

Example result:

The Martian
⭐ 8.0
Sci-Fi • Drama

Why:
"You wanted a science-fiction movie with emotional elements and a simpler story than Interstellar. The Martian keeps the space-survival aspect while having a more straightforward narrative."

---

# 3. Target Users

The primary target users are people who:

- Like watching movies
- Have difficulty deciding what to watch
- Want personalized recommendations
- Prefer describing their mood instead of using complicated filters
- Want information about movies quickly

The application should be simple enough for a casual movie viewer.

---

# 4. Core Features

## 4.1 Home Page

The homepage should immediately communicate the main purpose of MovieMind.

Hero section:

"Find Your Next Favorite Movie"

Supporting text:

"Tell us what you're in the mood for and let AI find the perfect movie for you."

Main AI search/input:

"What do you want to watch?"

Example prompts:

- "Something funny"
- "A scary movie without too much gore"
- "Something like Inception"
- "A movie to watch with my family"

The homepage should also show:

- Trending movies
- Popular movies
- Recommended movies
- Browse by genre

---

# 5. AI Movie Assistant

The AI assistant is the main differentiating feature.

Users can ask natural-language questions about movies.

Examples:

"What is Inception about?"

"Who directed Interstellar?"

"Recommend movies like The Dark Knight."

"Is The Conjuring actually scary?"

"Give me a movie for tonight."

The assistant should provide useful answers based on movie data.

The AI should NOT simply invent movie information.

Whenever possible, it should use structured movie information supplied by the application.

---

# 6. AI Recommendation System

The recommendation system should understand natural-language preferences.

Example:

"I want a funny sci-fi movie from the 2010s."

The AI should identify:

Genre:
Science Fiction + Comedy

Time period:
2010–2019

Tone:
Funny

Then use movie data to find candidates.

Another example:

"I want something emotional but not a romance."

The system should understand:

Tone:
Emotional

Avoid:
Romance

The recommendation system should support preferences such as:

- Genre
- Multiple genres
- Mood
- Tone
- Release year/decade
- Runtime
- Rating
- Popularity
- Similar movies
- Director
- Actor
- Family-friendly preferences
- Violence/horror preferences where data is available

Do not attempt to support every possible preference in the first version.

Start with the most useful ones.

---

# 7. "Why This Movie?"

Every AI recommendation should ideally explain why it was selected.

Example:

## The Martian

⭐ 8.0

Sci-Fi • Drama • Adventure

### Why we recommend it

"You said you wanted a science-fiction movie similar to Interstellar but with a simpler story. The Martian has a space-survival setting and emotional moments, but its story is more straightforward."

This feature is important because it demonstrates that the AI is not simply generating random movie titles.

---

# 8. Browse Movies

Users should also be able to browse normally without using AI.

Browse page should include:

- Search
- Genre filter
- Release year
- Rating
- Movie grid
- Pagination or infinite scrolling if needed

Movie cards should contain:

- Poster
- Title
- Year
- Rating
- Genre
- View Details button

---

# 9. Movie Details Page

Each movie should have a dedicated page.

Information:

- Poster
- Backdrop
- Title
- Release date/year
- Rating
- Genres
- Runtime
- Overview
- Director
- Cast
- Popularity

AI section:

"Ask AI About This Movie"

Examples:

"What is this movie about?"

"Is this movie suitable for children?"

"Who is the main character?"

"What movies are similar to this?"

"Give me a spoiler-free explanation."

The AI should receive the movie's actual data as context.

---

# 10. Technology Stack

Frontend:

- React
- Vite
- JavaScript
- React Router
- CSS or Tailwind CSS

Backend:

- Node.js
- Express.js

Movie data:

- TMDB API

AI:

- OpenAI API

Potential future database:

- Supabase/PostgreSQL

Do not add a database unless it becomes necessary.

---

# 11. Architecture

The intended architecture is:

                    ┌───────────────┐
                    │     USER      │
                    └───────┬───────┘
                            │
                            ↓
                    ┌───────────────┐
                    │ React Frontend│
                    └───────┬───────┘
                            │
                            ↓
                    ┌───────────────┐
                    │ Express API   │
                    │   Backend     │
                    └───────┬───────┘
                            │
                  ┌─────────┴─────────┐
                  ↓                   ↓
           ┌─────────────┐     ┌─────────────┐
           │  TMDB API   │     │   AI API    │
           └─────────────┘     └─────────────┘

The frontend should NOT expose private AI API keys.

AI API calls should be handled by the backend.

---

# 12. AI Request Flow

For a recommendation request:

User
 ↓
React chat/input
 ↓
Express backend
 ↓
AI interprets user request
 ↓
Extract preferences
 ↓
Movie search/filter
 ↓
Candidate movies
 ↓
AI evaluates candidates
 ↓
Recommendation response
 ↓
React UI

Example:

User:
"I want something like Harry Potter but darker."

AI interpretation:

reference = Harry Potter
genre = fantasy
tone = dark
similarity = high

Movie data is then used to find candidates.

The AI generates:

- Movie title
- Rating
- Short description
- Why it matches

---

# 13. Security Requirements

Because this is also being developed by a cybersecurity student, follow basic security practices.

Never expose:

- OpenAI API key
- Private backend credentials
- Secret environment variables

Use:

.env

for private keys.

Frontend should communicate with backend endpoints.

Example:

POST /api/chat

POST /api/recommendations

GET /api/movies/search

GET /api/movies/:id

Never hardcode API keys into React components.

---

# 14. UI / Design Direction

The website should feel like it was designed by a person with a point of view — not assembled from default component-library settings. Avoid anything that reads as "generic AI-generated website." Concretely, that means avoiding:

- Purple/blue gradient backgrounds (the default "AI startup" look)
- Centered hero + 3 evenly-spaced feature cards with emoji icons
- Glassmorphism/frosted-glass panels used as a default decoration rather than a deliberate choice
- Overuse of identical rounded-corner cards with soft drop shadows everywhere
- Default system fonts or the obvious Inter/Poppins-for-everything pairing
- Perfectly symmetrical, evenly-padded grid layouts with no visual hierarchy
- Stock hover effects (card lifts + shadow grows) applied uniformly with no variation
- Generic stock-photo-style movie placeholder art

Instead, aim for a **cinematic, editorial feel** — closer to a well-designed film magazine or a boutique streaming service than a SaaS landing page:

**Color & mood**
- Near-black background (not pure #000 — something like #0b0b0d or a very dark warm charcoal) so posters and color accents pop.
- One confident accent color instead of a gradient — e.g. a deep amber/gold, a blood-orange, or a muted crimson — used sparingly for CTAs, ratings, and active states, not smeared across backgrounds.
- Let movie poster art supply most of the color on the page; the UI chrome should stay quiet and dark so posters read as the visual focus.

**Typography**
- Headlines: **Fraunces** (Google Fonts) — a display serif with soft, slightly wonky optical-size detailing that reads as editorial/cinematic rather than corporate. Use a heavier weight (600–900) and, for the biggest hero text, try the italic cut for a touch of personality on key phrases.
- Body & UI text: **Manrope** (Google Fonts) — clean, geometric, highly legible at small sizes, but distinct enough from Fraunces that the pairing doesn't feel like two similar-weight sans fonts stacked together. Use regular/medium weights for body copy, semibold for buttons and labels.
- Small caps / labels (genre tags, "NOW TRENDING", ratings): Manrope in a small size, wide letter-spacing (e.g. `letter-spacing: 0.08em`), uppercase — gives a magazine-masthead feel without needing a third typeface.
- Import both from Google Fonts:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;0,700;0,900;1,600&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
  ```
  ```css
  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'Manrope', -apple-system, sans-serif;
  ```
- Real type hierarchy: large, confident headline sizes (Fraunces, e.g. 48–96px on desktop hero) next to noticeably smaller, quieter supporting text (Manrope, 14–18px) — not everything sitting in the 16–20px range.
- Tighter letter-spacing on big Fraunces headlines (e.g. `-0.02em`); wider spacing on small Manrope caps/labels.

**Layout**
- Break the grid deliberately in places — an oversized featured poster next to a tighter list, an asymmetric hero instead of dead-centered text over a gradient.
- Horizontal scroll rows for "Trending" / "Popular" / "Recommended," the way real streaming platforms do it, rather than uniform grids everywhere.
- Vary card sizes by importance instead of making every movie card identical.

**Details that make it feel handmade**
- Custom, restrained hover states per section (e.g. poster rows: slight scale + backdrop crossfade to a still; buttons: underline or color shift, not a generic shadow lift).
- Thin hairline dividers and subtle grain/texture on dark backgrounds instead of flat solid fills, if performance allows.
- Genre tags and ratings styled as small custom badges/labels with their own type treatment, not default pill-shaped Bootstrap-style tags.
- Micro-copy with personality (e.g. empty states, loading text) instead of generic "Loading..." / "No results found."

**What to keep simple**
- Don't over-animate — a few well-placed transitions (poster hover, page fade-in) beat motion on every element.
- Keep the AI chat/input UI understated — a simple, well-set input bar rather than a flashy chatbot bubble UI — so the AI feels woven into the movie experience rather than bolted on as a separate "chatbot" widget.
- Responsive design still applies at every breakpoint; asymmetry and horizontal scroll rows should degrade gracefully on mobile (e.g. horizontal rows become swipeable, oversized hero art scales down).

The end goal: someone looking at MovieMind should think "a designer made choices here," not "this came out of a UI-kit template."

## 14.1 Fixes from first homepage build (review notes)

The first built version of the homepage used a condensed all-caps display font (a stock impact-style font, not Fraunces) for the hero headline, with a dark charcoal background, single amber accent, and an asymmetric hero layout with a poster card on the right. That direction is good and should be kept, but the following concrete issues need fixing:

- **Headline letter-spacing bug (priority fix):** The hero headline ("FIND YOUR NEXT FAVORITE MOVIE") renders with letters touching/overlapping — words are hard to read where "FAVORITE" meets "MOVIE." This is a bug, not a style choice. Fix by adding positive `letter-spacing` (try `0.01em`–`0.02em`) to the headline, and verify the intended font is actually loading rather than silently falling back to a compressed system font.
- **Condensed headline font — decide deliberately:** The current condensed all-caps font can work for a "movie poster" feel, but only once the spacing above is fixed. Re-evaluate after the fix; if it still feels flat/generic, replace it with Fraunces (per section 14 typography) for more warmth and character.
- **Logo cropping:** "MOVIEMIND" in the top-left nav is visually clipped top and bottom (tight line-height cutting into ascenders/descenders). Increase line-height/vertical padding around the logo text so it isn't cropped.
- **Gradients — CTA only:** Keep the soft orange gradient exclusively on the primary "Ask" button as a deliberate accent. Do not let gradients appear anywhere else on the page (backgrounds, cards, other buttons) — one gradient, used once, on purpose.
- **Hero poster card needs grounding:** The right-side poster card currently floats with a lot of empty sky at the top and no contrast guarantee for the overlay text. Add a subtle bottom-to-top dark gradient overlay directly on the poster image so the "Trending now / Interstellar" label stays legible regardless of the photo's own colors. Consider a second, smaller poster card peeking out behind the main one to create a stacked-deck depth effect (similar to Netflix/Apple TV app icons).
- **Vertical rhythm in the hero text block:** The current spacing between label → headline → subtext → input → suggestion chips is too uniform, so nothing pops as the clear focal point. Increase the gap above the headline and tighten the gap between the headline and its subtext, so the headline reads as the dominant element.
- **Suggestion chips:** Currently all chips share the same fixed width/weight, which reads as a generated tag list. Let chip width auto-size to its text content, and consider slight variation in size/weight so the row doesn't look uniform.

---

# 15. Main Navigation

Navbar:

MovieMind

Home
Browse
Genres
AI Assistant

Optional later:

Watchlist
Favorites
Profile

Do not implement authentication initially.

---

# 16. Pages

The initial application should contain:

/

Home

/browse

Browse Movies

/movie/:id

Movie Details

/ai

AI Movie Assistant

Later:

/watchlist

/favorites

/profile

These later pages are optional.

---

# 17. Initial MVP

The first working version MUST only include:

1. React frontend
2. Home page
3. Browse page
4. Movie search
5. Genre filtering
6. Movie detail page
7. TMDB movie data
8. AI chat
9. AI movie recommendations
10. "Why this movie?" explanation

Do not add:

- Authentication
- Payments
- Social media
- Reviews
- Complex user profiles
- Streaming
- Real-time messaging
- Mobile application
- Advanced machine learning
- Custom recommendation model

until the MVP works.

---

# 18. Development Strategy

Build the project incrementally.

## Phase 1 — Frontend foundation

Build:

- React/Vite
- Navbar
- Home
- Browse
- Movie cards
- Movie details
- Routing
- Responsive UI

Use mock data initially.

---

## Phase 2 — Movie API

Integrate TMDB.

Add:

- Popular movies
- Search
- Genre filtering
- Movie details
- Cast
- Posters
- Backdrops

Replace mock data gradually.

---

## Phase 3 — AI Assistant

Create backend.

Add:

POST /api/chat

Connect OpenAI API.

Create frontend chat interface.

---

## Phase 4 — AI Recommendations

Create:

POST /api/recommendations

The endpoint should:

1. Receive user request.
2. Understand preferences.
3. Search available movie data.
4. Select candidates.
5. Generate recommendations.
6. Explain recommendations.

---

## Phase 5 — Movie-Specific AI

On movie details:

"Ask AI About This Movie"

The AI receives:

- Title
- Overview
- Genres
- Cast
- Director
- Release year
- Rating

Then answers questions about the movie.

---

## Phase 6 — Polish

Improve:

- Loading states
- Error handling
- Empty states
- Responsive design
- Animations
- Accessibility
- API error handling
- AI prompt quality

---

# 19. Coding Rules for AI-Assisted Development

This project will be built using AI-assisted/vibe coding.

However, maintainability is important.

When modifying the project:

- Do not rewrite the entire application unnecessarily.
- Inspect existing files before changing them.
- Reuse existing components.
- Keep components reasonably small.
- Avoid duplicate code.
- Do not install libraries unless necessary.
- Explain important architectural decisions.
- Preserve working functionality when adding features.
- Fix the smallest relevant part when debugging.

When implementing a feature:

1. Explain the plan.
2. Identify files that need modification.
3. Implement the feature.
4. Explain what changed.
5. Give testing steps.

Do not make unrelated changes.

---

# 20. Beginner-Friendly Requirement

The developer is still learning React and web development.

Therefore:

- Prefer straightforward solutions.
- Avoid unnecessary abstractions.
- Avoid overly complex state management.
- Explain unfamiliar concepts.
- Explain API requests.
- Explain React hooks when they are introduced.
- Explain frontend/backend communication.
- Explain AI request flow.

The goal is not only to make the application work.

The developer should understand enough of the project to explain it during the university presentation.

---

# 21. Definition of Success

MovieMind is successful when a user can:

1. Open the website.
2. Browse movies.
3. Search for a movie.
4. Filter movies.
5. Open movie details.
6. Ask AI about the movie.
7. Tell the AI what they want to watch.
8. Receive relevant movie recommendations.
9. Understand why those movies were recommended.

The AI component should feel integrated into the movie discovery experience rather than being a separate generic chatbot.

---

# 22. Important Development Principle

DO NOT BUILD EVERYTHING AT ONCE.

Build one working layer at a time.

Frontend
 ↓
Movie API
 ↓
Backend
 ↓
AI
 ↓
Recommendation system
 ↓
Polish

At every stage, the application should remain runnable.

Before adding a new major feature, make sure the previous feature works.

---

# 23. Future Ideas — DO NOT IMPLEMENT YET

Potential future features:

- User accounts
- Watchlist
- Favorite movies
- Watch history
- AI taste profile
- Personalized homepage
- "What should I watch tonight?"
- Mood-based recommendations
- Group movie recommendations
- Compare two movies
- AI spoiler-free mode
- AI-generated watchlists
- Recommendation feedback
- "I don't like this recommendation" button

Only implement these after the core MVP is stable.