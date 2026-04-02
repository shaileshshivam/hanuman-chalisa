# Sadhana — Vision & Product Strategy

## The Thesis

India has 800M+ smartphone users who pray daily. Nobody has built Wordle for devotion. The daily prayer ritual already exists — we're adding a streak system, social sharing, and community gamification layer on top of it.

Wordle's formula: **daily ritual + streak anxiety + shareable visual result**. Ours: **daily paath + streak sadhana + WhatsApp-shareable devotion card**.

## Why This Wins

1. **Zero competition**: Existing prayer apps (iShiv, Hanuman Chalisa apps on Play Store) are ad-ridden, ugly, zero gamification, zero social. They treat devotion as a utility. We treat it as a daily practice worth celebrating.

2. **Viral by nature**: Religious content is the #1 most shared content in Indian WhatsApp groups. A beautiful "Day 45 🔥" streak card shared in a family group creates FOMO. No paid acquisition needed.

3. **Retention is built-in**: Users already pray daily. We're not creating a new habit — we're instrumenting an existing one. This means D1/D7/D30 retention numbers that SaaS companies dream about.

4. **Family dynamics as distribution**: Parents share with kids. Kids compete with cousins. Aunties forward to everyone. One user in a family group of 20 → 5 new users minimum.

5. **Seasonal spikes are free marketing**: Navratri (9 days), Shravan month, Hanuman Jayanti, Diwali season — these create natural urgency without any marketing spend.

6. **Cultural moat**: This isn't "another meditation app." The language, the aesthetics, the specific chalisas and aartis — this is deeply Indian. Western mindfulness apps can't replicate this. Indian copycats would need to match the design quality and gamification depth.

## Target Users

### Primary: The Daily Devotee (35-60, Tier 1-3 cities)
- Already reads Hanuman Chalisa or other prayers daily
- Uses WhatsApp heavily, shares in family groups
- Wants to feel good about consistency
- Will share streak cards with pride
- Hindi-first, English as secondary

### Secondary: The Aspirational Devotee (18-35)
- Wants to start a daily prayer practice but lacks consistency
- Streak mechanics provide the accountability they need
- Social proof from friends/family motivates them
- Comfortable with both Hindi and English

### Tertiary: NRI Community
- Nostalgic for daily rituals from home
- English translations are important
- Will share with family in India, creating cross-border groups

## Core Product

### 1. The Daily Paath

The foundation. A beautiful, distraction-free reading experience for Hanuman Chalisa (and later, other texts). This is what we have today — and it's already production-quality.

### 2. The Streak System (The Addiction Engine)

This is what turns a reader into a daily user.

**How it works:**
- Complete a reading → day is marked ✓
- Consecutive days build a streak
- Streak number is prominently displayed
- Miss a day → streak resets to 0 (with one protection mechanism)

**Milestones with cultural significance:**
| Days | Name | Significance |
|------|------|-------------|
| 3 | प्रारंभ (Prarambh) | Beginning |
| 7 | सप्ताह (Saptah) | One week of devotion |
| 11 | एकादशी (Ekadashi) | Sacred number |
| 21 | संकल्प (Sankalp) | Habit formation |
| 40 | चालीसा सिद्धि (Chalisa Siddhi) | 40 days = traditional penance period |
| 51 | पंचदशी (Panchadashi) | Advanced devotee |
| 108 | माला (Mala) | Sacred number, full mala |
| 365 | वर्ष साधना (Varsh Sadhana) | One year of unbroken practice |

**Streak protection:**
- Users earn one "Sankalp Shield" per month
- If they miss a day, they can use the shield within 24 hours to preserve the streak
- Shield recharges on the 1st of each month
- Creates urgency: "I only have one shield left this month"

### 3. The Share Card (The Viral Mechanic)

After each reading, generate a beautiful, shareable card.

**Card contents:**
- Saffron-to-red gradient background (matches app identity)
- Large streak number in Devanagari numerals (२१)
- "दिन की साधना · Day 21" text
- A visual mala bead ring showing the month's progress (30 beads, filled ones = days completed)
- Username (optional) and small app branding
- "जय बजरंगबली" or rotating devotional tagline

**Card design principles:**
- Must look premium on WhatsApp — no one shares ugly images
- Must be instantly recognizable after seeing it 2-3 times
- Must trigger "I want one too" in the viewer
- Aspect ratio: 1:1 for WhatsApp DP/status, 9:16 for Instagram Stories

**Technical implementation:**
- Server-rendered SVG → PNG via Vercel OG Image Generation
- `GET /api/card?user=xyz&streak=21&month=2026-04` returns the image
- Client downloads and opens native share sheet with the image

### 4. Public Profiles

**Profile page: `/u/{username}`**

Shows:
- Display name and avatar (or generated initials avatar)
- Member since date
- Current streak (prominently)
- Longest streak ever
- Total lifetime readings
- Badges earned (visual grid)
- Monthly calendar heatmap (GitHub contribution graph style, but with saffron intensity)
- Chalisas read (Hanuman, Shiv, Durga, etc.)

**Privacy controls:**
- Profile can be public, friends-only, or private
- Reading history is always private (only aggregate stats shown)
- No real name required — can use a devotional name

### 5. Family & Group System (Sangat)

**Create a Sangat (group):**
- Invite via WhatsApp share link
- Family, friend circle, temple community, office group
- Max 50 members per sangat

**Sangat features:**
- Live streak board — see everyone's current streak
- Group streak — consecutive days where ALL members read
- Weekly digest push notification: "Your Parivar: 5/7 members read today"
- Group milestones: "Your Sangat completed 1,000 readings together! 🎉"
- Gentle nudges: "Mummy hasn't read today" (opt-in, with their permission)

**Why this is viral:**
- Creating a sangat = inviting 5-20 people
- Each person sees others' streaks → accountability
- Family groups already exist on WhatsApp → this extends them
- "Join our family's Sadhana group" is a natural share

### 6. Seasonal Challenges

**Navratri Challenge (9 days)**
- Read a specific chalisa each day matching the navratri deity
- Complete all 9 → earn "Navratri Sadhak" badge
- Community counter: "India has completed X lakh readings this Navratri"

**Shravan Challenge (30 days)**
- Read Shiv Chalisa daily during Shravan month
- Special Shravan badge for completion
- Monday bonuses (Shravan Somvar)

**Hanuman Jayanti Sprint**
- Community goal: "Can India do 1 crore readings on Hanuman Jayanti?"
- Real-time counter on the app
- Every user's reading contributes to the national count
- Result shared as a card: "India read Hanuman Chalisa 1.2 crore times today"

**Tuesday/Saturday Multipliers**
- Tuesdays and Saturdays are Hanuman days
- Readings on these days count as 2x for leaderboard points
- Subtle UI change on these days (special accent color, badge)

### 7. Leaderboards

**Types:**
- City/District: "Top devotees in Lucknow this week"
- State: "Maharashtra leaderboard"
- National: "All India — this month"
- Sangat: within your group
- Friends: people you follow

**What's ranked:**
- Streak length (primary)
- Total readings this month
- Consistency score (% of days read in the month)
- NOT speed — we never want to incentivize rushing through prayers

**Anti-gaming:**
- Minimum reading time threshold (estimated from scroll behavior)
- Can't bulk-complete past days
- One reading per chalisa per day counts

### 8. Content Library

**Phase 1 (launch):**
- Hanuman Chalisa (Hindi)

**Phase 2 (month 2-3):**
- Shiv Chalisa
- Durga Chalisa
- Ganesh Chalisa
- Bajrang Baan

**Phase 3 (month 4-6):**
- Aarti collection (Ganesh, Lakshmi, Shiv, Hanuman, Durga)
- Sundarkand (longer form, chapter-by-chapter)
- Bhagavad Gita — "Shlok a Day" daily challenge

**Phase 4 (month 6+):**
- Regional language support (Gujarati, Marathi, Tamil, Telugu, Bengali)
- English translations for every text
- Audio recitations
- AI-generated personalized audio (premium)

### 9. Badges & Achievements

Visual collectible badges displayed on profile. Each has:
- A beautiful icon (in the app's saffron/gold aesthetic)
- A Hindi name and English subtitle
- A rarity level (common, rare, epic, legendary)

**Examples:**

| Badge | Name | Condition | Rarity |
|-------|------|-----------|--------|
| 🟠 | प्रारंभ (The Beginning) | First reading | Common |
| 🔥 | सप्ताह वीर (Week Warrior) | 7-day streak | Common |
| 💪 | संकल्प धारी (Vow Keeper) | 21-day streak | Rare |
| 🏆 | चालीसा सिद्ध (Chalisa Siddh) | 40-day streak | Epic |
| 👑 | माला धारी (Mala Bearer) | 108-day streak | Legendary |
| 🌅 | ब्रह्म मुहूर्त (Brahma Muhurta) | Read before 5 AM, 7 days | Rare |
| 🌙 | रात्रि साधक (Night Sadhak) | Read after 10 PM, 7 days | Rare |
| 👨‍👩‍👧‍👦 | परिवार (Parivar) | All sangat members read same day | Rare |
| 🎯 | पूर्ण मास (Perfect Month) | 30/30 days in a month | Epic |
| 📿 | पंच चालीसा (Panch Chalisa) | Read all 5 chalisas | Epic |
| 🇮🇳 | राष्ट्रीय साधक (National Sadhak) | Top 100 in India leaderboard | Legendary |
| 🕉️ | वर्ष साधना (Year of Sadhana) | 365-day streak | Legendary |

## Monetization

### Principle: Free devotion, premium convenience

All prayer content, all gamification, all social features are **free forever**. We never paywall the act of reading or its rewards.

### Free Tier (always)
- All chalisas and aartis in text
- Full streak system and badges
- Share cards
- Public profile
- Sangat groups (up to 3)
- Seasonal challenges
- Leaderboards

### Premium: "Sadhana+" (₹99/month or ₹799/year)
- **AI Audio**: Personalized recitation in multiple voices and speeds
- **Offline Audio**: Download audio for all texts
- **Advanced Stats**: Reading time trends, best time of day analysis, monthly reports
- **Custom Cards**: Premium share card themes (festival special, minimalist, ornate)
- **Unlimited Sangats**: Create unlimited groups
- **Streak Insurance**: 3 Sankalp Shields per month instead of 1
- **Early Access**: New chalisas and features first
- **No "Premium" badge flex**: We explicitly do NOT show who's premium. Devotion isn't pay-to-win.

### Why ₹99/month works
- Lower than Netflix (₹149), Spotify (₹119)
- "Less than a cup of chai per day" framing
- Family plan: ₹149/month for up to 5 members
- Annual plan saves 33%

### Future monetization (optional, careful)
- **Temple Partnerships**: Temples sponsor challenges ("40-day challenge with ISKCON"). Temple gets devotee engagement, we get distribution, users get a special badge. No money from users.
- **Sponsored Cards**: During Navratri, a brand like MDH Spices or Patanjali sponsors the share card theme. Tasteful, not intrusive. Brand logo small in corner.
- **Merchandise**: Physical mala beads, prayer books branded with "Sadhana." Earned at major milestones (365-day streak → we mail you a real mala).

## Technical Architecture

### Current Stack (what we have)
- Astro + Svelte islands
- Static site on Vercel
- PWA with service worker
- Zero backend, zero auth

### Evolution Path

**Phase 1: Add Auth + Persistence**
- Switch Astro to `output: 'hybrid'`
- Auth: Firebase Phone Auth (OTP) — India is phone-number-first
- Database: Supabase (Postgres) for profiles, streaks, groups
- Why Supabase: real-time subscriptions (for live sangat boards), row-level security, generous free tier

**Phase 2: Add Social Features**
- Vercel KV (Redis) for leaderboards and streak caches
- Vercel OG Image Generation for share cards
- Firebase Cloud Messaging for push notifications (streak reminders)

**Phase 3: Add AI Audio**
- API route: `POST /api/audio` → calls ElevenLabs/OpenAI TTS
- Audio cached in Vercel Blob Storage or Cloudflare R2
- Streamed to client via `<audio>` element with MediaSource

**Phase 4: Scale**
- If >100K DAU: move database to PlanetScale (MySQL, better at scale)
- CDN for audio files (Cloudflare)
- Rate limiting on API routes (Vercel Edge Middleware)
- Analytics: PostHog (self-hosted, privacy-first)

### Data Schema (core)

```
users
  id: uuid (PK)
  phone: string (unique, E.164)
  display_name: string
  username: string (unique, URL-safe)
  avatar_url: string?
  created_at: timestamp
  is_premium: boolean
  streak_shield_used: boolean
  streak_shield_reset_at: timestamp

readings
  id: uuid (PK)
  user_id: uuid (FK → users)
  chalisa_id: string (e.g., "hanuman-chalisa")
  completed_at: timestamp
  duration_seconds: int
  date: date (index — one reading per chalisa per day)

streaks
  user_id: uuid (FK → users)
  chalisa_id: string
  current_streak: int
  longest_streak: int
  last_read_date: date
  streak_start_date: date

sangats
  id: uuid (PK)
  name: string
  created_by: uuid (FK → users)
  invite_code: string (unique, 8 chars)
  created_at: timestamp

sangat_members
  sangat_id: uuid (FK → sangats)
  user_id: uuid (FK → users)
  joined_at: timestamp

badges
  user_id: uuid (FK → users)
  badge_id: string (e.g., "streak-40")
  earned_at: timestamp

challenges
  id: uuid (PK)
  name: string
  type: enum (seasonal, community, personal)
  start_date: date
  end_date: date
  target: jsonb (e.g., {"chalisa": "hanuman", "days": 9})
  community_count: bigint (for national counters)
```

## Go-to-Market

### Pre-launch
1. Build MVP with streak system + share cards (4-6 weeks)
2. Seed with 50-100 users from personal network (family, friends)
3. Iterate on share card design until it's "I want that" beautiful
4. Time launch for a festival (Navratri ideal — 9-day built-in challenge)

### Launch
1. Launch on Navratri with "9-Day Navratri Challenge"
2. Seed in 10-20 WhatsApp family groups personally
3. The share cards do the distribution — each share is a user acquisition ad
4. Target: 1,000 users in first Navratri (9 days)

### Growth
1. **WhatsApp virality**: Every reading → share card → family group → new users. K-factor should be >1 during festivals.
2. **Temple partnerships**: Approach 5-10 major temples for co-branded challenges. Temples want digital engagement. We provide it for free.
3. **Instagram Reels**: Short-form content — "I did 108 days of Hanuman Chalisa, here's what happened." Aspirational, authentic.
4. **YouTube**: Collaborate with devotional YouTubers (channels like Shemaroo Bhakti, T-Series Bhakti Sagar have millions of subscribers).
5. **Play Store**: PWA first, then native wrapper (TWA) for Play Store presence + push notifications.
6. **No paid ads initially**: The share mechanic should drive organic growth. Paid ads only if K-factor < 1 after 3 months.

### Metrics That Matter
- **DAU/MAU ratio**: Target >40% (Wordle-level daily engagement)
- **Day 7 retention**: Target >60% (streak anxiety keeps people coming back)
- **Share rate**: % of readings that result in a card share. Target >15%
- **Sangat creation rate**: % of users who create or join a group. Target >30%
- **Streak distribution**: Monitor 7-day, 21-day, 40-day completion rates

## Timeline

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| MVP | 4-6 weeks | Streak system, share cards, basic profile, phone auth |
| Social | 3-4 weeks | Sangat groups, leaderboards, follow system |
| Content | 2-3 weeks | Add 4 more chalisas + aarti collection |
| Seasonal | 2 weeks | Challenge system, Navratri launch prep |
| Premium | 3-4 weeks | AI audio, advanced stats, premium plans |
| Native | 2-3 weeks | TWA wrapper for Play Store + push notifications |

**Total to full product: ~4-5 months from today**

## The Name

**Sadhana** (साधना)

Meaning: Spiritual practice, daily devotion, disciplined effort toward a goal.

"Aaj sadhana ki?" (Did you do your sadhana today?) — this is already how people talk about daily prayer. The app name is the verb.

Domain candidates: sadhana.app, getsadhana.com, sadhana.in
