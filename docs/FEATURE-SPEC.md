# Sadhana — Feature Specification (v1 MVP)

This document specifies the features for the MVP launch, targeting a festival season release (ideally Navratri or Shravan). The MVP focuses on the core loop: **Read → Streak → Share → Invite**.

---

## 1. Authentication

### 1.1 Phone OTP Login
- **Flow**: Enter phone number → receive OTP via SMS → verify → logged in
- **Provider**: Firebase Phone Auth
- **Why phone, not email**: India is phone-first. 95% of target users have phone numbers, many don't use email regularly.
- **Session**: Persistent login via Firebase Auth token. Auto-refresh. User stays logged in until explicit logout.
- **First-time flow**: After OTP verification → set display name → optional: set username (for public profile URL) → done
- **Anonymous mode**: Users can read without signing in. Streak and share features require auth. Prompt to sign in at first "Mark Complete" tap.

### 1.2 Profile Setup
- **Display name**: Required. Hindi or English. Max 30 chars.
- **Username**: Optional. Lowercase alphanumeric + hyphens. Used for public profile URL (`/u/ramesh-ji`). Auto-suggested from display name.
- **Avatar**: Auto-generated initials avatar in saffron tones. Optional: upload custom photo.
- **Privacy**: Profile visibility toggle — Public (anyone with link) / Private (only you).

---

## 2. Reading Experience

### 2.1 Chalisa Reader (existing, enhanced)
- All current features preserved: dark mode, reader mode, font sizing, verse animations, scroll progress
- **New: Reading timer**: Silent timer starts when page loads, stops at "Mark Complete." Duration saved with the reading record. Not shown to user (no pressure) but used for anti-gaming and stats.
- **New: Minimum read time**: A reading must be at least 3 minutes to count for streak. This prevents gaming (open app → immediately tap complete). The 3-minute threshold is generous — average Hanuman Chalisa reading takes 8-12 minutes.
- **New: Auto-bookmark** (already implemented): Remembers scroll position, offers "continue" toast on return.

### 2.2 Mark Complete Flow (enhanced)
Current: increment counter + petals + celebration modal.

Enhanced flow:
1. User taps "पाठ पूर्ण · Mark Complete"
2. If reading duration < 3 minutes: show gentle message "कृपया पूरा पाठ करें · Please complete the full reading" — do not count
3. If valid: increment streak, save reading record, trigger petals
4. Show enhanced celebration card (see 2.3)
5. Offer share card (see 3.1)

### 2.3 Enhanced Celebration Modal
Replace current simple modal with a richer one:

**Content:**
- Lotus/trophy icon (existing)
- "जय श्री राम!" heading
- Current streak number (large, Devanagari)
- Streak label: "दिन की साधना · Day X"
- If milestone reached: special milestone badge with name
- Reading duration: "पाठ समय: 9 मिनट · Reading time: 9 min"
- Two buttons: "शेयर करें · Share" (primary, accent) and "बंद करें · Close" (secondary)

---

## 3. Share Cards

### 3.1 Card Generation
**Trigger**: "Share" button in celebration modal, or from profile page.

**Card layout (1080x1080px for WhatsApp, 1080x1920px for Stories):**

```
┌──────────────────────────┐
│   [Saffron gradient bg]  │
│                          │
│        ॐ (subtle)        │
│                          │
│     ── streak number ──  │
│         २१               │
│   दिन की साधना           │
│     Day 21               │
│                          │
│  [Mala bead ring visual  │
│   30 beads = 30 days     │
│   filled = days read]    │
│                          │
│  ── milestone badge ──   │
│   (if applicable)        │
│                          │
│   Ramesh · @ramesh-ji    │
│                          │
│   ─── sadhana.app ───    │
│  जय बजरंगबली 🙏          │
└──────────────────────────┘
```

**Technical implementation:**
- API route: `GET /api/card/[userId]?format=square|story`
- Uses `@vercel/og` (Satori) to render SVG → PNG server-side
- Card is cached for 1 hour (streak doesn't change within a day)
- Client downloads the image and triggers native share via Web Share API with the image file

### 3.2 Share Targets
- **WhatsApp**: Primary. Share image + text "जय बजरंगबली 🙏 Day 21 — sadhana.app"
- **Instagram Stories**: Story-format card (9:16 aspect ratio)
- **Download**: Save to gallery
- **Copy link**: Profile URL for text sharing

---

## 4. Streak System

### 4.1 Streak Tracking
- One streak per chalisa per user
- A "day" is midnight to midnight in the user's local timezone
- Reading any chalisa on a given day extends that chalisa's streak
- Streak resets at midnight if no reading was completed the previous day
- Streak data stored in `streaks` table, updated on each "Mark Complete"

### 4.2 Streak Display
- **Home page**: Current streak shown prominently near the mala counter
- **Profile**: Current streak + longest ever streak
- **Share card**: Current streak is the hero element

### 4.3 Sankalp Shield (Streak Protection)
- Users get 1 shield per calendar month
- If streak breaks (missed a day), user has until end of the NEXT day to activate the shield
- Shield activation: banner appears on app open: "आपकी साधना टूट गई · Your streak broke yesterday. Use your Sankalp Shield to restore it?"
- Shield fills in the missed day as if it was completed
- Shield resets on the 1st of each month
- Premium users get 3 shields per month

### 4.4 Milestones
When a user hits a milestone streak:
- Special animation (extra petals + unique trophy icon)
- Badge awarded (see section 7)
- Milestone mentioned on share card
- One-time celebration — not shown again for the same milestone

---

## 5. Sangat (Groups)

### 5.1 Create a Sangat
- Tap "Create Sangat" → enter group name → get invite link
- Invite link format: `sadhana.app/join/ABCD1234`
- Share invite link via WhatsApp (primary flow)
- Creator is automatically admin
- Max 50 members per sangat
- Free users: up to 3 sangats. Premium: unlimited.

### 5.2 Sangat Dashboard
Each sangat has a dashboard page showing:

**Streak Board:**
```
Today's Readings                    ✓ 5/7 members

Ramesh          🔥 45 days         ✓ Read today
Priya           🔥 23 days         ✓ Read today
Mummy           🔥 12 days         ✗ Not yet
Papa            🔥 8 days          ✓ Read today
Ravi            🔥 3 days          ✗ Not yet
Neha            🔥 31 days         ✓ Read today
Amit            —  Streak broke    ✓ Read today
```

**Group Stats:**
- Group streak: consecutive days where ALL members read (hard mode)
- Total group readings this month
- Group milestone celebrations

### 5.3 Gentle Nudges (opt-in)
- A sangat admin can enable "morning reminder" for the group
- At a configured time (default 7 AM), members who haven't read today get a push notification: "आज की साधना बाकी है · Today's sadhana is pending"
- Members can individually opt out of group nudges
- No shaming, no "X hasn't read" public notifications. Only the streak board shows status.

### 5.4 Sangat Milestones
- "Group 100": Group collectively completes 100 readings → celebration for all members
- "Full House": All members read on the same day → rare achievement
- "Group Mala": Group collectively hits 108 readings in a month

---

## 6. Leaderboards

### 6.1 Leaderboard Types

**City Leaderboard:**
- Auto-detected from phone number area code or IP geolocation
- Fallback: user selects city in profile settings
- Shows top 100 in the city this month
- Metric: current streak length (primary), total readings (tiebreaker)

**State Leaderboard:**
- Aggregated from city data
- Same ranking logic

**National (All India):**
- Top 100 across the country
- Updated hourly

**Sangat Leaderboard:**
- Within a group
- Streak length ranking

### 6.2 Ranking Algorithm
- Primary sort: current active streak (descending)
- Tiebreaker 1: total readings this month (descending)
- Tiebreaker 2: account age (older accounts rank higher — rewards loyalty)
- Leaderboards reset monthly (fresh competition each month)
- All-time leaderboard also available (sorted by longest-ever streak)

### 6.3 Anti-Gaming
- Minimum 3-minute reading time to count
- Maximum 1 reading per chalisa per day
- No retroactive readings (can't fill in past days)
- Rate limiting: max 5 "Mark Complete" taps per hour (prevents accidental multi-counting)
- Flagging system: accounts with suspicious patterns (exact 3-minute readings every day at the same second) reviewed manually

---

## 7. Badges & Achievements

### 7.1 Badge System
- Badges are permanent once earned (never revoked)
- Displayed on profile in a visual grid
- Badge notification on earn: toast + modal
- Badges have rarity tiers affecting visual treatment:
  - **Common**: Subtle border, muted color
  - **Rare**: Accent border, slight glow
  - **Epic**: Gradient border, animation on hover
  - **Legendary**: Gold border, sparkle animation, larger display

### 7.2 Badge Catalog

**Streak Badges:**
| ID | Name (Hindi) | Name (English) | Condition | Rarity |
|----|-------------|----------------|-----------|--------|
| streak-7 | सप्ताह वीर | Week Warrior | 7-day streak | Common |
| streak-21 | संकल्प धारी | Vow Keeper | 21-day streak | Rare |
| streak-40 | चालीसा सिद्ध | Chalisa Master | 40-day streak | Epic |
| streak-108 | माला धारी | Mala Bearer | 108-day streak | Legendary |
| streak-365 | वर्ष साधना | Year of Sadhana | 365-day streak | Legendary |

**Time Badges:**
| ID | Name (Hindi) | Name (English) | Condition | Rarity |
|----|-------------|----------------|-----------|--------|
| brahma-muhurta | ब्रह्म मुहूर्त | Dawn Devotee | Read before 5 AM, 7 different days | Rare |
| night-sadhak | रात्रि साधक | Night Sadhak | Read after 10 PM, 7 different days | Rare |
| consistent | नियमित | Clockwork | Read within the same 1-hour window for 14 days | Epic |

**Social Badges:**
| ID | Name (Hindi) | Name (English) | Condition | Rarity |
|----|-------------|----------------|-----------|--------|
| sangat-founder | संगत संस्थापक | Sangat Founder | Create a sangat with 5+ members | Common |
| parivar | परिवार | Parivar | All sangat members read on same day | Rare |
| influencer | प्रेरणा | Inspiration | 10 people join via your share link | Rare |

**Content Badges:**
| ID | Name (Hindi) | Name (English) | Condition | Rarity |
|----|-------------|----------------|-----------|--------|
| first-reading | प्रारंभ | The Beginning | Complete first reading | Common |
| panch-chalisa | पंच चालीसा | Five Chalisas | Read all 5 available chalisas | Epic |
| sundarkand | सुंदरकांड | Sundarkand | Complete full Sundarkand | Epic |

**Challenge Badges:**
| ID | Name (Hindi) | Name (English) | Condition | Rarity |
|----|-------------|----------------|-----------|--------|
| navratri | नवरात्रि साधक | Navratri Sadhak | Complete Navratri challenge | Rare |
| perfect-month | पूर्ण मास | Perfect Month | Read every day of a calendar month | Epic |
| shravan | श्रावण सिद्ध | Shravan Master | Read every day of Shravan month | Epic |

---

## 8. Seasonal Challenges

### 8.1 Challenge Structure
- Admin-created events with start date, end date, target
- Users opt-in to a challenge
- Progress tracked automatically from readings
- Completion → badge + special share card

### 8.2 Launch Challenges

**Navratri 9-Day Challenge:**
- Read one designated chalisa per day for 9 days
- Day 1-3: Durga Chalisa
- Day 4-6: Lakshmi (Aarti as placeholder until Chalisa available)
- Day 7-9: Saraswati (Aarti as placeholder)
- Complete all 9 → "Navratri Sadhak" badge

**Hanuman Jayanti Sprint:**
- Single day event
- Read Hanuman Chalisa + encourage others
- Community counter: real-time national count on a dedicated page
- Shared goal: "Can India do 1 crore readings today?"
- Post-event card: "India completed X readings. You contributed."

**40-Day Personal Challenge:**
- User-initiated at any time
- Commit to reading one specific chalisa for 40 consecutive days
- App tracks progress with a dedicated progress ring (40 segments)
- Day 20 milestone: halfway celebration
- Day 40: "Chalisa Siddhi" badge + special share card

### 8.3 Community Counters
- Real-time counters for national/challenge events
- Technical: Vercel KV (Redis) `INCR` operation on each reading
- Displayed as an animated counter on the challenge page
- Updated every 5 seconds on the client (WebSocket or polling)

---

## 9. Notifications

### 9.1 Push Notification Types

**Streak Reminder (daily, user-configured time):**
> "आज की साधना बाकी है 🙏 Your 21-day streak is waiting"

Sent only if user hasn't read today. Default: 7 AM. User can change time or disable.

**Streak Danger (evening):**
> "⚠️ आज पढ़ना न भूलें! 22-day streak ends at midnight"

Sent at 8 PM if user hasn't read. Only when streak > 7 days (worth protecting).

**Milestone Approaching:**
> "🔥 2 more days to reach Chalisa Siddhi (40 days)!"

Sent at day 38.

**Sangat Nudge (if enabled by admin):**
> "Your Parivar: 4/6 have read today. Join them! 🙏"

Sent at admin-configured time.

**Challenge Reminder:**
> "Navratri Day 5: आज दुर्गा चालीसा पढ़ें"

Sent during active challenges.

### 9.2 Notification Implementation
- Firebase Cloud Messaging (FCM)
- PWA push notifications (web) + FCM for native app wrapper
- User controls: per-category toggle (streak reminders, sangat, challenges)
- Quiet hours: no notifications between 10 PM and 6 AM unless user opts in

---

## 10. Settings & Preferences

### 10.1 App Settings
- **Theme**: Auto (follow OS) / Light / Dark
- **Font size**: Slider (16-36px) — already implemented
- **Language**: Hindi + English (bilingual, always) / Hindi only / English only (future)
- **Notification time**: Default streak reminder time
- **Notification categories**: Toggle each type on/off
- **Offline mode**: Pre-download chalisas for offline reading

### 10.2 Privacy Settings
- **Profile visibility**: Public / Private
- **Leaderboard participation**: Opt in/out
- **Sangat visibility**: Show/hide streak to sangat members
- **Reading history**: Always private (only aggregate stats shared)

### 10.3 Account
- **Phone number**: Display (masked), option to change
- **Display name**: Edit
- **Username**: Edit (with availability check)
- **Delete account**: Full data deletion within 48 hours, confirmation required
- **Export data**: Download all reading history as JSON/CSV

---

## 11. Analytics (Internal)

### 11.1 Key Metrics to Track
- **DAU / MAU**: Daily and monthly active users
- **DAU/MAU ratio**: Target >40%
- **D1 / D7 / D30 retention**: Day 1, 7, 30 retention rates
- **Readings per day**: Total across all users
- **Share rate**: % of readings that result in a share action
- **Sangat creation rate**: % of users who create/join a group
- **Streak distribution**: Histogram of active streak lengths
- **Conversion to premium**: % of free users who upgrade
- **Challenge participation rate**: % of eligible users who opt into seasonal challenges

### 11.2 Analytics Stack
- **PostHog** (self-hosted on Vercel/Railway): Privacy-first, no third-party data sharing
- **Custom events**: `reading_completed`, `streak_milestone`, `card_shared`, `sangat_created`, `challenge_joined`
- **No Google Analytics**: We respect user privacy. No ad-tracking pixels.

---

## 12. Technical Specifications

### 12.1 API Routes (Astro, Vercel Serverless)

```
POST /api/auth/send-otp      → Send OTP to phone number
POST /api/auth/verify-otp    → Verify OTP, return session token
GET  /api/auth/me             → Current user profile

POST /api/readings            → Record a completed reading
GET  /api/readings/today      → Check if user has read today

GET  /api/streak              → Current streak info
POST /api/streak/shield       → Use sankalp shield

GET  /api/profile/[username]  → Public profile data
PUT  /api/profile             → Update profile

POST /api/sangat              → Create a sangat
GET  /api/sangat/[code]       → Get sangat info (for join page)
POST /api/sangat/[code]/join  → Join a sangat
GET  /api/sangat/[id]/board   → Sangat streak board

GET  /api/leaderboard/[scope] → Leaderboard (city/state/national)

GET  /api/card/[userId]       → Generate share card image
GET  /api/challenges          → Active challenges
POST /api/challenges/[id]/join → Join a challenge

GET  /api/badges/[userId]     → User's earned badges
```

### 12.2 Database (Supabase / Postgres)
- Row-level security for all tables
- Real-time subscriptions for sangat boards
- Edge functions for complex queries (leaderboards)
- Daily cron: check streaks, break expired ones, send danger notifications

### 12.3 Caching Strategy
- Leaderboards: Vercel KV, refreshed hourly
- Share cards: Vercel OG, cached 1 hour
- Profile data: Client-side cache with SWR (stale-while-revalidate)
- Readings: No cache (must be real-time for streak accuracy)

### 12.4 Infrastructure Costs (Estimated at 10K DAU)
| Service | Monthly Cost |
|---------|-------------|
| Vercel Pro | $20 |
| Supabase Pro | $25 |
| Firebase Auth (SMS OTP) | ~$30 (at 10K verifications/month) |
| Vercel KV | $0 (free tier sufficient) |
| Firebase Cloud Messaging | $0 (free) |
| PostHog Cloud | $0 (free tier up to 1M events) |
| **Total** | **~$75/month** |

At 10K DAU with even 2% premium conversion (200 users × ₹99/month), revenue = ₹19,800/month ≈ $235/month. **Profitable from day one at modest scale.**

---

## Appendix: Competitive Landscape

| App | Users | Gamification | Social | Design | Monetization |
|-----|-------|-------------|--------|--------|-------------|
| iShiv | 1M+ | None | None | Dated, ad-heavy | Ads |
| Hanuman Chalisa (various) | 5M+ combined | Basic counter | None | Poor | Ads |
| Headspace | 100M+ | Streak, badges | Minimal | Excellent | Subscription |
| Wordle | 300M+ | Streak, share grid | WhatsApp/Twitter | Minimal, effective | NYT subscription |
| **Sadhana (us)** | 0 (launch) | Full gamification | Groups, leaderboards, cards | Premium | Freemium, ₹99/mo |

Our position: **Headspace-level design quality × Wordle-level viral mechanics × deeply Indian content and cultural context**. Nobody occupies this intersection.
