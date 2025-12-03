# Short Crime Story Generator 📖
<figure>
    <img src="logo.png" alt="<figcaption></figcaption>" width="600">
</figure>
---
<a class="md-button md-button--primary" href="https://fairy-tale-generator-ab.streamlit.app/" target="_blank">Go to the application</a>

---

### ✅ 1. **Sequence Diagram: User Login & Story Generation Flow**

```mermaid
sequenceDiagram
    participant "User" as User
    participant "Streamlit App" as App
    participant "Authentication Service" as Auth
    participant "OpenAI API" as OpenAI
    participant "PostgreSQL DB" as DB

    User->>App: Clicks "Login" button
    App->>Auth: Validate credentials (email/password)
    Auth-->>App: Returns login status (success/failure)
    alt User is logged in
        App->>App: Set session state: user_subscribed, email, lang
        App->>App: Load translations (languages.json)
        App->>App: Show sidebar & main interface
        User->>App: Enters story prompt in text area
        App->>App: Validate input (non-empty)
        App->>App: Check monthly usage limits (DB)
        App->>DB: Query monthly usage (input/output tokens)
        DB-->>App: Returns usage stats
        alt Free User Exceeded Limit
            App-->>User: Show "Usage limit exceeded" error
        else Within Limits
            App->>OpenAI: Generate story using dynamic model (gpt-4.1-nano)
            OpenAI-->>App: Returns story content + token usage
            App->>DB: Log usage (input/output tokens)
            App-->>User: Display generated story
            App->>App: Offer download button
        end
    end
    User->>App: Clicks "Download" button
    App-->>User: Downloads .txt file of story
```

---

### ✅ 2. **Component Diagram: App Architecture**

```mermaid
graph TD
    A[User Interface] --> B[Streamlit App]
    B --> C[Language Selector]
    B --> D[Login/Logout System]
    B --> E[Subscription Manager]
    B --> F[Input/Output Text Area]
    B --> G[Story Generation Engine]

    G --> H[Model Rotation Logic]
    H --> I[OpenAI API Client]
    I --> J[Token Usage Tracker]

    G --> K[Usage Database]
    K --> L[PostgreSQL Database]
    L --> M[Monthly Usage Records]

    B --> N[Translation System]
    N --> O[languages.json]

    B --> P[Download & Display Module]
    P --> Q[Text Output + Download Button]

    style A fill:#A855F7,stroke:#9333EA,stroke-width:2px,color:#fff
    style B fill:#06B6D4,stroke:#0891B2,stroke-width:2px,color:#fff
    style C fill:#10B981,color:#fff
    style D fill:#A855F7,stroke:#9333EA,stroke-width:2px,color:#fff
    style E fill:#06B6D4,stroke:#0891B2,stroke-width:2px,color:#fff
    style F fill:#10B981,color:#fff
    style G fill:#A855F7,stroke:#9333EA,stroke-width:2px,color:#fff
    style H fill:#06B6D4,stroke:#0891B2,stroke-width:2px,color:#fff
    style I fill:#10B981,color:#fff
    style J fill:#06B6D4,stroke:#0891B2,stroke-width:2px,color:#fff
    style K fill:#10B981,color:#fff
    style L fill:#A855F7,stroke:#9333EA,stroke-width:2px,color:#fff
    style M fill:#06B6D4,stroke:#0891B2,stroke-width:2px,color:#fff
    style N fill:#10B981,color:#fff
    style P fill:#A855F7,stroke:#9333EA,stroke-width:2px,color:#fff
    style Q fill:#06B6D4,stroke:#0891B2,stroke-width:2px,color:#fff
```
---

### ✅ 2. **Component Diagram: Application Architecture**

```mermaid
graph LR
    A[User Interface] --> B[Streamlit App]
    B --> C[Authentication Service]
    B --> D[OpenAI API]
    B --> E[PostgreSQL Database]
    B --> F[Translation Manager]

    style A fill:#A855F7,stroke:#9333EA,stroke-width:2px,color:#fff
    style B fill:#06B6D4,stroke:#0891B2,stroke-width:2px,color:#fff
    style C fill:#10B981,color:#fff
    style D fill:#F59E0B,stroke:#D97706,stroke-width:2px,color:#fff
    style E fill:#8B5CF6,stroke:#7C3AED,stroke-width:2px,color:#fff
    style F fill:#EC4899,stroke:#DB2777,stroke-width:2px,color:#fff

    classDef component fill:#1E293B,stroke:#334155,stroke-width:2px,color:#fff;
    classDef service fill:#06B6D4,stroke:#0891B2,stroke-width:2px,color:#fff;
    classDef ui fill:#A855F7,stroke:#9333EA,stroke-width:2px,color:#fff;

    A[User Interface] -->|Uses| B[Streamlit App]
    B -->|Calls| C[Authentication Service]
    B -->|Calls| D[OpenAI API]
    B -->|Saves| E[PostgreSQL Database]
    B -->|Loads| F[Translation Manager]
```

---
### ✅ 3. **Flowchart: Approval Process (Subscription Upgrade)**

```mermaid
graph TD
    A[User clicks "Become Premium"] --> B{Is user logged in?}
    B -- No --> C[Redirect to Login]
    B -- Yes --> D{Is user already premium?}
    D -- No --> E[Show subscription modal]
    E --> F[User confirms payment]
    F --> G{Payment successful?}
    G -- No --> H[Show error: Payment failed]
    G -- Yes --> I[Update user status to Premium]
    I --> J[Refresh usage limits: Unlimited tokens]
    J --> K[Display success message: "Premium access granted!"]

    style A fill:#A855F7,stroke:#9333EA,stroke-width:2px,color:#fff
    style B fill:#06B6D4,stroke:#0891B2,stroke-width:2px,color:#fff
    style C fill:#10B981,color:#fff
    style D fill:#F59E0B,stroke:#D97706,stroke-width:2px,color:#fff
    style E fill:#8B5CF6,stroke:#7C3AED,stroke-width:2px,color:#fff
    style F fill:#EC4899,stroke:#DB2777,stroke-width:2px,color:#fff
    style G fill:#06B6D4,stroke:#0891B2,stroke-width:2px,color:#fff
    style H fill:#EF4444,stroke:#DC2626,stroke-width:2px,color:#fff
    style I fill:#10B981,color:#fff
    style J fill:#059669,stroke:#047857,stroke-width:2px,color:#fff
    style K fill:#06B6D4,stroke:#0891B2,stroke-width:2px,color:#fff
```

---
<!-- *Project start: 2025-04-05* -->

## Overview
A Streamlit-powered storytelling generator that creates engaging, structured short stories using OpenAI's language models, with user authentication, usage tracking, and tiered access based on subscription level.

<!-- ## Project architecture
	in Excalidraw -->

## Main functionalities
- Generates creative, structured short stories (with introduction, development, twist, and moral) from user-provided prompts
- Implements dynamic model rotation among multiple GPT models (e.g., `gpt-4o-mini`, `gpt-4.1-mini`)
- Tracks token usage per user and month with PostgreSQL
- Enforces usage limits: free users (1k input / 10k output tokens), premium users (10k input / 100k output tokens)
- Supports Google OAuth login and subscription management via `st_paywall`
- Provides real-time usage statistics and current model tracking in sidebar
- Allows downloading generated stories as plain text files

## Technologies & skills
- Python
- Streamlit
- OpenAI API
<!-- - PostgreSQL -->
- Create and deploy databases PostgreSQL on Ubuntu server https://cloud.digitalocean.com/droplets?i=0c32ac
- st_paywall (for user subscription management)
- Pandas (data handling)
- psycopg2 (PostgreSQL connector)
- itertools.cycle (for model rotation)

## Project Report
- Implemented token-based usage limits with monthly reset
- Integrated secure Google OAuth login and subscription tier detection
- Designed dynamic model selection to balance performance and cost
- Built robust error handling for unauthenticated users and usage overages
- Added real-time feedback via progress spinner and usage metrics
- Ensured data privacy by storing only necessary usage metadata

## Sample photos

<figure>
    <img src="../images/story1.png" alt="<figcaption></figcaption>" width="600">
<figcaption></figcaption>
    <img src="../images/story2.png" alt="<figcaption></figcaption>" width="600">
<figcaption></figcaption>
     <img src="../images/story3.png" alt="<figcaption></figcaption>" width="600">
<figcaption></figcaption>
    <img src="../images/story4.png" alt="<figcaption></figcaption>" width="600">
<figcaption></figcaption>
    <img src="../images/story5.png" alt="<figcaption></figcaption>" width="600">
<figcaption></figcaption>
    <img src="../images/story6.png" alt="<figcaption></figcaption>" width="600">
<figcaption></figcaption>
</figure>

## Application usage

- Enter a prompt in the text area 
- Click "Generate" to create a story
- View the generated story with model used and download option
- Monitor token usage in the sidebar
- Upgrade to premium for higher limits

---

<a class="md-button md-button--primary" href="https://fairy-tale-generator-ab.streamlit.app/" target="_blank">Go to the application</a>

---