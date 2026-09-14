/* ===========================================================
   First Academy — Student Gateway
   Grade data + rendering
   Edit the RESOURCE_BANDS object below to change what students see.
   =========================================================== */

// Three age bands. Each grade (4–12) is mapped to one band below,
// but the label shown always reflects the student's own grade.
const RESOURCE_BANDS = {
  elementary: { // Grades 4–5, roughly ages 9–10
    label: "Ages 9–10",
    categories: [
      {
        title: "Learn something new",
        note: "short lessons, earn stars or badges",
        items: [
          { name: "Khan Academy", url: "https://www.khanacademy.org/", desc: "Free lessons in math, reading and science, with mastery badges as you go.", cert: false },
          { name: "Duolingo", url: "https://www.duolingo.com/", desc: "Bite-sized language lessons — Arabic, English, French and more.", cert: false },
          { name: "NASA STEM for Students", url: "https://www.nasa.gov/stem/", desc: "Real NASA activities, videos and space facts for young learners.", cert: false }
        ]
      },
      {
        title: "Build & play",
        note: "the good kind — creative, not shooters",
        items: [
          { name: "Scratch", url: "https://scratch.mit.edu/", desc: "Drag-and-drop coding — build your own games, stories and animations.", cert: false },
          { name: "Code.org — Hour of Code", url: "https://code.org/", desc: "Guided coding puzzles for beginners, with a completion certificate.", cert: true },
          { name: "Prodigy Math", url: "https://www.prodigygame.com/", desc: "A math adventure game used in classrooms — practice disguised as play.", cert: false }
        ]
      }
    ]
  },
  middle: { // Grades 6–8, roughly ages 11–13
    label: "Ages 11–13",
    categories: [
      {
        title: "Learn & earn a certificate",
        note: "worth adding to a portfolio",
        items: [
          { name: "Code.org — CS Discoveries", url: "https://code.org/educate/csd", desc: "A full intro to computer science, with a certificate on completion.", cert: true },
          { name: "Google — CS First", url: "https://csfirst.withgoogle.com/", desc: "Free coding clubs and projects built by Google for this age group.", cert: false },
          { name: "Khan Academy", url: "https://www.khanacademy.org/", desc: "Deeper math, science and computing courses with progress tracking.", cert: false }
        ]
      },
      {
        title: "Build & create",
        note: "skill-building, not sandbox chaos",
        items: [
          { name: "Tynker", url: "https://www.tynker.com/", desc: "Block-to-text coding — build real apps and games step by step.", cert: false },
          { name: "CodeCombat", url: "https://codecombat.com/", desc: "Learn real programming syntax by directing a character through puzzles.", cert: false },
          { name: "TypingClub", url: "https://www.typingclub.com/", desc: "Turn typing practice into a skill you'll actually use for years.", cert: true }
        ]
      }
    ]
  },
  high: { // Grades 9–12, roughly ages 14–18
    label: "Ages 14–18",
    categories: [
      {
        title: "Learn & earn a certificate",
        note: "resume- and university-application worthy",
        items: [
          { name: "freeCodeCamp", url: "https://www.freecodecamp.org/", desc: "Full coding curricula — web dev, data, Python — each ending in a free certification.", cert: true },
          { name: "Google Digital Garage", url: "https://learndigital.withgoogle.com/digitalgarage", desc: "Free courses in digital marketing, data and career skills, certified by Google.", cert: true },
          { name: "Coursera", url: "https://www.coursera.org/", desc: "University-level courses; audit free or earn a certificate for a fee.", cert: true },
          { name: "edX", url: "https://www.edx.org/", desc: "Courses from real universities, including free-to-audit options with certificates available.", cert: true }
        ]
      },
      {
        title: "Build & go deeper",
        note: "for students aiming at tech, design or research",
        items: [
          { name: "CS50 (Harvard)", url: "https://cs50.harvard.edu/", desc: "The famous free intro to computer science — challenging, and a real certificate at the end.", cert: true },
          { name: "Codecademy", url: "https://www.codecademy.com/", desc: "Hands-on coding tracks in web development, Python, data science and more.", cert: false },
          { name: "Google Applied Digital Skills", url: "https://applieddigitalskills.withgoogle.com/", desc: "Project-based lessons — spreadsheets, presentations, basic automation.", cert: true }
        ]
      }
    ]
  }
};

// Map each grade to its band + a friendly label.
const GRADES = [
  { grade: 4,  band: "elementary" },
  { grade: 5,  band: "elementary" },
  { grade: 6,  band: "middle" },
  { grade: 7,  band: "middle" },
  { grade: 8,  band: "middle" },
  { grade: 9,  band: "high" },
  { grade: 10, band: "high" },
  { grade: 11, band: "high" },
  { grade: 12, band: "high" }
];

const gradeRow = document.getElementById("gradeRow");
const bandNote = document.getElementById("bandNote");
const resourceOutput = document.getElementById("resourceOutput");

function renderGradePills(activeGrade){
  gradeRow.innerHTML = "";
  GRADES.forEach(g => {
    const btn = document.createElement("button");
    btn.className = "grade-pill";
    btn.type = "button";
    btn.setAttribute("aria-pressed", g.grade === activeGrade ? "true" : "false");
    btn.innerHTML = g.grade + "<span class=\"g-label\">Grade</span>";
    btn.addEventListener("click", () => selectGrade(g.grade));
    gradeRow.appendChild(btn);
  });
}

function renderResources(gradeInfo){
  const band = RESOURCE_BANDS[gradeInfo.band];
  bandNote.textContent = `Showing picks for Grade ${gradeInfo.grade} · ${band.label}`;

  resourceOutput.innerHTML = "";
  band.categories.forEach(cat => {
    const block = document.createElement("div");
    block.className = "cat-block";

    const heading = document.createElement("h3");
    heading.className = "cat-title";
    heading.innerHTML = `${cat.title} <span class="cat-note">${cat.note}</span>`;
    block.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "card-grid";

    cat.items.forEach(item => {
      const card = document.createElement("a");
      card.className = "card";
      card.href = item.url;
      card.target = "_blank";
      card.rel = "noopener";

      card.innerHTML = `
        <div class="card-top">
          <h3>${item.name}</h3>
          ${item.cert ? '<span class="badge cert">Certificate</span>' : '<span class="badge">Free</span>'}
        </div>
        <p>${item.desc}</p>
        <span class="go">Open site →</span>
      `;
      grid.appendChild(card);
    });

    block.appendChild(grid);
    resourceOutput.appendChild(block);
  });
}

function selectGrade(grade){
  const gradeInfo = GRADES.find(g => g.grade === grade);
  renderGradePills(grade);
  renderResources(gradeInfo);
  window.location.hash = "grades";
}

// Init
document.getElementById("year").textContent = new Date().getFullYear();
renderGradePills(4);
renderResources(GRADES[0]);
