/* Code chạy trang — nội dung nằm ở data.js */
const $ = (id) => document.getElementById(id);
const show = (id) => {
  document.querySelectorAll(".screen").forEach((s) => (s.hidden = s.id !== id));
  window.scrollTo(0, 0);
};

/* ---------- Chuẩn hóa đáp án: bỏ dấu, viết hoa, khoảng trắng thừa ---------- */
function normalize(text) {
  return String(text)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}
/* Gợi ý tự động khi chưa có gợi ý riêng: chữ cái đầu + số tiếng */
function autoHint(name) {
  const words = name.trim().split(/\s+/);
  const first = words[0][0].toUpperCase();
  return words.length > 1
    ? `Tên có ${words.length} tiếng, bắt đầu bằng chữ ${first}.`
    : `Tên một tiếng, bắt đầu bằng chữ ${first}, gồm ${[...words[0]].length} chữ cái.`;
}
const lookText = (m) => (m.lookalike ? `${m.lookalike} phiên bản B4` : "");
const isCorrect = (guess, member) =>
  member.answers.some((a) => normalize(a) === normalize(guess));

/* ---------- Âm thanh nhỏ (mặc định tắt) ---------- */
let soundOn = false;
let audioCtx = null;
function beep(notes) {
  if (!soundOn) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    let t = audioCtx.currentTime;
    notes.forEach(([freq, dur]) => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = "square";
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.06, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      o.connect(g).connect(audioCtx.destination);
      o.start(t);
      o.stop(t + dur);
      t += dur * 0.9;
    });
  } catch (e) { /* trình duyệt không hỗ trợ thì thôi */ }
}
const SFX = {
  click: () => beep([[660, 0.06]]),
  wrong: () => beep([[220, 0.15], [170, 0.25]]),
  right: () => beep([[523, 0.1], [659, 0.1], [784, 0.18]]),
  party: () => beep([[523, 0.08], [659, 0.08], [784, 0.08], [1046, 0.3]])
};
$("sound-btn").onclick = () => {
  soundOn = !soundOn;
  $("sound-btn").classList.toggle("on", soundOn);
  $("sound-btn").setAttribute("aria-pressed", String(soundOn));
  $("sound-btn").setAttribute("aria-label", soundOn ? "Tắt âm thanh" : "Bật âm thanh");
  SFX.click();
};

/* ---------- Pháo vợt cầu lông (thay cho pháo giấy) ---------- */
function racketSVG(frame) {
  const strings = [-9, -4.5, 0, 4.5, 9].map((x) => `<line x1='${x}' y1='-30' x2='${x}' y2='4'/>`).join("")
    + [-24, -17, -10, -3].map((y) => `<line x1='-13' y1='${y}' x2='13' y2='${y}'/>`).join("");
  return `<svg viewBox='-20 -40 40 92' xmlns='http://www.w3.org/2000/svg'>
    <rect x='-3' y='14' width='6' height='34' rx='3' fill='#1e3530'/>
    <rect x='-4' y='34' width='8' height='16' rx='3' fill='${frame === "#ffffff" ? "#ffd54f" : "#ffffff"}' stroke='#1e3530' stroke-width='1.5'/>
    <line x1='0' y1='4' x2='0' y2='16' stroke='#1e3530' stroke-width='3'/>
    <g stroke='#1e3530' stroke-width='.8' opacity='.55'><clipPath id='h'><ellipse cx='0' cy='-13' rx='15' ry='19'/></clipPath><g clip-path='url(#h)'>${strings}</g></g>
    <ellipse cx='0' cy='-13' rx='15' ry='19' fill='none' stroke='#1e3530' stroke-width='6'/>
    <ellipse cx='0' cy='-13' rx='15' ry='19' fill='none' stroke='${frame}' stroke-width='3.5'/>
  </svg>`;
}
function shuttleSVG() {
  return `<svg viewBox='-14 -18 28 40' xmlns='http://www.w3.org/2000/svg'>
    <path d='M-12 -16 L12 -16 L6 8 L-6 8 Z' fill='#fff' stroke='#1e3530' stroke-width='2'/>
    <path d='M-4 -16 L-2 8 M4 -16 L2 8' stroke='#1e3530' stroke-width='1' opacity='.5'/>
    <ellipse cx='0' cy='13' rx='7' ry='7' fill='#ffd54f' stroke='#1e3530' stroke-width='2'/></svg>`;
}
function confetti(count = 90) {
  const layer = $("confetti");
  const frames = ["#ffd54f", "#f2665a", "#ffffff", "#5ec2e8", "#8fd9a8"];
  const n = Math.max(8, Math.round(count / 3));
  for (let i = 0; i < n; i++) {
    const c = document.createElement("span");
    const isShuttle = i % 4 === 3;
    c.className = "piece " + (isShuttle ? "shuttle" : "racket");
    c.innerHTML = isShuttle ? shuttleSVG() : racketSVG(frames[i % frames.length]);
    c.style.left = Math.random() * 100 + "vw";
    c.style.setProperty("--drift", (Math.random() - 0.5) * 220 + "px");
    c.style.setProperty("--spin", (Math.random() < 0.5 ? -1 : 1) * (180 + Math.random() * 540) + "deg");
    c.style.setProperty("--size", 0.75 + Math.random() * 0.6);
    c.style.animationDuration = 2 + Math.random() * 1.8 + "s";
    c.style.animationDelay = Math.random() * 0.5 + "s";
    layer.appendChild(c);
    setTimeout(() => c.remove(), 4800);
  }
}

/* ---------- Màn 0: tủ đồ khóa số ---------- */
const digits = [0, 0, 0, 0];
let unlocked = false;
function renderWheels() {
  const wrap = $("wheels");
  wrap.innerHTML = "";
  digits.forEach((d, i) => {
    const w = document.createElement("div");
    w.className = "wheel";
    w.innerHTML = `
      <button type="button" class="wheel-btn" aria-label="Tăng số thứ ${i + 1}">▲</button>
      <div class="wheel-digit" aria-label="Số thứ ${i + 1}: ${d}">${d}</div>
      <button type="button" class="wheel-btn" aria-label="Giảm số thứ ${i + 1}">▼</button>`;
    w.children[0].onclick = () => turn(i, 1);
    w.children[2].onclick = () => turn(i, -1);
    wrap.appendChild(w);
  });
}
function turn(i, step) {
  if (unlocked) return;
  digits[i] = (digits[i] + step + 10) % 10;
  SFX.click();
  renderWheels();
  if (digits.join("") === SITE.passcode) {
    unlocked = true;
    $("lock-title").textContent = "Cạch! Mở rồi";
    $("locker").classList.add("open");
    SFX.party();
    confetti(60);
    setTimeout(() => {
      if (SITE.welcomePhoto) {
        $("welcome").hidden = false;
        confetti(80);
        $("welcome-btn").focus({ preventScroll: true });
      } else {
        show("screen-start");
      }
    }, 1500);
  }
}
$("hint-text").textContent = SITE.passHint;
if (SITE.welcomePhoto) {
  $("locker-photo").src = SITE.welcomePhoto;
  $("welcome-photo").src = SITE.welcomePhoto;
}
$("welcome-text").textContent = SITE.welcomeText || "";
/* ---------- Nút "Không nhận quà" biết chạy trốn ---------- */
(function runaway() {
  const btn = $("no-btn");
  const lines = ["Không nhận quà", "Né rồi nha 😝", "Bắt được thì nói", "Hụt rồi!", "Nhanh tay lên anh ơi", "Thôi vào chơi đi mà 🥺"];
  const msgs = ["", "", "Nút này hơi nhát đó 🏃", "Chị em không cho từ chối đâu 😌", "Bấm \"Vào chơi\" đi cho nhanh nè 👉"];
  let tries = 0;
  function flee(e) {
    if (e) e.preventDefault();
    tries++;
    btn.textContent = lines[Math.min(tries, lines.length - 1)];
    $("runaway-msg").textContent = msgs[Math.min(tries, msgs.length - 1)] || "";
    const r = btn.getBoundingClientRect();
    const pad = 16;
    const maxX = window.innerWidth - r.width - pad, maxY = window.innerHeight - r.height - pad;
    let x, y, n = 0;
    do {   // nhảy tới chỗ cách xa vị trí cũ
      x = pad + Math.random() * Math.max(0, maxX - pad);
      y = pad + Math.random() * Math.max(0, maxY - pad);
    } while (Math.hypot(x - r.left, y - r.top) < 140 && ++n < 20);
    btn.classList.add("fleeing");
    btn.style.left = x + "px";
    btn.style.top = y + "px";
    SFX.click();
  }
  btn.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") flee(); });
  btn.addEventListener("pointerdown", flee);
  btn.addEventListener("click", flee);   // bàn phím (Enter/Space) cũng bị né
})();

$("welcome-btn").onclick = () => {
  SFX.click();
  $("welcome").hidden = true;
  show("screen-start");
};
$("hint-btn").onclick = () => ($("hint").hidden = false);
$("hint-close").onclick = () => ($("hint").hidden = true);
renderWheels();

/* ---------- Màn 1: bắt đầu ---------- */
$("site-title").textContent = SITE.title;
$("site-sub").textContent = SITE.subtitle;
$("slogan").textContent = SITE.slogan;
$("start-btn").onclick = () => {
  SFX.click();
  current = 0;
  showQuestion();
  show("screen-quiz");
};

/* ---------- Màn 2: đoán đồng đội ---------- */
let current = 0;
let wrongCount = 0;

function setCrop(img, m) {
  if (m.cropPhoto) {
    img.src = m.cropPhoto;
    img.style.transform = "none";
  } else {
    img.src = m.photo;
    const c = m.crop || { x: 50, y: 50, zoom: 2.5 };
    img.style.transformOrigin = `${c.x}% ${c.y}%`;
    img.style.transform = `scale(${c.zoom})`;
  }
}

function showQuestion() {
  const m = MEMBERS[current];
  wrongCount = 0;
  $("progress-text").textContent = `Câu ${current + 1}/${MEMBERS.length}`;
  $("progress-fill").style.width = (current / MEMBERS.length) * 100 + "%";
  const img = $("quiz-img");
  img.classList.add("no-anim");
  setCrop(img, m);
  void img.offsetWidth;
  img.classList.remove("no-anim");
  $("photo-frame").classList.remove("revealed");
  $("ask-box").hidden = false;
  $("card-box").hidden = true;
  $("guess").value = "";
  $("feedback").textContent = "";
  $("feedback").className = "feedback";
  $("roast").textContent = "";
  $("guess").focus({ preventScroll: true });
}

$("guess-form").onsubmit = (e) => {
  e.preventDefault();
  const m = MEMBERS[current];
  const guess = $("guess").value;
  const fb = $("feedback");

  if (!guess.trim()) {
    fb.textContent = "Bạn nhập tên trước nhé!";
    fb.className = "feedback warn";
    $("roast").textContent = "";
    return;
  }

  if (!isCorrect(guess, m)) {
    wrongCount++;
    fb.textContent = "Sai rồi, thử lại nhé!";
    fb.className = "feedback bad";
    $("roast").textContent =
      wrongCount >= 3
        ? "Gợi ý: " + (m.hint || autoHint(m.name))
        : WRONG_LINES[Math.floor(Math.random() * WRONG_LINES.length)];
    $("photo-frame").classList.remove("shake");
    void $("photo-frame").offsetWidth;
    $("photo-frame").classList.add("shake");
    SFX.wrong();
    $("guess").select();
    return;
  }

  // Đúng: hiện ảnh đầy đủ + thẻ cầu thủ
  SFX.right();
  const img = $("quiz-img");
  if (m.cropPhoto) img.src = m.photo;
  img.style.transform = "scale(1)";
  $("photo-frame").classList.add("revealed");
  $("ask-box").hidden = true;
  $("card-box").hidden = false;
  $("reveal-name").textContent = m.name;
  $("reveal-look").textContent = lookText(m);
  $("reveal-look").hidden = !m.lookalike;
  $("reveal-title").textContent = m.title;
  $("reveal-stats").innerHTML = Object.entries(m.stats || {})
    .map(([k, v]) => `<li><span>${k}</span><b>${v}</b><i style="--v:${v}%"></i></li>`)
    .join("");
  const last = current === MEMBERS.length - 1;
  $("next-btn").textContent = last ? "Hoàn thành" : "Câu tiếp theo";
  $("progress-fill").style.width = ((current + 1) / MEMBERS.length) * 100 + "%";
  confetti(30);
  $("next-btn").focus({ preventScroll: true });
};

$("next-btn").onclick = () => {
  SFX.click();
  if (current < MEMBERS.length - 1) {
    current++;
    showQuestion();
  } else {
    showDone();
  }
};

/* ---------- Màn 3: hoàn thành ---------- */
function showDone() {
  show("screen-done");
  confetti(120);
  SFX.party();
}

MEMBERS.forEach((m, i) => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "member";
  b.innerHTML = `
    <span class="m-frame"><img src="${m.photo}" alt="${m.name}"></span>
    <span class="m-name">${m.name}</span>
    ${m.lookalike ? `<span class="m-look">${lookText(m)}</span>` : ""}
    <span class="m-award">${m.award || m.title}</span>`;
  b.onclick = () => openWish(i);
  $("members").appendChild(b);
});

/* ---------- Khoảnh khắc B4: dải ảnh lướt ngang ---------- */
(function slider() {
  const track = $("slider");
  const dots = $("dots");
  const list = typeof MOMENTS !== "undefined" ? MOMENTS : [];
  if (!list.length) { document.querySelector(".moments").hidden = true; return; }
  list.forEach((m, i) => {
    const fig = document.createElement("figure");
    fig.className = "slide";
    fig.setAttribute("aria-label", `Ảnh ${i + 1}/${list.length}`);
    fig.innerHTML = `<img src="${m.photo}" alt="${m.caption}" loading="lazy" draggable="false">
      <figcaption><span class="cap">${m.caption}</span>${m.date ? `<span class="date">${m.date}</span>` : ""}</figcaption>`;
    track.appendChild(fig);
    const d = document.createElement("button");
    d.type = "button";
    d.className = "dot";
    d.setAttribute("aria-label", `Xem ảnh ${i + 1}`);
    d.onclick = () => goTo(i);
    dots.appendChild(d);
  });
  const slides = [...track.children];
  let active = 0;
  function goTo(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    const s = slides[i];
    track.scrollTo({ left: s.offsetLeft - (track.clientWidth - s.clientWidth) / 2, behavior: "smooth" });
  }
  function update() {
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0, dist = Infinity;
    slides.forEach((s, i) => {
      const d = Math.abs(s.offsetLeft + s.clientWidth / 2 - center);
      if (d < dist) { dist = d; best = i; }
    });
    active = best;
    slides.forEach((s, i) => s.classList.toggle("is-active", i === best));
    [...dots.children].forEach((d, i) => d.setAttribute("aria-current", i === best ? "true" : "false"));
    $("slide-prev").disabled = best === 0;
    $("slide-next").disabled = best === slides.length - 1;
  }
  let raf = 0;
  track.addEventListener("scroll", () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); });
  window.addEventListener("resize", update);
  $("slide-prev").onclick = () => goTo(active - 1);
  $("slide-next").onclick = () => goTo(active + 1);
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(active + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); goTo(active - 1); }
  });
  // Kéo bằng chuột trên máy tính (điện thoại đã lướt sẵn bằng tay)
  let dragX = null, startLeft = 0, moved = false;
  track.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse") return;
    dragX = e.clientX; startLeft = track.scrollLeft; moved = false;
    track.classList.add("dragging");
  });
  window.addEventListener("pointermove", (e) => {
    if (dragX === null) return;
    const dx = e.clientX - dragX;
    if (Math.abs(dx) > 3) moved = true;
    track.scrollLeft = startLeft - dx;
  });
  window.addEventListener("pointerup", () => {
    if (dragX === null) return;
    dragX = null;
    track.classList.remove("dragging");
    if (moved) update(), goTo(active);
  });
  window.slideTo = goTo; // dùng khi kiểm tra
  requestAnimationFrame(update);
  new MutationObserver(() => requestAnimationFrame(update)).observe($("screen-done"), { attributes: true, attributeFilter: ["hidden"] });
})();

if (CLOSING.photo) {
  $("closing-photo").src = CLOSING.photo;
  $("closing-photo-cap").textContent = CLOSING.photoCaption || "";
  $("closing-photo-cap").hidden = !CLOSING.photoCaption;
} else {
  $("closing-photo-wrap").hidden = true;
}
$("closing-title").textContent = CLOSING.title;
$("closing-text").textContent = CLOSING.text;
$("treat-q").textContent = CLOSING.treatQuestion;
CLOSING.treatOptions.forEach((t) => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "btn btn-ghost";
  b.textContent = t;
  b.onclick = () => {
    $("treat-reveal").textContent = CLOSING.treatReveal;
    $("treat-reveal").hidden = false;
    SFX.party();
    confetti(50);
  };
  $("treat-opts").appendChild(b);
});
$("footer").textContent = CLOSING.footer;

/* ---------- Thả tim cảm ơn chị em ---------- */
$("thanks-title").textContent = CLOSING.thanksTitle || "Gửi lời cảm ơn tới chị em";
$("thanks-sub").textContent = CLOSING.thanksSub || "";
let hearts = 0;
$("heart-btn").onclick = (e) => {
  hearts++;
  $("heart-count").textContent = `Đã thả ${hearts} tim cho chị em ♥`;
  const btn = $("heart-btn");
  btn.classList.remove("beat"); void btn.offsetWidth; btn.classList.add("beat");
  const r = btn.getBoundingClientRect();
  for (let i = 0; i < 5; i++) {
    const h = document.createElement("span");
    h.className = "float-heart";
    h.textContent = ["❤️", "💚", "💛", "🧡", "💖"][Math.floor(Math.random() * 5)];
    h.style.left = r.left + r.width / 2 + (Math.random() - 0.5) * 60 + "px";
    h.style.top = r.top + window.scrollY + "px";
    h.style.setProperty("--dx", (Math.random() - 0.5) * 120 + "px");
    h.style.animationDelay = i * 0.06 + "s";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1700);
  }
  SFX.click();
};

/* ---------- Hộp quà + lời nhắn ---------- */
let openMember = null;
function openWish(i) {
  // Ảnh, tên, lời nhắn đều lấy từ cùng một hồ sơ MEMBERS[i]
  openMember = MEMBERS[i];
  SFX.click();
  $("gift").hidden = false;
  $("gift-box").classList.remove("opened");
  $("letter").hidden = true;
  $("save-note").textContent = "";
  $("cert-img").hidden = true;
  $("cert-photo").src = openMember.chibi || openMember.photo;
  $("cert-photo").alt = openMember.name;
  $("cert-name").textContent = openMember.name;
  $("cert-look").textContent = lookText(openMember);
  $("cert-look").hidden = !openMember.lookalike;
  $("cert-title").textContent = openMember.title;
  $("cert-year").textContent = "của B4 năm " + SITE.year;
  $("msg").textContent = openMember.message;
  $("sign").textContent = "— " + SITE.sender;
  $("wish").hidden = false;
}
$("gift-box").onclick = () => {
  $("gift-box").classList.add("opened");
  SFX.party();
  confetti(110);
  setTimeout(() => {
    $("gift").hidden = true;
    $("letter").hidden = false;
  }, 650);
};
function closeOverlays() {
  document.querySelectorAll(".overlay").forEach((o) => (o.hidden = true));
}
$("wish-close").onclick = closeOverlays;
document.querySelectorAll(".overlay").forEach((o) =>
  o.addEventListener("click", (e) => { if (e.target === o) closeOverlays(); })
);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeOverlays(); });

/* ---------- Lưu bằng khen thành ảnh PNG ---------- */
function wrapText(ctx, text, x, y, maxW, lineH) {
  const words = text.split(" ");
  let line = "";
  for (const w of words) {
    const test = line ? line + " " + w : w;
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, y);
      line = w;
      y += lineH;
    } else line = test;
  }
  ctx.fillText(line, x, y);
}
$("save-btn").onclick = () => {
  const m = openMember;
  if (!m) return;
  const W = 1080, H = 1350;
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const ctx = cv.getContext("2d");
  const img = new Image();
  img.onload = () => {
    try {
      const R = (x, y, w, h, r) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); };
      ctx.fillStyle = "#2e9a6b"; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#1e3530"; R(58, 58, W - 104, H - 104, 40); ctx.fill();
      ctx.fillStyle = "#fffdf5"; R(46, 46, W - 104, H - 104, 40); ctx.fill();
      ctx.lineWidth = 8; ctx.strokeStyle = "#1e3530"; ctx.stroke();
      ctx.lineWidth = 8; ctx.strokeStyle = "#ffd54f"; R(78, 78, W - 168, H - 168, 26); ctx.stroke();
      ctx.textAlign = "center";
      ctx.fillStyle = "#23805a"; ctx.font = "800 96px 'Baloo 2', sans-serif"; ctx.fillText("Bằng khen", W / 2, 200);
      const pw = 400, ph = pw * 6 / 5, px = (W - pw) / 2, py = 232;
      ctx.save(); R(px, py, pw, ph, 28); ctx.clip();
      { const s = Math.max(pw / img.naturalWidth, ph / img.naturalHeight), dw = img.naturalWidth * s, dh = img.naturalHeight * s;
        ctx.drawImage(img, px + (pw - dw) / 2, py + (ph - dh) / 2, dw, dh); }
      ctx.restore();
      ctx.lineWidth = 8; ctx.strokeStyle = "#1e3530"; R(px, py, pw, ph, 28); ctx.stroke();
      ctx.fillStyle = "#1e3530"; ctx.font = "800 84px 'Baloo 2', sans-serif"; ctx.fillText(m.name, W / 2, 800);
      if (m.lookalike) {
        ctx.fillStyle = "#23805a"; ctx.font = "700 40px 'Baloo 2', sans-serif"; ctx.fillText(lookText(m), W / 2, 852);
      }
      ctx.fillStyle = "#5f736c"; ctx.font = "500 36px 'Be Vietnam Pro', sans-serif"; ctx.fillText("chính thức được phong làm", W / 2, 920);
      ctx.fillStyle = "#f2665a"; ctx.font = "800 60px 'Baloo 2', sans-serif";
      wrapText(ctx, m.title, W / 2, 1000, W - 240, 66);
      ctx.fillStyle = "#1e3530"; ctx.font = "600 36px 'Be Vietnam Pro', sans-serif";
      ctx.fillText("của B4 năm " + SITE.year, W / 2, 1180);
      const url = cv.toDataURL("image/png");
      $("cert-img").src = url;
      $("cert-img").hidden = false;
      $("save-note").textContent = "Nhấn giữ ảnh (điện thoại) hoặc chuột phải → Lưu ảnh, rồi gửi vào nhóm khoe nhé!";
      // Trên GitHub Pages (không nằm trong khung), thử tải thẳng về máy
      if (window.self === window.top) {
        const a = document.createElement("a");
        a.download = "bang-khen-" + normalize(m.name).replace(/ /g, "-") + ".png";
        a.href = url;
        a.click();
      }
    } catch (e) {
      $("save-note").textContent = "Máy này chưa lưu được ảnh, chụp màn hình để khoe nhé!";
    }
  };
  img.onerror = () => ($("save-note").textContent = "Chưa lưu được ảnh, chụp màn hình để khoe nhé!");
  img.src = m.chibi || m.photo;
};
