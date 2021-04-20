> Yeoman is a robust and opinionated set of tools, libraries, 
> and a workflow that can help developers quickly build beautiful, 
> compelling web apps.

Lepnina is an attempt to re-engineer Yeoman's `generator-tsmod` to facilitate
incremental adoption of the best practices it promotes.

It uses the Python reimplementation of the Linux Kernel's `Kconfig` tools 
to disable the features/practices a team is not ready to adopt yet.

Essentially Lepnina is `generator-tsmod` with a fine-grained configuration 
and a prompting phase implemented through `menuconfig` Curses UI, which
is mature enough to support Windows too.

However, the current implementation is a proof of concept. It doesn't use
Yeoman's framework of priorities, `Generator` and `Storage` yet, and 
implements only a small subset of the `generator-tsmod` practices. 
But the idea is eventually to support them all, just in a way when 
you don't use what you don't need.

## Workflow

- Install Python, libkconfig and if on Windows, windows-curses
- Run `menuconfig` to produce `.config` from `Kconfig`. On Windows, menuconfig.exe is in the `scripts/` folder of the Python's installation.
- Install Node 14.x and run `npm ci` to install `ejs`
- Run `node parseConfig.js >.config` to produce `.config.json` from `.config`
- Run `npx ejs -f .config.json ejs\files.json.ejs` to produce a list of files your chosen configuration needs


Kconfig describes the feature flags and dependencies between them, using the
well known Kconfig language and `` `libkconfig` Python tools.



Just like Yeoman, `ejs` templates are used. `parseConfig.js` is a tiny tool
to parse .config gener