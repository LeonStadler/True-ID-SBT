#!/bin/bash

# Git History Cleanup Script
# Entfernt sensible Daten aus der Git-Historie

echo "🚨 WICHTIG: Erstelle ein Backup des Repositories bevor du fortfährst!"
echo "Drücke Enter um fortzufahren oder Ctrl+C zum Abbrechen..."
read

# Prüfe ob wir in einem Git-Repository sind
if [ ! -d ".git" ]; then
    echo "❌ Fehler: Nicht in einem Git-Repository!"
    exit 1
fi

echo "🔍 Prüfe aktuelle Git-Historie auf sensible Daten..."

# Prüfe auf Pinata JWT in der Historie
if git log --all --full-history -- lib/pinata.ts | grep -q "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"; then
    echo "⚠️  Pinata JWT in Git-Historie gefunden!"
else
    echo "✅ Kein Pinata JWT in aktueller Historie gefunden"
fi

echo ""
echo "Wähle eine Bereinigungsmethode:"
echo "1) BFG Repo-Cleaner (Empfohlen)"
echo "2) Git Filter-Branch"
echo "3) Neues Repository erstellen"
echo "4) Abbrechen"

read -p "Deine Wahl (1-4): " choice

case $choice in
    1)
        echo "🔧 BFG Repo-Cleaner Methode..."
        
        # Prüfe ob BFG installiert ist
        if ! command -v bfg &> /dev/null; then
            echo "📥 Lade BFG herunter..."
            wget -O bfg.jar https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar
            BFG_CMD="java -jar bfg.jar"
        else
            BFG_CMD="bfg"
        fi
        
        echo "🧹 Bereinige Repository mit BFG..."
        $BFG_CMD --replace-text bfg-replacements.txt .
        
        echo "🗑️  Bereinige Git-Referenzen..."
        git reflog expire --expire=now --all
        git gc --prune=now --aggressive
        
        echo "✅ BFG-Bereinigung abgeschlossen!"
        ;;
        
    2)
        echo "🔧 Git Filter-Branch Methode..."
        
        echo "⚠️  Diese Methode kann langsam sein bei großen Repositories!"
        read -p "Fortfahren? (y/N): " confirm
        
        if [[ $confirm == [yY] ]]; then
            # Entferne Pinata JWT aus lib/pinata.ts
            git filter-branch --force --index-filter \
                'if [ -f lib/pinata.ts ]; then
                    sed -i "s/const JWT = .*/const JWT = \"***REMOVED***\";/" lib/pinata.ts
                    git add lib/pinata.ts
                fi' \
                --prune-empty --tag-name-filter cat -- --all
                
            echo "✅ Git Filter-Branch abgeschlossen!"
        else
            echo "❌ Abgebrochen"
            exit 1
        fi
        ;;
        
    3)
        echo "🆕 Neues Repository erstellen..."
        echo "📋 Schritte:"
        echo "1. Erstelle ein neues Repository"
        echo "2. Kopiere nur die bereinigten Dateien"
        echo "3. Committe nur die bereinigten Dateien"
        echo "4. Archiviere das alte Repository"
        echo ""
        echo "⚠️  Diese Methode verliert die komplette Git-Historie!"
        ;;
        
    4)
        echo "❌ Abgebrochen"
        exit 0
        ;;
        
    *)
        echo "❌ Ungültige Auswahl"
        exit 1
        ;;
esac

echo ""
echo "🔍 Prüfe Bereinigung..."

# Prüfe erneut auf sensible Daten
if git log --all --full-history -- lib/pinata.ts | grep -q "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"; then
    echo "⚠️  Pinata JWT immer noch in Historie gefunden!"
    echo "💡 Möglicherweise sind weitere Schritte erforderlich"
else
    echo "✅ Kein Pinata JWT mehr in Historie gefunden"
fi

echo ""
echo "🎉 Bereinigung abgeschlossen!"
echo "📋 Nächste Schritte:"
echo "1. Teste das Repository lokal"
echo "2. Force-push zu Remote (VORSICHT: überschreibt Remote-Historie!)"
echo "3. Informiere alle Teammitglieder"
echo "4. Aktualisiere CI/CD Pipeline falls nötig"

echo ""
echo "⚠️  WARNUNG: Force-push überschreibt die Remote-Historie!"
echo "git push --force-with-lease origin main"
