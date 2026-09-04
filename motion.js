/* The CSTG Growth Engine — motion.js
   One IntersectionObserver for section reveals, one-shot sequences and counters.
   Vanilla ES2018. Only opacity/transform animate. ~5KB unminified. */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  root.classList.add('js');

  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- mobile menu ---------- */
  var tog = doc.getElementById('navToggle'), menu = doc.getElementById('mobileMenu');
  if (tog && menu) {
    var setMenu = function (open) {
      menu.classList.toggle('open', open);
      tog.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    tog.addEventListener('click', function () {
      setMenu(tog.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    addEventListener('resize', function () { if (innerWidth > 1040) setMenu(false); });
  }

  var groups = [].slice.call(doc.querySelectorAll('[data-motion]'));
  var seqs = [].slice.call(doc.querySelectorAll('[data-seq]'));

  /* ---------- counters ---------- */
  function parts(el) {
    var t = el.textContent.trim(), m = t.match(/^([^0-9]*)([0-9.,]+)(.*)$/);
    return m ? { pre: m[1], post: m[3] } : { pre: '', post: '' };
  }
  function count(el) {
    if (el.dataset.counting === '1') return;
    var target = parseFloat(el.dataset.count);
    if (isNaN(target)) return;
    var p = el.dataset.pre !== undefined ? { pre: el.dataset.pre, post: el.dataset.post } : parts(el);
    el.dataset.pre = p.pre; el.dataset.post = p.post;
    var dur = parseInt(el.dataset.dur || 1100, 10),
      delay = parseInt(el.dataset.delay || 0, 10),
      dec = (el.dataset.count.split('.')[1] || '').length,
      grp = el.dataset.group === '1',
      t0 = 0;
    el.dataset.counting = '1';
    function fmt(v) {
      var s = v.toFixed(dec);
      if (grp) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return p.pre + s + p.post;
    }
    function frame(ts) {
      if (!t0) t0 = ts;
      var e = ts - t0 - delay;
      if (e < 0) { requestAnimationFrame(frame); return; }
      var k = Math.min(1, e / dur), eased = 1 - Math.pow(1 - k, 3);
      el.textContent = fmt(target * eased);
      if (k < 1) requestAnimationFrame(frame);
      else { el.textContent = fmt(target); el.dataset.counting = '0'; }
    }
    el.textContent = fmt(0);
    requestAnimationFrame(frame);
  }
  function resetCounts(scope) {
    [].slice.call(scope.querySelectorAll('[data-count]')).forEach(function (el) {
      el.dataset.counting = '0';
      el.textContent = (el.dataset.pre || '') + '0' + (el.dataset.post || '');
    });
  }
  function runCounts(scope) {
    [].slice.call(scope.querySelectorAll('[data-count]')).forEach(count);
  }

  /* ---------- settled state for reduce / no-IO ---------- */
  function settleAll() {
    groups.forEach(function (g) { g.classList.add('in'); g.classList.remove('out'); });
    seqs.forEach(function (s) { s.classList.add('play'); });
  }
  if (reduce || !('IntersectionObserver' in window)) { settleAll(); return; }

  /* ---------- stagger ---------- */
  groups.forEach(function (g) {
    var st = parseInt(g.dataset.stagger || getComputedStyle(g).getPropertyValue('--m-stagger') || 70, 10) || 70;
    [].slice.call(g.children).forEach(function (c, i) {
      c.style.transitionDelay = (i * st) + 'ms';
    });
  });

  /* ---------- observer ---------- */
  var timers = new WeakMap();

  function replay(el) {
    // hard restart of CSS animations inside a sequence
    el.classList.remove('play');
    resetCounts(el);
    void el.offsetWidth;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      var el = en.target, r = en.intersectionRatio;
      if (el.hasAttribute('data-motion')) {
        if (r > 0.02) { el.classList.add('in'); el.classList.remove('out'); }
        else if (el.classList.contains('in')) { el.classList.add('out'); }
      }
      if (el.hasAttribute('data-seq')) {
        var t = timers.get(el);
        if (r >= 0.35) {
          if (t) { clearTimeout(t); timers.delete(el); }
          if (!el.classList.contains('play')) {
            el.classList.add('play');
            runCounts(el);
          }
        } else if (r === 0 && el.classList.contains('play') && !t) {
          timers.set(el, setTimeout(function () { replay(el); timers.delete(el); }, 1000));
        }
      }
    });
  }, { threshold: [0, 0.35, 0.7, 1] });

  groups.concat(seqs).forEach(function (el) { io.observe(el); });

  /* first paint: anything already on screen settles without waiting */
  requestAnimationFrame(function () {
    groups.forEach(function (g) {
      var b = g.getBoundingClientRect();
      if (b.top < innerHeight && b.bottom > 0) { g.classList.add('in'); }
    });
  });
})();
