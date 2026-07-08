const destinations = [
  {
    name: "Malta",
    slug: "malta",
    best: "maj, czerwiec, wrzesień",
    price: "średnio",
    forWho: "city break + plaża",
    summary: "Dobry kierunek, gdy chcesz ciepło, krótkie loty, zwiedzanie i trochę plażowania.",
    warning: "Nie wybieraj w sierpniu, jeśli nie lubisz tłumów i wysokich cen.",
    tags: ["ciepło", "zwiedzanie", "krótki wyjazd"],
    score: { cena: 7, pogoda: 9, plaże: 7, imprezy: 6 },
    budget: ["mid", "high"], vibes: ["beach", "city", "couple"], months: ["Maj", "Czerwiec", "Wrzesień", "Październik"]
  },
  {
    name: "Malaga",
    slug: "malaga",
    best: "kwiecień–czerwiec, wrzesień",
    price: "średnio+",
    forWho: "jedzenie, klimat miasta, plaża",
    summary: "Najlepsza, gdy chcesz połączyć plażę z miastem, restauracjami i dobrym klimatem.",
    warning: "W lipcu i sierpniu potrafi być drożej, a centrum jest mocno turystyczne.",
    tags: ["plaża", "miasto", "jedzenie"],
    score: { cena: 6, pogoda: 9, plaże: 8, imprezy: 7 },
    budget: ["mid", "high", "premium"], vibes: ["beach", "city", "couple", "party"], months: ["Kwiecień", "Maj", "Czerwiec", "Wrzesień", "Październik"]
  },
  {
    name: "Kreta",
    slug: "kreta",
    best: "czerwiec, wrzesień",
    price: "średnio",
    forWho: "hotel, plaże, dłuższy wyjazd",
    summary: "Dobry kierunek na 7 dni+, gdy chcesz plaże, hotel i spokojniejsze wakacje.",
    warning: "Bez auta część pięknych miejsc może być trudniejsza do ogarnięcia.",
    tags: ["plaże", "hotel", "wakacje"],
    score: { cena: 7, pogoda: 9, plaże: 9, imprezy: 5 },
    budget: ["mid", "high", "premium"], vibes: ["beach", "couple"], months: ["Czerwiec", "Lipiec", "Sierpień", "Wrzesień"]
  },
  {
    name: "Albania",
    slug: "albania",
    best: "czerwiec, wrzesień",
    price: "tanio",
    forWho: "budżetowe morze",
    summary: "Ciekawy wybór, gdy liczysz koszty i chcesz ciepłe morze bez cen jak w Hiszpanii.",
    warning: "Logistyka i standard usług mogą być mniej przewidywalne niż w popularnych kurortach.",
    tags: ["tanio", "morze", "budżet"],
    score: { cena: 9, pogoda: 8, plaże: 8, imprezy: 5 },
    budget: ["low", "mid"], vibes: ["cheap", "beach"], months: ["Maj", "Czerwiec", "Wrzesień"]
  },
  {
    name: "Rzym",
    slug: "rome",
    best: "marzec–maj, październik",
    price: "średnio",
    forWho: "city break i zwiedzanie",
    summary: "Najlepszy na krótki intensywny wyjazd, jedzenie, zabytki i spacerowanie.",
    warning: "Latem bywa gorąco i tłoczno, więc na zwiedzanie lepiej poza sezonem.",
    tags: ["city break", "jedzenie", "historia"],
    score: { cena: 6, pogoda: 7, plaże: 2, imprezy: 6 },
    budget: ["low", "mid", "high"], vibes: ["city", "couple", "cheap"], months: ["Marzec", "Kwiecień", "Maj", "Październik", "Listopad"]
  },
  {
    name: "Cypr",
    slug: "cyprus",
    best: "maj, czerwiec, wrzesień, październik",
    price: "średnio+",
    forWho: "ciepło po sezonie",
    summary: "Dobry kierunek, gdy w Polsce robi się chłodno, a Ty dalej chcesz słońca.",
    warning: "W sezonie ceny hoteli potrafią szybko rosnąć.",
    tags: ["ciepło", "plaża", "po sezonie"],
    score: { cena: 6, pogoda: 9, plaże: 8, imprezy: 6 },
    budget: ["mid", "high", "premium"], vibes: ["beach", "couple"], months: ["Maj", "Czerwiec", "Wrzesień", "Październik"]
  }
];

const defaultCountries = ["Hiszpania", "Grecja", "Włochy", "Malta", "Chorwacja", "Czechy", "Niemcy"];
const state = {
  user: JSON.parse(localStorage.getItem("adh_v3_user") || "null"),
  countries: JSON.parse(localStorage.getItem("adh_v3_countries") || JSON.stringify(defaultCountries)),
  cities: Number(localStorage.getItem("adh_v3_cities") || 18),
  trips: Number(localStorage.getItem("adh_v3_trips") || 11)
};

function $(id){ return document.getElementById(id); }

document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
    const copy = {
      loty: "Loty: szybkie propozycje najtańszych kierunków i terminów.",
      hotele: "Hotele: dobór noclegu pod standard, lokalizację i opinie.",
      pakiet: "Pakiet: lot + hotel + transfer + prosty plan wyjazdu.",
      inspiracje: "Inspiracje: pomysły na kierunki według budżetu, pogody i klimatu."
    };
    $("modeCopy").textContent = copy[btn.dataset.mode];
  });
});

function renderDestinations(){
  const grid = $("destinationGrid");
  grid.innerHTML = destinations.map(d => `
    <article class="dest-card">
      <div class="dest-img ${d.slug}"></div>
      <div class="dest-body">
        <div class="dest-top">
          <div>
            <h3>${d.name}</h3>
            <p>${d.summary}</p>
          </div>
          <span class="rating">${avgScore(d.score)}/10</span>
        </div>
        <div class="meta">
          <span>📅 ${d.best}</span>
          <span>💸 ${d.price}</span>
          <span>🎯 ${d.forWho}</span>
        </div>
        ${scoreLines(d.score)}
        <div class="warning">⚠️ ${d.warning}</div>
      </div>
    </article>
  `).join("");
}

function avgScore(score){
  const vals = Object.values(score);
  return (vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(1);
}

function scoreLines(score){
  return `<div class="score-list">${Object.entries(score).map(([k,v]) => `
    <div class="score-line">
      <span>${labelScore(k)}</span>
      <div class="bar"><i style="width:${v*10}%"></i></div>
      <b>${v}/10</b>
    </div>
  `).join("")}</div>`;
}

function labelScore(key){
  return ({cena:"Cena", pogoda:"Pogoda", plaże:"Plaże", imprezy:"Imprezy"})[key] || key;
}

function recommend({budget, month, vibe, days}){
  return destinations.map(d => {
    let points = 0;
    if (d.budget.includes(budget)) points += 3;
    if (d.vibes.includes(vibe)) points += 3;
    if (d.months.includes(month)) points += 3;
    if (Number(days) >= 7 && ["Kreta", "Cypr"].includes(d.name)) points += 1;
    if (Number(days) <= 4 && ["Malta", "Rzym"].includes(d.name)) points += 1;
    if (vibe === "cheap" && d.price.includes("tanio")) points += 2;
    return {...d, points};
  }).sort((a,b) => b.points - a.points).slice(0,3);
}

function renderRecommendations(){
  const picks = recommend({
    budget: $("budgetInput").value,
    month: $("monthInput").value,
    vibe: $("vibeInput").value,
    days: $("daysInput").value
  });

  $("recoResults").innerHTML = picks.map((d, i) => `
    <article class="result-card">
      <span class="rank">${i+1}</span>
      <h3>${d.name}</h3>
      <p>${d.summary}</p>
      <div class="meta">
        <span>📅 ${d.best}</span>
        <span>💸 ${d.price}</span>
        <span>⭐ dopasowanie: ${Math.min(99, 70 + d.points*4)}%</span>
      </div>
      <div class="warning">Nie leć, jeśli: ${d.warning.replace("Nie wybieraj ", "").replace("W ", "w ")}</div>
    </article>
  `).join("");
}

$("recoForm").addEventListener("submit", e => {
  e.preventDefault();
  renderRecommendations();
});

["budgetInput","monthInput","vibeInput","daysInput"].forEach(id => {
  $(id).addEventListener("change", renderRecommendations);
});

function initials(name){
  return (name || "AD").split(" ").filter(Boolean).slice(0,2).map(x=>x[0].toUpperCase()).join("") || "AD";
}

function renderAccount(){
  if(state.user){
    $("openLoginBtn").style.display = "none";
    $("accountBox").classList.add("show");
    $("avatarInitials").textContent = initials(state.user.name);
    $("accountName").textContent = state.user.name;
    $("accountEmail").textContent = state.user.email;
  } else {
    $("openLoginBtn").style.display = "inline-flex";
    $("accountBox").classList.remove("show");
  }
  $("miniCountries").textContent = state.countries.length;
  $("miniTrips").textContent = state.trips;
}

function renderPassport(){
  const count = state.countries.length;
  const progress = Math.min(100, Math.round(count / 20 * 100));
  $("passportName").textContent = state.user ? state.user.name : "Gość";
  $("countriesCount").textContent = count;
  $("citiesCount").textContent = state.cities;
  $("tripsCount").textContent = state.trips;
  $("phoneCountryCount").textContent = count;
  $("progressText").textContent = `${progress}%`;
  $("progressBar").style.width = `${progress}%`;

  $("countryChips").innerHTML = state.countries.map(c => `
    <span class="chip">${c}<button type="button" data-country="${c}" aria-label="Usuń ${c}">×</button></span>
  `).join("");

  document.querySelectorAll("[data-country]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.countries = state.countries.filter(c => c !== btn.dataset.country);
      state.cities = Math.max(0, state.cities - 2);
      state.trips = Math.max(0, state.trips - 1);
      saveState();
      renderPassport();
      renderAccount();
    });
  });
}

function saveState(){
  localStorage.setItem("adh_v3_user", JSON.stringify(state.user));
  localStorage.setItem("adh_v3_countries", JSON.stringify(state.countries));
  localStorage.setItem("adh_v3_cities", String(state.cities));
  localStorage.setItem("adh_v3_trips", String(state.trips));
}

$("countryForm").addEventListener("submit", e => {
  e.preventDefault();
  const value = $("countryInput").value.trim();
  if(!value) return;
  const exists = state.countries.some(c => c.toLowerCase() === value.toLowerCase());
  if(!exists){
    state.countries.push(value);
    state.cities += 2;
    state.trips += 1;
    saveState();
    renderPassport();
    renderAccount();
  }
  $("countryInput").value = "";
});

function openLogin(){
  $("loginModal").classList.add("open");
  document.body.classList.add("lock");
  if(state.user){
    $("loginName").value = state.user.name;
    $("loginEmail").value = state.user.email;
  }
  setTimeout(() => $("loginName").focus(), 50);
}
function closeLogin(){
  $("loginModal").classList.remove("open");
  document.body.classList.remove("lock");
}
$("openLoginBtn").addEventListener("click", openLogin);
$("openLoginBtn2").addEventListener("click", openLogin);
$("closeLoginBtn").addEventListener("click", closeLogin);
$("loginModal").addEventListener("click", e => { if(e.target.id === "loginModal") closeLogin(); });
$("loginForm").addEventListener("submit", e => {
  e.preventDefault();
  state.user = {name:$("loginName").value.trim(), email:$("loginEmail").value.trim()};
  saveState();
  closeLogin();
  renderAccount();
  renderPassport();
});
$("avatarBtn").addEventListener("click", () => $("accountPanel").classList.toggle("open"));
document.addEventListener("click", e => {
  if(!$("accountBox").contains(e.target)) $("accountPanel").classList.remove("open");
});
$("logoutBtn").addEventListener("click", () => {
  state.user = null;
  localStorage.removeItem("adh_v3_user");
  $("accountPanel").classList.remove("open");
  renderAccount();
  renderPassport();
});

const chat = $("chatWidget");
$("chatLauncher").addEventListener("click", () => {
  chat.classList.toggle("open");
  if(chat.classList.contains("open")) $("chatInput").focus();
});
$("closeChatBtn").addEventListener("click", () => chat.classList.remove("open"));
$("chatForm").addEventListener("submit", e => {
  e.preventDefault();
  const text = $("chatInput").value.trim();
  if(!text) return;
  addMsg(text, "user");
  $("chatInput").value = "";
  setTimeout(() => addMsg(chatReply(text), "bot"), 350);
});
function addMsg(text, cls){
  const p = document.createElement("p");
  p.className = cls;
  p.textContent = text;
  $("messages").appendChild(p);
  $("messages").scrollTop = $("messages").scrollHeight;
}
function chatReply(text){
  const t = text.toLowerCase();
  if(t.includes("wrzes") || t.includes("plaż") || t.includes("ciep")) return "Pod plażę i dobrą cenę wybrałbym Maltę, Kretę albo Cypr we wrześniu. Najbardziej uniwersalna: Malta.";
  if(t.includes("tani") || t.includes("1500") || t.includes("budżet")) return "Budżetowo sprawdziłbym Albanię, Rzym poza weekendem albo Maltę poza sezonem. Unikałbym lipca/sierpnia.";
  if(t.includes("imprez")) return "Na imprezy sensownie: Malaga, Malta albo Cypr. Ale w MVP warto pokazywać też minusy: tłumy i ceny w sezonie.";
  if(t.includes("zwiedz")) return "Na zwiedzanie: Rzym, Malta, Malaga. Najlepsze miesiące: kwiecień, maj, wrzesień, październik.";
  return "Najlepiej podaj: budżet, miesiąc, liczba dni i klimat. Wtedy wybiorę 3 kierunki z plusami i minusami.";
}

renderDestinations();
renderRecommendations();
renderAccount();
renderPassport();
