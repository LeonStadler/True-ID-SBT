# CHANGES.md

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

### 🚀 Deployment-Hinweise

#### Lokale Entwicklung:
```bash
# 1. .env.local erstellen
cp .env.example .env.local

# 2. Werte setzen
# - PINATA_JWT: Dein Pinata JWT
# - NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: Deine WalletConnect Project ID
# - NEXT_PUBLIC_CONTRACT_ADDRESS: Deine Contract-Adresse

# 3. Server starten
npm run dev
```

#### Production:
- Alle Env-Variablen in Production-Environment setzen
- `NEXT_TELEMETRY_DISABLED=1` empfohlen
- Keine `.env.local` in Production verwenden

### ⚠️ Wichtige Hinweise

1. **Git-Historie**: Enthält noch die alten hartcodierten Secrets
2. **Backup**: Vor weiteren Änderungen Repository sichern
3. **Team**: Alle Teammitglieder über neue Env-Struktur informieren
4. **CI/CD**: Pipeline auf neue Env-Variablen anpassen

### 🔄 Nächste Schritte

1. **Git-Historie bereinigen** (siehe unten)
2. **Team informieren** über neue Env-Struktur
3. **CI/CD Pipeline** anpassen
4. **Production-Deployment** testen

---

## Git-Historie Bereinigung

### Option 1: BFG Repo-Cleaner (Empfohlen)
```bash
# 1. BFG herunterladen
wget https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar

# 2. Sensible Daten entfernen
java -jar bfg-1.14.0.jar --replace-text replacements.txt your-repo.git

# 3. Git bereinigen
cd your-repo.git
git reflog expire --expire=now --all && git gc --prune=now --aggressive
```

### Option 2: Git Filter-Branch
```bash
# Pinata JWT aus Historie entfernen
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch lib/pinata.ts' \
--prune-empty --tag-name-filter cat -- --all
```

### Option 3: Neues Repository (Sicherste Option)
```bash
# 1. Neues Repository erstellen
# 2. Nur bereinigte Dateien committen
# 3. Altes Repository archivieren
```

---

**Datum**: 16. September 2024  
**Autor**: Security Hardening  
**Status**: ✅ Abgeschlossen  
**Nächste Aktion**: Git-Historie bereinigen
