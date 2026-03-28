import {execSync} from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import {fileURLToPath} from "node:url" // eslint-disable-line sort-imports

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, "..")

class ReleasePatch {
  repoRoot = repoRoot
  packageJsonPath = path.join(repoRoot, "package.json")

  run(command, options = {}) {
    execSync(command, {stdio: "inherit", cwd: this.repoRoot, ...options})
  }

  runQuiet(command, options = {}) {
    return execSync(command, {encoding: "utf8", cwd: this.repoRoot, ...options}).trim()
  }

  requireCleanGit() {
    const status = this.runQuiet("git status --porcelain")
    if (status) {
      console.error("Working tree is not clean. Commit or stash changes first.")
      process.exit(1)
    }
  }

  checkoutMaster() {
    this.run("git checkout master")
  }

  updateMasterFromOrigin() {
    this.run("git fetch origin")
    this.run("git merge origin/master")
  }

  bumpPatch() {
    this.run("npm version patch --no-git-tag-version")
  }

  build() {
    this.run("npm run build")
  }

  readVersion() {
    const raw = fs.readFileSync(this.packageJsonPath, "utf8")
    return JSON.parse(raw).version
  }

  stageVersionFiles() {
    const candidates = [
      "package.json",
      "package-lock.json",
      "yarn.lock"
    ]

    const existing = candidates.filter((item) => fs.existsSync(path.join(this.repoRoot, item)))
    if (existing.length > 0) {
      this.run(`git add ${existing.join(" ")}`)
    }
  }

  ensureNpmLogin() {
    try {
      const whoami = this.runQuiet("npm whoami")
      if (whoami) return
    } catch {
      // Fall through to login.
    }

    this.run("npm login")
  }

  commit(version) {
    this.run(`git commit -m "Release outside-eye v${version}"`)
  }

  push() {
    this.run("git push")
  }

  publish() {
    this.run("npm publish")
  }

  execute() {
    this.requireCleanGit()

    this.checkoutMaster()
    this.updateMasterFromOrigin()

    this.bumpPatch()
    this.build()
    this.stageVersionFiles()

    const version = this.readVersion()
    this.commit(version)
    this.push()

    this.ensureNpmLogin()
    this.publish()
  }
}

// eslint-disable-next-line jest/require-hook
new ReleasePatch().execute()
