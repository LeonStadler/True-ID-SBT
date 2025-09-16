# CHANGES.md

## 16. September 2025 - Node.js 22 Upgrade & Code Maintenance

### 🔧 WARTUNG & COMPATIBILITY UPDATE

Diese Änderungen dienen ausschließlich der Wartung und Kompatibilität des Projekts. Es wurden keine funktionalen Änderungen vorgenommen.

### 📋 Durchgeführte Änderungen

#### 1. **Node.js 22 Kompatibilität**
- **Node.js Version**: Upgrade von 18.x auf 22.x für Vercel-Kompatibilität
- **.nvmrc**: Aktualisiert auf Node.js 22
- **package.json**: `engines.node` bereits auf "22.x" konfiguriert

#### 2. **Dependencies Update**
- **Radix UI Komponenten**: Aktualisiert auf neueste Versionen
- **PostCSS & Autoprefixer**: Sicherheitsupdates
- **Web3-Dependencies**: Bewusst auf stabile Versionen belassen (viem 1.21.4, wagmi 1.4.13, rainbowkit 1.3.7)

#### 3. **Code-Qualität Verbesserungen**
- **ESLint-Konfiguration**: `.eslintrc.json` hinzugefügt
- **Import-Statements**: Optimiert und bereinigt
- **useEffect Dependencies**: React Hook Warnings behoben
- **useCallback**: Performance-Optimierung in view-metadata.tsx

#### 4. **Build & Linting**
- **Build-Prozess**: Erfolgreich getestet mit Node.js 22
- **ESLint-Warnings**: Minimiert (nur harmlose Performance-Warnung verbleibt)
- **TypeScript**: Vollständig kompatibel

### ⚠️ Wichtige Hinweise
- **Keine Breaking Changes**: Alle bestehenden Funktionen bleiben unverändert
- **Web3-Stabilität**: Wagmi/v1 und viem/v1 bleiben aus Stabilitätsgründen unverändert
- **Vercel-Ready**: Projekt ist vollständig bereit für Node.js 22 Deployment

---

## 16. September 2024 - Security Hardening

### 🚨 KRITISCHE SICHERHEITSVERBESSERUNGEN

Diese Änderungen stellen sicher, dass keine sensiblen Daten mehr im Repository oder in der Git-Historie gespeichert sind.

### 📋 Durchgeführte Änderungen

#### 1. **Secrets Externalisierung**
- **Pinata JWT**: Hartcodiertes JWT aus `lib/pinata.ts` entfernt
  - Neue serverseitige API-Route: `pages/api/pin.ts`
  - JWT wird nur noch serverseitig aus `PINATA_JWT` gelesen
  - Client-seitige Requests laufen über `/api/pin` Endpoint

#### 2. **Contract-Adresse Sicherheit**
- **Vorher**: Hartcodiert in `lib/constants.ts`
- **Nachher**: Verpflichtend aus `NEXT_PUBLIC_CONTRACT_ADDRESS`
- **Sicherheit**: App startet nicht ohne gesetzte Contract-Adresse

#### 3. **WalletConnect Project ID**
- **Vorher**: Hartcodiert in `pages/_app.tsx`
- **Nachher**: Verpflichtend aus `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
- **Sicherheit**: App startet nicht ohne gesetzte Project ID

#### 4. **App-Name Zentralisierung**
- **Vorher**: Hartcodiert in mehreren Dateien
- **Nachher**: Zentral aus `NEXT_PUBLIC_APP_NAME` über `config/site.ts`
- **Betroffen**: `pages/_app.tsx`, `pages/index.tsx`, RainbowKit `appName`

#### 5. **Chain-Konfiguration**
- **Vorher**: Hartcodiert in `lib/chain.ts`
- **Nachher**: Aus Env-Variablen mit Fallbacks
- **Variablen**: `NEXT_PUBLIC_CHAIN_ID`, `NEXT_PUBLIC_RPC_URL`, `NEXT_PUBLIC_BLOCK_EXPLORER_URL`

#### 6. **Environment-Dateien Struktur**
- **`.env`**: Öffentliche Defaults (versioniert)
- **`.env.local`**: Lokale/geheime Werte (ignoriert)
- **`.env.example`**: Vollständige Dokumentation aller Variablen
- **`.gitignore`**: Umfassende Regeln für Next.js/TypeScript

### 🔧 Technische Details

#### Neue API-Route: `pages/api/pin.ts`
```typescript
// Serverseitige Pinata-Integration
const jwt = process.env.PINATA_JWT;
// Authorization: `Bearer ${jwt}`
```

#### Env-Variable Validierung
```typescript
// Verpflichtende Variablen mit Fehlerbehandlung
if (!process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) {
  throw new Error("Missing required env NEXT_PUBLIC_CONTRACT_ADDRESS");
}
```

#### Zentralisierte Konfiguration
```typescript
// config/site.ts
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "TrueID SBT";
```

### 📁 Betroffene Dateien

#### Geändert:
- `lib/pinata.ts` - Pinata JWT entfernt, API-Route verwendet
- `lib/constants.ts` - Contract-Adresse aus Env
- `lib/chain.ts` - Chain-Konfiguration aus Env
- `pages/_app.tsx` - WalletConnect Project ID aus Env, App-Name zentralisiert
- `pages/index.tsx` - App-Name aus siteConfig
- `config/site.ts` - App-Name aus Env

#### Neu erstellt:
- `pages/api/pin.ts` - Serverseitige Pinata-API
- `.env` - Öffentliche Defaults
- `.env.local` - Lokale/geheime Werte
- `.env.example` - Vollständige Dokumentation
- `.gitignore` - Umfassende Ignore-Regeln
- `CHANGES.md` - Diese Dokumentation

### 🔒 Sicherheitsverbesserungen

1. **Keine Secrets im Client-Code**
2. **Keine Secrets im Repository**
3. **Verpflichtende Env-Variablen mit klaren Fehlermeldungen**
4. **Serverseitige Secret-Verarbeitung**
5. **Umfassende .gitignore-Regeln**

### 🔄 Git-Historie Bereinigung

Die Git-Historie wurde mit `git filter-branch` bereinigt, um alle hartcodierten Secrets aus der Historie zu entfernen. Das Repository wurde anschließend mit `git gc --aggressive` optimiert.