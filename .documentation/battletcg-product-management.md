BattleTCG Project Management



Define Requirements and Feature Set

## Elevator Pitch:

BattleTCG is a dynamic, all-in-one online hub that empowers indie card game creators to design, launch, and manage their custom card games while offering a vibrant, interactive playground for players. Our platform provides creators with the essential tools—from intuitive deck-building and comprehensive card databases to real-time tournament scheduling and live chat—all wrapped in a sleek package they can launch as they're own website(with thier own creator page and customer sub-domain). With built-in monetization features and seamless authentication, BattleTCG is the perfect launchpad for emerging games, enabling creators to shine while players dive into ever-evolving card game experiences.

## Who Is It For?

**Indie Card Game Creators:**
Designers and developers seeking a comprehensive platform to bring their innovative card games to market, complete with custom subdomains, an intuitive admin hub, and monetization options.

**Players and Fans:**
Enthusiasts and gamers who crave new, engaging card game experiences, where they can build decks, join live tournaments, and connect with like-minded communities.

**Tournament Organizers:**
Community leaders and event planners who need robust scheduling, real-time updates, and competitive frameworks to host and manage thrilling card game competitions.

BattleTCG uniquely bridges the gap between creative game development and interactive gameplay, positioning itself as the ultimate destination for both creators and players in the indie card game ecosystem.



## Key Features:
	•	Multi-Tenant Dynamic Subdomains for Creators:

Each creator will have a dedicated subdomain (e.g., creator.battletcg.com) that is dynamically generated based on their profile, providing a personalized space for their content.
	•	Card Database Management & Deck Builder with Drag-and-Drop:
Manage a comprehensive card database that supports CRUD operations, alongside an intuitive, drag-and-drop deck builder interface for creating and editing decks.
Real-Time Features:
	•	Chat: Enable real-time communication between players.
	•	Live Tournament Updates: Provide instant updates on tournament matchups, scores, and standings.
	•	Collaborative Editing: Allow multiple users to work on a deck simultaneously with live updates.
	•	Creator Hub vs. Player Dashboard:
	•	Creator Hub (Admin Dashboard): A backend interface for creators to manage game rules, card databases, deck templates, tournaments, and monetization settings.
	•	Player Dashboard: A user interface for players to manage their profile, favorite games, decks, and tournament participation.
	•	Tournament Scheduling and ELO Tracking:
Implement an interface for scheduling tournaments, automating match pairings, updating leaderboards, and dynamically calculating ELO ratings based on players’ performance.
	•	Monetization Tools:
Include support for subscriptions, a marketplace for digital goods, and paywalls for premium content features.
	•	Authentication:
Use secure authentication methods for both email/password and social logins. Evaluate options for integration with Firebase Auth or NextAuth.js.

## User Flows & Journeys:
	•	For Creators:
	•	Sign up and create a personal subdomain.
	•	Upload and manage a card database.
	•	Configure deck-building templates and game rules.
	•	Schedule tournaments and monitor live updates.
	•	For Players:
	•	Sign up and join the platform.
	•	Browse creator subdomains and card databases.
	•	Build and save personal decks with drag-and-drop features.
	•	Participate in live tournaments and join community chats.

## Multi-Tenant Dynamic Subdomains for Creators

**User Story 1.1**

As a creator, I want to have a custom subdomain (e.g., mygame.battletcg.com) so that my brand and content are uniquely represented.

Acceptance Criteria:
	•	When a creator signs up and completes profile setup, the system automatically assigns a unique subdomain based on their chosen name or identifier.
	•	The subdomain is functional and routes to the creator’s customized homepage.
	•	Visitors using the subdomain see creator-specific content, styling, and card/game information.
	•	URL changes (via the Host header or middleware) reliably load the correct creator’s data.

⸻

## Card Database Management & Deck Builder with Drag-and-Drop

**User Story 2.1: Card Database Management**

As a creator, I want to add, update, and delete cards in my database so that I can maintain an up-to-date and accurate card collection for my game.

Acceptance Criteria:
	•	A dedicated interface in the Creator Hub allows for CRUD (create, read, update, delete) operations on card entries.
	•	Fields for each card (e.g., name, description, image, attributes) are validated upon creation or update.
	•	Changes are immediately reflected in the card database and accessible to players for deck building and viewing.

**User Story 2.2: Deck Builder with Drag-and-Drop**

As a player, I want to build and modify my deck using a drag-and-drop interface so I can easily experiment with different card combinations and strategies.

Acceptance Criteria:
	•	The deck builder interface allows users to drag cards from a list or grid view into a “deck area.”
	•	Cards can be repositioned, removed, or replaced via intuitive drag-and-drop functionality.
	•	Real-time visual feedback is provided during the drag process (e.g., card previews, snap indicators).
	•	The final deck is saved in the player’s dashboard with a timestamp and can be edited later.

⸻

## Real-Time Features

**User Story 3.1: Real-Time Chat**

As a player, I want to participate in a real-time chat during matches or within community rooms so that I can communicate instantly with other players.

Acceptance Criteria:
	•	A chat module integrated into both tournaments and community pages supports sending and receiving messages in real time.
	•	New messages are pushed instantly to all participants using Firestore snapshot listeners.
	•	The chat interface includes features like timestamps and user identifiers.
	•	Connection interruptions are handled gracefully with reconnection logic.

**User Story 3.2: Live Tournament Updates**

As a player, I want to receive live updates about ongoing tournaments (e.g., pairings, score changes, standings) so that I remain informed during gameplay.

Acceptance Criteria:
	•	Tournament pages subscribe to real-time updates from Firestore for match results and leaderboard changes.
	•	Changes in tournament state (like match completions or bracket changes) are immediately reflected on the UI.
	•	The interface presents clear status indicators (e.g., “In Progress,” “Completed”) and updated player rankings.

**User Story 3.3: Collaborative Deck Editing**

As a user (creator or player), I want to edit decks collaboratively in real time so that multiple users can suggest changes or work together on strategy.

Acceptance Criteria:
	•	Multiple users accessing the same deck see live updates of changes made by others.
	•	Conflict resolution (e.g., locking edited parts or merging changes) is handled gracefully.
	•	The system logs collaborative edits and displays a version history or change log.

⸻

## Creator Hub (Admin Dashboard) vs. Player Dashboard

**User Story 4.1: Creator Hub**

As a creator, I want a comprehensive admin dashboard so that I can manage my card database, game settings, tournaments, and monetization options easily.

Acceptance Criteria:
	•	A dedicated “Creator Hub” provides navigation for card management, tournament scheduling, analytics, and monetization settings.
	•	Only authenticated creators can access this dashboard.
	•	The dashboard shows summary statistics (such as tournament participation, deck views, revenue streams) that update in real time or on refresh.

**User Story 4.2: Player Dashboard**

As a player, I want a personalized dashboard where I can manage my profile, saved decks, and tournament participation so that I can keep track of my gaming activity.

Acceptance Criteria:
	•	The Player Dashboard displays user-specific data (e.g., saved decks, upcoming tournaments, recent activity).
	•	Users can update their profile details and manage their subscriptions from this dashboard.
	•	The dashboard retrieves and updates data in real time where applicable (e.g., tournament standings).

⸻

## Tournament Scheduling and ELO Tracking

**User Story 5.1: Tournament Scheduling**

As a creator or tournament organizer, I want to schedule and configure tournaments with customizable settings (e.g., participant limits, match formats) so that I can host competitive events tailored to my game.

Acceptance Criteria:
	•	The scheduling interface allows for specifying tournament parameters (date, time, format, number of rounds).
	•	Once scheduled, tournaments are automatically published and appear on relevant pages for player registration.
	•	Notifications or calendar integrations (optional) alert players to upcoming tournaments.

**User Story 5.2: ELO Tracking**

As a player, I want my game performance to be reflected through an ELO rating system so that I can track my progress and compare my skills with others.

Acceptance Criteria:
	•	Matches result in automatic updates to player ELO ratings based on predefined algorithms.
	•	ELO updates are displayed on player profiles and within tournament leaderboards.
	•	A history log is available showing past match results and rating changes.

⸻

## Monetization Tools

**User Story 6.1: Subscriptions and Premium Content**

As a user, I want to subscribe to premium content or features (such as ad-free experiences, exclusive decks, early access to new features) so that I can enhance my gaming experience while supporting creators.

Acceptance Criteria:
	•	Clear pricing tiers and subscription options are displayed on the site.
	•	Payment processing is integrated (e.g., Stripe) and securely managed.
	•	Upon subscription, premium features are unlocked seamlessly in the user’s dashboard.
	•	Subscription status is updated in real time and preserved across sessions.

**User Story 6.2: Marketplace for Digital Goods**

As a creator, I want to sell digital products (such as booster packs, custom skins, or unique deck templates) on a marketplace so that I can monetize my creativity and provide value to the community.

Acceptance Criteria:
	•	A marketplace interface displays available digital goods, clearly tagged with pricing information.
	•	Users can purchase items, with funds processed securely.
	•	Purchased items are added to the appropriate user’s profile or inventory.
	•	Transaction history is maintained for both creators and buyers, with clear confirmation messages and receipts.

⸻
## Authentication

**User Story 7.1: User Registration and Login**

As a potential user, I want to easily sign up and log in using either email/password or social logins so that I can quickly access the platform without friction.

Acceptance Criteria:
	•	Registration forms allow sign-up via email/password or through social providers (Google, Facebook, etc.).
	•	Appropriate error messages and validations are in place (e.g., password strength, duplicate email detection).
	•	Sessions are maintained securely, and authenticated pages are gated behind login.
	•	Password recovery or reset mechanisms are available if needed.

****User Story 7.2: Secure Session Management**

As a user, I want my session to be secure so that my data and gameplay history are protected.

Acceptance Criteria:
	•	The system uses secure tokens, cookies (HttpOnly), or JWTs as part of its authentication flow.
	•	Sensitive user data is stored securely (through Firestore rules and protected routes).
	•	Logout functionality is available, clearing active sessions and cookies promptly.
	•	Social login integrations handle token refresh and error reporting appropriately.
