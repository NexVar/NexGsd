#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PKG_DIR = path.resolve(__dirname, '..');
const AGENT_SRC = path.join(PKG_DIR, '.agent');
const VERSION = require(path.join(PKG_DIR, 'package.json')).version;

const DIRS = ['agents', 'workflows', 'templates', 'references'];

const HELP = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 MertGSD v${VERSION}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Usage:
  mertgsd init [path]      Install .agent/ to a project (default: current dir)
  mertgsd update [path]    Update .agent/ to latest version
  mertgsd info             Show installed agent/workflow counts
  mertgsd --version        Show version
  mertgsd --help           Show this help

Examples:
  mertgsd init             # Install to current directory
  mertgsd init ./my-app    # Install to ./my-app
  mertgsd update           # Update current project's .agent/

After install:
  /mertgsd-new-project     # Start a new project
  /mertgsd-help            # See all commands
  /mertgsd-super "prompt"  # Full autonomous build
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

function copyAgent(targetDir) {
  const target = path.resolve(targetDir || '.');
  const agentTarget = path.join(target, '.agent');

  if (!fs.existsSync(AGENT_SRC)) {
    console.error('❌ .agent/ not found in MertGSD package.');
    process.exit(1);
  }

  if (!fs.existsSync(target)) {
    console.error(`❌ Target directory does not exist: ${target}`);
    process.exit(1);
  }

  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(` MertGSD v${VERSION} — Installing to: ${target}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');

  // Create .agent/ and copy subdirs (clean reinstall)
  if (!fs.existsSync(agentTarget)) {
    fs.mkdirSync(agentTarget, { recursive: true });
  }

  for (const dir of DIRS) {
    const src = path.join(AGENT_SRC, dir);
    const dst = path.join(agentTarget, dir);

    if (!fs.existsSync(src)) continue;

    // Remove old version of this subdir
    if (fs.existsSync(dst)) {
      fs.rmSync(dst, { recursive: true, force: true });
    }

    // Copy recursively
    copyDirRecursive(src, dst);
  }

  // Count files
  let agentCount = 0;
  let workflowCount = 0;
  try {
    agentCount = fs.readdirSync(path.join(agentTarget, 'agents')).filter(f => f.endsWith('.md')).length;
    workflowCount = fs.readdirSync(path.join(agentTarget, 'workflows')).filter(f => f.endsWith('.md')).length;
  } catch {}

  console.log(` ✓ Agents:    ${agentCount}`);
  console.log(` ✓ Workflows: ${workflowCount}`);
  console.log(` ✓ Version:   ${VERSION}`);
  console.log('');
  console.log(' Next steps:');
  console.log(`   cd ${target}`);
  console.log('   /mertgsd-new-project    → Start a new project');
  console.log('   /mertgsd-help           → See all commands');
  console.log('   /mertgsd-super "prompt" → Full autonomous build');
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(' MertGSD installed successfully ✓');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

function showInfo(targetDir) {
  const target = path.resolve(targetDir || '.');
  const agentTarget = path.join(target, '.agent');

  if (!fs.existsSync(agentTarget)) {
    console.log('❌ No .agent/ found in this directory. Run: mertgsd init');
    process.exit(1);
  }

  let agentCount = 0, workflowCount = 0, templateCount = 0, refCount = 0;
  try {
    agentCount = fs.readdirSync(path.join(agentTarget, 'agents')).filter(f => f.endsWith('.md')).length;
    workflowCount = fs.readdirSync(path.join(agentTarget, 'workflows')).filter(f => f.endsWith('.md')).length;
    templateCount = fs.readdirSync(path.join(agentTarget, 'templates')).filter(f => f.endsWith('.md')).length;
    refCount = fs.readdirSync(path.join(agentTarget, 'references')).filter(f => f.endsWith('.md')).length;
  } catch {}

  console.log(`MertGSD v${VERSION}`);
  console.log(`  Agents:     ${agentCount}`);
  console.log(`  Workflows:  ${workflowCount}`);
  console.log(`  Templates:  ${templateCount}`);
  console.log(`  References: ${refCount}`);
}

function copyDirRecursive(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const dstPath = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, dstPath);
    } else {
      fs.copyFileSync(srcPath, dstPath);
    }
  }
}

// --- CLI ---
const args = process.argv.slice(2);
const cmd = args[0];

if (!cmd || cmd === '--help' || cmd === '-h') {
  console.log(HELP);
} else if (cmd === '--version' || cmd === '-v') {
  console.log(`mertgsd v${VERSION}`);
} else if (cmd === 'init' || cmd === 'install') {
  copyAgent(args[1]);
} else if (cmd === 'update') {
  console.log('Updating MertGSD...');
  try {
    execSync('npm update -g mertgsd', { stdio: 'inherit' });
    copyAgent(args[1]);
  } catch (e) {
    console.log('Tip: If global update fails, try: npm i -g mertgsd@latest');
    copyAgent(args[1]);
  }
} else if (cmd === 'info') {
  showInfo(args[1]);
} else {
  console.error(`Unknown command: ${cmd}`);
  console.log(HELP);
  process.exit(1);
}
