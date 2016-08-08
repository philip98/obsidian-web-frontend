#Hilfe
##Ausleihen
Grundsätzlich wird zwischen zwei Arten von Ausleihen unterschieden:
Basissatz-Ausleihen und Sonstige Ausleihen. Erstere umfassen alle Ausleihen,
wegen derer das Zeugnis einbehalten wird, also die Bücher, die man am
Schuljahresende (bzw. -anfang) bekommt. Sonstige Ausleihen hingegen sind alle
Ausleihen, die nicht zur Zeugniseinbehaltung führen, sprich: Ferienausleihen,
Ausleihen im Schuljahr und Ausleihen von Lehrern.

##Schüler
In der Schüler-Ansicht können Schüler hinzugefügt (das grüne Plus),
bearbeitet (der gelbe Bleistift), importiert (das grüne Blatt Papier),
exportiert (das blaue Blatt Papier mit dem Pfeil), gelöscht (mit dem roten X)
und gruppenweise bearbeitet (Häkchen neben den entsprechenden Schülern setzen, dann erscheint
unten ein Eingabefeld) werden. In der oberen rechten Ecke ist ein Suchfeld, mit
dem nach Teilen des Namens gesucht werden kann (nicht nur nach dem Anfang).
Darüber hinaus lässt sich die Ansicht noch nach Klassen filtern. Wenn man dies
tut, so kann man die Ansicht in den *Listen-Modus* umschalten, wo die
Basissatz-Ausleihen gegen die Namen in einer Tabelle aufgetragen werden
(wie auf der Liste aus Papier). Dort hat man dann die Auswahl zwischen alter
Liste und neuer Liste, also welche Bücher angezeigt werden. Auch im Listen-Modus
können die Namen gefiltert werden (reguläre Ausdrücke funktionieren *nicht*).
Außerdem gibt es neben dem Schülernamen zwei Buttons mit denen
Basissatz-Ausleihen und -Rückgaben direkt verbucht werden können.

In beiden Modi (Liste und Tabelle) ist der Name des Schülers jeweils ein Link zu
seiner Seite, wo alle als Basissatz ausgeliehenen Bücher und alle anderen
ausgeliehenen Bücher angezeigt werden. Dort kann man dann auch (alle Arten von)
Ausleihen und Rückgaben verbuchen

###Schüler importieren
Bei Klick auf das grüne Blatt Papier öffnet sich ein Dialog. Mit `Datei auswählen`
wählt man eine [CSV-Datei](https://de.wikipedia.org/wiki/CSV_(Dateiformat)) aus,
die die Daten der Schüler enthält. Im Feld darunter (wo `name` steht) gibt man an,
welche Daten in der Datei enthalten sind (da das meist nur die Namen der Schüler sind,
kann man `name` einfach stehenlassen). Im Feld darunter gibt man die Klasse ein,
in die die Schüler zu importieren sind (wenn Informationen zur Klasse bereits in
CSV-Datei zu finden sind, kann das Feld leer gelassen werden). Bei Klick auf
`Importieren` werden die Daten importiert.

Es ist wichtig zu beachten, dass die Datei keine Leerzeilen enthalten sollten
(auch wenn die Seite sie i.d.R. ignorieren *sollte*). Außerdem sollten in den
einzelnen Feldern der Datei keine Kommata enthalten sein, da das als Spaltentrenner
aufgefasst wird (und am Schluss in der Zeile mehr Felder sind, als die Seite erwartet).

###Ausleihen exportieren
Bei Klick auf das blaue Blatt Papier mit Pfeil (nur sichtbar, wenn die Ansicht
auf eine Klasse beschränkt ist) öffnet sich ein Dialog, der fragt, ob die
sonstigen Ausleihen mit exportiert werden sollen. Bei Klick auf `Exportieren`
wird eine Datei generiert, die jeden Schüler der Klasse anzeigt, der noch ausstehende Ausleihen hat.
Bei aktiviertem `Sonstige Ausleihen exportieren` werden alle Ausleihen exportiert,
sonst nur diejenigen, die er zurückgeben muss (Bücher, die er nicht für seine
aktuelle Klasse braucht + Ferienausleihen, etc.).

##Bücher
Die Bücher-Tabelle funktioniert ähnlich wie die Schüler-Tabelle (nur mit weniger
Aktionen). Die "Einzelansicht" eines Buches, also die Seite, die man mit Klick auf den Titel
erreicht, bietet zusätzlich noch die Möglichkeit, Aliasse für dieses Buch zu
erstellen, zu löschen oder zu bearbeiten.

###Bücher exportieren
Per Klick auf das blaue Blatt Papier mit Pfeil wird eine Textdatei generiert,
die alle Bücher und deren Aliasse enthält.

##Ausleihen und Rückgaben
Wenn man eine Ausleihe oder Rückgabe verbucht, findet man zwei Eingabefelder
vor. Man wählt das erste an, fängt an zu scannen und es werden automatisch
Eingabefelder hinzugefügt. Wenn das Buch keinen Strichcode hat, kann man den
Alias des Buches eingeben. Neben einem eingescannten Buch (oder Alias) wird dann
automatisch der Titel des Buches angezeigt (oder eine Fehlermeldung).
