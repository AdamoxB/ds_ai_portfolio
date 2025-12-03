# Short Crime Story Generator 📖
<figure>
    <img src="logo.png" alt="<figcaption></figcaption>" width="600">
</figure>
---
<a class="md-button md-button--primary" href="https://fairy-tale-generator-ab.streamlit.app/" target="_blank">Go to the application</a>

---
<!-- *Project start: 2025-04-05* -->

## Overview
A Streamlit-powered storytelling generator that creates engaging, structured short stories using OpenAI's language models, with user authentication, usage tracking, and tiered access based on subscription level.

<!-- ## Project architecture
	in Excalidraw -->
```mermaid
flowchart LR
    A[Start] --> B{User Login?}
    B -- No --> C[Redirect to Login]
    B -- Yes --> D[Load User Preferences]
    D --> E[Load Language Settings]
    E --> F[Language Selector in Sidebar]
    F --> G{Language Changed?}
    G -- Yes --> H[Update Session Language]
    G -- No --> I[Proceed with Current Language]
    I --> J[Load Translations from languages.json]
    J --> K[Set Default Language: 'pl' if not set]
    K --> L[Initialize Model Cycle: gpt-4.1-nano]
    L --> M[Database Connection Setup]
    M --> N[Usage Limits Configuration]
    N --> O[Check Monthly Usage Limits]
    O --> P{Free User?}
    P -- Yes --> Q{Input/Output Tokens Exceeded?}
    P -- No --> R{Premium User?}
    Q -- Yes --> S[Show Usage Exceeded Error]
    Q -- No --> T[Proceed to Generate Story]
    R -- Yes --> U[Check Token Limits]
    U -- Yes --> V[Show Premium Usage Limit Error]
    U -- No --> W[Proceed to Generate Story]
    T --> X[Get User Input Text]
    W --> X
    X --> Y[Validate Input (Non-empty)]
    Y --> Z{Input Valid?}
    Z -- No --> AA[Disable Generate Button]
    Z -- Yes --> AB[Generate Story with Dynamic Model Selection]
    AB --> AC[Call OpenAI API with System Prompt]
    AC --> AD[Extract Usage Tokens: Prompt & Completion]
    AD --> AE[Store Usage in Database]
    AE --> AF[Display Generated Story]
    AF --> AG[Show Download Button]
    AF --> AH[Show Account & Stats in Sidebar]
    AH --> AI[Display Subscription Status]
    AI --> AJ[Show Monthly Token Metrics]
    AJ --> AK[Show Input/Output Usage vs Limits]
    AK --> AL[End]

    style A fill:#f9f,stroke:#333
    style B fill:#bbf,stroke:#333
    style C fill:#f9f,stroke:#333
    style D fill:#bbf,stroke:#333
    style E fill:#bbf,stroke:#333
    style F fill:#bbf,stroke:#333
    style G fill:#bbf,stroke:#333
    style H fill:#bbf,stroke:#333
    style I fill:#bbf,stroke:#333
    style J fill:#bbf,stroke:#333
    style K fill:#bbf,stroke:#333
    style L fill:#bbf,stroke:#333
    style M fill:#bbf,stroke:#333
    style N fill:#bbf,stroke:#333
    style O fill:#bbf,stroke:#333
    style P fill:#bbf,stroke:#333
    style Q fill:#bbf,stroke:#333
    style R fill:#bbf,stroke:#333
    style S fill:#f9f,stroke:#333
    style T fill:#bbf,stroke:#333
    style U fill:#bbf,stroke:#333
    style V fill:#f9f,stroke:#333
    style W fill:#bbf,stroke:#333
    style X fill:#bbf,stroke:#333
    style Y fill:#bbf,stroke:#333
    style Z fill:#bbf,stroke:#333
    style AB fill:#bbf,stroke:#333
    style AC fill:#bbf,stroke:#333
    style AD fill:#bbf,stroke:#333
    style AE fill:#bbf,stroke:#333
    style AF fill:#bbf,stroke:#333
    style AG fill:#bbf,stroke:#333
    style AH fill:#bbf,stroke:#333
    style AI fill:#bbf,stroke:#333
    style AJ fill:#bbf,stroke:#333
    style AK fill:#bbf,stroke:#333
    style AL fill:#f9f,stroke:#333

    classDef process fill:#bbf,stroke:#333;
    classDef error fill:#f9f,stroke:#333;
    classDef decision fill:#f9f,stroke:#333;
    classDef action fill:#bbf,stroke:#333;
    classDef conditional fill:#bbf,stroke:#333;

    subgraph "User Flow"
        B C D E F G H I J K L M N O P Q R S T U W X Y Z AB AC AD AE AF AG AH AI AJ AK AL
    end

    subgraph "Authentication & Security"
        B C D
    end

    subgraph "Language & UI"
        E F G H I J K
    end

    subgraph "Model & API"
        L M N O P Q R S T U W
    end

    subgraph "Story Generation"
        X Y Z AB AC AD AE AF
    end

    subgraph "User Experience"
        AG AH AI AJ AK AL
    end
```

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