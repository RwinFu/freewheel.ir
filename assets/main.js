(() => {
  const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const fa = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
  const lerp = (a, b, t) => a + (b - a) * t;
  document.body.classList.add('loading');

  // split headings into words
  $$('.split').forEach(el => {
    el.innerHTML = el.innerHTML.split(/(<br>)/).map(p => p === '<br>' ? p :
      (() => { const em = /<em>/.test(p), t = p.replace(/<\/?em>/g, '').trim();
        return t.split(/\s+/).map(w => `<span class="w"><span>${em ? `<em>${w}</em>` : w}</span></span>`).join(' '); })()).join('');
    $$('.w>span', el).forEach((s, i) => s.style.transitionDelay = i * 70 + 'ms');
  });

  // loader
  let p = 0;
  const tick = () => {
    p = Math.min(100, p + Math.random() * 9 + 2);
    $('#ldn').textContent = fa(Math.floor(p)); $('#ldb').style.width = p + '%';
    if (p < 100) setTimeout(tick, 45);
    else setTimeout(() => { $('#loader').classList.add('done'); document.body.classList.remove('loading'); startReveals(); }, 250);
  };
  tick();

  // reveal on scroll
  function startReveals() {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in'); io.unobserve(e.target);
      $$('.count', e.target).forEach(countUp);
    }), { threshold: .15 });
    $$('.split,.reveal').forEach((el, i) => { if (el.closest('.hero')) el.style.transitionDelay = (i * 0.12) + 's'; io.observe(el); });
  }
  function countUp(el) {
    const to = +el.dataset.to, t0 = performance.now();
    const f = t => { const k = Math.min(1, (t - t0) / 1800), e = 1 - Math.pow(1 - k, 4);
      el.textContent = fa(Math.round(to * e).toLocaleString('en').replace(/,/g, '٬')); if (k < 1) requestAnimationFrame(f); };
    requestAnimationFrame(f);
  }

  // ---- clutch SVG build ----
  const NS = 'http://www.w3.org/2000/svg', sg = $('#sprags'), N = 18, sprags = [];
  for (let i = 0; i < N; i++) {
    const g = document.createElementNS(NS, 'g'), inner = document.createElementNS(NS, 'path');
    inner.setAttribute('d', 'M-9,-24 C-2,-28 8,-22 10,-14 L8,20 C4,27 -6,27 -9,20 Z');
    inner.setAttribute('fill', 'url(#gSprag)'); inner.setAttribute('stroke', '#0b0c0e'); inner.setAttribute('stroke-width', '1.5');
    g.appendChild(inner); sg.appendChild(g); sprags.push({ g, inner, a: i / N * 360 });
  }
  const ticks = $('#innerTicks');
  for (let i = 0; i < 24; i++) { const l = document.createElementNS(NS, 'line');
    l.setAttribute('x1', 0); l.setAttribute('y1', -92); l.setAttribute('x2', 0); l.setAttribute('y2', i % 6 ? -86 : -78);
    l.setAttribute('stroke', i % 6 ? '#6b727c' : '#ff6a00'); l.setAttribute('stroke-width', 2); l.setAttribute('transform', `rotate(${i * 15})`); ticks.appendChild(l); }

  // physics: inner is driver. dir=1 -> overrunning (inner turns, outer free), dir=-1 -> locked (outer follows)
  let dir = -1, innerA = 0, outerA = 0, spragA = 0, vIn = 0, vOut = 0, tilt = 0, scrollBoost = 0;
  const outer = $('#outerRing'), innerR = $('#innerRing'), hudDir = $('#hudDir'), hudRpm = $('#hudRpm');
  $('#heroVisual').addEventListener('click', () => { dir *= -1; });
  let mx = 0, my = 0;
  $('#heroVisual').addEventListener('mousemove', e => { const r = e.currentTarget.getBoundingClientRect();
    mx = (e.clientX - r.left) / r.width - .5; my = (e.clientY - r.top) / r.height - .5; });
  $('#heroVisual').addEventListener('mouseleave', () => { mx = my = 0; });
  let rx = 0, ry = 0;

  function frame() {
    const target = (1.6 + scrollBoost) * dir;
    vIn = lerp(vIn, target, .04);
    const locked = dir < 0;
    vOut = lerp(vOut, locked ? vIn : vOut * .985, locked ? .25 : 1);
    tilt = lerp(tilt, locked ? 0 : -14, .12);
    innerA += vIn; outerA += vOut; spragA += locked ? vIn : (vIn + vOut) / 2;
    innerR.setAttribute('transform', `rotate(${innerA})`);
    outer.setAttribute('transform', `rotate(${outerA})`);
    sprags.forEach(s => {
      s.g.setAttribute('transform', `rotate(${s.a + spragA}) translate(0,-125)`);
      s.inner.setAttribute('transform', `rotate(${tilt})`);
    });
    hudDir.textContent = locked ? 'قفل — انتقال گشتاور' : 'آزاد — اورران';
    hudRpm.textContent = Math.abs(Math.round(vIn * 20));
    rx = lerp(rx, my * -14, .08); ry = lerp(ry, mx * 14, .08);
    $('#clutch').style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    scrollBoost *= .94;
    requestAnimationFrame(frame);
  }
  frame();

  // ---- cursor ----
  const cur = $('#cursor'); let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
  addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
  (function cl() { cx = lerp(cx, tx, .2); cy = lerp(cy, ty, .2); cur.style.left = cx + 'px'; cur.style.top = cy + 'px'; requestAnimationFrame(cl); })();
  $$('a,button,.card,.hero-visual').forEach(el => { el.addEventListener('mouseenter', () => cur.classList.add('big')); el.addEventListener('mouseleave', () => cur.classList.remove('big')); });

  // magnetic buttons
  $$('.magnetic').forEach(b => {
    b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .3}px,${(e.clientY - r.top - r.height / 2) * .4}px)`; });
    b.addEventListener('mouseleave', () => b.style.transform = '');
  });

  // card spotlight
  $$('.card').forEach(c => c.addEventListener('mousemove', e => { const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', e.clientX - r.left + 'px'); c.style.setProperty('--my', e.clientY - r.top + 'px'); }));

  // tilt shops
  $$('.tilt').forEach(c => {
    c.addEventListener('mousemove', e => { const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      c.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`; });
    c.addEventListener('mouseleave', () => c.style.transform = '');
  });

  // filters
  $$('#filters button').forEach(b => b.addEventListener('click', () => {
    $$('#filters button').forEach(x => x.classList.toggle('on', x === b));
    const f = b.dataset.f;
    $$('.card').forEach(c => c.classList.toggle('off', f !== 'all' && !c.dataset.t.includes(f)));
  }));

  // form
  $('#quote').addEventListener('submit', e => { e.preventDefault(); $('#formOk').classList.add('in'); e.target.reset(); });

  // scroll-driven stuff
  const nav = $('#nav'), how = $('#how'), modes = $$('.mode'), apps = $('.apps'), track = $('#appsTrack');
  let lastY = scrollY;
  function onScroll() {
    const y = scrollY;
    nav.classList.toggle('scrolled', y > 40);
    nav.classList.toggle('hide', y > lastY && y > 400);
    scrollBoost = Math.min(10, scrollBoost + Math.abs(y - lastY) * .02);
    lastY = y;
    // sticky modes
    const r = how.getBoundingClientRect(), prog = Math.min(.999, Math.max(0, -r.top / (r.height - innerHeight)));
    const idx = Math.floor(prog * modes.length);
    modes.forEach((m, i) => m.classList.toggle('on', i === idx));
    // horizontal apps (RTL: move right)
    const ar = apps.getBoundingClientRect(), ap = 1 - (ar.top + ar.height) / (innerHeight + ar.height);
    const max = Math.max(0, track.scrollWidth - track.clientWidth);
    track.style.transform = `translateX(${Math.max(0, Math.min(1, ap)) * max}px)`;
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
})();
