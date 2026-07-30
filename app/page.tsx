'use client';

export default function Page() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Inter:wght@400;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;user-select:none}
        html,body{height:100%;width:100%;overflow:hidden;background:#04010c}
        body{font-family:'Inter',sans-serif;color:#f1f5f9;position:fixed;inset:0}

        /* ── SCREENS ── */
        .scr{position:absolute;inset:0;display:none;flex-direction:column;overflow:hidden}
        .scr.on{display:flex}
        .sv{flex:1;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;padding:14px 14px 80px}
        .sv::-webkit-scrollbar{display:none}

        /* ── GRADIENT MESH BG (like screenshot) ── */
        #meshBg{position:fixed;inset:0;z-index:0;pointer-events:none}

        /* ── LOADER ── */
        #loader{position:fixed;inset:0;z-index:999;background:#04010c;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;transition:opacity .6s}
        #loader.out{opacity:0;pointer-events:none}
        .ld-wrap{display:flex;flex-direction:column;align-items:center;gap:14px}
        .ld-logo-row{display:flex;align-items:center;gap:8px}
        .ld-main{font-family:'Orbitron',sans-serif;font-size:40px;font-weight:900;background:linear-gradient(135deg,#c084fc,#fbbf24);-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:ldP 1.1s ease-in-out infinite alternate}
        @keyframes ldP{from{opacity:.5;transform:scale(.96)}to{opacity:1;transform:scale(1.04)}}
        .ld-bar{width:200px;height:3px;background:rgba(255,255,255,.07);border-radius:3px;overflow:hidden}
        .ld-fill{height:100%;width:0;background:linear-gradient(90deg,#7c3aed,#f59e0b);border-radius:3px;animation:ldF 1.8s ease forwards}
        @keyframes ldF{to{width:100%}}
        .ld-sub{font-size:10px;color:#64748b;letter-spacing:2px;text-transform:uppercase}

        /* ── PROMO POPUP ── */
        .overlay-modal{position:fixed;inset:0;z-index:800;background:rgba(0,0,0,.88);backdrop-filter:blur(10px);display:none;align-items:center;justify-content:center}
        .overlay-modal.on{display:flex}
        .modal-box{background:linear-gradient(135deg,#0d0520,#130830);border:2px solid rgba(245,158,11,.5);border-radius:24px;padding:28px 20px;width:300px;text-align:center;animation:popIn .5s cubic-bezier(.175,.885,.32,1.275);position:relative}
        @keyframes popIn{from{transform:scale(.6);opacity:0}to{transform:scale(1);opacity:1}}

        /* ── SETUP MODAL ── */
        .ubox{background:linear-gradient(135deg,#0d0520,#130830);border:1px solid rgba(168,85,247,.5);border-radius:24px;padding:28px 20px;width:300px;text-align:center;animation:popIn .4s cubic-bezier(.175,.885,.32,1.275)}
        .ub-avpick{width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#06b6d4);display:flex;align-items:center;justify-content:center;font-size:36px;margin:0 auto 6px;border:3px dashed rgba(168,85,247,.5);cursor:pointer;overflow:hidden;position:relative;transition:all .2s}
        .ub-avpick:active{transform:scale(.95)}
        .ub-avpick img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:none}
        .ub-in{width:100%;background:rgba(255,255,255,.07);border:2px solid rgba(124,58,237,.3);border-radius:12px;padding:13px;color:#f1f5f9;font-size:15px;font-family:'Orbitron',sans-serif;text-align:center;letter-spacing:2px;outline:none;margin-bottom:6px;transition:border-color .3s}
        .ub-in:focus{border-color:#a855f7}
        .ub-go{width:100%;padding:14px;background:linear-gradient(135deg,#7c3aed,#4338ca);border:none;border-radius:12px;color:#fff;font-family:'Orbitron',sans-serif;font-size:14px;font-weight:700;cursor:pointer;letter-spacing:1px;transition:all .2s}
        .ub-go:active{transform:scale(.97)}

        /* ── BOTTOM NAV ── */
        .bnav{height:62px;flex-shrink:0;background:rgba(4,1,12,.98);border-top:1px solid rgba(124,58,237,.2);backdrop-filter:blur(20px);display:flex;position:relative;z-index:50}
        .bn{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;cursor:pointer;transition:all .2s}
        .bn-i{font-size:20px;transition:transform .25s}
        .bn-l{font-size:8px;color:#64748b;letter-spacing:.5px;text-transform:uppercase;transition:color .2s}
        .bn.act .bn-l{color:#c084fc}
        .bn.act .bn-i{transform:scale(1.15) translateY(-2px)}

        /* ── TOPBAR ── */
        .topbar{display:flex;align-items:center;justify-content:space-between;padding:14px 14px 0;flex-shrink:0;position:relative;z-index:10}
        .wb{display:flex;align-items:center;gap:6px;background:rgba(255,255,255,.08);border:1px solid rgba(124,58,237,.25);border-radius:20px;padding:7px 12px;cursor:pointer;max-width:55%}
        .wdot{width:7px;height:7px;border-radius:50%;background:#10b981;box-shadow:0 0 8px #10b981;flex-shrink:0}
        .wdot.off{background:#f59e0b;box-shadow:0 0 8px #f59e0b}
        .wt{font-size:10px;color:#c084fc;font-family:'Orbitron',sans-serif;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
        .sup-a{background:rgba(255,255,255,.07);border:1px solid rgba(124,58,237,.2);border-radius:20px;padding:7px 14px;font-size:10px;color:#34d399;font-weight:700;text-decoration:none}

        /* ── LOGO ── */
        .logo-area{position:relative;z-index:10;text-align:center;padding:14px 14px 0;flex-shrink:0}
        .logo-glow{position:absolute;width:100%;height:160px;background:radial-gradient(ellipse at 50% 50%,rgba(168,85,247,.22) 0%,transparent 65%);top:0;left:0;pointer-events:none}
        .logo-main{font-family:'Orbitron',sans-serif;font-size:52px;font-weight:900;display:block;line-height:1;letter-spacing:2px;background:linear-gradient(180deg,#fff 0%,#c084fc 45%,#7c3aed 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 0 28px rgba(168,85,247,.6));animation:lgP 3s ease-in-out infinite}
        @keyframes lgP{0%,100%{filter:drop-shadow(0 0 22px rgba(168,85,247,.45))}50%{filter:drop-shadow(0 0 48px rgba(168,85,247,.95))}}
        .logo-sub{font-family:'Orbitron',sans-serif;font-size:16px;font-weight:700;letter-spacing:7px;color:#fbbf24;text-shadow:0 0 18px rgba(251,191,36,.7);display:block;margin-top:3px}
        .logo-tag{font-size:9px;color:#64748b;letter-spacing:2.5px;text-transform:uppercase;margin-top:6px}

        /* ── HOME SCROLL ── */
        .home-sv{position:relative;z-index:10;flex:1;overflow-y:auto;overflow-x:hidden;padding:0 14px 14px}
        .home-sv::-webkit-scrollbar{display:none}

        /* ── PRIZE HERO ── */
        .ph{margin-top:14px;background:linear-gradient(135deg,rgba(124,58,237,.18),rgba(6,182,212,.1));border:1px solid rgba(168,85,247,.4);border-radius:22px;padding:18px;position:relative;overflow:hidden}
        .ph-spin{position:absolute;top:-60%;left:-60%;width:220%;height:220%;background:conic-gradient(transparent 0deg,rgba(168,85,247,.07) 60deg,transparent 120deg);animation:rotS 10s linear infinite;pointer-events:none}
        @keyframes rotS{to{transform:rotate(360deg)}}
        .ph-lbl{font-size:9px;color:#c084fc;text-transform:uppercase;letter-spacing:2px;margin-bottom:4px;position:relative;z-index:1}
        .ph-amt{font-family:'Orbitron',sans-serif;font-size:48px;font-weight:900;background:linear-gradient(180deg,#fde68a,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1;position:relative;z-index:1;transition:none}
        .ph-live{display:flex;align-items:center;gap:5px;margin-top:4px;position:relative;z-index:1;font-size:10px;color:#34d399}
        .blink{width:6px;height:6px;border-radius:50%;background:#34d399;animation:blinkA 1.2s infinite}
        @keyframes blinkA{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}
        .ph-rule{font-size:10px;margin-top:4px;position:relative;z-index:1;line-height:1.5}
        .ph-stats{display:flex;margin-top:14px;position:relative;z-index:1}
        .phs{flex:1;text-align:center;padding:0 6px;border-right:1px solid rgba(124,58,237,.2)}
        .phs:last-child{border-right:none}
        .phs-v{font-family:'Orbitron',sans-serif;font-size:16px;font-weight:700}
        .phs-l{font-size:8px;color:#64748b;text-transform:uppercase;letter-spacing:.8px;margin-top:2px}

        /* ── TIMER ── */
        .timer-row{display:flex;gap:8px;margin-top:14px}
        .td{flex:1;background:rgba(255,255,255,.07);border:1px solid rgba(124,58,237,.2);border-radius:12px;padding:10px 4px;text-align:center;transition:all .3s}
        .td.hot{border-color:#ef4444;animation:hotP .5s ease-in-out infinite alternate}
        @keyframes hotP{from{box-shadow:none}to{box-shadow:0 0 14px rgba(239,68,68,.5)}}
        .td-n{font-family:'Orbitron',sans-serif;font-size:22px;font-weight:700;color:#06b6d4}
        .td-l{font-size:7px;color:#64748b;text-transform:uppercase}

        /* ── ENTER BTN ── */
        .enter-btn{width:100%;padding:18px;border:none;border-radius:16px;cursor:pointer;font-family:'Orbitron',sans-serif;font-size:15px;font-weight:700;color:#fff;letter-spacing:1px;margin-top:14px;background:linear-gradient(135deg,#7c3aed,#4338ca,#7c3aed);background-size:200%;animation:btnFlow 3s linear infinite;box-shadow:0 0 30px rgba(124,58,237,.5);position:relative;overflow:hidden;transition:transform .2s}
        @keyframes btnFlow{0%{background-position:0%}100%{background-position:200%}}
        .enter-btn::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);transform:translateX(-100%);animation:sweep 2.5s ease-in-out infinite}
        @keyframes sweep{0%,100%{transform:translateX(-100%)}50%{transform:translateX(100%)}}
        .enter-btn:active{transform:scale(.97)}
        .enter-btn:disabled{opacity:.5;cursor:not-allowed;animation:none}
        .enter-note{text-align:center;font-size:10px;color:#64748b;margin-top:7px}
        .txbar{padding:9px 14px;border-radius:10px;font-size:11px;text-align:center;display:none;line-height:1.5;margin-top:8px}
        .txbar.on{display:block}
        .txbar.p{background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.3);color:#f59e0b}
        .txbar.e{background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.3);color:#ef4444}
        .txbar.ok{background:rgba(16,185,129,.08);border:1px solid rgba(16,185,129,.3);color:#34d399}

        /* ── POWERUPS SHOP ── */
        .pu-section{margin-top:14px}
        .pu-title{font-size:11px;font-weight:700;color:#fbbf24;margin-bottom:8px;display:flex;align-items:center;gap:6px}
        .pu-cards{display:flex;gap:8px}
        .pu-card{flex:1;background:linear-gradient(135deg,rgba(245,158,11,.1),rgba(124,58,237,.08));border:1px solid rgba(245,158,11,.25);border-radius:14px;padding:12px 6px;text-align:center;cursor:pointer;transition:all .2s;position:relative}
        .pu-card:active{transform:scale(.95)}
        .pu-card.owned{border-color:rgba(16,185,129,.5);background:linear-gradient(135deg,rgba(16,185,129,.12),rgba(6,182,212,.08))}
        .pu-card.buying{opacity:.6;pointer-events:none}
        .pu-icon{font-size:28px;display:block;margin-bottom:5px}
        .pu-name{font-size:10px;font-weight:700;color:#fbbf24;margin-bottom:2px}
        .pu-desc{font-size:8px;color:#64748b;line-height:1.4;margin-bottom:6px}
        .pu-price{font-size:11px;font-weight:700;color:#34d399}
        .pu-owned-badge{position:absolute;top:-6px;right:-6px;background:#10b981;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#000;display:none}
        .pu-card.owned .pu-owned-badge{display:flex}
        .pu-card.owned .pu-price{color:#34d399}

        /* ── HOW CARDS ── */
        .how-cards{display:flex;gap:8px;margin-top:14px}
        .hc{flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(124,58,237,.2);border-radius:16px;padding:13px 8px;text-align:center;transition:transform .3s;animation:hcIn .5s ease both}
        @keyframes hcIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        .hc:nth-child(1){animation-delay:.1s}.hc:nth-child(2){animation-delay:.2s}.hc:nth-child(3){animation-delay:.3s}
        .hc:active{transform:perspective(400px) rotateY(-18deg) rotateX(6deg) scale(.96)}
        .hc-i{font-size:26px;display:block;margin-bottom:5px}
        .hc-t{font-size:10px;font-weight:700;color:#c084fc;margin-bottom:2px}
        .hc-d{font-size:9px;color:#64748b;line-height:1.4}

        /* ── STREAK ── */
        .streak-card{margin-top:12px;background:rgba(255,255,255,.04);border:1px solid rgba(124,58,237,.2);border-radius:16px;padding:12px 14px;display:flex;align-items:center;gap:12px}
        .sf{font-size:32px;animation:fireD 1.1s ease-in-out infinite alternate}
        @keyframes fireD{from{transform:scale(1) rotate(-7deg)}to{transform:scale(1.12) rotate(7deg)}}

        /* ── INVITE CARD ── */
        .invite-card{margin-top:12px;background:rgba(255,255,255,.04);border:1px solid rgba(124,58,237,.2);border-radius:18px;padding:16px 14px}
        .invite-title{font-size:13px;font-weight:700;color:#c084fc;margin-bottom:6px;display:flex;align-items:center;gap:6px}
        .invite-desc{font-size:11px;color:#94a3b8;line-height:1.65;margin-bottom:12px}
        .invite-btns{display:flex;gap:8px}
        .ibtn{flex:1;padding:12px 6px;border:none;border-radius:11px;cursor:pointer;font-weight:700;font-size:11px;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:5px}
        .ibtn:active{transform:scale(.95)}
        .ibtn-share{background:linear-gradient(135deg,#10b981,#059669);color:#000}
        .ibtn-tg{background:linear-gradient(135deg,#0ea5e9,#0369a1);color:#fff}
        .ibtn-x{background:linear-gradient(135deg,#374151,#111827);color:#fff}

        /* ── NVM FOOTER ── */
        .nvm-footer{display:flex;align-items:center;justify-content:center;gap:8px;padding:16px 0 6px}
        .nvm-lbl{font-family:'Orbitron',sans-serif;font-size:9px;background:linear-gradient(135deg,#c084fc,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:2px}

        /* ═══ GAME ═══ */
        #gameScr{background:#04010c}
        #gc{position:absolute;inset:0;width:100%;height:100%;touch-action:none;z-index:1}
        .ghud{position:absolute;top:0;left:0;right:0;z-index:20;height:58px;background:rgba(4,1,12,.92);backdrop-filter:blur(16px);border-bottom:1px solid rgba(124,58,237,.18);display:grid;grid-template-columns:1fr 1fr 1fr;align-items:center;padding:0 14px}
        .hi{text-align:center}.hi:first-child{text-align:left}.hi:last-child{text-align:right}
        .hv{font-family:'Orbitron',sans-serif;font-size:20px;font-weight:700;line-height:1}
        .hl{font-size:7px;color:#64748b;text-transform:uppercase;letter-spacing:.8px;margin-top:2px}
        .hv.gold{color:#fbbf24}.hv.vio{color:#c084fc}.hv.cy{color:#06b6d4}
        .hv.danger{color:#ef4444;animation:hotP .4s ease-in-out infinite alternate}
        .mflash{position:absolute;inset:0;background:rgba(239,68,68,.08);pointer-events:none;z-index:10;opacity:0;transition:opacity .12s}
        .cdov{position:absolute;inset:0;z-index:40;background:rgba(4,1,12,.93);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px}
        .cd-hint{font-size:11px;color:#64748b;letter-spacing:2px;text-transform:uppercase}
        .cd-n{font-family:'Orbitron',sans-serif;font-size:100px;font-weight:900;background:linear-gradient(180deg,#fff,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:cdP .7s cubic-bezier(.175,.885,.32,1.275)}
        .cd-go{font-family:'Orbitron',sans-serif;font-size:72px;font-weight:900;color:#10b981;text-shadow:0 0 40px #10b981;animation:cdP .5s cubic-bezier(.175,.885,.32,1.275)}
        @keyframes cdP{from{transform:scale(2);opacity:0}to{transform:scale(1);opacity:1}}
        /* POWERUP BAR in game */
        .pu-bar{position:absolute;bottom:70px;left:50%;transform:translateX(-50%);z-index:25;display:flex;gap:8px;align-items:center}
        .pu-btn{width:52px;height:52px;border-radius:14px;border:2px solid rgba(255,255,255,.3);background:rgba(0,0,0,.6);backdrop-filter:blur(8px);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;font-size:22px;position:relative}
        .pu-btn:active{transform:scale(.92)}
        .pu-btn.used{opacity:.3;pointer-events:none}
        .pu-btn .pu-count{position:absolute;top:-6px;right:-6px;background:#10b981;border-radius:50%;width:18px;height:18px;font-size:9px;font-weight:800;color:#000;display:flex;align-items:center;justify-content:center}
        .pu-btn.shield-btn{border-color:rgba(6,182,212,.6);box-shadow:0 0 10px rgba(6,182,212,.3)}
        .pu-btn.doubler-btn{border-color:rgba(245,158,11,.6);box-shadow:0 0 10px rgba(245,158,11,.3)}
        .pu-btn.revive-btn{border-color:rgba(239,68,68,.6);box-shadow:0 0 10px rgba(239,68,68,.3)}
        .pu-active-label{position:absolute;bottom:130px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.7);border-radius:20px;padding:4px 12px;font-size:10px;font-weight:700;color:#fbbf24;white-space:nowrap;z-index:25;display:none}

        /* ═══ RESULT ═══ */
        #resultScr .sv{display:flex;flex-direction:column;align-items:center;padding:20px 14px 20px}
        .r-crown{font-size:60px;animation:crIn 1s cubic-bezier(.175,.885,.32,1.275)}
        @keyframes crIn{from{transform:scale(0) rotate(-20deg)}to{transform:scale(1)}}
        .r-lbl{font-family:'Orbitron',sans-serif;font-size:12px;color:#64748b;letter-spacing:3px;margin-bottom:4px}
        .r-score{font-family:'Orbitron',sans-serif;font-size:60px;font-weight:900;background:linear-gradient(180deg,#fff,#fbbf24);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:4px}
        .r-pb{font-size:11px;color:#34d399;margin-bottom:14px}
        .rank-banner{width:100%;background:linear-gradient(135deg,rgba(245,158,11,.14),rgba(124,58,237,.09));border:1px solid rgba(245,158,11,.3);border-radius:18px;padding:16px;text-align:center;margin-bottom:14px}
        .rb-n{font-family:'Orbitron',sans-serif;font-size:44px;font-weight:900;color:#fbbf24}
        .rb-l{font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-top:4px}
        .rb-p{font-size:13px;font-weight:700;color:#34d399;margin-top:6px}
        .rstats{display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%;margin-bottom:14px}
        .rs{background:rgba(255,255,255,.04);border:1px solid rgba(124,58,237,.2);border-radius:14px;padding:14px;text-align:center}
        .rs-v{font-family:'Orbitron',sans-serif;font-size:20px;font-weight:700;color:#c084fc}
        .rs-l{font-size:9px;color:#64748b;text-transform:uppercase;letter-spacing:.8px;margin-top:4px}
        .r-btns{display:flex;gap:10px;width:100%;margin-bottom:10px}
        .rbtn{flex:1;padding:15px;border:none;border-radius:14px;cursor:pointer;font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;letter-spacing:.5px;transition:all .2s}
        .rbtn:active{transform:scale(.96)}
        .rbtn-play{background:linear-gradient(135deg,#10b981,#059669);color:#000;box-shadow:0 0 20px rgba(16,185,129,.3)}
        .rbtn-home{background:rgba(255,255,255,.07);border:1px solid rgba(124,58,237,.2);color:#f1f5f9;backdrop-filter:blur(12px)}

        /* ═══ LEADERBOARD ═══ */
        #lbScr{background:rgba(4,1,12,.5)}
        .lb-bd{position:absolute;inset:0;z-index:0}
        .lb-sheet{position:absolute;bottom:0;left:0;right:0;z-index:5;background:linear-gradient(180deg,#0e0520,#06030f);border-radius:28px 28px 0 0;border-top:2px solid rgba(168,85,247,.45);overflow:hidden;animation:lbSlide .4s cubic-bezier(.175,.885,.32,1.275)}
        @keyframes lbSlide{from{transform:translateY(100%)}to{transform:translateY(0)}}
        .lb-handle-row{display:flex;align-items:center;justify-content:center;padding:10px 0 0}
        .lb-handle{width:36px;height:4px;background:rgba(168,85,247,.4);border-radius:2px}
        .lb-scroll{max-height:calc(100vh - 140px);overflow-y:auto;padding:0 14px 8px}
        .lb-scroll::-webkit-scrollbar{display:none}
        .lb-top-banner{background:linear-gradient(135deg,rgba(245,158,11,.2),rgba(124,58,237,.15));border:1px solid rgba(245,158,11,.4);border-radius:18px;padding:16px 14px;margin:10px 0 12px;text-align:center;position:relative;overflow:hidden}
        .lb-top-banner::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:conic-gradient(transparent 0deg,rgba(245,158,11,.07) 60deg,transparent 120deg);animation:rotS 8s linear infinite;pointer-events:none}
        .lb-tabs{display:flex;gap:0;background:rgba(255,255,255,.07);border:1px solid rgba(124,58,237,.2);border-radius:13px;padding:3px;margin-bottom:10px}
        .lb-tab{flex:1;padding:9px;font-size:11px;font-weight:700;border-radius:10px;cursor:pointer;text-align:center;color:#64748b;transition:all .25s}
        .lb-tab.act{background:linear-gradient(135deg,#f59e0b,#d97706);color:#000}
        .lb-play-pill{display:block;width:100%;padding:14px;background:linear-gradient(135deg,#10b981,#059669);border:none;border-radius:12px;color:#000;font-weight:700;cursor:pointer;text-align:center;font-size:12px;margin-bottom:10px;transition:all .2s}
        .lb-entry{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid rgba(124,58,237,.1);text-align:left}
        .lb-entry:last-child{border-bottom:none}
        .lbe-rank{font-family:'Orbitron',sans-serif;font-size:14px;font-weight:700;color:#fbbf24;width:24px}
        .lbe-av{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#06b6d4);display:flex;align-items:center;justify-content:center;font-size:16px;margin:0 8px}
        .lbe-info{flex:1}
        .lbe-name{font-size:11px;font-weight:700;color:#f1f5f9}
        .lbe-score{font-size:10px;color:#64748b}
        .lbe-val{font-family:'Orbitron',sans-serif;font-size:14px;font-weight:700;color:#c084fc}
        .lb-you{background:rgba(168,85,247,.12);border-radius:8px;padding:0 8px}

        body{background:#04010c}
      `}</style>

      <div id="loader" className="loader">
        <div className="ld-wrap">
          <div className="ld-logo-row">
            <span className="ld-main">◆</span>
          </div>
          <div className="ld-bar">
            <div className="ld-fill"></div>
          </div>
          <div className="ld-sub">INITIALIZING</div>
        </div>
      </div>

      <div id="meshBg"></div>

      <div id="homeScr" className="scr on">
        <div className="topbar">
          <div className="wb">
            <div className="wdot"></div>
            <div className="wt">LIVE</div>
          </div>
          <a href="#" className="sup-a">SUPPORT</a>
        </div>

        <div className="logo-area">
          <div className="logo-glow"></div>
          <div className="logo-main">◆ DARING</div>
          <div className="logo-sub">TOURNAMENT</div>
          <div className="logo-tag">MINI PAY</div>
        </div>

        <div className="home-sv">
          <div className="ph">
            <div className="ph-spin"></div>
            <div className="ph-lbl">💰 PRIZE POOL</div>
            <div className="ph-amt">$50,000</div>
            <div className="ph-live">
              <div className="blink"></div>
              NOW LIVE
            </div>
            <div className="ph-rule" style={{marginTop: '8px'}}>🎯 Quick-fire rounds. Build combos. Win big.</div>
            <div className="ph-stats">
              <div className="phs">
                <div className="phs-v">248K</div>
                <div className="phs-l">Players</div>
              </div>
              <div className="phs">
                <div className="phs-v">1.2M</div>
                <div className="phs-l">Played</div>
              </div>
              <div className="phs">
                <div className="phs-v">42:18</div>
                <div className="phs-l">Ends In</div>
              </div>
            </div>
          </div>

          <button className="enter-btn">ENTER TOURNAMENT</button>
          <div className="enter-note">No entry fee • Play to win</div>
          <div className="txbar"></div>

          <div className="pu-section">
            <div className="pu-title">⚡ POWER-UPS</div>
            <div className="pu-cards">
              <div className="pu-card">
                <div className="pu-icon">🛡️</div>
                <div className="pu-name">SHIELD</div>
                <div className="pu-desc">Block 1 hit</div>
                <div className="pu-price">500</div>
                <div className="pu-owned-badge">3</div>
              </div>
              <div className="pu-card">
                <div className="pu-icon">2️⃣</div>
                <div className="pu-name">DOUBLER</div>
                <div className="pu-desc">2x points</div>
                <div className="pu-price">800</div>
                <div className="pu-owned-badge">1</div>
              </div>
              <div className="pu-card">
                <div className="pu-icon">❤️</div>
                <div className="pu-name">REVIVE</div>
                <div className="pu-desc">2nd chance</div>
                <div className="pu-price">1200</div>
                <div className="pu-owned-badge">2</div>
              </div>
            </div>
          </div>

          <div className="how-cards">
            <div className="hc">
              <div className="hc-i">🎮</div>
              <div className="hc-t">PLAY</div>
              <div className="hc-d">Quick arcade rounds</div>
            </div>
            <div className="hc">
              <div className="hc-i">📈</div>
              <div className="hc-t">COMPETE</div>
              <div className="hc-d">Climb the ranks</div>
            </div>
            <div className="hc">
              <div className="hc-i">🏆</div>
              <div className="hc-t">WIN</div>
              <div className="hc-d">Cash rewards</div>
            </div>
          </div>

          <div className="streak-card">
            <div className="sf">🔥</div>
            <div>
              <div style={{fontSize: '12px', fontWeight: '700', color: '#c084fc'}}>LEGENDARY STREAK</div>
              <div style={{fontSize: '10px', color: '#64748b', marginTop: '2px'}}>Challenge your limit</div>
            </div>
          </div>

          <div className="invite-card">
            <div className="invite-title">
              <span>👥</span> INVITE & EARN
            </div>
            <div className="invite-desc">Refer a friend • Earn 10% of their winnings • Lifetime rewards</div>
            <div className="invite-btns">
              <button className="ibtn ibtn-share">📲 SHARE</button>
              <button className="ibtn ibtn-tg">✈️ TELEGRAM</button>
              <button className="ibtn ibtn-x">𝕏</button>
            </div>
          </div>

          <div className="nvm-footer">
            <span className="nvm-lbl">BUILD BY NERDS</span>
          </div>
        </div>

        <div className="bnav">
          <div className="bn act">
            <div className="bn-i">🏠</div>
            <div className="bn-l">Home</div>
          </div>
          <div className="bn">
            <div className="bn-i">🏆</div>
            <div className="bn-l">Ranks</div>
          </div>
          <div className="bn">
            <div className="bn-i">👤</div>
            <div className="bn-l">Profile</div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        // Loader fade out
        setTimeout(() => {
          const loader = document.getElementById('loader');
          if (loader) {
            loader.classList.add('out');
            setTimeout(() => loader.style.display = 'none', 600);
          }
        }, 1200);

        // Screen switcher
        window.screens = {
          home: document.getElementById('homeScr'),
          game: document.getElementById('gameScr'),
          result: document.getElementById('resultScr'),
          leaderboard: document.getElementById('lbScr')
        };

        window.switchScreen = (name) => {
          Object.values(window.screens).forEach(s => s && s.classList.remove('on'));
          if (window.screens[name]) window.screens[name].classList.add('on');
        };

        // Button interactions
        const enterBtn = document.querySelector('.enter-btn');
        if (enterBtn) {
          enterBtn.addEventListener('click', () => {
            console.log('Tournament entered!');
          });
        }

        const navBtns = document.querySelectorAll('.bn');
        navBtns.forEach((btn, i) => {
          btn.addEventListener('click', () => {
            navBtns.forEach(b => b.classList.remove('act'));
            btn.classList.add('act');
          });
        });
      `}} />
    </>
  );
}
