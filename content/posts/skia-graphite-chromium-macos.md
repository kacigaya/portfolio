---
title: "Skia Graphite compositing bug: Chromium on macOS"
date: "2026-05-06"
description: "A GPU rendering synchronization bug causing visual corruption on macOS, and how to fix it."
tags: ["macos", "chromium", "gpu", "electron"]
repo: "https://github.com/kacigaya/skia-graphite-openai"
---

A rendering glitch affecting all Chromium-based browsers and Electron apps on macOS 15 (Sequoia) / 26 (Tahoe), including the Codex desktop app and ChatGPT web client.

## Symptom

Windows fail to repaint correctly: portions of the desktop wallpaper, other apps, or stale buffer contents bleed through Chromium window surfaces. Visible as vertical bands, transparent strips, or ghosted UI fragments. Triggered by window resize, Mission Control, display sleep/wake, or external monitor switches.

## Root cause

Chromium 130+ ships with Skia Graphite enabled by default. It is the newer GPU rendering backend that replaces Ganesh. On macOS, Graphite uses Metal for surface allocation and presentation. A synchronization bug between Graphite's `MTLCommandBuffer` lifecycle and `CAMetalLayer` drawable presentation causes the compositor to show stale or uninitialized framebuffer regions instead of the freshly rasterized layer.

This is a system-level interaction between Chromium's renderer and macOS WindowServer, not a per-app misconfiguration. Disabling per-browser hardware acceleration does not fix it because Graphite still owns the GPU path when acceleration is on, and software rendering hurts performance badly.

## Fix

Disable the `SkiaGraphite` feature flag. Chromium falls back to the Ganesh backend, which renders correctly on Metal.

### Browsers (Chrome, Brave, Helium, Edge, Arc, Opera)

Navigate to the flags page and disable Skia Graphite:

```
chrome://flags/#skia-graphite     Disabled
helium://flags/#skia-graphite     Disabled
brave://flags/#skia-graphite      Disabled
edge://flags/#skia-graphite       Disabled
```

Relaunch. Verify at `chrome://gpu`: the Graphite line should read `Disabled`.

### Electron apps (Codex, ChatGPT desktop, Slack, VS Code, Discord)

Launch with the disable flag:

```bash
open -a Codex --args --disable-features=SkiaGraphite
```

For persistent launches, first try setting the Electron environment variable in your shell profile:

```bash
# ~/.zshrc
export ELECTRON_EXTRA_LAUNCH_ARGS="--disable-features=SkiaGraphite"
source ~/.zshrc
```

If that does not work, the app is probably not inheriting shell environment variables or does not honor `ELECTRON_EXTRA_LAUNCH_ARGS`.

Add a terminal alias instead:

```bash
# ~/.zshrc
alias codex-fixed='open -n -a Codex --args --disable-features=SkiaGraphite'
source ~/.zshrc
```

Then launch Codex with:

```bash
codex-fixed
```

For a Finder, Spotlight, or Dock launcher, create a wrapper app with Script Editor:

1. Open Script Editor.
2. Paste this script:

```applescript
do shell script "open -n -a Codex --args --disable-features=SkiaGraphite"
```

3. Export it with format Application.
4. Save it as `Codex Fixed.app` in `/Applications` or `~/Applications`.
5. Launch `Codex Fixed.app` instead of editing `Codex.app`.

### Codex app launcher fix

Chrome policy files do not apply to Codex. Codex is an Electron app, so the reliable process-wide fix is a Chromium command-line switch. To make normal Dock, Finder, and Spotlight launches use the switch, use the helper script to replace the app launcher with a small shim. It keeps the original binary as `Codex.real`.

Check the current state:

```bash
scripts/codex-global-launcher-fix.sh status
```

Install or refresh the shim:

```bash
scripts/codex-global-launcher-fix.sh install
```

Quit Codex fully, then reopen `/Applications/Codex.app` normally. The script uses `sudo` for app bundle changes, reads the launcher name from `Contents/Info.plist`, and re-signs the modified bundle with an ad-hoc signature. A Codex update can overwrite the shim; rerun `scripts/codex-global-launcher-fix.sh install` after updating if the issue returns.

If Codex is installed somewhere else, pass the app bundle path:

```bash
scripts/codex-global-launcher-fix.sh status --app "$HOME/Applications/Codex.app"
scripts/codex-global-launcher-fix.sh install --app "$HOME/Applications/Codex.app"
```

Rollback by reinstalling Codex, or restore the original binary:

```bash
scripts/codex-global-launcher-fix.sh rollback
```

### System wide (all Chromium binaries)

For managed Chrome-family browsers, set the Chromium policy file:

```bash
mkdir -p "/Library/Application Support/Google/Chrome/policies/managed"
cat > "/Library/Application Support/Google/Chrome/policies/managed/disable-graphite.json" <<EOF
{ "DisabledFeatures": ["SkiaGraphite"] }
EOF
```

Replicate the path for `BraveSoftware/Brave-Browser`, `Microsoft/Edge`, etc. This is a browser policy path, not a Codex or generic Electron policy.

## Verification

1. `chrome://gpu`: search for "Graphite". It must show `Disabled`.
2. Resize a window aggressively or trigger Mission Control. No bleed-through.
3. `chrome://flags/#skia-graphite` shows `Disabled` (default is `Default` which resolves to enabled on 130+).

## Status

Tracked upstream as a Skia/Chromium issue against the Metal backend. The expected fix is a Graphite drawable presentation path that uses explicit fences. Until then, Ganesh is the stable path on macOS.

## Rollback

When the upstream fix lands, reset the flag to `Default` and remove the Electron env var to re-enable Graphite for its performance benefits: lower CPU, better HDR, and faster canvas.

## Sources

- [Chromium command-line flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags): Chromium project docs
- [Electron command-line switches API](https://www.electronjs.org/docs/latest/api/command-line-switches): `--disable-features` flag reference
- [Electron environment variables](https://www.electronjs.org/docs/latest/api/environment-variables): `ELECTRON_EXTRA_LAUNCH_ARGS` docs
- [Chrome enterprise policy list](https://chromeenterprise.google/policies/): `DisabledFeatures` policy reference
