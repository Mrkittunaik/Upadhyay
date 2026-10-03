/* logo-crop.js — circular logo cropper. Drag to move, slider / wheel / +/- to zoom.
   Usage: LogoCrop.open(file, function(dataUrl){ ... }) */
(function(){
  var V = 300;          // crop circle size on screen (px)
  var OUT = 400;        // exported image size (px)
  var MAXZ = 4;         // max zoom relative to the "cover" size

  function css(){
    if(document.getElementById('lcStyle')) return;
    var s = document.createElement('style'); s.id = 'lcStyle';
    s.textContent =
      '.lc-ov{position:fixed;inset:0;z-index:100000;background:rgba(11,29,58,.6);display:flex;align-items:center;justify-content:center;padding:16px}' +
      '.lc-box{background:#fff;border-radius:6px;width:380px;max-width:100%;padding:20px;box-shadow:0 18px 50px rgba(0,0,0,.35);font-family:inherit}' +
      '.lc-box h4{margin:0 0 2px;font-size:16px;color:#0b1d3a}' +
      '.lc-box p{margin:0 0 14px;font-size:12.5px;color:#5b6577}' +
      '.lc-stage{position:relative;width:' + V + 'px;height:' + V + 'px;margin:0 auto;overflow:hidden;background:#111;touch-action:none;cursor:grab;user-select:none}' +
      '.lc-stage.drag{cursor:grabbing}' +
      '.lc-stage img{position:absolute;left:0;top:0;max-width:none;transform-origin:0 0;pointer-events:none;-webkit-user-drag:none}' +
      '.lc-mask{position:absolute;inset:0;pointer-events:none;border-radius:50%;box-shadow:0 0 0 400px rgba(255,255,255,.72);border:2px dashed #1d4ed8}' +
      '.lc-zoom{display:flex;align-items:center;gap:10px;margin:16px 4px 4px}' +
      '.lc-zoom button{width:30px;height:30px;border:1px solid #d5dbe6;background:#fff;border-radius:50%;font-size:18px;line-height:1;cursor:pointer;color:#0b1d3a;flex:none}' +
      '.lc-zoom input{flex:1;accent-color:#1d4ed8}' +
      '.lc-act{display:flex;justify-content:flex-end;gap:10px;margin-top:16px}' +
      '.lc-act button{font:600 13px inherit;font-family:inherit;padding:9px 20px;border-radius:2px;cursor:pointer;border:1px solid #d5dbe6;background:#fff;color:#0b1d3a}' +
      '.lc-act .lc-ok{background:#1d4ed8;border-color:#1d4ed8;color:#fff}';
    document.head.appendChild(s);
  }

  function open(file, done){
    if(!file) return;
    css();
    var reader = new FileReader();
    reader.onload = function(ev){
      var img = new Image();
      img.onload = function(){ build(img, ev.target.result, done); };
      img.onerror = function(){ alert('Could not read this image. Try a PNG or JPG.'); };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }

  function build(img, src, done){
    var w = img.naturalWidth, h = img.naturalHeight;
    var min = Math.max(V / w, V / h);   // smallest scale that still covers the circle
    var max = min * MAXZ;
    var s = min, x = (V - w * s) / 2, y = (V - h * s) / 2;

    var ov = document.createElement('div'); ov.className = 'lc-ov';
    ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true');
    ov.innerHTML =
      '<div class="lc-box"><h4>Adjust your logo</h4><p>Drag to move. Use the slider or mouse wheel to zoom in and out.</p>' +
      '<div class="lc-stage" id="lcStage"><img id="lcImg" alt="" src="' + src + '"><div class="lc-mask"></div></div>' +
      '<div class="lc-zoom"><button type="button" id="lcOut" aria-label="Zoom out">&minus;</button>' +
      '<input type="range" id="lcRange" min="0" max="100" value="0" aria-label="Zoom">' +
      '<button type="button" id="lcIn" aria-label="Zoom in">+</button></div>' +
      '<div class="lc-act"><button type="button" id="lcCancel">Cancel</button><button type="button" class="lc-ok" id="lcSave">Save logo</button></div></div>';
    document.body.appendChild(ov);

    var stage = ov.querySelector('#lcStage'), im = ov.querySelector('#lcImg'), range = ov.querySelector('#lcRange');

    function clamp(){
      x = Math.min(0, Math.max(V - w * s, x));
      y = Math.min(0, Math.max(V - h * s, y));
    }
    function paint(){
      clamp();
      im.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + s + ')';
      range.value = Math.round((s - min) / (max - min) * 100);
    }
    function zoomTo(ns){
      ns = Math.min(max, Math.max(min, ns));
      var cx = (V / 2 - x) / s, cy = (V / 2 - y) / s;   // keep the circle centre fixed
      s = ns; x = V / 2 - cx * s; y = V / 2 - cy * s; paint();
    }
    paint();

    var drag = null;
    stage.addEventListener('pointerdown', function(e){
      drag = { px: e.clientX, py: e.clientY, x: x, y: y };
      stage.classList.add('drag');
      try{ stage.setPointerCapture(e.pointerId); }catch(_){}
      e.preventDefault();
    });
    stage.addEventListener('pointermove', function(e){
      if(!drag) return;
      x = drag.x + (e.clientX - drag.px); y = drag.y + (e.clientY - drag.py); paint();
    });
    function end(){ drag = null; stage.classList.remove('drag'); }
    stage.addEventListener('pointerup', end);
    stage.addEventListener('pointercancel', end);
    stage.addEventListener('wheel', function(e){
      e.preventDefault(); zoomTo(s * (e.deltaY < 0 ? 1.08 : 1 / 1.08));
    }, { passive: false });
    range.addEventListener('input', function(){ zoomTo(min + (max - min) * range.value / 100); });
    ov.querySelector('#lcIn').onclick = function(){ zoomTo(s * 1.15); };
    ov.querySelector('#lcOut').onclick = function(){ zoomTo(s / 1.15); };

    function close(){ document.removeEventListener('keydown', onKey); ov.remove(); }
    function onKey(e){ if(e.key === 'Escape') close(); }
    document.addEventListener('keydown', onKey);
    ov.querySelector('#lcCancel').onclick = close;
    ov.addEventListener('mousedown', function(e){ if(e.target === ov) close(); });

    ov.querySelector('#lcSave').onclick = function(){
      var c = document.createElement('canvas'); c.width = OUT; c.height = OUT;
      var g = c.getContext('2d');
      g.fillStyle = '#fff'; g.fillRect(0, 0, OUT, OUT);
      g.drawImage(img, -x / s, -y / s, V / s, V / s, 0, 0, OUT, OUT);
      var url = c.toDataURL('image/jpeg', 0.9);
      close();
      if(done) done(url);
    };
  }

  window.LogoCrop = { open: open };
})();
