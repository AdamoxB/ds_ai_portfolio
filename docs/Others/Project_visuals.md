# Presentation of Diagrams

## PlantUML Diagrams

(Paste PlantUML code here)

## Graphviz Network Diagram

(Paste Graphviz DOT code here)

## Blockly Flow Diagram

(Paste Blockly code here - optional)



# Prezentacja Możliwości Diagramów i Wykresów

## 1. Mermaid

### Diagram Sekwencyjny (Sequence Diagram)

```mermaid
sequenceDiagram
    participant Użytkownik
    participant Aplikacja
    participant Serwer
    Użytkownik->>Aplikacja: Wprowadza dane
    Aplikacja->>Serwer: Wysyła zapytanie
    Serwer-->>Aplikacja: Zwraca wynik
    Aplikacja->>Użytkownik: Wyświetla wynik
```
```mermaid
    flowchart LR
        A[User Input] -->|App description,<br/>diagram, or<br/>GitHub repo| B[Prompt Builder]
        B -->|threat_model.py<br/>mitigations.py<br/>etc.| C{LLM Provider}
        C -->|OpenAI| D[JSON Response]
        C -->|Anthropic| D
        C -->|Google/Mistral/Groq| D
        C -->|Ollama/LM Studio| D
        D --> E[Markdown Converter]
        E --> F[Display Results]

        G[Organizational<br/>Context] -.->|Inject here| B

        style G fill:#A855F7,stroke:#9333EA,stroke-width:2px,color:#fff
        style B fill:#06B6D4,stroke:#0891B2,stroke-width:2px,color:#fff
```
