#!/usr/bin/env bash
#
# مهارت‌های ایجנט -> AGENT SKILLS for this project.
#
# مهارت‌ها در `.claude/skills/` نصب می‌شوند؛ آن پوشه در `.gitignore` است
# (ابزار محلی، نه بخشی از سایت). چیزی که commit می‌شود `skills-lock.json` است،
# پس هر کلون تازه با همین اسکریپت به همان مجموعه می‌رسد.
#
# دسته‌بندی و توضیح هر مهارت در `SKILLS.md`.
#
set -euo pipefail

cd "$(dirname "$0")/.."

SKILLS_CLI="npx --yes skills@1.7.1"
AGENT="claude-code"

echo "-> design & frontend (anthropics/skills)"
$SKILLS_CLI add anthropics/skills \
  --skill frontend-design \
  --skill canvas-design \
  --skill brand-guidelines \
  --skill theme-factory \
  --skill web-artifacts-builder \
  -a "$AGENT" -y

echo "-> motion & transitions + react quality (vercel-labs/agent-skills)"
$SKILLS_CLI add vercel-labs/agent-skills \
  --skill vercel-react-view-transitions \
  --skill vercel-react-best-practices \
  --skill vercel-composition-patterns \
  --skill web-design-guidelines \
  --skill writing-guidelines \
  -a "$AGENT" -y

echo "-> algorithmic art (anthropics/skills)"
$SKILLS_CLI add anthropics/skills \
  --skill algorithmic-art \
  -a "$AGENT" -y

echo "-> testing (anthropics/skills)"
$SKILLS_CLI add anthropics/skills \
  --skill webapp-testing \
  -a "$AGENT" -y

echo "-> working method (obra/superpowers)"
$SKILLS_CLI add obra/superpowers \
  --skill verification-before-completion \
  --skill systematic-debugging \
  --skill brainstorming \
  -a "$AGENT" -y

echo "-> authoring skills (anthropics/skills)"
$SKILLS_CLI add anthropics/skills \
  --skill skill-creator \
  -a "$AGENT" -y

echo
echo "installed:"
$SKILLS_CLI list
