# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# MASTER EXECUTION DIRECTIVE — CRITICAL MEMORY LEAK HOTFIX
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SYSTEM: You are an expert Agentic AI (Antigravity). Your task is to execute a critical architectural hotfix based on the Senior Architect's diagnosis below. 

Do NOT deviate from this architecture. Do NOT use placeholders. 

## 1. CONTEXT & DIAGNOSIS (THE ROOT CAUSE)
We are facing an Exponential Memory Leak on Android Chrome (V8 Engine) causing 1 FPS and overheating.
- Bug 1: `{ once: true }` in Astro View Transitions causes zombie listeners.
- Bug 2: VRAM Exhaustion because WebGL contexts, shaders, and buffers are not explicitly deleted.
- Bug 3: Cascading Main-Thread blocking due to unreferenced `requestAnimationFrame` and `setInterval`.

## 2. THE TARGET FILES
You need to rewrite and apply fixes to the following 4 files:
1. `src/components/canvas/WaterRipple.astro`
2. `src/components/canvas/CloudBackground.astro`
3. `src/components/layout/PageTransition.astro`
4. `src/utils/performance-detector.ts`

## 3. ARCHITECTURE REQUIREMENTS (IMPLEMENT THESE EXACTLY)

For File 1 & 2 (Canvas/WebGL Components):
- Implement a Global Singleton Controller: `window.CloudSI_Water = window.CloudSI_Water || { initialized: false, cleanup: null };`
- Remove all `{ once: true }` from `astro:before-swap` event listeners.
- In the cleanup function, explicitly run: `gl.deleteShader()`, `gl.deleteProgram()`, `gl.deleteBuffer()`, and `ext.loseContext()`.
- Cancel all active `requestAnimationFrame` and `setInterval` in the cleanup function.

For File 3 (PageTransition):
- Add a trigger in `astro:before-swap` that explicitly calls:
  `if (window.CloudSI_Water && window.CloudSI_Water.cleanup) window.CloudSI_Water.cleanup();`
  `if (window.CloudSI_Cloud && window.CloudSI_Cloud.cleanup) window.CloudSI_Cloud.cleanup();`

For File 4 (Performance Detector):
- Add an Active Battery Monitor using `navigator.getBattery()`.
- Listen to the `levelchange` event. If battery drops below 20% and not charging:
  - Force tier to `BATTERY_SAVER`.
  - Trigger the global cleanup functions to kill WebGL immediately.
  - Hide all `<canvas>` elements and show fallback CSS divs.

## 4. EXECUTION ORDER
Step 1: Rewrite `performance-detector.ts` to include the active battery monitor.
Step 2: Rewrite `WaterRipple.astro` applying the Singleton and VRAM disposal.
Step 3: Rewrite `CloudBackground.astro` applying the exact same pattern.
Step 4: Rewrite `PageTransition.astro` to act as the global execution trigger.
Step 5: Verify all `astro:before-swap` listeners are safely integrated.

OUTPUT: Output the FULL, production-ready code for all 4 files. No pseudocode. No missing sections.