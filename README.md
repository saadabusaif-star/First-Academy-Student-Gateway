# The First Academy — Student Gateway (v3)

A bilingual (English / عربي) "game lobby" for students who have finished their
class tasks: meaningful learning games, AI adventures and certificate courses,
filtered by **grade, interest, type and time**.

Live: https://saadabusaif-star.github.io/First-Academy-Student-Gateway/

## What's new in v3
- **97 hand-picked activities** — 43 from the CSforAll / Code.org *Hour of AI*
  library (student-playable games and self-led projects only; teacher lesson
  plans, robot-kit activities and Roblox removed) plus trusted sites such as
  Teachable Machine, PhET, Blockly Games, SQL Murder Mystery, Bad News,
  picoCTF, Wokwi, Madrasa and Edraak.
- **Finder**: grade chips (4–12), 9 interest tiles, type (games / create /
  puzzles / courses), time (≤20 min / ~1 hour / longer), toggles for
  *certificate only*, *Hour of AI only*, *no login / webcam needed*, search,
  and a 🎲 **Surprise me** button.
- **Grade 11–12 certificate pathways**: Python Programmer, AI Explorer, Cyber
  Defender, Web Developer — free certificates from Harvard CS50, Kaggle,
  Cisco NetAcad, IBM SkillsBuild, University of Helsinki, freeCodeCamp.
- **Learning passport**: students tick "Done", earn XP and levels
  (Explorer → Legend), save favourites, and after 3 activities print a
  bilingual **Gateway certificate** listing what they completed, with a line
  for the teacher's signature. Progress is saved in the student's own browser.
- Free-time rules section, full Arabic RTL layout, mobile friendly.

## Files
| File | What it holds |
|---|---|
| `index.html` | Page structure |
| `style.css`  | Navy-and-gold design |
| `data.js`    | **All activities and pathways — edit this to add/remove links** |
| `app.js`     | Filters, cards, passport, certificate, EN/AR switch |

(`script.js` from v2 is no longer used.)

## Adding an activity
Copy any line in `data.js`, give it a new `id`, and fill in the fields
described at the top of that file (grade range, interests, type, time,
certificate yes/no, English + Arabic description).

## Before going school-wide
- Swap the Google-thumbnail logo URL in `index.html` for `assets/logo.png`.
- Ask a native speaker to skim the Arabic descriptions.
- Minecraft Education activities need the student's school Microsoft login.
