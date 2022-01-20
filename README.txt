Gebruikershandleiding expo omgeving

1.	Download NodeJS indien dat nog niet is geïnstalleerd op de computer kies voor versie 16.13.1 dit is namelijk de versie die wij gebruikt hebben voor dit project. (https://nodejs.org/download/release/v16.13.1/ )

2.	Wanneer NodeJS is geïnstalleerd ga dan naar het command prompt (cmd) en run het volgende command: npm install -g expo-cli

3.	Voordat je de file kan runnen die wij hebben gestuurd via we transfer moet je voor de test zelf een project maken en runnen. Dit doe je via het command prompt(cmd) doormiddel van het volgende command: expo init naam _project

4.	Daarna krijg je vier opties te zien die je kunt kiezen. Kies voor de optie blank en druk op enter. 
 
5.	Wanneer hij klaar is met installeren moet je kijken waar je het project hebt geïnstalleerd. Standaard zou hij moeten staan op je c schijf in de verkenner onder je gebruikers account. 

6.	Wanneer je het project mapje gevonden hebt open je de code editor die je gebruikt en selecteer je de map die we hebben aangemaakt. (tijdens ons project hebben wij gebruik gemaakt van Visual studio code)

7.	Wanneer je de map hebt geopend via de code editor open je de terminal en run je het command: npm start

8.	Als het goed is opent hij automatisch een webpagina indien hij dat niet doet kan je op een link klikken die wordt aangegeven in de terminal.

9.	Nu heb je als het goed is een webpagina voor je dit is hoe wij dit project hebben gemaakt. Indien je de app op je telefoon wilt zien werken kan je de expo app downloaden en de QR code scannen die linksonder staat. Ook heb je de mogelijkheid om het project te runnen via emulator of via de webpagina. 

https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US 

10.	Nu je een eigen project hebt gerund kan je nu als het goed is de code runnen die wij hebben gestuurd via de we transfer link. De code staat in een zip file die moet dus eerst uitgepakt worden. Wanneer deze is uitgepakt heb je de mogelijkheid om deze ook te kunnen runnen. 

Mocht het project niet willen runnen heb je ook de mogelijkheid om de code die in GitHub staat te kopiëren in een nieuw project. Alle code files die wij hebben gebruikt staan onder de map screens en de code die in App.js staat. Wanneer je dan het project wilt runnen moet je wel nog alle libary ’s installeren via terminal hieronder een lijst met alle commands die je dan moet uitvoeren:

1.	npm i react-native-navigation-container
2.	npm install @react-navigation/native
3.	expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
4.	npm install @react-navigation/bottom-tabs 
5.	npm install @react-navigation/native-stack 
6.	npm install @react-native-async-storage/async-storage
7.	expo install @react-native-async-storage/async-storage
8.	expo install react-native-maps
9.	expo install expo-location
10.	expo install expo-task-manager 
11.	expo install expo-web-browser     
12.	expo install expo-barcode-scanner
