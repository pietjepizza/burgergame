# 🍔 Tijn's Burger Place

Een kleurrijk restaurant tycoon spel voor kinderen (8-10 jaar). Bouw je eigen fastfoodrestaurant uit:
klanten komen binnen, **koks** maken het eten, **obers** brengen het naar de tafel en jij tikt op de
**euro's** die klanten achterlaten. Met dat geld koop je nieuwe keukens, personeel, tafels en uitbreidingen.

▶️ **Spelen:** https://pietjepizza.github.io/burgergame/ (na publicatie via GitHub Pages)

## Zelf draaien

```bash
npm install
npm run dev      # start op http://localhost:5173 en ververst automatisch bij wijzigingen
npm run build    # maakt de online versie in de map dist/
npm run preview  # bekijk de gebouwde versie
```

## Publiceren

Elke push naar `main` publiceert het spel automatisch via GitHub Actions
(`.github/workflows/deploy.yml`). Eenmalig instellen: **Settings → Pages → Source: GitHub Actions**.

## Hoe het project in elkaar zit

```
index.html            HTML-skelet (topbalk, speelveld, menu)
src/
  main.js             start het spel en de game-loop
  styles.css          alle opmaak en animaties
  data/config.js      ⭐ ALLE SPELDATA: eten, prijzen, keukens, tafels, versiering
  art/                alle tekeningen als SVG (zelf getekend, geen plaatjes nodig)
    food.js           eten (burger, friet, pizza, ...)
    animals.js        de dieren (klanten en personeel) met gezichtsuitdrukkingen
    stations.js       keukenapparaten (grill, frituur, pizzaoven, ...)
    decor.js          versieringen voor aan de muur
    icons.js          knoppen, munten, tafels, deur, ...
    index.js          art('naam') geeft de tekening terug
  core/
    state.js          opslaan en laden (localStorage)
    sound.js          geluidjes (Web Audio, geen bestanden)
    effects.js        confetti, vliegende munten, sterretjes
    util.js           kleine hulpfuncties (euro-notatie, ...)
  game/
    world.js          bouwt het restaurant: keuken, tafels, personeel
    sim.js            spelregels: klanten, koks, obers, kassa, kopen
    shop.js           de winkel en het uitlegscherm
public/               bestanden die 1-op-1 meegaan (favicon)
```

### Iets toevoegen

- **Nieuw eten:** teken het in `src/art/food.js` en zet het in `FOODS` in `src/data/config.js`
  met een prijs (in centen), kooktijd en de keuken die het maakt.
- **Nieuwe keuken:** teken het apparaat in `src/art/stations.js` en voeg het toe aan `STATIONS`.
- **Nieuwe versiering:** teken het in `src/art/decor.js` en zet het in `DECOR` met prijs en plek.
- **Prijzen of moeilijkheid aanpassen:** alles staat in `src/data/config.js`.

Het speelveld is 1000 × 600 punten groot en schaalt automatisch mee met het scherm.
