<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"/>
<title>Daring Tournament</title>
<style>
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
.lb-play-pill{display:block;width:100%;padding:14px;background:linear-gradient(135deg,#10b981,#059669);border:none;border-radius:50px;font-family:'Orbitron',sans-serif;font-size:13px;font-weight:700;color:#000;cursor:pointer;margin-bottom:12px;box-shadow:0 0 20px rgba(16,185,129,.3)}
.lb-stats-row{display:flex;gap:8px;margin-bottom:12px}
.lb-stat{flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(124,58,237,.2);border-radius:11px;padding:9px;text-align:center}
.lsv{font-family:'Orbitron',sans-serif;font-size:15px;font-weight:700}
.lsl{font-size:8px;color:#64748b;text-transform:uppercase;letter-spacing:.8px;margin-top:2px}
.lb-row{display:flex;align-items:center;gap:10px;padding:11px 12px;border-radius:14px;margin-bottom:6px;background:rgba(255,255,255,.04);border:1px solid rgba(124,58,237,.15);position:relative;overflow:hidden;opacity:0;animation:rowIn .4s ease forwards}
@keyframes rowIn{from{opacity:0;transform:translateX(-14px)}to{opacity:1;transform:translateX(0)}}
.lb-row::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;border-radius:3px 0 0 3px}
.lb-row.r1{border-color:rgba(251,191,36,.45);background:rgba(251,191,36,.07)}.lb-row.r1::before{background:#fbbf24}
.lb-row.r2{border-color:rgba(148,163,184,.38);background:rgba(148,163,184,.05)}.lb-row.r2::before{background:#94a3b8}
.lb-row.r3{border-color:rgba(180,83,9,.38);background:rgba(180,83,9,.06)}.lb-row.r3::before{background:#b45309}
.lb-row.me{border-color:#a855f7;background:rgba(168,85,247,.08)}
.lb-row.near{border-color:rgba(245,158,11,.25);background:rgba(245,158,11,.04)}
.lb-rn{font-family:'Orbitron',sans-serif;font-size:13px;font-weight:700;min-width:28px;text-align:center}
.lb-av{width:40px;height:40px;border-radius:12px;overflow:hidden;background:linear-gradient(135deg,rgba(124,58,237,.2),rgba(6,182,212,.15));border:1px solid rgba(124,58,237,.2);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}
.lb-av img{width:100%;height:100%;object-fit:cover}
.lb-info{flex:1;min-width:0}
.lb-name{font-size:13px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:flex;align-items:center;gap:5px}
.you-badge{font-size:8px;background:#7c3aed;color:#fff;padding:1px 5px;border-radius:4px;font-weight:800}
.lb-pts{font-family:'Orbitron',sans-serif;font-size:11px;color:#c084fc;margin-top:2px}
.lb-prize-v{font-size:11px;font-weight:700;color:#fbbf24;text-align:right}
.lb-prize-l{font-size:8px;color:#64748b;text-align:right}
.my-rank-strip{background:linear-gradient(135deg,rgba(124,58,237,.15),rgba(6,182,212,.08));border:1px solid rgba(168,85,247,.35);border-radius:12px;padding:11px 14px;display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}

/* ═══ WALLET ═══ */
.wcard{background:linear-gradient(135deg,rgba(124,58,237,.2),rgba(6,182,212,.1));border:1px solid rgba(168,85,247,.45);border-radius:22px;padding:20px;margin-bottom:14px;text-align:center;position:relative;overflow:hidden}
.wcard-spin{position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:conic-gradient(transparent 0deg,rgba(124,58,237,.05) 60deg,transparent 120deg);animation:rotS 12s linear infinite;pointer-events:none}
.wc-av{width:74px;height:74px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#06b6d4);display:flex;align-items:center;justify-content:center;font-size:34px;margin:0 auto 7px;border:3px solid rgba(255,255,255,.12);position:relative;z-index:1;overflow:hidden;cursor:pointer}
.wc-av img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:none}
.wc-name{font-family:'Orbitron',sans-serif;font-size:15px;font-weight:700;color:#c084fc;position:relative;z-index:1;margin-bottom:2px}
.wc-uid{font-size:10px;color:#64748b;position:relative;z-index:1;margin-bottom:14px;font-family:'Orbitron',sans-serif;letter-spacing:1px}
.wc-stats{display:grid;grid-template-columns:1fr 1fr;gap:8px;position:relative;z-index:1}
.wcs{background:rgba(0,0,0,.3);border:1px solid rgba(124,58,237,.2);border-radius:11px;padding:11px;text-align:center}
.wcs-v{font-family:'Orbitron',sans-serif;font-size:17px;font-weight:700}
.wcs-l{font-size:8px;color:#64748b;text-transform:uppercase;letter-spacing:.8px;margin-top:3px}
.w-actions{display:flex;gap:8px;margin-bottom:12px}
.wa{flex:1;padding:14px 8px;border:none;border-radius:14px;cursor:pointer;font-weight:700;font-size:12px;transition:all .2s}
.wa:active{transform:scale(.96)}
.wa-r{background:linear-gradient(135deg,#f59e0b,#d97706);color:#000}
.wa-h{background:rgba(255,255,255,.07);border:1px solid rgba(124,58,237,.2);color:#f1f5f9;backdrop-filter:blur(12px)}
.wnote{font-size:10px;color:#64748b;text-align:center;line-height:1.6;background:rgba(255,255,255,.04);border:1px solid rgba(124,58,237,.15);border-radius:10px;padding:10px;margin-bottom:14px}
.pt-wrap{background:rgba(255,255,255,.04);border:1px solid rgba(124,58,237,.18);border-radius:14px;padding:14px;margin-bottom:14px}
.pt-hdr{font-size:11px;font-weight:700;color:#c084fc;margin-bottom:10px}
.pt-r{display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.04)}
.pt-r:last-child{border-bottom:none}
.pt-pos{font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;min-width:60px}
.gg{color:#fbbf24}.ss{color:#94a3b8}.bb{color:#b45309}.mm{color:#64748b}
.pt-pct{flex:1;font-size:11px;color:#64748b}
.pt-ex{font-size:11px;font-weight:700;color:#34d399}
.tx-wrap{background:rgba(255,255,255,.04);border:1px solid rgba(124,58,237,.18);border-radius:14px;padding:14px;margin-bottom:14px;display:none}
.tx-i{display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04)}
.tx-i:last-child{border-bottom:none}

/* ═══ MORE ═══ */
.more-sec{margin-bottom:16px}
.more-sec-t{font-size:9px;color:#64748b;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;padding-left:2px}
.more-row{display:flex;align-items:center;justify-content:space-between;padding:13px 14px;background:rgba(255,255,255,.04);border:1px solid rgba(124,58,237,.18);border-radius:13px;margin-bottom:6px;cursor:pointer;transition:all .2s}
.more-row:active{border-color:#c084fc;background:rgba(255,255,255,.07)}
.mrl{display:flex;align-items:center;gap:10px}

/* TOGGLE — the key fix */
.toggle{width:52px;height:28px;background:rgba(124,58,237,.25);border-radius:14px;position:relative;transition:background .3s;cursor:pointer;flex-shrink:0;border:1px solid rgba(124,58,237,.3)}
.toggle.on{background:#10b981;border-color:#10b981}
.toggle::after{content:'';position:absolute;width:22px;height:22px;background:#fff;border-radius:50%;top:2px;left:2px;transition:left .3s,box-shadow .3s;box-shadow:0 1px 4px rgba(0,0,0,.4)}
.toggle.on::after{left:26px;box-shadow:0 1px 4px rgba(0,0,0,.4),0 0 8px rgba(16,185,129,.5)}
/* Visual feedback labels */
.toggle-state{font-size:9px;font-weight:700;margin-left:8px;transition:color .3s}
.toggle.on+.toggle-state{color:#10b981}
.toggle-state{color:#64748b}

.faq-q{font-size:12px;font-weight:700;padding:11px 14px;background:rgba(255,255,255,.04);border:1px solid rgba(124,58,237,.18);border-radius:10px;display:flex;justify-content:space-between;cursor:pointer;margin-bottom:4px}
.faq-a{font-size:11.5px;color:#64748b;padding:10px 14px;line-height:1.7;display:none;background:rgba(255,255,255,.04);border:1px solid rgba(124,58,237,.15);border-top:none;border-radius:0 0 10px 10px;margin-bottom:4px}
.faq-a.on{display:block}

/* TOAST */
.toast-el{position:fixed;top:0;left:0;right:0;z-index:900;padding:10px 20px;display:flex;align-items:center;gap:8px;pointer-events:none;animation:toastIn .4s cubic-bezier(.175,.885,.32,1.275)}
@keyframes toastIn{from{transform:translateY(-100%)}to{transform:translateY(0)}}
.toast-txt{font-size:12px;font-weight:700;color:#fff}
.toast-el.success{background:linear-gradient(135deg,rgba(16,185,129,.97),rgba(5,150,105,.97))}
.toast-el.info{background:linear-gradient(135deg,rgba(124,58,237,.97),rgba(79,70,229,.97))}
.toast-el.warn{background:linear-gradient(135deg,rgba(245,158,11,.97),rgba(217,119,6,.97));color:#000}
.toast-el.warn .toast-txt{color:#000}

.fx{position:fixed;pointer-events:none;z-index:400;animation:fxUp .9s ease forwards;font-family:'Orbitron',sans-serif;font-weight:900}
@keyframes fxUp{from{opacity:1;transform:translate(0,0) scale(1)}to{opacity:0;transform:translate(var(--dx),var(--dy)) scale(.3)}}
@keyframes spinA{to{transform:rotate(360deg)}}
.spin{display:inline-block;width:11px;height:11px;border:2px solid rgba(255,255,255,.15);border-top-color:#c084fc;border-radius:50%;animation:spinA .5s linear infinite;vertical-align:middle;margin-right:5px}

/* ── MEDALS ── */
.medal-item{display:flex;align-items:center;gap:10px;padding:10px 12px;background:rgba(255,255,255,.04);border:1px solid rgba(124,58,237,.2);border-radius:12px;margin-bottom:8px;transition:all .2s}
.medal-locked{opacity:.4;filter:grayscale(.7)}
.medal-icon{font-size:24px;flex-shrink:0;width:36px;text-align:center}
.medal-info{flex:1}
.medal-name{font-size:13px;font-weight:700;color:#f1f5f9}
.medal-desc{font-size:10px;color:#64748b;margin-top:2px;line-height:1.4}
/* ── DONATION ── */
.donate-card{margin-top:14px;background:linear-gradient(135deg,rgba(251,191,36,.08),rgba(124,58,237,.06));border:1px solid rgba(251,191,36,.25);border-radius:18px;padding:18px 16px}
.donate-title{font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;color:#fbbf24;letter-spacing:2px;margin-bottom:6px}
.donate-desc{font-size:11px;color:#94a3b8;line-height:1.65;margin-bottom:12px}
.donate-amounts{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px}
.da{padding:9px 16px;border-radius:10px;background:rgba(255,255,255,.07);border:1px solid rgba(124,58,237,.25);color:#f1f5f9;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;cursor:pointer;transition:all .2s}
.da:active{transform:scale(.96);background:rgba(124,58,237,.2)}
.da.sel{border-color:#fbbf24;background:rgba(251,191,36,.12);color:#fbbf24}
.donate-btn{width:100%;padding:14px;background:linear-gradient(135deg,#7c3aed,#4338ca);border:none;border-radius:12px;color:#fff;font-family:'Orbitron',sans-serif;font-size:13px;font-weight:700;cursor:pointer;letter-spacing:1px;transition:all .2s}
.donate-btn:active{transform:scale(.97)}
/* ── CAREER RANK ── */
.rank-badge{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:1px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12)}
/* ── LIVE FEED ── */
#liveFeed{position:fixed;top:0;left:0;right:0;z-index:30;pointer-events:none}
.lf-pill{display:flex;align-items:center;gap:7px;padding:5px 12px;background:rgba(4,1,12,.92);border-bottom:1px solid rgba(124,58,237,.15);backdrop-filter:blur(12px);animation:lfIn .4s ease,lfOut .4s ease 3.6s forwards}
@keyframes lfIn{from{transform:translateY(-100%);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes lfOut{from{opacity:1}to{opacity:0;height:0;padding:0}}
.lf-av{width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#06b6d4);display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0;overflow:hidden}
.lf-av img{width:100%;height:100%;object-fit:cover}
.lf-name{font-size:10px;font-weight:700;color:#c084fc;font-family:'Orbitron',sans-serif}
.lf-action{font-size:10px;color:#94a3b8}
.lf-dot{width:5px;height:5px;border-radius:50%;background:#34d399;box-shadow:0 0 6px #34d399;flex-shrink:0;animation:blinkA 1.2s infinite}
/* ── ANNOUNCEMENT PANEL ── */
.ann-panel{position:fixed;inset:0;z-index:850;background:rgba(0,0,0,.92);backdrop-filter:blur(14px);display:none;flex-direction:column;align-items:center;padding:20px 14px;overflow-y:auto}
.ann-panel.on{display:flex}
.ann-header{display:flex;align-items:center;justify-content:space-between;width:100%;max-width:380px;margin-bottom:16px}
.ann-title{font-family:'Orbitron',sans-serif;font-size:16px;font-weight:900;color:#fbbf24;letter-spacing:3px}
.ann-close{font-size:22px;color:rgba(255,255,255,.4);cursor:pointer;padding:4px 8px}
.ann-item{width:100%;max-width:380px;background:rgba(255,255,255,.04);border:1px solid rgba(124,58,237,.2);border-radius:16px;padding:14px;margin-bottom:10px}
.ann-item-tag{font-size:8px;color:#c084fc;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px}
.ann-item-title{font-family:'Orbitron',sans-serif;font-size:13px;font-weight:700;color:#fff;margin-bottom:5px}
.ann-item-body{font-size:11px;color:#94a3b8;line-height:1.65}
.ann-item.hl{border-color:rgba(251,191,36,.4);background:rgba(251,191,36,.06)}
/* ── TUTORIAL ── */
.tut-panel{position:fixed;inset:0;z-index:860;background:rgba(0,0,0,.97);display:none;flex-direction:column;align-items:center;justify-content:center;padding:20px 20px 40px}
.tut-panel.on{display:flex}
.tut-icon{font-size:54px;margin-bottom:14px;display:block;text-align:center}
.tut-head{font-family:'Orbitron',sans-serif;font-size:15px;font-weight:900;color:#fbbf24;letter-spacing:2px;margin-bottom:10px;text-align:center}
.tut-body{font-size:12px;color:#94a3b8;line-height:1.8;margin-bottom:22px;text-align:center;max-width:300px}
.tut-dots{display:flex;justify-content:center;gap:7px;margin-bottom:22px}
.tut-dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.15);transition:all .3s}
.tut-dot.act{background:#c084fc;width:22px;border-radius:4px}
.tut-btn{padding:15px 48px;background:linear-gradient(135deg,#7c3aed,#4338ca);border:none;border-radius:12px;color:#fff;font-family:'Orbitron',sans-serif;font-size:13px;font-weight:700;cursor:pointer;letter-spacing:1px;transition:all .2s}
.tut-btn:active{transform:scale(.97)}
.tut-skip{display:block;margin-top:12px;font-size:11px;color:#475569;cursor:pointer;background:none;border:none;padding:4px}
/* ── WEEKLY CHAMPIONSHIP ── */
.weekly-card{margin-top:12px;background:linear-gradient(135deg,rgba(251,191,36,.08),rgba(124,58,237,.06));border:1px solid rgba(251,191,36,.28);border-radius:18px;padding:14px}
.wc-title{font-family:'Orbitron',sans-serif;font-size:10px;font-weight:700;color:#fbbf24;letter-spacing:2px;margin-bottom:5px}
.wc-body{font-size:11px;color:#94a3b8;line-height:1.6;margin-bottom:10px}
.wc-prog{display:flex;gap:5px}
.wc-day{flex:1;height:5px;border-radius:3px;background:rgba(255,255,255,.08);transition:background .4s}
.wc-day.done{background:linear-gradient(90deg,#fbbf24,#f59e0b)}
.wc-day.wc-today{box-shadow:0 0 0 2px rgba(192,132,252,.6)}
/* ── PRIVATE MATCH ── */
.pm-panel{position:fixed;inset:0;z-index:855;background:rgba(0,0,0,.95);backdrop-filter:blur(14px);display:none;flex-direction:column;align-items:center;padding:24px 16px;overflow-y:auto}
.pm-panel.on{display:flex}
.pm-head{font-family:'Orbitron',sans-serif;font-size:18px;font-weight:900;color:#fbbf24;letter-spacing:3px;margin-bottom:4px;text-align:center}
.pm-sub{font-size:11px;color:#64748b;letter-spacing:1px;margin-bottom:20px;text-align:center}
.pm-code-box{background:rgba(124,58,237,.12);border:2px solid rgba(124,58,237,.4);border-radius:16px;padding:16px;text-align:center;margin-bottom:16px;width:100%;max-width:320px}
.pm-code{font-family:'Orbitron',sans-serif;font-size:32px;font-weight:900;color:#c084fc;letter-spacing:8px}
.pm-code-label{font-size:9px;color:#64748b;letter-spacing:2px;margin-top:4px}
.pm-btn{width:100%;max-width:320px;padding:14px;border:none;border-radius:12px;color:#fff;font-family:'Orbitron',sans-serif;font-size:13px;font-weight:700;cursor:pointer;letter-spacing:1px;margin-bottom:8px;transition:all .2s}
.pm-btn:active{transform:scale(.97)}
.pm-join-input{width:100%;max-width:320px;background:rgba(255,255,255,.07);border:2px solid rgba(124,58,237,.3);border-radius:12px;padding:13px;color:#f1f5f9;font-size:16px;font-family:'Orbitron',sans-serif;text-align:center;letter-spacing:4px;outline:none;margin-bottom:8px}
.pm-join-input:focus{border-color:#a855f7}
.pm-section{font-size:10px;color:#64748b;letter-spacing:2px;text-transform:uppercase;margin:16px 0 8px;text-align:center}
.pm-rival-row{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.04);border:1px solid rgba(124,58,237,.15);border-radius:12px;padding:12px;margin-bottom:8px;width:100%;max-width:320px}
.pm-rival-score{font-family:'Orbitron',sans-serif;font-size:18px;font-weight:700;color:#fbbf24;margin-left:auto}
.pm-close{position:absolute;top:20px;right:16px;font-size:22px;color:rgba(255,255,255,.3);cursor:pointer}
/* ── RANK PERKS ── */
.perk-card{background:rgba(255,255,255,.03);border:1px solid rgba(124,58,237,.15);border-radius:12px;padding:12px;margin-bottom:8px}
.perk-rank{font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;margin-bottom:5px}
.perk-list{font-size:10px;color:#94a3b8;line-height:1.8}
</style>
</head>
<body>
<!-- MESH BG CANVAS -->
<canvas id="meshBg"></canvas>
<!-- LIVE FEED -->
<div id="liveFeed"></div>

<!-- ANNOUNCEMENT PANEL -->
<div class="ann-panel" id="annPanel">
  <div class="ann-header">
    <div class="ann-title">📣 ANNOUNCEMENTS</div>
    <div class="ann-close" onclick="closeAnn()">✕</div>
  </div>
  <div id="annItems"></div>
</div>

<!-- TUTORIAL PANEL -->
<div class="tut-panel" id="tutPanel">
  <div class="tut-icon" id="tutIcon">⚡</div>
  <div class="tut-head" id="tutHead">—</div>
  <div class="tut-body" id="tutBody">—</div>
  <div class="tut-dots" id="tutDots"></div>
  <button class="tut-btn" id="tutBtn" onclick="tutNext()">NEXT</button>
  <button class="tut-skip" onclick="closeTut()">Skip tutorial</button>
</div>

<!-- PRIVATE MATCH PANEL -->
<div class="pm-panel" id="pmPanel">
  <span class="pm-close" onclick="closePM()">✕</span>
  <div class="pm-head">⚔️ PRIVATE MATCH</div>
  <div class="pm-sub">Challenge a friend · Same score conditions · Best score wins</div>
  <div class="pm-code-box">
    <div class="pm-code" id="pmMyCode">——</div>
    <div class="pm-code-label">YOUR MATCH CODE · Share this with your rival</div>
  </div>
  <button class="pm-btn" style="background:linear-gradient(135deg,#7c3aed,#4338ca)" onclick="pmShareCode()">📤 Share My Code</button>
  <button class="pm-btn" style="background:rgba(255,255,255,.07);border:1px solid rgba(124,58,237,.2)" onclick="pmCopyCode()">📋 Copy Code</button>
  <div class="pm-section">— OR JOIN A MATCH —</div>
  <input class="pm-join-input" id="pmJoinInput" type="text" placeholder="ENTER CODE" maxlength="6" autocorrect="off" autocapitalize="characters" oninput="this.value=this.value.toUpperCase()"/>
  <button class="pm-btn" style="background:linear-gradient(135deg,#059669,#047857)" onclick="pmJoin()">JOIN MATCH ⚡</button>
  <div class="pm-section">— MY ACTIVE CHALLENGES —</div>
  <div id="pmRivals"></div>
</div>

<!-- LOADER -->
<div id="loader">
  <div class="ld-wrap">
    <div class="ld-logo-row">
      <svg class="nvm-svg" width="28" height="28" viewBox="0 0 60 60" fill="none">
        <defs><linearGradient id="ng" x1="0" y1="0" x2="60" y2="60"><stop offset="0%" stop-color="#c084fc"/><stop offset="50%" stop-color="#06b6d4"/><stop offset="100%" stop-color="#7c3aed"/></linearGradient></defs>
        <path d="M5 48V12l12 20V12" stroke="url(#ng)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M22 12l9 22 9-22" stroke="url(#ng)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M46 48V12l7 13 7-13v36" stroke="url(#ng)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="31" cy="36" r="2.8" fill="#06b6d4"/>
      </svg>
      <span style="font-family:'Orbitron',sans-serif;font-size:9px;background:linear-gradient(135deg,#c084fc,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:2px">NEW VERSION MOBILE</span>
    </div>
    <div class="ld-main">DARING</div>
    <div class="ld-bar"><div class="ld-fill"></div></div>
    <div class="ld-sub">Daily USDT Tournament</div>
  </div>
</div>

<!-- PROMO MODAL -->
<div class="overlay-modal" id="promoMod">
  <div class="modal-box">
    <div style="font-size:36px;margin-bottom:10px;animation:fireD 1s ease-in-out infinite alternate">🎁</div>
    <div style="font-family:'Orbitron',sans-serif;font-size:20px;font-weight:900;background:linear-gradient(180deg,#fde68a,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:6px">LAUNCH BONUS</div>
    <div style="font-size:12px;color:#94a3b8;line-height:1.65;margin-bottom:14px">Be an early player and compete for prizes from day one. The prize pool grows with every entry — invite friends and make it bigger!</div>
    <div style="font-family:'Orbitron',sans-serif;font-size:38px;font-weight:900;color:#fbbf24;text-shadow:0 0 20px rgba(251,191,36,.6);display:block;margin-bottom:4px">UP TO $100</div>
    <div style="font-size:10px;color:#34d399;margin-bottom:18px">🏆 Daily prize for top players</div>
    <button onclick="G.promoGo()" style="width:100%;padding:15px;background:linear-gradient(135deg,#7c3aed,#4338ca);border:none;border-radius:14px;color:#fff;font-family:'Orbitron',sans-serif;font-size:14px;font-weight:700;cursor:pointer;margin-bottom:10px;letter-spacing:1px">ENTER NOW ⚡</button>
    <button onclick="G.promoClose()" style="font-size:11px;color:#64748b;cursor:pointer;background:none;border:none;padding:4px">Maybe later</button>
  </div>
</div>

<!-- SETUP MODAL -->
<div class="overlay-modal" id="umod">
  <div class="ubox">
    <div class="ub-avpick" id="ubAvPick" onclick="G.pickAv()">
      <span id="ubEm" style="font-size:36px">🎮</span>
      <img id="ubImg"/>
    </div>
    <div style="font-size:8px;color:#64748b;margin-bottom:12px">Tap to upload your photo</div>
    <div style="font-family:'Orbitron',sans-serif;font-size:15px;font-weight:900;color:#c084fc;margin-bottom:6px">Set Up Your Profile</div>
    <div style="font-size:11px;color:#64748b;line-height:1.6;margin-bottom:14px">Your name shows on the leaderboard for everyone to see. Make it yours.</div>
    <input class="ub-in" id="unameIn" type="text" placeholder="YOUR NAME" maxlength="12" autocorrect="off" autocapitalize="characters"/>
    <div style="font-size:9px;color:#64748b;margin-bottom:14px">3–12 characters · Letters and numbers</div>
    <button class="ub-go" onclick="G.saveProfile()">LET'S GO ⚡</button>
  </div>
</div>

<!-- ══ HOME ══ -->
<div class="scr on" id="homeScr">
  <div class="topbar">
    <div class="wb" onclick="G.nav('wallet')">
      <div class="wdot off" id="wdot"></div>
      <div class="wt" id="waddr">Connecting…</div>
    </div>
    <div style="display:flex;align-items:center;gap:8px">
      <div onclick="openAnn()" style="position:relative;cursor:pointer;background:rgba(255,255,255,.07);border:1px solid rgba(124,58,237,.2);border-radius:20px;padding:7px 11px;font-size:14px" id="annBell">📣<span id="annBadge" style="position:absolute;top:-4px;right:-4px;background:#ef4444;border-radius:50%;width:14px;height:14px;font-size:8px;font-family:Orbitron,sans-serif;font-weight:700;color:#fff;display:flex;align-items:center;justify-content:center;display:none">!</span></div>
      <a class="sup-a" href="https://wa.me/2347064597527" target="_blank">💬 WhatsApp</a>
    </div>
  </div>
  <div class="logo-area">
    <div class="logo-glow" id="logoGlow"></div>
    <span class="logo-main" id="scrambleLogo">DARING</span>
    <span class="logo-sub">TOURNAMENT</span>
    <div style="font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;letter-spacing:3px;margin-top:6px;color:#fbbf24;transition:color .5s" id="eventNameTag">—</div>
  </div>
  <div class="home-sv">
    <!-- Prize Hero -->
    <div class="ph">
      <div class="ph-spin"></div>
      <div class="ph-lbl">🏆 Today's Prize Pool</div>
      <div class="ph-amt" id="prizeAmt">$0.00</div>
      <div class="ph-live"><div class="blink"></div>Growing live with every entry</div>
      <div class="ph-rule" id="phRule" style="color:#fbbf24">Need 10 players to activate prizes · Pool rolls over if not met</div>
      <div class="ph-stats">
        <div class="phs"><div class="phs-v" id="phPlayers">0</div><div class="phs-l">Players</div></div>
        <div class="phs"><div class="phs-v" id="phRank" style="color:#c084fc">—</div><div class="phs-l">Your Rank</div></div>
        <div class="phs"><div class="phs-v" id="phTop" style="color:#fbbf24">—</div><div class="phs-l">1st Prize</div></div>
      </div>
    </div>
    <!-- Timer -->
    <div class="timer-row">
      <div class="td"><div class="td-n" id="tH">00</div><div class="td-l">HRS</div></div>
      <div class="td"><div class="td-n" id="tM">00</div><div class="td-l">MIN</div></div>
      <div class="td"><div class="td-n" id="tS">00</div><div class="td-l">SEC</div></div>
    </div>
    <!-- Elite Challenge Banner -->
    <div id="eliteBanner" style="display:none;margin-top:12px;background:linear-gradient(135deg,rgba(251,191,36,.15),rgba(124,58,237,.1));border:1px solid rgba(251,191,36,.4);border-radius:16px;padding:14px;position:relative;overflow:hidden">
      <div style="font-family:'Orbitron',sans-serif;font-size:10px;font-weight:700;color:#fbbf24;letter-spacing:2px;margin-bottom:3px">👑 ELITE CHALLENGE</div>
      <div style="font-size:11px;color:#94a3b8;line-height:1.5" id="eliteRankTxt">Top 5 daily players are invited to a private Elite round — no extra fee, pure prestige.</div>
    </div>

    <!-- Pool Milestone -->
    <div id="milestoneBanner" style="display:none;margin-top:10px;background:rgba(52,211,153,.08);border:1px solid rgba(52,211,153,.3);border-radius:12px;padding:12px;text-align:center">
      <div style="font-size:12px;font-weight:700;color:#34d399" id="milestoneText">⚡ Milestone reached!</div>
    </div>

    <!-- Streak -->
    <div class="streak-card" id="streakCard" style="display:none">
      <div class="sf">🔥</div>
      <div style="font-family:'Orbitron',sans-serif;font-size:28px;font-weight:900;color:#fbbf24" id="strN">1</div>
      <div style="flex:1">
        <div style="font-size:12px;font-weight:700" id="strT">Day Streak</div>
        <div style="font-size:10px;color:#64748b;margin-top:2px" id="strS"></div>
        <div style="font-size:10px;color:#34d399;margin-top:2px" id="strB"></div>
      </div>
    </div>
    <!-- Enter -->
    <button class="enter-btn" id="enterBtn" onclick="G.enter()">⚡ ENTER TOURNAMENT</button>
    <div class="enter-note" id="enterNote">$0.09 USDT · Up to $100 for 1st · Up to $500 daily total</div>
    <div class="txbar" id="enterTx"></div>

    <!-- POWERUPS SHOP -->
    <div class="pu-section">
      <div class="pu-title">⚡ Power-Ups <span style="font-size:9px;color:#64748b;font-weight:400">(Buy before playing · One at a time)</span></div>
      <div class="pu-cards">
        <div class="pu-card" id="puCard_shield" onclick="G.buyPU('shield')">
          <span class="pu-owned-badge" id="puBadge_shield">✓</span>
          <span class="pu-icon">🛡️</span>
          <div class="pu-name">Shield</div>
          <div class="pu-desc">3 miss blocks next game</div>
          <div class="pu-price" id="puPrice_shield">$0.05</div>
        </div>
        <div class="pu-card" id="puCard_doubler" onclick="G.buyPU('doubler')">
          <span class="pu-owned-badge" id="puBadge_doubler">✓</span>
          <span class="pu-icon">⚡</span>
          <div class="pu-name">2× Points</div>
          <div class="pu-desc">Double score for 60s</div>
          <div class="pu-price" id="puPrice_doubler">$0.10</div>
        </div>
        <div class="pu-card" id="puCard_revive" onclick="G.buyPU('revive')">
          <span class="pu-owned-badge" id="puBadge_revive">✓</span>
          <span class="pu-icon">💊</span>
          <div class="pu-name">Revive</div>
          <div class="pu-desc">+30 seconds added</div>
          <div class="pu-price" id="puPrice_revive">$0.08</div>
        </div>
      </div>
    </div>

    <!-- How it works -->
    <div style="font-size:9px;color:#64748b;text-transform:uppercase;letter-spacing:2px;text-align:center;margin:16px 0 10px">How It Works</div>
    <div class="how-cards">
      <div class="hc"><span class="hc-i">⚡</span><div class="hc-t">Pay & Enter</div><div class="hc-d">$0.09 USDT · One entry per day</div></div>
      <div class="hc"><span class="hc-i">🎯</span><div class="hc-t">Read the Signal</div><div class="hc-d">Tap when the bar hits the zone · Build your streak</div></div>
      <div class="hc"><span class="hc-i">💰</span><div class="hc-t">Win USDT</div><div class="hc-d">Top 10 share pool · Prizes paid daily</div></div>
    </div>

    <!-- Weekly Championship -->
    <div class="weekly-card" id="weeklyCard">
      <div class="wc-title">🏆 WEEKLY CHAMPIONSHIP</div>
      <div class="wc-body" id="weeklyBody">Play 3+ days this week — your best scores automatically enter the weekly board. Top 3 on Sunday win from the weekly prize reserve.</div>
      <div class="wc-prog" id="weeklyProg"></div>
    </div>

    <!-- Invite -->
    <div class="invite-card">
      <div class="invite-title">🌍 Invite Friends — Grow the Prize Pool</div>
      <div class="invite-desc">Every friend you invite who enters adds to today's prize pool — directly making your potential winnings bigger. Share your personal link and track who joined.</div>
      <div class="invite-btns">
        <button class="ibtn ibtn-share" onclick="G.share()">📤 Share Link</button>
        <button class="ibtn ibtn-tg" onclick="G.shareTG()">📱 Telegram</button>
        <button class="ibtn ibtn-x" onclick="G.shareX()">𝕏</button>
      </div>
      <button onclick="openPM()" style="width:100%;margin-top:10px;padding:12px;background:linear-gradient(135deg,rgba(124,58,237,.2),rgba(6,182,212,.1));border:1px solid rgba(124,58,237,.35);border-radius:12px;color:#c084fc;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;cursor:pointer;letter-spacing:1px">⚔️ PRIVATE MATCH — Challenge a Friend</button>
    </div>

    <!-- NVM Footer with SVG logo -->
    <div class="nvm-footer">
      <svg class="nvm-svg" width="20" height="20" viewBox="0 0 60 60" fill="none">
        <path d="M5 48V12l12 20V12" stroke="url(#ng)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M22 12l9 22 9-22" stroke="url(#ng)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M46 48V12l7 13 7-13v36" stroke="url(#ng)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="31" cy="36" r="2.8" fill="#06b6d4"/>
      </svg>
      <span class="nvm-lbl">NEW VERSION MOBILE</span>
    </div>
  </div>
  <div class="bnav">
    <div class="bn act" id="bn-home" onclick="G.nav('home')"><span class="bn-i">🏠</span><span class="bn-l">Home</span></div>
    <div class="bn" id="bn-leaderboard" onclick="G.nav('leaderboard')"><span class="bn-i">🏆</span><span class="bn-l">Board</span></div>
    <div class="bn" id="bn-wallet" onclick="G.nav('wallet')"><span class="bn-i">👛</span><span class="bn-l">Wallet</span></div>
    <div class="bn" id="bn-more" onclick="G.nav('more')"><span class="bn-i">•••</span><span class="bn-l">More</span></div>
  </div>
</div>

<!-- ══ GAME ══ -->
<div class="scr" id="gameScr">
  <canvas id="gc"></canvas>
  <div class="ghud">
    <div class="hi"><div class="hv vio" id="hCombo">x1</div><div class="hl">Combo</div></div>
    <div class="hi"><div class="hv gold" id="hScore">0</div><div class="hl">Score</div></div>
    <div class="hi"><div class="hv cy" id="hTimer">3:00</div><div class="hl">Time</div></div>
  </div>
  <div class="mflash" id="mf"></div>
  <!-- POWERUP BUTTONS IN GAME -->
  <div class="pu-bar" id="puBar"></div>
  <div class="pu-active-label" id="puActiveLabel"></div>
  <div class="cdov" id="cdov">
    <div class="cd-hint">READ THE SIGNAL · TAP THE ZONE</div>
    <div id="cdEventLine" style="font-family:'Orbitron',sans-serif;font-size:11px;letter-spacing:3px;margin-bottom:4px;color:#fbbf24">—</div>
    <div id="cdNum" class="cd-n">3</div>
  </div>
</div>

<!-- ══ RESULT ══ -->
<div class="scr" id="resultScr">
  <div class="sv">
    <div class="r-crown" id="rCrown">🏅</div>
    <div class="r-lbl">ROUND COMPLETE</div>
    <div class="r-score" id="rScore">0</div>
    <div class="r-pb" id="rPB"></div>
    <div id="rCareerRank" style="font-size:11px;color:#64748b;margin-bottom:8px;letter-spacing:1px">—</div>
    <div class="rank-banner">
      <div class="rb-n" id="rRank">#—</div>
      <div class="rb-l">Leaderboard Position</div>
      <div class="rb-p" id="rPrize"></div>
    </div>
    <div class="rstats">
      <div class="rs"><div class="rs-v" id="rsPerfect">0</div><div class="rs-l">Perfect Hits</div></div>
      <div class="rs"><div class="rs-v" id="rsCombo">0x</div><div class="rs-l">Max Combo</div></div>
      <div class="rs"><div class="rs-v" id="rsAcc">0%</div><div class="rs-l">Accuracy</div></div>
      <div class="rs"><div class="rs-v" id="rsMult">1x</div><div class="rs-l">Peak Mult</div></div>
    </div>
    <div class="r-btns">
      <button class="rbtn rbtn-play" onclick="G.playAgain()">⚡ PLAY AGAIN</button>
      <button class="rbtn rbtn-home" onclick="G.nav('home')">🏠 Home</button>
    </div>
    <button onclick="G.shareResult()" style="width:100%;padding:13px;background:rgba(255,255,255,.07);border:1px solid rgba(124,58,237,.2);border-radius:13px;color:#f1f5f9;font-size:12px;font-weight:700;cursor:pointer;backdrop-filter:blur(12px)">📤 Share My Score</button>
  </div>
</div>

<!-- ══ LEADERBOARD ══ -->
<div class="scr" id="lbScr">
  <div class="lb-bd" onclick="G.nav('home')"></div>
  <div class="lb-sheet">
    <div class="lb-handle-row"><div class="lb-handle"></div></div>
    <div class="lb-scroll">
      <div class="lb-top-banner">
        <span style="font-size:20px;letter-spacing:4px;display:block;margin-bottom:4px;position:relative;z-index:1">⭐⭐⭐</span>
        <div style="font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;color:#fff;position:relative;z-index:1;margin-bottom:2px">🏆 TOP THE LEADERBOARD & GET</div>
        <div style="font-family:'Orbitron',sans-serif;font-size:40px;font-weight:900;color:#fbbf24;text-shadow:0 0 20px rgba(251,191,36,.6);position:relative;z-index:1;line-height:1">$100</div>
        <div style="font-size:10px;color:#34d399;position:relative;z-index:1;margin-top:4px">+ Share in up to $500 daily · Top 10 win · Auto-paid</div>
      </div>
      <div class="lb-tabs">
        <div class="lb-tab act" onclick="G.lbTab('today',this)">Today's</div>
        <div class="lb-tab" onclick="G.lbTab('yest',this)">Yesterday's</div>
        <div class="lb-tab" onclick="G.lbTab('alltime',this)">All-Time</div>
      </div>
      <button class="lb-play-pill" onclick="G.enter()">⚡ Play Now</button>
      <div class="lb-stats-row">
        <div class="lb-stat"><div class="lsv" id="lbCount">0</div><div class="lsl">Participants</div></div>
        <div class="lb-stat"><div class="lsv" id="lbPool" style="color:#fbbf24">$0.00</div><div class="lsl">Prize Pool</div></div>
        <div class="lb-stat"><div class="lsv" id="lbNeeded" style="color:#f59e0b">10</div><div class="lsl">Needed</div></div>
      </div>
      <div id="lbRows"></div>
      <div class="my-rank-strip" id="myRankStrip" style="display:none">
        <span style="font-size:11px" id="myRankTxt">Your position</span>
        <span style="font-family:'Orbitron',sans-serif;font-size:14px;font-weight:700;color:#c084fc" id="myRankVal">—</span>
      </div>
    </div>
  </div>
  <div class="bnav">
    <div class="bn" onclick="G.nav('home')"><span class="bn-i">🏠</span><span class="bn-l">Home</span></div>
    <div class="bn act" onclick="G.nav('leaderboard')"><span class="bn-i">🏆</span><span class="bn-l">Board</span></div>
    <div class="bn" onclick="G.nav('wallet')"><span class="bn-i">👛</span><span class="bn-l">Wallet</span></div>
    <div class="bn" onclick="G.nav('more')"><span class="bn-i">•••</span><span class="bn-l">More</span></div>
  </div>
</div>

<!-- ══ WALLET ══ -->
<div class="scr" id="walletScr">
  <div class="sv">
    <div class="wcard">
      <div class="wcard-spin"></div>
      <div class="wc-av" id="wcAv" onclick="G.pickAv()">
        <span id="wcEm" style="font-size:34px">🎮</span>
        <img id="wcImg"/>
      </div>
      <div class="wc-name" id="wcName">—</div>
      <div class="wc-uid" id="wcUid">——</div>
      <div class="wc-stats">
        <div class="wcs"><div class="wcs-v" style="color:#34d399" id="wcEarned">$0.00</div><div class="wcs-l">Total Earned</div></div>
        <div class="wcs"><div class="wcs-v" style="color:#06b6d4" id="wcBal">—</div><div class="wcs-l">USDT Balance</div></div>
        <div class="wcs"><div class="wcs-v" style="color:#c084fc" id="wcGames">0</div><div class="wcs-l">Games Played</div></div>
        <div class="wcs"><div class="wcs-v" style="color:#fbbf24" id="wcBest">0</div><div class="wcs-l">Best Score</div></div>
      </div>
    </div>
    <div class="w-actions">
      <button class="wa wa-r" onclick="G.redeemInfo()">💎 Redeem</button>
      <button class="wa wa-h" onclick="G.toggleHistory()">📋 History</button>
    </div>
    <div class="wnote">Prizes auto-distributed at midnight UTC to top 10 wallets. All transactions verifiable on <strong style="color:#34d399">celoscan.io</strong></div>
    <div class="pt-wrap">
      <div class="pt-hdr">🏆 Prize Split — When 10+ Players Enter</div>
      <div class="pt-r"><div class="pt-pos gg">🥇 1st</div><div class="pt-pct">25% of pool</div><div class="pt-ex">Up to $100+</div></div>
      <div class="pt-r"><div class="pt-pos ss">🥈 2nd</div><div class="pt-pct">18%</div><div class="pt-ex">Up to $72+</div></div>
      <div class="pt-r"><div class="pt-pos bb">🥉 3rd</div><div class="pt-pct">13%</div><div class="pt-ex">Up to $52+</div></div>
      <div class="pt-r"><div class="pt-pos mm">4th–5th</div><div class="pt-pct">9%/7%</div><div class="pt-ex">Up to $28+</div></div>
      <div class="pt-r"><div class="pt-pos mm">6th–10th</div><div class="pt-pct">4% each</div><div class="pt-ex">Up to $16+ ea</div></div>
      <div class="pt-r" style="border-top:1px solid rgba(168,85,247,.3);margin-top:6px;padding-top:8px"><div class="pt-pos mm" style="font-size:10px">Under 10 players</div><div class="pt-pct" style="font-size:10px">Pool rolls over to next day</div></div>
    </div>
    <div class="tx-wrap" id="txWrap"><div class="pt-hdr">📋 Transaction History</div><div id="txList"></div></div>

    <!-- Career Rank & Medals -->
    <div style="margin-top:14px">
      <div class="pt-hdr">🎖️ Your Rank & Medals</div>
      <div id="wcRankBadge" style="margin-bottom:12px;text-align:center"></div>
      <div id="medalsWrap"></div>
    </div>
  </div>
  <div class="bnav">
    <div class="bn" onclick="G.nav('home')"><span class="bn-i">🏠</span><span class="bn-l">Home</span></div>
    <div class="bn" onclick="G.nav('leaderboard')"><span class="bn-i">🏆</span><span class="bn-l">Board</span></div>
    <div class="bn act" onclick="G.nav('wallet')"><span class="bn-i">👛</span><span class="bn-l">Wallet</span></div>
    <div class="bn" onclick="G.nav('more')"><span class="bn-i">•••</span><span class="bn-l">More</span></div>
  </div>
</div>

<!-- ══ MORE ══ -->
<div class="scr" id="moreScr">
  <div class="sv">
    <div class="more-sec">
      <div class="more-sec-t">Gameplay Settings</div>
      <!-- SOUND ROW with visible ON/OFF label -->
      <div class="more-row" id="rowSound" onclick="G.tog('sound')">
        <div class="mrl">
          <span style="font-size:22px" id="iconSound">🔊</span>
          <div>
            <div style="font-size:13px;font-weight:600">Sound Effects</div>
            <div style="font-size:10px;color:#64748b;margin-top:2px" id="descSound">Tap sounds, countdown beeps, game music</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <span class="toggle-state" id="stateSound">ON</span>
          <div class="toggle on" id="togSound"></div>
        </div>
      </div>
      <!-- VIB ROW -->
      <div class="more-row" id="rowVib" onclick="G.tog('vib')">
        <div class="mrl">
          <span style="font-size:22px" id="iconVib">📳</span>
          <div>
            <div style="font-size:13px;font-weight:600">Vibration</div>
            <div style="font-size:10px;color:#64748b;margin-top:2px" id="descVib">Haptic feedback on hits and misses</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <span class="toggle-state" id="stateVib">ON</span>
          <div class="toggle on" id="togVib"></div>
        </div>
      </div>
      <!-- FX ROW -->
      <div class="more-row" id="rowFX" onclick="G.tog('fx')">
        <div class="mrl">
          <span style="font-size:22px" id="iconFX">✨</span>
          <div>
            <div style="font-size:13px;font-weight:600">Visual FX</div>
            <div style="font-size:10px;color:#64748b;margin-top:2px" id="descFX">Particle explosions and floating scores</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <span class="toggle-state" id="stateFX">ON</span>
          <div class="toggle on" id="togFX"></div>
        </div>
      </div>
    </div>
    <div class="more-sec">
      <div class="more-sec-t">Profile</div>
      <div class="more-row" onclick="G.changeProfile()"><div class="mrl"><span style="font-size:18px">✏️</span><span style="font-size:13px;font-weight:600">Edit Profile & Photo</span></div><span style="font-size:11px;color:#64748b" id="dispUname">—</span></div>
      <div class="more-row" onclick="G.copyWallet()"><div class="mrl"><span style="font-size:18px">📋</span><span style="font-size:13px;font-weight:600">Copy Wallet Address</span></div><span style="font-size:11px;color:#64748b">→</span></div>
      <div class="more-row" onclick="openTut()"><div class="mrl"><span style="font-size:18px">📖</span><span style="font-size:13px;font-weight:600">How To Play & Guide</span></div><span style="font-size:11px;color:#64748b">→</span></div>
      <div class="more-row" onclick="openAnn()"><div class="mrl"><span style="font-size:18px">📣</span><span style="font-size:13px;font-weight:600">Announcements & Events</span></div><span style="font-size:11px;color:#64748b">→</span></div>
      <div class="more-row" onclick="window.open('https://wa.me/2347064597527','_blank')"><div class="mrl"><span style="font-size:18px">💬</span><span style="font-size:13px;font-weight:600">WhatsApp Support</span></div><span style="font-size:11px;color:#64748b">→</span></div>
      <div class="more-row" onclick="window.open('https://celoscan.io','_blank')"><div class="mrl"><span style="font-size:18px">🔍</span><span style="font-size:13px;font-weight:600">Verify Transactions</span></div><span style="font-size:11px;color:#64748b">→</span></div>
    </div>

    <!-- Rank Perks -->
    <div class="more-sec">
      <div class="more-sec-t">Rank Perks</div>
      <div id="rankPerksWrap"></div>
    </div>
    <div class="more-sec">
      <div class="more-sec-t">About & Legal</div>
      <div id="faqWrap"></div>
    </div>

    <!-- DONATION -->
    <div class="donate-card">
      <div class="donate-title">⚡ Support Development</div>
      <div class="donate-desc">Daring Tournament is independently built and maintained. If you're enjoying it, your support helps us improve the game, grow prize pools, and keep the servers running.</div>
      <div class="donate-amounts" id="donateAmounts">
        <div class="da" onclick="selectDonate(this,'0.50')">$0.50</div>
        <div class="da" onclick="selectDonate(this,'1.00')">$1.00</div>
        <div class="da" onclick="selectDonate(this,'2.00')">$2.00</div>
        <div class="da" onclick="selectDonate(this,'5.00')">$5.00</div>
      </div>
      <button class="donate-btn" id="donateBtn" onclick="G.donate()">Send Support ⚡</button>
    </div>
    <!-- NVM Footer with SVG -->
    <div class="nvm-footer">
      <svg class="nvm-svg" width="20" height="20" viewBox="0 0 60 60" fill="none">
        <path d="M5 48V12l12 20V12" stroke="url(#ng)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M22 12l9 22 9-22" stroke="url(#ng)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M46 48V12l7 13 7-13v36" stroke="url(#ng)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="31" cy="36" r="2.8" fill="#06b6d4"/>
      </svg>
      <span class="nvm-lbl">NEW VERSION MOBILE</span>
    </div>
  </div>
  <div class="bnav">
    <div class="bn" onclick="G.nav('home')"><span class="bn-i">🏠</span><span class="bn-l">Home</span></div>
    <div class="bn" onclick="G.nav('leaderboard')"><span class="bn-i">🏆</span><span class="bn-l">Board</span></div>
    <div class="bn" onclick="G.nav('wallet')"><span class="bn-i">👛</span><span class="bn-l">Wallet</span></div>
    <div class="bn act" onclick="G.nav('more')"><span class="bn-i">•••</span><span class="bn-l">More</span></div>
  </div>
</div>

<input type="file" id="avInput" accept="image/*" style="display:none" onchange="G.handleAv(event)"/>

<script>
// ════════════════════════════════════════════════════
// DARING TOURNAMENT — FINAL PRODUCTION ENGINE
// Treasury: 0xc452a221D1df754FddF1eCbaFC083Fedb91402f6
// Creator: Muktar Oyewumi | New Version Mobile
// ════════════════════════════════════════════════════
var TREASURY="0xc452a221D1df754FddF1eCbaFC083Fedb91402f6";
var USDT="0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e";
var APP_URL="https://daring-tournament.vercel.app/index-orig.html";
var PRIZE_D=[.25,.18,.13,.09,.07,.04,.04,.04,.04,.08];
var GAME_S=180,MIN_PLY=10;
var EMOJIS=["🎮","🎯","⚡","🔥","💎","👑","🌟","🚀","💫","🎲"];

// POWERUP CONFIG — one at a time, single purchase
var PU_CFG={
  shield:{name:"Shield",icon:"🛡️",price:50000,usd:"$0.05",desc:"3 miss blocks"},
  doubler:{name:"2× Points",icon:"⚡",price:100000,usd:"$0.10",desc:"60s double score"},
  revive:{name:"Revive",icon:"💊",price:80000,usd:"$0.08",desc:"+30 seconds"}
};

// DEVICE ID
function getDID(){var k="dt6_did",v=localStorage.getItem(k);if(!v){v=btoa(Date.now().toString(36)+Math.random().toString(36)).slice(0,24);localStorage.setItem(k,v);}return v;}
var DID=getDID();

// STORAGE
function ls(k){try{return JSON.parse(localStorage.getItem(k));}catch(e){return null;}}
function ss(k,v){localStorage.setItem(k,JSON.stringify(v));}

var S=ls("dt6_s")||{gp:0,best:0,earned:0,streak:0,lastDay:"",entered:false,entryDate:"",username:"",avEm:"🎮",avData:null,settings:{sound:true,vib:true,fx:true},txs:[],walletAddr:null,promoSeen:false,pu:null};
var LB=ls("dt6_lb")||{today:[],yest:[],alltime:[]};
var POOL=ls("dt6_pool")||{total:0,n:0,date:"",rollover:0};
function saveS(){ss("dt6_s",S);}
function saveLB(){ss("dt6_lb",LB);}
function savePool(){ss("dt6_pool",POOL);}

// ── AUDIO ENGINE ─────────────────────────────────
var AC=null;
function initAudio(){try{if(!AC)AC=new(window.AudioContext||window.webkitAudioContext)();}catch(e){}}
function beep(f,d,t,v){
  if(!S.settings.sound||!AC)return;
  try{var o=AC.createOscillator(),g=AC.createGain();o.type=t||"sine";o.frequency.value=f;g.gain.setValueAtTime(v||.17,AC.currentTime);g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+d);o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+d);}catch(e){}
}
function snd(t){
  if(!AC&&S.settings.sound)initAudio();
  if(!AC)return;
  if(t==="hit")beep(660,.1,"sine",.16);
  else if(t==="perfect"){beep(880,.08,"sine",.2);setTimeout(function(){beep(1100,.14,"sine",.18);},70);}
  else if(t==="miss")beep(160,.15,"sawtooth",.12);
  else if(t==="cd")beep(440,.18,"sine",.2);
  else if(t==="go"){[523,659,784].forEach(function(f,i){setTimeout(function(){beep(f,.16,"sine",.18);},i*75)});}
  else if(t==="end"){[784,659,523,392].forEach(function(f,i){setTimeout(function(){beep(f,.2,"sine",.18);},i*90)});}
  else if(t==="pu"){beep(880,.05,"sine",.22);setTimeout(function(){beep(1100,.05,"sine",.22);},60);setTimeout(function(){beep(1320,.15,"sine",.22);},120);}
  else if(t==="pay"){beep(660,.08,"sine",.18);setTimeout(function(){beep(880,.18,"sine",.2);},80);}
  else if(t==="win"){[440,554,659,880].forEach(function(f,i){setTimeout(function(){beep(f,.25,"sine",.22);},i*80);});}
}

// ── GRADIENT MESH BG (like the screenshot) ───────
var mc=document.getElementById("meshBg"),mx=mc.getContext("2d");
var mW,mH,mBlobs=[];
function initMesh(){
  mW=mc.width=window.innerWidth;mH=mc.height=window.innerHeight;
  // Exactly like the screenshot: orange/red warm bottom-left, purple/magenta top-right
  mBlobs=[
    {x:.0,y:.85,r:.6,c0:"rgba(251,113,61,.22)",c1:"transparent",dx:.0002,dy:-.0001},
    {x:.85,y:.05,r:.55,c0:"rgba(168,85,247,.22)",c1:"transparent",dx:-.0002,dy:.0001},
    {x:.4,y:.4,r:.45,c0:"rgba(139,92,246,.1)",c1:"transparent",dx:.0001,dy:.0002},
    {x:.2,y:.6,r:.35,c0:"rgba(239,68,68,.08)",c1:"transparent",dx:.0002,dy:-.0002},
    {x:.7,y:.7,r:.3,c0:"rgba(6,182,212,.07)",c1:"transparent",dx:-.0001,dy:.0002},
    // Moving particles for dynamism
    {x:.5,y:.2,r:.2,c0:"rgba(251,191,36,.06)",c1:"transparent",dx:.0003,dy:.0001}
  ];
}
function meshLoop(){
  mx.clearRect(0,0,mW,mH);
  mx.fillStyle="#04010c";mx.fillRect(0,0,mW,mH);
  mBlobs.forEach(function(b){
    b.x+=b.dx;b.y+=b.dy;
    if(b.x<-.2||b.x>1.2)b.dx*=-1;if(b.y<-.2||b.y>1.2)b.dy*=-1;
    var g=mx.createRadialGradient(b.x*mW,b.y*mH,0,b.x*mW,b.y*mH,b.r*Math.max(mW,mH));
    g.addColorStop(0,b.c0);g.addColorStop(1,b.c1);
    mx.fillStyle=g;mx.beginPath();mx.arc(b.x*mW,b.y*mH,b.r*Math.max(mW,mH),0,6.28);mx.fill();
  });
  // Stars
  mx.globalAlpha=.4;
  requestAnimationFrame(meshLoop);
  mx.globalAlpha=1;
}

// ── WALLET ────────────────────────────────────────
var uAddr=S.walletAddr||null;
async function initWallet(){
  var dot=document.getElementById("wdot"),adEl=document.getElementById("waddr");
  if(S.walletAddr&&S.username){
    uAddr=S.walletAddr;
    adEl.textContent="@"+uAddr.slice(0,6)+"…"+uAddr.slice(-4);
    dot.className="wdot";refreshUI();
  }
  if(!window.ethereum){
    dot.className="wdot off";
    if(!S.username)adEl.textContent="Open in MiniPay";
    return;
  }
  try{
    var accs=await window.ethereum.request({method:"eth_requestAccounts",params:[]});
    if(!accs||!accs.length)throw new Error("none");
    uAddr=accs[0];S.walletAddr=uAddr;saveS();
    try{await window.ethereum.request({method:"wallet_switchEthereumChain",params:[{chainId:"0xa4ec"}]});}catch(e){}
    dot.className="wdot";
    adEl.textContent="@"+uAddr.slice(0,6)+"…"+uAddr.slice(-4);
    refreshUI();fetchBal();
    window.ethereum.on("accountsChanged",function(){location.reload();});
    window.ethereum.on("chainChanged",function(){location.reload();});
  }catch(e){dot.className="wdot off";}
}
async function fetchBal(){
  if(!uAddr||!window.ethereum)return;
  try{
    var d="0x70a08231"+uAddr.slice(2).padStart(64,"0");
    var r=await window.ethereum.request({method:"eth_call",params:[{to:USDT,data:d},"latest"]});
    var el=document.getElementById("wcBal");
    if(el)el.textContent="$"+(parseInt(r,16)/1e6).toFixed(2);
  }catch(e){}
}
// ── PAYMENT ENGINE ────────────────────────────────
async function doPayment(amtUnits){
  if(!uAddr||!window.ethereum)return{ok:false,err:"Open in MiniPay to pay"};
  try{
    var d="0x70a08231"+uAddr.slice(2).padStart(64,"0");
    var r=await window.ethereum.request({method:"eth_call",params:[{to:USDT,data:d},"latest"]});
    if(parseInt(r,16)<amtUnits)return{ok:false,err:"Insufficient USDT. Need $"+(amtUnits/1e6).toFixed(2)};
    var toH=TREASURY.slice(2).padStart(64,"0"),amH=amtUnits.toString(16).padStart(64,"0");
    var tx=await window.ethereum.request({method:"eth_sendTransaction",params:[{from:uAddr,to:USDT,data:"0xa9059cbb"+toH+amH,gas:"0x186A0"}]});
    var rc=null,n=0;
    while(!rc&&n<40){
      await new Promise(function(res){setTimeout(res,1500);});
      rc=await window.ethereum.request({method:"eth_getTransactionReceipt",params:[tx]}).catch(function(){return null;});
      n++;
    }
    if(rc&&rc.status==="0x1")return{ok:true,hash:tx};
    throw new Error("Transaction failed");
  }catch(e){
    var m=e.message||"Error";
    if(m.includes("reject")||m.includes("denied")||e.code===4001)return{ok:false,err:"Cancelled — no charge."};
    return{ok:false,err:m.slice(0,80)};
  }
}

// ── USER ID ────────────────────────────────────────
function getUserID(){var name=S.username||"Player";var sfx=uAddr?uAddr.slice(-3).toUpperCase():DID.slice(-3).toUpperCase();return name+"·"+sfx;}
function getUID(){return uAddr?uAddr.slice(-6).toUpperCase():S.username||("P"+DID.slice(-4));}

// ══════════════════════════════════════════════════
// GAME ENGINE
// ══════════════════════════════════════════════════
// ══════════════════════════════════════════════════
// DAILY EVENT SYSTEM
// ══════════════════════════════════════════════════
var DAILY_EVENTS=[
  {name:"THE OPENER",tag:"Standard Rules · All Welcome",color:"#7c3aed",accent:"#c084fc",bg:"#04010c",faultLimit:3,ghostMode:false,decoyBar:false,precisionOnly:false,speedBoost:1,rotatingMode:false},
  {name:"GHOST SIGNAL",tag:"The bar vanishes at its peak · Trust your instincts",color:"#1d4ed8",accent:"#60a5fa",bg:"#010814",faultLimit:3,ghostMode:true,decoyBar:false,precisionOnly:false,speedBoost:1,rotatingMode:false},
  {name:"THE RECKONING",tag:"2 faults only · Higher stakes · Bigger glory",color:"#dc2626",accent:"#f87171",bg:"#120101",faultLimit:2,ghostMode:false,decoyBar:false,precisionOnly:false,speedBoost:1,rotatingMode:false},
  {name:"DOUBLE EDGE",tag:"Two signals · One scores · One punishes",color:"#0891b2",accent:"#06b6d4",bg:"#010c12",faultLimit:3,ghostMode:false,decoyBar:true,precisionOnly:false,speedBoost:1,rotatingMode:false},
  {name:"THE GAUNTLET",tag:"Speed escalates fast · Only the sharpest survive",color:"#ea580c",accent:"#fb923c",bg:"#0f0500",faultLimit:3,ghostMode:false,decoyBar:false,precisionOnly:false,speedBoost:1.5,rotatingMode:false},
  {name:"PRECISION NIGHT",tag:"Outer zone removed · Bullseye or nothing",color:"#15803d",accent:"#4ade80",bg:"#010a04",faultLimit:3,ghostMode:false,decoyBar:false,precisionOnly:true,speedBoost:1,rotatingMode:false},
  {name:"THE FINAL",tag:"All mechanics rotate · The ultimate test of all",color:"#b45309",accent:"#fbbf24",bg:"#0a0600",faultLimit:3,ghostMode:false,decoyBar:false,precisionOnly:false,speedBoost:1,rotatingMode:true}
];
var todayEvent=DAILY_EVENTS[new Date().getDay()];

function applyDailyTheme(){
  var e=todayEvent;
  var sub=document.getElementById("eventNameTag");
  if(sub){sub.textContent=e.name;sub.style.color=e.accent;}
  var glow=document.getElementById("logoGlow");
  if(glow)glow.style.background="radial-gradient(ellipse at 50% 50%,"+e.color+"44 0%,transparent 65%)";
}

// ══════════════════════════════════════════════════
// CAREER RANK SYSTEM
// ══════════════════════════════════════════════════
var RANKS=[
  {label:"Recruit",min:0,icon:"🎯",color:"#94a3b8"},
  {label:"Contender",min:300,icon:"⚡",color:"#60a5fa"},
  {label:"Sharpshooter",min:1000,icon:"🔥",color:"#a78bfa"},
  {label:"Veteran",min:3000,icon:"💎",color:"#34d399"},
  {label:"Elite Darer",min:8000,icon:"👑",color:"#fbbf24"},
  {label:"Legend",min:20000,icon:"🌟",color:"#f87171"}
];
function getRank(pts){
  var r=RANKS[0];
  for(var i=0;i<RANKS.length;i++){if(pts>=RANKS[i].min)r=RANKS[i];}
  return r;
}
function getCareerPts(){return S.careerPts||0;}
function addCareerPts(n){S.careerPts=(S.careerPts||0)+n;saveS();}

// ══════════════════════════════════════════════════
// MEDALS SYSTEM
// ══════════════════════════════════════════════════
var MEDAL_DEFS=[
  {id:"surgical",icon:"🎯",name:"Surgical",desc:"5 consecutive bullseyes in one game"},
  {id:"untouchable",icon:"🛡️",name:"Untouchable",desc:"Finish with 0 faults"},
  {id:"streakmonarch",icon:"⚡",name:"Streak Monarch",desc:"Hold 2× multiplier for 10+ consecutive hits"},
  {id:"ghostslayer",icon:"👻",name:"Ghost Slayer",desc:"Score 200+ on Ghost Signal Tuesday"},
  {id:"dauntless",icon:"👑",name:"Dauntless",desc:"Top 3 on The Final (Sunday)"},
  {id:"ironwill",icon:"🔩",name:"Iron Will",desc:"Complete a full game on The Reckoning"}
];
function awardMedal(id){
  S.medals=S.medals||{};
  if(S.medals[id])return;
  S.medals[id]={date:new Date().toLocaleDateString(),event:todayEvent.name};
  saveS();
  var m=MEDAL_DEFS.find(function(x){return x.id===id;});
  if(m)setTimeout(function(){toast(m.icon+" Medal Earned: "+m.name,"success");},800);
}
function renderMedals(){
  var wrap=document.getElementById("medalsWrap");if(!wrap)return;
  S.medals=S.medals||{};
  wrap.innerHTML=MEDAL_DEFS.map(function(m){
    var earned=S.medals[m.id];
    return "<div class='medal-item"+(earned?"":" medal-locked")+"'><span class='medal-icon'>"+m.icon+"</span><div class='medal-info'><div class='medal-name'>"+m.name+"</div><div class='medal-desc'>"+(earned?"Earned "+S.medals[m.id].date:m.desc)+"</div></div></div>";
  }).join("");
}

// ══════════════════════════════════════════════════
// ELITE CHALLENGE — Top 5 Daily Invitational
// ══════════════════════════════════════════════════
function checkEliteChallenge(){
  var myUid=getUID();
  var myIdx=LB.today.findIndex(function(e){return e.uid===myUid;});
  var totalPlayers=LB.today.length;
  var ec=document.getElementById("eliteBanner");
  if(!ec)return;
  if(myIdx<0){ec.style.display="none";return;}
  var myRank=myIdx+1;
  var txt=document.getElementById("eliteRankTxt");
  if(totalPlayers>=5&&myRank<=5){
    ec.style.display="block";
    txt.textContent="👑 You're #"+myRank+" today — you qualify for the Elite Challenge!";
  }else if(totalPlayers>=5){
    ec.style.display="block";
    txt.textContent="You're #"+myRank+" of "+totalPlayers+". Top 5 qualify for the Elite Challenge.";
  }else if(totalPlayers>0){
    ec.style.display="block";
    txt.textContent="You're #"+myRank+" today. Elite Challenge unlocks when 5+ players have entered.";
  }else{
    ec.style.display="none";
  }
}

// ══════════════════════════════════════════════════
// SIGNAL STRIKE — GAME ENGINE
// ══════════════════════════════════════════════════
var cv=document.getElementById("gc"),gx=cv.getContext("2d");
var gRun=false,gSc=0,gFaults=0,gMaxFaults=3,gConsecBull=0,gMaxConsecBull=0;
var gStreakMult=1,gStreakCount=0,gStreakHoldCount=0,gMaxStreakHold=0;
var gPerfects=0,gHits=0,gTotalTaps=0,gTL=0,gFr=null,gTi=null,gSess="";
var gParts=[],gRipps=[],gFloats=[];
var gPU={shieldLeft:0,doublerOn:false,doublerTimer:0,reviveUsed:false};

// Signal bar state
var bar={
  x:0,dir:1,
  baseSpeed:0,speed:0,
  phase:0,      // sine phase for noise
  bombActive:false,bombTimer:0,bombWarned:false,
  ghostVisible:true,ghostTimer:0,
  decoy:{x:0,dir:-1,speed:0},
  rotModeTimer:0,rotModePhase:0
};
var tapLast=0;
var gNeb=[{x:.2,y:.15,r:.3,c:"rgba(124,58,237,.09)",dx:.0003,dy:.0002},{x:.8,y:.7,r:.36,c:"rgba(6,182,212,.06)",dx:-.0002,dy:.0003},{x:.5,y:.45,r:.2,c:"rgba(245,158,11,.05)",dx:.0002,dy:-.0002}];
var gBgS=[];
var edgeFlash={active:false,color:"#fbbf24",timer:0};
var screenShake={active:false,timer:0,mag:0};

function resizeG(){
  cv.width=window.innerWidth;cv.height=window.innerHeight;
  gBgS=[];
  for(var i=0;i<70;i++)gBgS.push({x:Math.random()*cv.width,y:Math.random()*cv.height,r:Math.random()*1.4+.3,t:Math.random()*6.28});
  bar.x=cv.width/2;
  bar.decoy.x=cv.width*0.25;
}
function genSess(){return btoa(DID+Date.now()+Math.random()).slice(0,24);}

function buildPUBar(){
  var b=document.getElementById("puBar");b.innerHTML="";
  if(!S.pu)return;
  var cfg=PU_CFG[S.pu];if(!cfg)return;
  var btn=document.createElement("div");
  btn.className="pu-btn "+S.pu+"-btn";btn.id="puGameBtn";
  btn.innerHTML=cfg.icon+"<span style='font-size:8px;color:#fff;display:block;margin-top:2px'>TAP</span>";
  btn.onclick=activatePU;
  b.appendChild(btn);
}

function activatePU(){
  if(!S.pu)return;
  var btn=document.getElementById("puGameBtn");
  var label=document.getElementById("puActiveLabel");
  if(S.pu==="shield"){
    gPU.shieldLeft=3;
    toast("🛡️ Shield Active — 3 faults blocked","info");snd("pu");
  }else if(S.pu==="doubler"){
    gPU.doublerOn=true;gPU.doublerTimer=60;
    toast("⚡ 2× Points Active for 60 seconds!","info");snd("pu");
    label.style.display="block";label.textContent="⚡ 2× ACTIVE: 60s";
    var iv=setInterval(function(){
      gPU.doublerTimer--;
      label.textContent="⚡ 2× ACTIVE: "+gPU.doublerTimer+"s";
      if(gPU.doublerTimer<=0){clearInterval(iv);gPU.doublerOn=false;label.style.display="none";}
    },1000);
  }else if(S.pu==="revive"){
    gPU.reviveUsed=false;
    toast("💊 Revive Ready — resets your faults once!","info");snd("pu");
  }
  S.pu=null;saveS();updatePUShop();
  if(btn)btn.classList.add("used");
}

function startGame(){
  if(AC&&AC.state==="suspended")AC.resume();
  showScr("gameScr");resizeG();
  var e=todayEvent;
  gMaxFaults=e.faultLimit;
  gSc=0;gFaults=0;gConsecBull=0;gMaxConsecBull=0;
  gStreakMult=1;gStreakCount=0;gStreakHoldCount=0;gMaxStreakHold=0;
  gPerfects=0;gHits=0;gTotalTaps=0;gTL=GAME_S;gRun=false;
  gPU={shieldLeft:0,doublerOn:false,doublerTimer:0,reviveUsed:false};
  gParts.length=0;gRipps.length=0;gFloats.length=0;
  edgeFlash.active=false;screenShake.active=false;
  document.getElementById("puActiveLabel").style.display="none";
  // Init bar
  bar.x=cv.width/2;bar.dir=1;
  bar.baseSpeed=(3.5+e.speedBoost*1.2);bar.speed=bar.baseSpeed;
  bar.phase=0;bar.bombActive=false;bar.bombTimer=0;bar.bombWarned=false;
  bar.ghostVisible=true;bar.ghostTimer=0;
  bar.decoy.x=cv.width*0.25;bar.decoy.dir=-1;bar.decoy.speed=bar.baseSpeed*0.85;
  bar.rotModeTimer=0;bar.rotModePhase=0;
  gSess=genSess();
  // Fault indicator
  updateFaultUI();
  buildPUBar();
  doCD();
}

function updateFaultUI(){
  var el=document.getElementById("hCombo");
  var dots="";
  for(var i=0;i<gMaxFaults;i++){dots+=(i<gFaults?"🔴":"🟢");}
  el.textContent=dots;
}

function doCD(){
  var ov=document.getElementById("cdov"),nEl=document.getElementById("cdNum");
  ov.style.display="flex";nEl.className="cd-n";nEl.textContent="3";
  // Show today's event name in countdown
  var evLine=document.getElementById("cdEventLine");
  if(evLine){evLine.textContent=todayEvent.name;evLine.style.color=todayEvent.accent;}
  var c=3,iv=setInterval(function(){
    c--;
    if(c>0){nEl.textContent=c;nEl.className="";void nEl.offsetWidth;nEl.className="cd-n";snd("cd");}
    else if(c===0){nEl.textContent="GO!";nEl.className="cd-go";snd("go");}
    else{clearInterval(iv);ov.style.display="none";beginG();}
  },900);
}

function beginG(){stopMusic();gRun=true;gLoop();gTi=setInterval(tickT,1000);scheduleBomb();}

function scheduleBomb(){
  if(!gRun)return;
  var delay=Math.floor(Math.random()*12000)+18000; // 18–30 seconds
  setTimeout(function(){
    if(!gRun)return;
    // Warn first
    bar.bombWarned=true;
    setTimeout(function(){
      if(!gRun)return;
      bar.bombWarned=false;
      bar.bombActive=true;bar.bombTimer=400; // ms of bomb active
      setTimeout(function(){
        bar.bombActive=false;bar.bombTimer=0;
        scheduleBomb(); // reschedule
      },400);
    },600);
  },delay);
}

function tickT(){
  gTL--;
  if(gPU.doublerOn&&gPU.doublerTimer>0){gPU.doublerTimer--;if(gPU.doublerTimer<=0){gPU.doublerOn=false;document.getElementById("puActiveLabel").style.display="none";}}
  var m=Math.floor(gTL/60),s=gTL%60;
  var el=document.getElementById("hTimer");
  el.textContent=m+":"+(s<10?"0":"")+s;
  el.className=gTL<=10?"hv danger":"hv cy";
  if(gTL<=0){
    if(!gPU.reviveUsed&&S.pu===null&&gPU.shieldLeft===0&&gPU.doublerOn===false){
      // Revive was purchased and not yet used — last check
    }
    endG();
  }
}

function gLoop(){
  if(!gRun){cancelAnimationFrame(gFr);return;}
  updG();drwG();
  gFr=requestAnimationFrame(gLoop);
}

function updG(){
  var e=todayEvent;
  var elapsed=GAME_S-gTL;
  // Speed ramps over time + event boost
  var speedRamp=1+elapsed*0.0025*e.speedBoost;
  // Sine noise for unpredictability
  bar.phase+=0.04;
  var noise=Math.sin(bar.phase*2.3)*0.4+Math.sin(bar.phase*0.7)*0.3;
  bar.speed=(bar.baseSpeed+noise)*speedRamp;

  // Rotating mode (Sunday)
  if(e.rotatingMode){
    bar.rotModeTimer++;
    if(bar.rotModeTimer>1800){ // every 30s at 60fps
      bar.rotModeTimer=0;bar.rotModePhase=(bar.rotModePhase+1)%DAILY_EVENTS.length;
      toast("⚡ Mode Shift!","info");
    }
    // Apply rotating modifier
    var rph=bar.rotModePhase;
    e={...todayEvent};
    if(rph===1)e.ghostMode=true;
    else if(rph===2)e.faultLimit=2;
    else if(rph===3)e.decoyBar=true;
    else if(rph===4)e.speedBoost=1.5;
    else if(rph===5)e.precisionOnly=true;
  }

  // Move bar
  bar.x+=bar.dir*bar.speed;
  var margin=cv.width*0.06;
  if(bar.x>=cv.width-margin){bar.x=cv.width-margin;bar.dir=-1;}
  if(bar.x<=margin){bar.x=margin;bar.dir=1;}

  // Ghost mode
  if(e.ghostMode){
    bar.ghostTimer++;
    var cycleLen=90;
    var peakStart=Math.floor(cycleLen*0.35),peakEnd=Math.floor(cycleLen*0.65);
    var pos=bar.ghostTimer%cycleLen;
    bar.ghostVisible=!(pos>=peakStart&&pos<=peakEnd);
  }else{bar.ghostVisible=true;}

  // Decoy bar
  if(e.decoyBar){
    bar.decoy.x+=bar.decoy.dir*bar.speed*0.88;
    if(bar.decoy.x>=cv.width-margin){bar.decoy.x=cv.width-margin;bar.decoy.dir=-1;}
    if(bar.decoy.x<=margin){bar.decoy.x=margin;bar.decoy.dir=1;}
  }

  // Bomb timer
  if(bar.bombTimer>0)bar.bombTimer=Math.max(0,bar.bombTimer-16);

  // Edge flash
  if(edgeFlash.active){edgeFlash.timer--;if(edgeFlash.timer<=0)edgeFlash.active=false;}

  // Screen shake
  if(screenShake.active){screenShake.timer--;if(screenShake.timer<=0)screenShake.active=false;}

  // Particles
  for(var i=gParts.length-1;i>=0;i--){var p=gParts[i];p.x+=p.vx;p.y+=p.vy;p.vy+=.09;p.life-=.03;if(p.life<=0)gParts.splice(i,1);}
  for(var i=gRipps.length-1;i>=0;i--){var r=gRipps[i];r.r+=4;r.a-=.055;if(r.a<=0)gRipps.splice(i,1);}
  for(var i=gFloats.length-1;i>=0;i--){var f=gFloats[i];f.y-=2;f.life-=.025;if(f.life<=0)gFloats.splice(i,1);}
  gNeb.forEach(function(n){n.x+=n.dx;n.y+=n.dy;if(n.x<0||n.x>1)n.dx*=-1;if(n.y<0||n.y>1)n.dy*=-1;});
  gBgS.forEach(function(s){s.t+=.008;});
}

function drwG(){
  var W=cv.width,H=cv.height;
  var e=todayEvent;
  var shakeX=screenShake.active?(Math.random()-.5)*screenShake.mag:0;
  var shakeY=screenShake.active?(Math.random()-.5)*screenShake.mag:0;
  gx.save();
  if(screenShake.active)gx.translate(shakeX,shakeY);

  // Background
  var bg=gx.createLinearGradient(0,0,0,H);
  bg.addColorStop(0,e.bg);
  bg.addColorStop(.6,e.bg.replace("#","#0a")||"#06020f");
  bg.addColorStop(1,"#000");
  gx.fillStyle=bg;gx.fillRect(0,0,W,H);

  // Nebula
  gNeb.forEach(function(n){var g=gx.createRadialGradient(n.x*W,n.y*H,0,n.x*W,n.y*H,n.r*W);g.addColorStop(0,n.c);g.addColorStop(1,"transparent");gx.fillStyle=g;gx.beginPath();gx.arc(n.x*W,n.y*H,n.r*W,0,6.28);gx.fill();});
  gBgS.forEach(function(s){var a=Math.max(0,.08+Math.sin(s.t)*.2);gx.globalAlpha=a;gx.fillStyle="#fff";gx.beginPath();gx.arc(s.x,s.y,s.r,0,6.28);gx.fill();});gx.globalAlpha=1;

  // Grid
  gx.strokeStyle="rgba(124,58,237,.03)";gx.lineWidth=1;
  for(var x2=0;x2<W;x2+=40){gx.beginPath();gx.moveTo(x2,60);gx.lineTo(x2,H);gx.stroke();}
  for(var y2=60;y2<H;y2+=40){gx.beginPath();gx.moveTo(0,y2);gx.lineTo(W,y2);gx.stroke();}

  // ── TARGET ZONE (center of screen) ──
  var zoneY=H*0.52;
  var zoneH=cv.height*0.34;
  var outerW=W*0.72,midW=W*0.38,bullW=W*0.14;

  if(!e.precisionOnly){
    // Outer zone — green
    gx.fillStyle="rgba(34,197,94,.06)";
    gx.strokeStyle="rgba(34,197,94,.18)";gx.lineWidth=1.5;
    gx.beginPath();gx.roundRect(W/2-outerW/2,zoneY-zoneH/2,outerW,zoneH,16);gx.fill();gx.stroke();
    gx.fillStyle="rgba(34,197,94,.07)";
    gx.font="bold 9px Orbitron,sans-serif";gx.textAlign="left";gx.textBaseline="middle";gx.fillStyle="#22c55e";
    gx.fillText("3 PTS",W/2-outerW/2+8,zoneY);
  }
  // Middle zone — amber
  gx.fillStyle="rgba(251,191,36,.08)";
  gx.strokeStyle="rgba(251,191,36,.28)";gx.lineWidth=1.5;
  gx.beginPath();gx.roundRect(W/2-midW/2,zoneY-zoneH/2+zoneH*0.18,midW,zoneH*0.64,12);gx.fill();gx.stroke();
  gx.fillStyle="#fbbf24";gx.font="bold 9px Orbitron,sans-serif";
  gx.fillText("8 PTS",W/2-midW/2+8,zoneY);
  // Bullseye — gold pulsing
  var bPulse=0.88+Math.sin(Date.now()/280)*0.12;
  gx.fillStyle="rgba(253,230,138,.13)";
  gx.strokeStyle="rgba(253,230,138,.7)";gx.lineWidth=2.5;
  gx.beginPath();gx.roundRect(W/2-bullW/2*bPulse,zoneY-zoneH/2+zoneH*0.32,bullW*bPulse,zoneH*0.36,8);gx.fill();gx.stroke();
  gx.fillStyle="#fde68a";gx.font="bold 10px Orbitron,sans-serif";gx.textAlign="center";
  gx.fillText("15",W/2,zoneY);gx.font="bold 8px Orbitron,sans-serif";gx.fillText("PERFECT",W/2,zoneY+14);
  gx.textAlign="left";

  // Bomb warning
  if(bar.bombWarned){
    gx.globalAlpha=0.5+Math.sin(Date.now()/100)*0.5;
    gx.fillStyle="#ef4444";gx.font="bold 11px Orbitron,sans-serif";
    gx.textAlign="center";gx.fillText("⚠ DON'T TAP ⚠",W/2,zoneY-zoneH/2-18);
    gx.globalAlpha=1;gx.textAlign="left";
  }

  // ── DECOY BAR ──
  if(e.decoyBar){
    var dx=bar.decoy.x;
    gx.save();
    gx.shadowColor="rgba(148,163,184,.6)";gx.shadowBlur=20;
    // Decoy trail
    gx.strokeStyle="rgba(148,163,184,.2)";gx.lineWidth=3;
    gx.beginPath();gx.moveTo(dx,zoneY-zoneH/2-10);gx.lineTo(dx,zoneY+zoneH/2+10);gx.stroke();
    // Decoy bar head
    var dg=gx.createLinearGradient(dx-6,0,dx+6,0);
    dg.addColorStop(0,"rgba(100,116,139,.1)");dg.addColorStop(.5,"rgba(148,163,184,.8)");dg.addColorStop(1,"rgba(100,116,139,.1)");
    gx.fillStyle=dg;gx.beginPath();gx.roundRect(dx-5,zoneY-zoneH/2-8,10,zoneH+16,5);gx.fill();
    // Label
    gx.fillStyle="rgba(148,163,184,.5)";gx.font="bold 8px Orbitron,sans-serif";gx.textAlign="center";
    gx.fillText("DECOY",dx,zoneY-zoneH/2-22);gx.textAlign="left";
    gx.restore();
  }

  // Ripple rings
  gRipps.forEach(function(r){gx.beginPath();gx.arc(r.x,r.y,r.r,0,6.28);gx.strokeStyle="rgba("+r.col+","+r.a+")";gx.lineWidth=2;gx.stroke();});

  // ── SIGNAL BAR ──
  var bx=bar.x;
  var isVisible=bar.ghostVisible;
  var isBomb=bar.bombActive;
  var barColor=isBomb?"#ef4444":e.accent||"#c084fc";
  var barGlow=isBomb?"rgba(239,68,68,.8)":"rgba(192,132,252,.7)";

  if(isVisible||isBomb){
    gx.save();
    // Trail
    var trailLen=10;
    for(var ti=trailLen;ti>0;ti--){
      var tx2=bx-bar.dir*ti*bar.speed*0.5;
      var ta=((trailLen-ti)/trailLen)*0.3;
      gx.globalAlpha=ta;
      gx.strokeStyle=barColor;gx.lineWidth=2;
      gx.beginPath();gx.moveTo(tx2,zoneY-zoneH/2-8);gx.lineTo(tx2,zoneY+zoneH/2+8);gx.stroke();
    }
    gx.globalAlpha=1;
    // Main bar glow
    gx.shadowColor=barGlow;gx.shadowBlur=isBomb?40:28;
    // Bar body gradient
    var bg2=gx.createLinearGradient(bx-8,0,bx+8,0);
    if(isBomb){bg2.addColorStop(0,"rgba(239,68,68,.05)");bg2.addColorStop(.5,"rgba(239,68,68,.95)");bg2.addColorStop(1,"rgba(239,68,68,.05)");}
    else{bg2.addColorStop(0,"rgba(192,132,252,.05)");bg2.addColorStop(.5,barColor);bg2.addColorStop(1,"rgba(192,132,252,.05)");}
    gx.fillStyle=bg2;
    gx.beginPath();gx.roundRect(bx-5,zoneY-zoneH/2-12,10,zoneH+24,5);gx.fill();
    // Top cap
    gx.fillStyle=isBomb?"#fff":"#fde68a";gx.beginPath();gx.arc(bx,zoneY-zoneH/2-12,6,0,6.28);gx.fill();
    // Bottom cap
    gx.beginPath();gx.arc(bx,zoneY+zoneH/2+12,6,0,6.28);gx.fill();
    gx.restore();

    // Bomb red flash overlay
    if(isBomb){
      gx.globalAlpha=0.12+Math.sin(Date.now()/50)*0.08;
      gx.fillStyle="#ef4444";gx.fillRect(0,0,W,H);
      gx.globalAlpha=1;
    }
  }else{
    // Ghost mode — very faint hint
    gx.save();
    gx.globalAlpha=0.06;
    gx.strokeStyle="#60a5fa";gx.lineWidth=2;
    gx.beginPath();gx.moveTo(bx,zoneY-zoneH/2);gx.lineTo(bx,zoneY+zoneH/2);gx.stroke();
    gx.restore();
  }

  // Particles
  gParts.forEach(function(p){gx.globalAlpha=p.life;gx.fillStyle=p.c;gx.beginPath();gx.arc(p.x,p.y,p.r*p.life,0,6.28);gx.fill();});gx.globalAlpha=1;

  // Float texts
  gFloats.forEach(function(f){
    gx.globalAlpha=f.life;
    gx.fillStyle=f.color;gx.font="bold "+(f.big?22:15)+"px Orbitron,sans-serif";
    gx.textAlign="center";gx.textBaseline="middle";
    gx.shadowColor=f.color;gx.shadowBlur=12;
    gx.fillText(f.text,f.x,f.y);
    gx.globalAlpha=1;gx.shadowBlur=0;gx.textAlign="left";
  });

  // Edge flash
  if(edgeFlash.active){
    var ef=edgeFlash.timer/12;
    gx.strokeStyle=edgeFlash.color;gx.lineWidth=8;gx.globalAlpha=ef*0.8;
    gx.strokeRect(4,64,W-8,H-68);
    gx.globalAlpha=1;
  }

  // Streak ring around bar position
  if(gStreakMult>=1.5){
    var ringColor=gStreakMult>=2?"#fbbf24":"#c084fc";
    var ringPulse=1+Math.sin(Date.now()/200)*0.08;
    gx.save();gx.globalAlpha=0.5*ringPulse;
    gx.strokeStyle=ringColor;gx.lineWidth=3;
    gx.shadowColor=ringColor;gx.shadowBlur=20;
    gx.strokeRect(4,64,W-8,H-68);
    gx.restore();
  }

  // Power-up rings
  if(gPU.shieldLeft>0){gx.strokeStyle="rgba(6,182,212,.5)";gx.lineWidth=2;gx.setLineDash([6,4]);gx.strokeRect(8,68,W-16,H-76);gx.setLineDash([]);}
  if(gPU.doublerOn){gx.strokeStyle="rgba(245,158,11,.35)";gx.lineWidth=2;gx.strokeRect(12,72,W-24,H-84);}

  // Multiplier badge
  if(gStreakMult>1||gPU.doublerOn){
    var ms=gPU.doublerOn?gStreakMult*2:gStreakMult;
    var mc=gPU.doublerOn?"#f59e0b":"#c084fc";
    gx.globalAlpha=.85;
    gx.fillStyle="rgba(0,0,0,.5)";gx.beginPath();if(gx.roundRect)gx.roundRect(W/2-44,62,88,24,6);else gx.rect(W/2-44,62,88,24);gx.fill();
    gx.fillStyle=mc;gx.font="bold 11px Orbitron,sans-serif";gx.textAlign="center";gx.textBaseline="middle";
    gx.fillText((gPU.doublerOn?"⚡":"×")+ms.toFixed(1)+" MULT",W/2,74);gx.globalAlpha=1;gx.textAlign="left";
  }

  // HUD score
  gx.strokeStyle="rgba(124,58,237,.1)";gx.lineWidth=1;gx.beginPath();gx.moveTo(0,58);gx.lineTo(W,58);gx.stroke();

  gx.restore(); // screen shake restore
}

function onTap(e){
  if(!gRun)return;
  var now=Date.now();if(now-tapLast<100)return;tapLast=now;
  var rect=cv.getBoundingClientRect(),tx,ty;
  if(e.touches){tx=e.touches[0].clientX-rect.left;ty=e.touches[0].clientY-rect.top;}
  else{tx=e.clientX-rect.left;ty=e.clientY-rect.top;}
  gTotalTaps++;

  var ev=todayEvent;
  var W=cv.width,H=cv.height;
  var zoneY=H*0.52,zoneH=H*0.34;
  var outerW=W*0.72,midW=W*0.38,bullW=W*0.14;
  var bx=bar.x;

  // Bomb punishment — highest priority
  if(bar.bombActive){
    triggerFault(tx,ty,"🔴 DON'T TAP THE RED SIGNAL!");
    return;
  }

  // Decoy bar hit check — fault
  if(ev.decoyBar){
    var dx=bar.decoy.x;
    var dHalf=8;
    if(Math.abs(tx-dx)<dHalf*3&&ty>zoneY-zoneH/2-20&&ty<zoneY+zoneH/2+20){
      triggerFault(tx,ty,"🪤 That's the Decoy!");
      return;
    }
  }

  // Check bar hit — bar must be visible (ghost mode)
  if(!bar.ghostVisible&&!bar.bombActive){
    // Ghost mode — still register hit but player must trust position
    // We still allow tapping, check position
  }

  // Determine score zone based on bar position relative to zones
  var barInOuter=bx>=W/2-outerW/2&&bx<=W/2+outerW/2;
  var barInMid=bx>=W/2-midW/2&&bx<=W/2+midW/2;
  var barInBull=bx>=W/2-bullW/2&&bx<=W/2+bullW/2;

  // Player must tap the bar area vertically (within zone height region)
  var inZoneVertically=ty>zoneY-zoneH/2-30&&ty<zoneY+zoneH/2+30;
  var nearBar=Math.abs(tx-bx)<cv.width*0.12;

  if(!nearBar||!inZoneVertically){
    // Total miss — not near bar
    if(ev.precisionOnly&&barInOuter&&!barInMid){
      triggerFault(tx,ty,"Miss — Outer zone removed today!");
    }else if(barInOuter){
      // Near bar but not near enough — treat as miss
      triggerFault(tx,ty,"Miss!");
    }else{
      triggerFault(tx,ty,"Miss!");
    }
    return;
  }

  // Hit registered — determine quality
  var pts=0,label="",isBull=false,isMid=false;
  if(barInBull&&!ev.precisionOnly){
    pts=15;label="PERFECT";isBull=true;
  }else if(barInBull&&ev.precisionOnly){
    pts=15;label="PERFECT";isBull=true;
  }else if(barInMid&&!ev.precisionOnly){
    pts=8;label="GOOD";isMid=true;
  }else if(barInOuter&&!ev.precisionOnly){
    pts=3;label="OK";
  }else if(ev.precisionOnly&&barInMid){
    pts=8;label="GOOD";isMid=true;
  }else{
    // Precision night — outer zone = miss
    triggerFault(tx,ty,"Outside the zone!");
    return;
  }

  // Apply multiplier
  gStreakCount++;
  if(isBull){
    gConsecBull++;
    if(gConsecBull>=6)gStreakMult=2.0;
    else if(gConsecBull>=3)gStreakMult=1.5;
    if(gStreakMult>=2){gStreakHoldCount++;gMaxStreakHold=Math.max(gMaxStreakHold,gStreakHoldCount);}
    gMaxConsecBull=Math.max(gMaxConsecBull,gConsecBull);
    gPerfects++;
    // Medal check
    if(gConsecBull>=5)awardMedal("surgical");
    if(gStreakMult>=2&&gMaxStreakHold>=10)awardMedal("streakmonarch");
  }else{
    gConsecBull=0;
    if(gStreakMult>1)gStreakMult=Math.max(1,gStreakMult-0.5);
    gStreakHoldCount=0;
  }

  var multNow=gPU.doublerOn?gStreakMult*2:gStreakMult;
  var finalPts=Math.round(pts*multNow);
  gSc+=finalPts;
  gHits++;

  document.getElementById("hScore").textContent=gSc.toLocaleString();
  updateFaultUI();

  // Visual feedback
  boom(bx,zoneY,isBull,false);
  gRipps.push({x:bx,y:zoneY,r:10,a:.85,col:isBull?"252,211,77":isMid?"251,191,36":"167,139,250"});
  gFloats.push({x:bx+(Math.random()-.5)*40,y:zoneY-20,text:(isBull?"✨ ":"")+"+"+finalPts+(isBull?" PERFECT":""),life:1,color:isBull?"#fde68a":isMid?"#fbbf24":"#c084fc",big:isBull});

  if(isBull){
    edgeFlash.active=true;edgeFlash.color="#fbbf24";edgeFlash.timer=12;
  }
  snd(isBull?"perfect":isMid?"hit":"hit");
  if(S.settings.vib&&navigator.vibrate)navigator.vibrate(isBull?[30,10,30]:[15]);
}

function triggerFault(tx,ty,msg){
  if(gPU.shieldLeft>0){
    gPU.shieldLeft--;
    gFloats.push({x:tx,y:ty-20,text:"🛡️ BLOCKED",life:1,color:"#06b6d4",big:true});
    snd("pu");
    if(gPU.shieldLeft===0)toast("🛡️ Shield depleted!","info");
    updateFaultUI();
    return;
  }
  gFaults++;
  gConsecBull=0;gStreakMult=1;gStreakCount=0;
  document.getElementById("mf").style.opacity="1";
  setTimeout(function(){document.getElementById("mf").style.opacity="0";},160);
  screenShake.active=true;screenShake.timer=8;screenShake.mag=10;
  edgeFlash.active=true;edgeFlash.color="#ef4444";edgeFlash.timer=16;
  gFloats.push({x:cv.width/2,y:cv.height*0.35,text:msg||"FAULT",life:1,color:"#ef4444",big:true});
  snd("miss");
  if(S.settings.vib&&navigator.vibrate)navigator.vibrate([60,30,60]);
  updateFaultUI();
  if(gFaults>=gMaxFaults){
    // Iron Will medal — completed Reckoning (even if faulted)
    if(new Date().getDay()===3)awardMedal("ironwill");
    setTimeout(endG,400);
  }
}

cv.addEventListener("touchstart",onTap,{passive:true});
cv.addEventListener("mousedown",onTap);

function boom(x,y,pf,gold){
  var cnt=pf?28:12;
  var cls=pf?["#fde68a","#fbbf24","#fff","#fcd34d"]:["#c084fc","#a855f7","#7c3aed","#ddd6fe"];
  for(var i=0;i<cnt;i++){var a=Math.random()*6.28,sp=Math.random()*6+2;gParts.push({x:x,y:y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-3,r:pf?5:3,c:cls[Math.floor(Math.random()*cls.length)],life:1});}
}

function fxFloat(x,y,text,big){
  if(!S.settings.fx)return;
  var el=document.createElement("div");el.className="fx";
  var rect=cv.getBoundingClientRect(),dx=(Math.random()-.5)*60+"px",dy="-"+(40+Math.random()*30)+"px";
  el.style.cssText="left:"+(x+rect.left-18)+"px;top:"+(y+rect.top-12)+"px;color:"+(big?"#fbbf24":"#c084fc")+";font-size:"+(big?20:14)+"px;text-shadow:0 0 10px currentColor;--dx:"+dx+";--dy:"+dy;
  el.textContent=text;document.body.appendChild(el);setTimeout(function(){el.remove();},950);
}
// gFloats in drwG also checks S.settings.fx for canvas floats
var _origDrwFloats=true; // floats inside canvas always render (they're lightweight); DOM floats respect setting above

function endG(){
  gRun=false;clearInterval(gTi);cancelAnimationFrame(gFr);snd("end");
  var isPB=gSc>S.best;if(isPB){S.best=gSc;snd("win");}
  S.gp++;
  var today=new Date().toDateString();
  var yest=new Date(Date.now()-86400000).toDateString();
  // Streak: increment only if first game of a new day (yesterday was last play)
  // If replaying same day — keep streak as is, don't increment again
  if(S.lastDay!==today){
    S.streak=(S.lastDay===yest)?(S.streak||0)+1:1;
  }
  S.lastDay=today;
  // Career pts
  addCareerPts(gSc);
  // Weekly championship recording
  recordWeeklyPlay(gSc);
  // Restart ambient music after game
  setTimeout(startMusic,1200);
  // Medals
  if(gFaults===0)awardMedal("untouchable");
  if(new Date().getDay()===2&&gSc>=200)awardMedal("ghostslayer");
  saveS();subScore(gSc);
  pmUpdateMyBest();
  showScr("resultScr");
  var rank=LB.today.filter(function(e){return e.s>gSc;}).length+1;
  var pool=effPool()*.65,hasP=POOL.n>=MIN_PLY;
  var rankObj=getRank(getCareerPts());
  document.getElementById("rScore").textContent=gSc.toLocaleString();
  document.getElementById("rCrown").textContent=isPB?"🌟":rank===1?"🏆":rank<=3?"🥇":"🏅";
  document.getElementById("rPB").textContent=isPB?"🌟 New Personal Best!":"Best: "+S.best.toLocaleString();
  document.getElementById("rsPerfect").textContent=gPerfects;
  document.getElementById("rsCombo").textContent=gMaxConsecBull+"× bullseye streak";
  document.getElementById("rsAcc").textContent=gTotalTaps>0?Math.floor(gHits/gTotalTaps*100)+"%":"0%";
  document.getElementById("rsMult").textContent=gStreakMult.toFixed(1)+"×";
  document.getElementById("rRank").textContent="#"+rank;
  document.getElementById("rPrize").textContent=hasP&&rank<=10?"Est. Prize: $"+(pool*PRIZE_D[Math.min(rank-1,9)]).toFixed(2):rank<=10?"Pool building — "+(MIN_PLY-POOL.n)+" more needed":"Keep climbing!";
  // Career rank on result
  var rankEl=document.getElementById("rCareerRank");
  if(rankEl)rankEl.textContent=rankObj.icon+" "+rankObj.label+" · "+getCareerPts().toLocaleString()+" career pts";
  // Session medals
  renderMedals();
  updateStreakUI();
  checkEliteChallenge();
  // Dauntless — Sunday top 3
  if(new Date().getDay()===0&&rank<=3)awardMedal("dauntless");
}

function subScore(sc){
  var uid=getUID(),name=S.username||uid;
  LB.today=LB.today.filter(function(e){return e.uid!==uid;});
  LB.today.push({uid:uid,name:name,s:sc,av:S.avEm,img:S.avData,addr:uAddr||"",ts:Date.now(),sess:gSess,did:DID,displayId:getUserID()});
  LB.today.sort(function(a,b){return b.s-a.s;});if(LB.today.length>200)LB.today.length=200;
  LB.alltime=LB.alltime.filter(function(e){return e.uid!==uid;});
  LB.alltime.push({uid:uid,name:name,s:sc,av:S.avEm,img:S.avData,addr:uAddr||"",ts:Date.now()});
  LB.alltime.sort(function(a,b){return b.s-a.s;});if(LB.alltime.length>200)LB.alltime.length=200;
  saveLB();
}

// ── POOL ──────────────────────────────────────────
function addPool(amt){
  var td=new Date().toDateString();
  if(POOL.date!==td){if(POOL.n<MIN_PLY&&POOL.total>0)POOL.rollover=(POOL.rollover||0)+POOL.total;POOL.total=0;POOL.n=0;POOL.date=td;}
  POOL.total+=amt;POOL.n++;savePool();updatePoolUI();
  // Live feed — real player entered
  if(S.username){
    triggerLiveFeed(S.username,S.avEm,S.avData,"just entered the tournament");
  }
}
function effPool(){var td=new Date().toDateString();return(POOL.date===td?POOL.total:0)+(POOL.rollover||0);}

function updatePoolUI(){
  var td=new Date().toDateString(),n=POOL.date===td?POOL.n:0,pp=effPool()*.65,top=pp*PRIZE_D[0];
  // Animated pool counter with drop-shadow flash (preserves gradient text)
  var el=document.getElementById("prizeAmt");
  var oldVal=parseFloat((el.textContent||"0").replace("$",""))||0;
  var newVal=pp>0?pp:0;
  if(Math.abs(newVal-oldVal)>0.001){
    var steps=24,step=0,diff=newVal-oldVal;
    el.style.filter="drop-shadow(0 0 18px #fbbf24)";
    var iv=setInterval(function(){
      step++;
      el.textContent="$"+(oldVal+diff*(step/steps)).toFixed(2);
      if(step>=steps){
        clearInterval(iv);
        el.textContent="$"+newVal.toFixed(2);
        setTimeout(function(){el.style.filter="";},600);
      }
    },50);
  }else{
    el.textContent="$"+newVal.toFixed(2);
  }
  document.getElementById("phPlayers").textContent=n;
  document.getElementById("phTop").textContent=n>=MIN_PLY&&top>0?"$"+top.toFixed(2):"—";
  var needed=Math.max(0,MIN_PLY-n);
  var rule=n>=MIN_PLY?"✅ Prizes ACTIVE — Top 10 win today!":"Need "+needed+" more players · Pool rolls over if not met";
  document.getElementById("phRule").textContent=rule;
  document.getElementById("phRule").style.color=n>=MIN_PLY?"#34d399":"#fbbf24";
  document.getElementById("lbPool").textContent="$"+(pp>0?pp.toFixed(2):"0.00");
  document.getElementById("lbCount").textContent=n;
  document.getElementById("lbNeeded").textContent=needed>0?needed:"✅";
  var myUid=getUID(),myIdx=LB.today.findIndex(function(e){return e.uid===myUid;});
  document.getElementById("phRank").textContent=myIdx>=0?"#"+(myIdx+1):"—";
  // Milestone banners
  var mb=document.getElementById("milestoneBanner"),mt=document.getElementById("milestoneText");
  if(mb&&mt){
    if(n>=100){mb.style.display="block";mt.textContent="👑 100 Players! Top prize now $"+top.toFixed(2);}
    else if(n>=50){mb.style.display="block";mt.textContent="⚡ 50 Players! Prize pool is live and growing!";}
    else if(n>=25){mb.style.display="block";mt.textContent="🔥 25 Players have entered today!";}
    else if(n>=10){mb.style.display="block";mt.textContent="✅ Prizes are now ACTIVE — Top 10 win!";}
    else mb.style.display="none";
  }
  checkEliteChallenge();
}

// POWERUP SHOP STATE
function updatePUShop(){
  Object.keys(PU_CFG).forEach(function(key){
    var card=document.getElementById("puCard_"+key);
    var badge=document.getElementById("puBadge_"+key);
    var priceEl=document.getElementById("puPrice_"+key);
    if(!card)return;
    var owned=S.pu===key;
    card.classList.toggle("owned",owned);
    badge.style.display=owned?"flex":"none";
    if(owned){
      priceEl.textContent="✓ READY";priceEl.style.color="#10b981";
      card.style.cursor="default";
    }else{
      priceEl.textContent=PU_CFG[key].usd;priceEl.style.color="#34d399";
      card.style.cursor="pointer";
    }
  });
}

// ── LB RENDER ─────────────────────────────────────
var lbKey="today";
function renderLB(){
  var data=LB[lbKey]||[],myUid=getUID();
  var pp=effPool()*.65,n=POOL.date===new Date().toDateString()?POOL.n:0;
  var medals=["🥇","🥈","🥉"];
  var myIdx=data.findIndex(function(e){return e.uid===myUid;});
  // Rows to show: top 10 always, plus player's row if outside top 10
  document.getElementById("lbRows").innerHTML=data.slice(0,10).map(function(e,i){
    var isMe=e.uid===myUid,r=i+1;
    var isNearMe=myIdx>=0&&Math.abs(i-myIdx)<=2&&!isMe;
    var cls="lb-row"+(r===1?" r1":r===2?" r2":r===3?" r3":isMe?" me":isNearMe?" near":"");
    var rnk=r<=3?"<span style='font-size:18px'>"+medals[r-1]+"</span>":"<span style='color:#64748b;font-size:12px'>#"+r+"</span>";
    var prz=lbKey==="today"&&n>=MIN_PLY&&pp>0?"$"+(pp*PRIZE_D[i]).toFixed(2):"—";
    var dispName=e.displayId||e.name;
    var avH=e.img?"<img src='"+e.img+"' style='width:100%;height:100%;object-fit:cover'/>":"<span style='font-size:22px'>"+(e.av||"🎮")+"</span>";
    // Career rank badge for player
    var rankBadge="";
    if(isMe){
      var myR=getRank(getCareerPts());
      rankBadge="<span style='font-size:8px;color:"+myR.color+";margin-left:4px'>"+myR.icon+"</span>";
    }
    return "<div class='"+cls+"' style='animation-delay:"+(i*.04)+"s'>"+
      "<div class='lb-rn'>"+rnk+"</div>"+
      "<div class='lb-av'>"+avH+"</div>"+
      "<div class='lb-info'>"+
        "<div class='lb-name'>"+dispName+rankBadge+(isMe?"<span class='you-badge'>YOU</span>":"")+"</div>"+
        "<div class='lb-pts'>"+e.s.toLocaleString()+" pts</div>"+
      "</div>"+
      "<div style='text-align:right'>"+
        "<div class='lb-prize-v'>"+prz+"</div>"+
        "<div class='lb-prize-l'>prize</div>"+
      "</div>"+
    "</div>";
  }).join("")||"<div style='text-align:center;padding:24px;color:#64748b;font-size:13px'>No players yet — be first to enter!</div>";
  // Player strip if outside top 10
  var strip=document.getElementById("myRankStrip");
  if(myIdx>=10){
    strip.style.display="flex";
    document.getElementById("myRankTxt").textContent="You're #"+(myIdx+1)+" — push to top 10!";
    document.getElementById("myRankVal").textContent=data[myIdx].s.toLocaleString()+" pts";
  }else{
    strip.style.display="none";
  }
}

// ── CLOCK ─────────────────────────────────────────
function tickClock(){
  var now=new Date(),mid=new Date(now);mid.setUTCHours(24,0,0,0);
  var d=Math.max(0,Math.floor((mid-now)/1000)),h=Math.floor(d/3600),m=Math.floor(d%3600/60),s=d%60;
  var p=function(v){return v<10?"0"+v:v;};
  document.getElementById("tH").textContent=p(h);document.getElementById("tM").textContent=p(m);document.getElementById("tS").textContent=p(s);
  ["tH","tM","tS"].forEach(function(id){document.getElementById(id).closest(".td").classList.toggle("hot",d<3600);});
}

// ── SCRAMBLE ──────────────────────────────────────
function scramble(el,target){
  var chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$!",iter=0;
  var iv=setInterval(function(){el.textContent=target.split("").map(function(c,i){return i<iter?c:chars[Math.floor(Math.random()*chars.length)];}).join("");iter+=.4;if(iter>=target.length)clearInterval(iv);},45);
}

// ── TOAST ─────────────────────────────────────────
function toast(msg,type){
  var t=document.createElement("div");t.className="toast-el "+(type||"info");
  t.innerHTML="<span class='toast-txt'>"+msg+"</span>";
  document.body.appendChild(t);setTimeout(function(){t.remove();},2600);
}

// ── AVATAR ────────────────────────────────────────
function handleAv(evt){
  var f=evt.target.files[0];if(!f)return;
  var rd=new FileReader();
  rd.onload=function(e){S.avData=e.target.result;S.avEm="🎮";saveS();updateAvAll(S.avData);toast("✅ Profile photo updated!","success");};
  rd.readAsDataURL(f);evt.target.value="";
}
function updateAvAll(data){
  ["ubImg","wcImg"].forEach(function(id){var img=document.getElementById(id);if(img){img.src=data||"";img.style.display=data?"block":"none";}});
  ["ubEm","wcEm"].forEach(function(id){var em=document.getElementById(id);if(em)em.style.display=data?"none":"block";});
}

// ── REFRESH UI ────────────────────────────────────
function refreshUI(){
  var name=S.username||"—";
  document.getElementById("wcName").textContent=name;
  document.getElementById("wcUid").textContent=getUserID();
  document.getElementById("wcEarned").textContent="$"+(S.earned||0).toFixed(2);
  document.getElementById("wcGames").textContent=S.gp||0;
  document.getElementById("wcBest").textContent=(S.best||0).toLocaleString();
  document.getElementById("dispUname").textContent=name;
  if(S.avData)updateAvAll(S.avData);
  updatePUShop();
  // Career rank badge on wallet
  var rb=document.getElementById("wcRankBadge");
  if(rb){
    var r=getRank(getCareerPts());
    rb.innerHTML="<span class='rank-badge' style='color:"+r.color+";border-color:"+r.color+"44'>"+r.icon+" "+r.label+" · "+getCareerPts().toLocaleString()+" pts</span>";
  }
  renderMedals();
}

function updateStreakUI(){
  var sc=document.getElementById("streakCard");
  if(S.streak>0){
    sc.style.display="flex";document.getElementById("strN").textContent=S.streak;
    document.getElementById("strT").textContent=S.streak+" Day Streak";
    var msgs=["Play daily!","2 days 🔥","3 in a row!","4 days!","5 days elite!","6 days!","7 days FREE entry! 🎁","Week 2!","9 days!","10 days LEGEND!"];
    document.getElementById("strS").textContent=msgs[Math.min(S.streak-1,msgs.length-1)];
    document.getElementById("strB").textContent=S.streak>=7?"🎁 Day 7: next entry free!":S.streak>=5?"🔓 "+(7-S.streak)+" more for free entry":"";
  }else sc.style.display="none";
}

// ── SETTINGS TOGGLE (with visual + physical feedback) ──
function updateSettingsUI(){
  ["sound","vib","fx"].forEach(function(k){
    var key={sound:"Sound",vib:"Vib",fx:"FX"}[k];
    var tog=document.getElementById("tog"+key);
    var stateEl=document.getElementById("state"+key);
    var on=S.settings[k];
    if(tog){tog.classList.toggle("on",on);}
    if(stateEl){stateEl.textContent=on?"ON":"OFF";stateEl.style.color=on?"#10b981":"#64748b";}
  });
}

// ── FAQ ───────────────────────────────────────────
var FAQS=[
  ["How does the game work?","A glowing signal bar sweeps left and right across the screen. Tap when the bar is inside a scoring zone — Outer (3pts), Middle (8pts), or Bullseye (15pts). Three faults end your game early. Watch for red bomb flashes — tapping during one costs you a fault. Build consecutive bullseyes to activate a score multiplier up to 2×."],
  ["How do prizes work?","Top 10 players on the daily leaderboard share 65% of all entry fees. Prizes are distributed manually at midnight UTC to each winner's connected MiniPay wallet. Every transaction is verifiable on celoscan.io."],
  ["What if fewer than 10 players enter?","The entire pool rolls over to the next day, making tomorrow's prize bigger. Your entry is never wasted — it always contributes to a future prize pool."],
  ["What are Power-Ups?","Buy one power-up before entering: Shield (absorbs 3 faults), 2× Doubler (adds 50% to all points for 30 seconds), or Revive (resets your fault count once mid-game). Only one at a time. They activate in-game via a tap button."],
  ["What are Daily Events?","Every day has a unique mechanic — Ghost Signal hides the bar briefly, The Reckoning drops your fault limit to 2, Double Edge adds a dangerous decoy bar, The Gauntlet accelerates speed faster than normal, Precision Night removes the outer zone entirely, The Final rotates all mechanics. Check Announcements daily."],
  ["About Daring Tournament","Skill-based daily competition built for MiniPay on Celo. Creator: Muktar Oyewumi — New Version Mobile. Not affiliated with Celo Foundation or Opera MiniPay."],
];
document.getElementById("faqWrap").innerHTML=FAQS.map(function(f,i){
  return "<div><div class='faq-q' onclick='G.faq("+i+")'><span>"+f[0]+"</span><span id='fqa"+i+"'>+</span></div><div class='faq-a' id='fqb"+i+"'>"+f[1]+"</div></div>";
}).join("");

// ══════════════════════════════════════════════════
// G — CONTROLLER
// ══════════════════════════════════════════════════
function showScr(id){document.querySelectorAll(".scr").forEach(function(s){s.classList.remove("on");});document.getElementById(id).classList.add("on");}

var G={
  nav:function(tab){
    var map={home:"homeScr",leaderboard:"lbScr",wallet:"walletScr",more:"moreScr"};
    showScr(map[tab]);
    ["home","leaderboard","wallet","more"].forEach(function(k){var el=document.getElementById("bn-"+k);if(el)el.classList.toggle("act",k===tab);});
    if(tab==="leaderboard"){renderLB();updatePoolUI();}
    if(tab==="wallet"){refreshUI();fetchBal();}
    if(tab==="home"){updatePoolUI();updateStreakUI();}
  },

  enter:async function(){
    if(AC&&AC.state==="suspended")AC.resume();
    var today=new Date().toDateString();
    if(S.entered&&S.entryDate===today){startGame();return;}
    if(!S.username){document.getElementById("umod").classList.add("on");document.getElementById("unameIn").focus();return;}
    var btn=document.getElementById("enterBtn"),bar=document.getElementById("enterTx");
    var setBar=function(c,m){bar.className="txbar on "+c;bar.textContent=m;};
    btn.disabled=true;btn.innerHTML='<span class="spin"></span>Processing entry fee…';
    var res=await doPayment(90000);
    if(res.ok){
      S.entered=true;S.entryDate=today;S.gp++;
      S.txs=S.txs||[];S.txs.unshift({type:"Tournament Entry",amount:"-$0.09 USDT",hash:res.hash,date:new Date().toLocaleString()});
      saveS();addPool(0.09);snd("pay");
      setBar("ok","✅ Entry confirmed! Get your power-ups if you want, then start.");
      btn.disabled=false;btn.textContent="▶ START GAME";
      btn.onclick=function(){bar.className="txbar";startGame();btn.textContent="⚡ ENTER TOURNAMENT";btn.onclick=function(){G.enter();};};
    }else{btn.disabled=false;btn.textContent="⚡ ENTER TOURNAMENT";setBar("e",res.err);}
  },

  saveProfile:function(){
    var v=document.getElementById("unameIn").value.trim().replace(/[^a-zA-Z0-9]/g,"");
    if(v.length<3||v.length>12){toast("⚠️ 3–12 letters & numbers only","warn");return;}
    S.username=v;saveS();document.getElementById("umod").classList.remove("on");refreshUI();
    toast("🎮 Welcome, "+v+"! Ready to compete?","success");
    setTimeout(function(){G.enter();},500);
  },

  buyPU:async function(key){
    if(!S.username){document.getElementById("umod").classList.add("on");return;}
    if(S.pu){toast("⚠️ You already own a "+PU_CFG[S.pu].name+". Use it first!","warn");return;}
    var cfg=PU_CFG[key];
    var card=document.getElementById("puCard_"+key);
    if(card)card.classList.add("buying");
    toast("⏳ Paying "+cfg.usd+" for "+cfg.name+"…","info");
    var res=await doPayment(cfg.price);
    if(card)card.classList.remove("buying");
    if(res.ok){
      S.pu=key;S.txs=S.txs||[];
      S.txs.unshift({type:"Power-Up: "+cfg.name,amount:"-"+cfg.usd+" USDT",hash:res.hash,date:new Date().toLocaleString()});
      saveS();updatePUShop();snd("pu");
      toast("✅ "+cfg.icon+" "+cfg.name+" purchased! Tap it in-game to activate.","success");
    }else{toast("❌ "+res.err,"warn");}
  },

  playAgain:function(){var td=new Date().toDateString();if(S.entered&&S.entryDate===td)startGame();else{G.nav("home");setTimeout(function(){G.enter();},300);}},

  lbTab:function(key,el){lbKey=key;document.querySelectorAll(".lb-tab").forEach(function(t){t.classList.remove("act");});el.classList.add("act");renderLB();},

  redeemInfo:function(){
    var n=POOL.date===new Date().toDateString()?POOL.n:0;
    if(n<MIN_PLY)toast("ℹ️ Prizes activate at "+MIN_PLY+" players. Pool rolls over until then.","info");
    else toast("💎 Top 10 prizes are sent after midnight UTC.","info");
  },

  toggleHistory:function(){
    var w=document.getElementById("txWrap");w.style.display=(w.style.display==="none"||!w.style.display)?"block":"none";
    document.getElementById("txList").innerHTML=(S.txs||[]).slice(0,20).map(function(t){
      return "<div class='tx-i'><div><div style='font-size:12px;font-weight:600'>"+t.type+"</div><div style='font-size:10px;color:#64748b'>"+t.date+"</div></div><div style='font-size:13px;font-weight:700;color:"+(t.amount.startsWith("+")?"#34d399":"#ef4444")+"'>"+t.amount+"</div></div>";
    }).join("")||"<div style='color:#64748b;font-size:12px;padding:12px 0'>No transactions yet.</div>";
  },

  tog:function(key){
    S.settings[key]=!S.settings[key];saveS();
    updateSettingsUI();
    var on=S.settings[key];
    if(key==="sound"){
      if(on){initAudio();setTimeout(function(){snd("hit");setTimeout(function(){snd("perfect");},200);},100);}
      // snd() checks S.settings.sound internally — toggle takes effect immediately
      var ic=document.getElementById("iconSound");if(ic)ic.textContent=on?"🔊":"🔇";
      toast(on?"🔊 Sound ON — active in-game immediately":"🔇 Sound OFF — silence during gameplay","info");
    }else if(key==="vib"){
      if(on&&navigator.vibrate)navigator.vibrate([50,30,80,30,50]);
      // navigator.vibrate calls in game check S.settings.vib — takes effect immediately
      var ic2=document.getElementById("iconVib");if(ic2)ic2.textContent=on?"📳":"📴";
      toast(on?"📳 Vibration ON — feel every hit":"📴 Vibration OFF","info");
    }else if(key==="fx"){
      if(on){for(var i=0;i<8;i++){(function(i2){setTimeout(function(){
        var x=window.innerWidth/2+(Math.random()-.5)*120,y=window.innerHeight/2+(Math.random()-.5)*60;
        var el=document.createElement("div");el.className="fx";
        var dx=(Math.random()-.5)*80+"px",dy="-"+(50+Math.random()*40)+"px";
        el.style.cssText="left:"+(x-18)+"px;top:"+(y-12)+"px;color:#fbbf24;font-size:20px;text-shadow:0 0 10px currentColor;--dx:"+dx+";--dy:"+dy;
        el.textContent="✨";document.body.appendChild(el);setTimeout(function(){el.remove();},950);
      },i2*100);})(i);}
      }
      // gFloats in game check S.settings.fx — takes effect immediately mid-game
      var ic3=document.getElementById("iconFX");if(ic3)ic3.textContent=on?"✨":"❌";
      toast(on?"✨ Visual FX ON — particles active in-game":"❌ Visual FX OFF — cleaner display","info");
    }
  },

  faq:function(i){var a=document.getElementById("fqb"+i),b=document.getElementById("fqa"+i);a.classList.toggle("on");b.textContent=a.classList.contains("on")?"−":"+";},

  changeProfile:function(){document.getElementById("unameIn").value=S.username||"";if(S.avData)updateAvAll(S.avData);document.getElementById("umod").classList.add("on");document.getElementById("unameIn").focus();},

  pickAv:function(){document.getElementById("avInput").click();},
  handleAv:handleAv,

  copyWallet:function(){if(uAddr&&navigator.clipboard){navigator.clipboard.writeText(uAddr).then(function(){toast("📋 Address copied!","info");});}else if(uAddr)toast("📋 "+uAddr.slice(0,20)+"…","info");else toast("⚠️ No wallet connected","warn");},

  share:function(){
    var text="⚡ DARING TOURNAMENT on MiniPay!\n\n🏆 Up to $100 USDT for 1st place\n💰 Up to $500 in daily prizes\n🎯 Entry: only $0.09\n\nJoin now → "+APP_URL;
    if(navigator.share){
      navigator.share({title:"Daring Tournament",text:text,url:APP_URL})
        .then(function(){toast("✅ Shared!","success");})
        .catch(function(){
          if(navigator.clipboard)navigator.clipboard.writeText(text).then(function(){toast("📋 Link copied — paste anywhere","info");});
        });
    }else if(navigator.clipboard){
      navigator.clipboard.writeText(text).then(function(){toast("📋 Link copied — paste anywhere","info");});
    }else toast("📤 "+APP_URL,"info");
  },
  shareResult:function(){
    var rank=document.getElementById("rRank").textContent||"—";
    var score=document.getElementById("rScore").textContent||"0";
    var event=todayEvent?todayEvent.name:"TODAY'S TOURNAMENT";
    var perfects=document.getElementById("rsPerfect").textContent||"0";
    var acc=document.getElementById("rsAcc").textContent||"0%";
    var text="🎯 "+event+" — DARING TOURNAMENT\n\n"
      +"My Score: "+score+" pts\n"
      +"Rank: "+rank+"\n"
      +"Perfect Hits: "+perfects+" · Accuracy: "+acc+"\n\n"
      +"Think you can beat me?\n"
      +"Entry only $0.09 USDT → "+APP_URL;
    if(navigator.share){
      navigator.share({title:"My Daring Tournament Score",text:text,url:APP_URL})
        .then(function(){toast("✅ Score shared!","success");})
        .catch(function(){
          if(navigator.clipboard)navigator.clipboard.writeText(text).then(function(){toast("📋 Score copied — paste anywhere","info");});
        });
    }else if(navigator.clipboard){
      navigator.clipboard.writeText(text).then(function(){toast("📋 Score copied — paste anywhere","info");});
    }else toast("📤 Score: "+score+" | "+APP_URL,"info");
  },
  shareTG:function(){window.open("https://t.me/share/url?url="+encodeURIComponent(APP_URL)+"&text="+encodeURIComponent("⚡ Daring Tournament — Up to $100 USDT daily! $0.09 entry.\n"),"_blank");},
  shareX:function(){window.open("https://twitter.com/intent/tweet?text="+encodeURIComponent("⚡ Playing Daring Tournament on MiniPay!\nUp to $100 first prize · $0.09 entry\nMy best: "+S.best.toLocaleString()+" pts\n"+APP_URL),"_blank");},

  donate:async function(){
    if(!uAddr){toast("⚠️ Wallet not connected. Open in MiniPay.","warn");return;}
    var amt=parseFloat(selectedDonation||"1.00");
    if(isNaN(amt)||amt<=0){toast("⚠️ Select an amount first","warn");return;}
    var units=Math.round(amt*1e6);
    var btn=document.getElementById("donateBtn");
    btn.disabled=true;btn.textContent="Processing…";
    var res=await doPayment(units);
    btn.disabled=false;btn.textContent="Send Support ⚡";
    if(res.ok){
      S.txs=S.txs||[];
      S.txs.unshift({type:"Support Donation",amount:"-$"+amt.toFixed(2)+" USDT",hash:res.hash,date:new Date().toLocaleString()});
      saveS();snd("pay");
      toast("💙 Thank you! Your support means everything.","success");
    }else{
      toast("❌ "+res.err,"warn");
    }
  },
  promoGo:function(){document.getElementById("promoMod").classList.remove("on");S.promoSeen=true;saveS();G.enter();},
  promoClose:function(){document.getElementById("promoMod").classList.remove("on");S.promoSeen=true;saveS();}
};

window.G=G;
window.saveUsername=function(){G.saveProfile();};
document.getElementById("unameIn").addEventListener("keydown",function(e){if(e.key==="Enter")G.saveProfile();});

// ══════════════════════════════════════════════════
// MUSIC ENGINE
// ══════════════════════════════════════════════════
var musicOn=false,musicNodes=[];
function startMusic(){
  if(!S.settings.sound||!AC||musicOn)return;
  musicOn=true;
  // Simple generative ambient loop
  var notes=[130.81,146.83,164.81,174.61,196,220,246.94];
  function playNote(){
    if(!musicOn||!AC)return;
    var o=AC.createOscillator(),g=AC.createGain(),f=AC.createBiquadFilter();
    f.type="lowpass";f.frequency.value=600;
    o.type="sine";
    o.frequency.value=notes[Math.floor(Math.random()*notes.length)];
    g.gain.setValueAtTime(0,AC.currentTime);
    g.gain.linearRampToValueAtTime(0.04,AC.currentTime+0.3);
    g.gain.linearRampToValueAtTime(0,AC.currentTime+1.8);
    o.connect(f);f.connect(g);g.connect(AC.destination);
    o.start();o.stop(AC.currentTime+2);
    musicNodes.push({o,g});
    setTimeout(playNote,1200+Math.random()*1600);
  }
  playNote();
}
function stopMusic(){
  musicOn=false;
  musicNodes.forEach(function(n){try{n.o.stop();}catch(e){}});
  musicNodes=[];
}

// ── BUTTON SOUND/VIB ──────────────────────────────
function btnFeel(type){
  type=type||"tap";
  if(S.settings.sound&&AC){
    if(type==="tap")beep(440,.06,"sine",.1);
    else if(type==="nav")beep(520,.08,"sine",.08);
    else if(type==="open")beep(660,.1,"sine",.1);
  }
  if(S.settings.vib&&navigator.vibrate){
    if(type==="tap")navigator.vibrate(12);
    else if(type==="nav")navigator.vibrate(8);
    else if(type==="open")navigator.vibrate([10,5,10]);
  }
}
// Attach btnFeel to all nav and action buttons
function attachBtnFeel(){
  document.querySelectorAll(".bn").forEach(function(b){
    b.addEventListener("touchstart",function(){btnFeel("nav");},{passive:true});
  });
  document.querySelectorAll(".wa,.ub-go,.enter-btn,.rbtn,.lb-play-pill").forEach(function(b){
    b.addEventListener("touchstart",function(){btnFeel("tap");},{passive:true});
  });
  document.querySelectorAll(".pu-card,.more-row").forEach(function(b){
    b.addEventListener("touchstart",function(){btnFeel("tap");},{passive:true});
  });
}

// ══════════════════════════════════════════════════
// LIVE FEED — real players only
// ══════════════════════════════════════════════════
var feedQueue=[],feedActive=false;
function showFeed(entry){
  // entry: {name, av, avImg, action}
  var feed=document.getElementById("liveFeed");
  if(!feed)return;
  var pill=document.createElement("div");
  pill.className="lf-pill";
  var avHtml=entry.avImg
    ?"<div class='lf-av'><img src='"+entry.avImg+"'/></div>"
    :"<div class='lf-av'>"+entry.av+"</div>";
  pill.innerHTML="<div class='lf-dot'></div>"+avHtml+
    "<span class='lf-name'>"+entry.name+"</span>"+
    "<span class='lf-action'>"+entry.action+"</span>";
  feed.appendChild(pill);
  setTimeout(function(){
    pill.style.transition="all .4s";
    pill.style.opacity="0";
    pill.style.height="0";
    pill.style.padding="0";
    setTimeout(function(){if(pill.parentNode)pill.parentNode.removeChild(pill);},500);
  },4000);
}
function triggerLiveFeed(name,av,avImg,action){
  showFeed({name:name||"Player",av:av||"🎮",avImg:avImg||null,action:action||"just entered"});
}

// ══════════════════════════════════════════════════
// ANNOUNCEMENTS SYSTEM
// ══════════════════════════════════════════════════
var ANNOUNCEMENTS=[
  {tag:"Today's Event",title:todayEvent.name,body:todayEvent.tag,hl:true},
  {tag:"How to Play",title:"Signal Strike — The Game",body:"A glowing bar sweeps left and right. Tap when it's inside a zone: Outer (3pts), Middle (8pts), Bullseye (15pts). Three faults ends your game. Red bar flash = DON'T tap — it's a bomb. Build 3+ consecutive bullseyes to activate the 1.5× streak multiplier, and 6 in a row for 2×. Concentration and reading rhythm is everything.",hl:false},
  {tag:"Daily Events",title:"Every Day is Different",body:"Mon: THE OPENER (standard) · Tue: GHOST SIGNAL (bar vanishes briefly) · Wed: THE RECKONING (only 2 faults allowed) · Thu: DOUBLE EDGE (decoy bar punishes wrong taps) · Fri: THE GAUNTLET (speed escalates fast) · Sat: PRECISION NIGHT (outer zone removed) · Sun: THE FINAL (all mechanics rotate every 30s)",hl:false},
  {tag:"Prize Pool",title:"How Prizes Work",body:"65% of all entry fees fund today's prize pool. Top 10 players share it — 1st gets 25%, down to 4% each for 6th–10th. Pool grows with every real entry. If under 10 players enter, the full pool rolls to tomorrow. Prizes paid to your MiniPay wallet at midnight UTC.",hl:false},
  {tag:"Weekly Championship",title:"Play All Week, Win on Sunday",body:"Play on 3 or more different days this week and your best daily scores automatically qualify for the Weekly Championship. On Sunday, the top 3 weekly scorers win from the weekly prize reserve — no extra fee. Tracked automatically from the day you first play.",hl:false},
  {tag:"Private Match",title:"⚔️ Challenge Your Friends",body:"Open Private Match from the Invite section on the home screen. Share your unique 6-character code with a friend. They enter it to join your match. The player with the highest score wins the bragging rights. No extra fee — pure skill competition between you and your rival.",hl:false},
  {tag:"Ranks & Medals",title:"Build Your Legacy",body:"Every game earns career points. Rise through Recruit, Contender, Sharpshooter, Veteran, Elite Darer, and Legend. Higher ranks unlock leaderboard highlighting and Elite Challenge access. Earn permanent medals like Surgical (5 consecutive bullseyes), Untouchable (0 faults full game), Ghost Slayer (200+ on Ghost Signal), and Dauntless (top 3 on The Final).",hl:false},
  {tag:"Power-Ups",title:"Strategic Advantages",body:"Buy one before entering: Shield absorbs 3 faults (most defensive), 2× Doubler adds 50% to all points for 30 seconds (best with a streak), Revive resets your fault count once (highest risk recovery). Buy from the home screen before hitting Start. Activates via tap button during gameplay.",hl:false},
];
function openAnn(){
  btnFeel("open");
  var wrap=document.getElementById("annItems");
  wrap.innerHTML=ANNOUNCEMENTS.map(function(a){
    return "<div class='ann-item"+(a.hl?" hl":"")+"'>"+
      "<div class='ann-item-tag'>"+a.tag+"</div>"+
      "<div class='ann-item-title'>"+a.title+"</div>"+
      "<div class='ann-item-body'>"+a.body+"</div>"+
    "</div>";
  }).join("");
  document.getElementById("annPanel").classList.add("on");
  var badge=document.getElementById("annBadge");
  if(badge)badge.style.display="none";
}
function closeAnn(){document.getElementById("annPanel").classList.remove("on");}

// ══════════════════════════════════════════════════
// TUTORIAL SYSTEM
// ══════════════════════════════════════════════════
var TUT_SLIDES=[
  {icon:"⚡",head:"WELCOME TO DARING",body:"A daily skill-based tournament where you compete for real USDT prizes. Every day brings a different challenge. The best players share the prize pool."},
  {icon:"🎯",head:"THE SIGNAL STRIKE",body:"A glowing bar sweeps left and right across three zones. Tap the screen when the bar is inside a zone — Outer (3pts), Middle (8pts), or Bullseye (15pts). The closer to center, the more you score."},
  {icon:"🔴",head:"WATCH FOR THE BOMB",body:"When the bar flashes RED — do NOT tap. Tapping during a red flash costs you a fault. Three faults ends your game early. Concentration is everything."},
  {icon:"🔥",head:"BUILD YOUR STREAK",body:"3 consecutive bullseyes activates 1.5× multiplier. 6 in a row = 2× multiplier. A gold ring shows around the screen when your streak is active. Break it and the multiplier resets."},
  {icon:"📅",head:"DAILY EVENTS",body:"Every day has a unique event with different rules and atmosphere. Ghost Signal hides the bar at its peak. The Reckoning drops your fault limit to 2. The Final mixes all mechanics."},
  {icon:"🏆",head:"WIN THE TOURNAMENT",body:"After your game, your score goes on today's leaderboard. Top 10 split 65% of the prize pool. Play 3+ days a week to enter the Weekly Championship. Good luck, Darer."},
];
var tutStep=0;
function openTut(){
  btnFeel("open");
  tutStep=0;renderTut();
  document.getElementById("tutPanel").classList.add("on");
}
function closeTut(){
  document.getElementById("tutPanel").classList.remove("on");
  S.tutSeen=true;saveS();
}
function tutNext(){
  btnFeel("tap");
  if(tutStep<TUT_SLIDES.length-1){tutStep++;renderTut();}
  else{closeTut();}
}
function renderTut(){
  var s=TUT_SLIDES[tutStep];
  document.getElementById("tutIcon").textContent=s.icon;
  document.getElementById("tutHead").textContent=s.head;
  document.getElementById("tutBody").textContent=s.body;
  var dots=document.getElementById("tutDots");
  dots.innerHTML=TUT_SLIDES.map(function(_,i){return "<div class='tut-dot"+(i===tutStep?" act":"")+"'></div>";}).join("");
  document.getElementById("tutBtn").textContent=tutStep===TUT_SLIDES.length-1?"LET'S PLAY ⚡":"NEXT →";
}

// ══════════════════════════════════════════════════
// WEEKLY CHAMPIONSHIP
// ══════════════════════════════════════════════════
function getWeekKey(){
  var d=new Date();
  var day=d.getDay(); // 0=Sun,1=Mon...6=Sat
  // Get Monday of this week
  var monday=new Date(d);
  monday.setDate(d.getDate()-((day+6)%7));
  monday.setHours(0,0,0,0);
  return monday.toDateString();
}
// Convert JS day (0=Sun) to week index Mon=0...Sun=6
function dayToWeekIdx(jsDay){return (jsDay+6)%7;}

function updateWeeklyProgress(){
  var wk=S.weeklyDays||{};
  var wkey=getWeekKey();
  if(!wk[wkey])wk[wkey]={days:[],bestScores:{}};
  var days=wk[wkey].days||[];
  var prog=document.getElementById("weeklyProg");
  if(!prog)return;
  var dayLabels=["M","T","W","T","F","S","S"];
  var todayIdx=dayToWeekIdx(new Date().getDay());
  prog.innerHTML=dayLabels.map(function(l,i){
    var played=days.indexOf(i)>=0;
    var isToday=i===todayIdx;
    return "<div class='wc-day"+(played?" done":"")+(isToday?" wc-today":"")+"' title='"+l+"'></div>";
  }).join("");
  var count=days.length;
  var body=document.getElementById("weeklyBody");
  if(body){
    if(count>=3){
      body.textContent="✅ You qualify! Best scores from "+count+" days entered in the Weekly Championship.";
    }else{
      var needed=3-count;
      body.textContent="Play on "+needed+" more day"+(needed===1?"":"s")+" this week to enter the Weekly Championship.";
    }
  }
}
function recordWeeklyPlay(score){
  var wk=S.weeklyDays||{};
  var wkey=getWeekKey();
  if(!wk[wkey])wk[wkey]={days:[],bestScores:{}};
  var todayIdx=dayToWeekIdx(new Date().getDay());
  if(wk[wkey].days.indexOf(todayIdx)<0){
    wk[wkey].days.push(todayIdx);
  }
  var prev=wk[wkey].bestScores[todayIdx]||0;
  if(score>prev)wk[wkey].bestScores[todayIdx]=score;
  S.weeklyDays=wk;saveS();
  updateWeeklyProgress();
}

// ══════════════════════════════════════════════════
// RANK PERKS
// ══════════════════════════════════════════════════
var RANK_PERKS=[
  {rank:"Recruit",icon:"🎯",color:"#94a3b8",perks:["Access to all daily tournaments","Standard leaderboard visibility","Basic prize eligibility"]},
  {rank:"Contender",icon:"⚡",color:"#60a5fa",perks:["All Recruit perks","Name highlighted in cyan on leaderboard","Weekly Championship eligible after 3 days"]},
  {rank:"Sharpshooter",icon:"🔥",color:"#a78bfa",perks:["All Contender perks","Purple glow on leaderboard row","Sharpshooter badge on profile"]},
  {rank:"Veteran",icon:"💎",color:"#34d399",perks:["All Sharpshooter perks","Green diamond badge on leaderboard","Priority shown in Elite Challenge"]},
  {rank:"Elite Darer",icon:"👑",color:"#fbbf24",perks:["All Veteran perks","Gold crown on leaderboard","Auto-qualify for weekly championship"]},
  {rank:"Legend",icon:"🌟",color:"#f87171",perks:["All Elite Darer perks","Red star badge — rare and recognised","Permanent top-board highlight"]},
];
function renderRankPerks(){
  var wrap=document.getElementById("rankPerksWrap");
  if(!wrap)return;
  var myRank=getRank(getCareerPts());
  wrap.innerHTML=RANK_PERKS.map(function(r){
    var isMe=r.rank===myRank.label;
    return "<div class='perk-card"+(isMe?" ":" ")+"' style='"+(isMe?"border-color:"+r.color+"44":"")+"'>"+
      "<div class='perk-rank' style='color:"+r.color+"'>"+r.icon+" "+r.rank+(isMe?" ← YOU":"")+"</div>"+
      "<div class='perk-list'>"+r.perks.map(function(p){return "· "+p;}).join("<br>")+"</div>"+
    "</div>";
  }).join("");
}


// ══════════════════════════════════════════════════
// PRIVATE MATCH SYSTEM
// ══════════════════════════════════════════════════
// Codes stored in localStorage per-device — no server needed
// When player A shares code, player B enters it and their scores
// are compared locally (both store under the same code key)
function genPMCode(){
  // 6-char alphanumeric code derived from wallet/DID — reproducible per user
  var src=(uAddr||DID).replace(/[^a-z0-9]/gi,"").toUpperCase();
  return src.slice(-6).padStart(6,"0");
}
function openPM(){
  btnFeel("open");
  if(!S.username){document.getElementById("umod").classList.add("on");return;}
  var code=genPMCode();
  document.getElementById("pmMyCode").textContent=code;
  renderPMRivals();
  document.getElementById("pmPanel").classList.add("on");
}
function closePM(){document.getElementById("pmPanel").classList.remove("on");}

function pmShareCode(){
  var code=genPMCode();
  var name=S.username||"PLAYER";
  var text="⚔️ "+name+" challenges you to a Private Match on Daring Tournament!\n\nEnter code: "+code+"\n\nJoin now → "+APP_URL;
  if(navigator.share){
    navigator.share({title:"Private Match Challenge",text:text,url:APP_URL})
      .then(function(){toast("✅ Challenge sent!","success");})
      .catch(function(){if(navigator.clipboard)navigator.clipboard.writeText(text).then(function(){toast("📋 Challenge copied!","info");});});
  }else if(navigator.clipboard){
    navigator.clipboard.writeText(text).then(function(){toast("📋 Challenge copied — paste to your friend!","info");});
  }
}
function pmCopyCode(){
  var code=genPMCode();
  if(navigator.clipboard)navigator.clipboard.writeText(code).then(function(){toast("📋 Code "+code+" copied!","info");});
  else toast("Your code: "+code,"info");
}
function pmJoin(){
  var input=document.getElementById("pmJoinInput");
  var code=(input.value||"").trim().toUpperCase();
  if(code.length<4){toast("⚠️ Enter a valid 6-character code","warn");return;}
  // Store this as a rivalry — both sides write their best score under this code
  var matches=S.pmMatches||{};
  if(!matches[code]){
    matches[code]={joinedAt:Date.now(),rivalCode:code,myBest:S.best||0,status:"active"};
    S.pmMatches=matches;saveS();
    toast("⚔️ Joined match "+code+"! Your current best: "+(S.best||0)+" pts","success");
    snd("pay");
  }else{
    toast("Already tracking this match!","info");
  }
  input.value="";
  renderPMRivals();
}
function pmUpdateMyBest(){
  // Called after every game to update all active match bests
  var matches=S.pmMatches||{};
  Object.keys(matches).forEach(function(code){
    if(matches[code].myBest<(S.best||0)){
      matches[code].myBest=S.best||0;
    }
  });
  S.pmMatches=matches;saveS();
}
function renderPMRivals(){
  var wrap=document.getElementById("pmRivals");
  if(!wrap)return;
  var matches=S.pmMatches||{};
  var keys=Object.keys(matches);
  if(keys.length===0){
    wrap.innerHTML="<div style='text-align:center;color:#475569;font-size:11px;padding:12px 0'>No active challenges yet.<br>Share your code or enter a friend's code above.</div>";
    return;
  }
  wrap.innerHTML=keys.map(function(code){
    var m=matches[code];
    var daysSince=Math.floor((Date.now()-m.joinedAt)/86400000);
    return "<div class='pm-rival-row'>"+
      "<div style='width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#06b6d4);display:flex;align-items:center;justify-content:center;font-size:16px'>⚔️</div>"+
      "<div><div style='font-family:Orbitron,sans-serif;font-size:11px;font-weight:700;color:#c084fc'>CODE: "+code+"</div>"+
      "<div style='font-size:9px;color:#64748b;margin-top:2px'>"+daysSince+" day"+(daysSince===1?"":"s")+" active</div></div>"+
      "<div class='pm-rival-score'>"+m.myBest.toLocaleString()+" <span style='font-size:9px;color:#64748b'>pts</span></div>"+
    "</div>";
  }).join("");
}

// ── DONATION SELECTION ────────────────────────────
var selectedDonation="1.00";
function selectDonate(el,amt){
  selectedDonation=amt;
  document.querySelectorAll(".da").forEach(function(d){d.classList.remove("sel");});
  el.classList.add("sel");
}

// ── BOOT ──────────────────────────────────────────
initMesh();meshLoop();
applyDailyTheme();
updateSettingsUI();updatePoolUI();updateStreakUI();refreshUI();
updateWeeklyProgress();
if(S.avData)updateAvAll(S.avData);
setInterval(tickClock,1000);tickClock();
setInterval(updatePoolUI,30000);
setTimeout(function(){scramble(document.getElementById("scrambleLogo"),"DARING");},700);

// Music + button feel attach on first interaction
document.addEventListener("touchstart",function(){
  initAudio();
  setTimeout(startMusic,600);
  attachBtnFeel();
},{once:true});
document.addEventListener("mousedown",function(){
  initAudio();
  setTimeout(startMusic,600);
  attachBtnFeel();
},{once:true});

initWallet();

// Announcement badge — show if today's event is noteworthy
var annBadge=document.getElementById("annBadge");
if(annBadge){
  var specialDays=[2,3,4,5,6,0]; // all except Monday shown as highlighted
  if(specialDays.indexOf(new Date().getDay())>=0){
    annBadge.style.display="flex";
  }
}

// Default donate selection
setTimeout(function(){var d=document.querySelector(".da");if(d)d.classList.add("sel");},500);

// Rank perks render
setTimeout(renderRankPerks,300);

// Promo for new users
setTimeout(function(){if(!S.promoSeen&&!S.username)document.getElementById("promoMod").classList.add("on");},2200);

// Tutorial on very first launch
setTimeout(function(){if(!S.tutSeen&&!S.username)openTut();},3000);

// Nav tab — update screens when visited
var _origGNav=G.nav;
G.nav=function(tab){
  _origGNav.call(G,tab);
  if(tab==="more"){renderRankPerks();updateWeeklyProgress();}
  if(tab==="wallet"){renderMedals();}
  if(tab==="home"){updateWeeklyProgress();}
};

// Loader hide
setTimeout(function(){var lo=document.getElementById("loader");lo.classList.add("out");setTimeout(function(){lo.style.display="none";},650);},1800);
</script>
</body>
</html>
