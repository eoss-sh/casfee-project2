## CASFEE 2021 - Project 2

### Project Idea

Die Idee des Projektes ist es, eine einfache Möglichkeit zum Aufzeichnen von Ergebnissen von Golfrunden bereitzustellen. Neben dem Aufzeichnen der Ergebnisse werden Statistiken und Auswertungen bez. der Scores dem User aufgezeigt. Zusätzlich soll durch Scores-Ranglisten pro Platz eine Art soziales Netzwerk für Golfer geschaffen werden, welches auch den Vergleich von Scores erlaubt.

Das fertige Projekt kann unter https://birdiebook.netlify.app/ angeschaut werden.

### Technology

- React
- Redux Toolkit
- Firebase Storage
- Firebase Auth
- Typescript
- Cypress
- React Bootstrap

Based on Create-Ract-Add with Redux and Typscript Template.

### Wireframes

Die Wireframes sind unter folgendem Link aufrufbar:
https://www.figma.com/file/BkOWuzv8NvCZkupWIOAuJe/BirdieBook-Wireframes?node-id=0%3A1

### User Tests

Es wurden verschiedene User-Tests durchgeführt. Die Feedbacks aus den Tests sind direkt in die Optimierung der App eingeflossen. Die Planungs-Dashboards, Aufgabenstellungen, Personas und Auswertungen können hier gefunden werden:
https://drive.google.com/drive/u/0/folders/1vVHx9yXOf-Y8pxn5UUmh82tMlU4q_-a7

### Dokumentation

**Rechte und Nutzer**
Es gibt drei Arten von Nutzern der Anwendung:

- Besucher ohne Account: Diese Besucher können nur die Golfplatz-Seiten anschauen und keine Ergebnisse speichern.
- Angemeldete Nutzer: Die Nutzer der App können Ergebnisse speichern, anpassen und Statistikdaten ansehen.
- Admin: Der Admin kann alle User anschauen, andere User zu einem Admin machen und neue Golfplätze hinzufügen.

**Sicherheit**
Alle relevanten Seiten sind durch Auth- und Admin-Routes geschützt und können nur nach dem Login mit einem entsprechenden User angeschaut werden.

Die Anwendung umfasst drei Module:

**Kurse erfassen**
Mit dem Modul "Kurse erfassen" können Admin User neue Golfplätze inkl. Scorekarte und Bild hinzufügen. Die Funktion steht nur Admin-Usern zur Verfügung.

**Ergebnisse erfassen, löschen und anpassen**
Jeder angemeldete User kann neue Ergebnisse erfassen, diese anpassen, mit Durchschnittswerten von vergangenen Runden vergleichen und bei Bedarf auch löschen. Jeder Nutzer kann nur die eigenen Ergebnisse sehen und sieht nur die Statistik der eigenen Ergebnisse.

Auf jeder Detailseite eines Golfplatzes sind die 10 besten Scores von allen Usern aufgeführt. Diese Daten sind für alle Nutzer und Besucher einsehbar.

**Statistik**
Im Bereich der Statistik kann der User Durchschnittswerte der gespielten Runden, wichtige Statistikzahlen wie "Fairway in Regulation" oder "Green in Regulation" anschauen. Ebenfalls ist eine grafische Darstellung aller gespielten Runden einsehbar.
