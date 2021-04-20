# Lepnina - scaffolding using Linux Kconfig

![What is Lepnina][2]

> Yeoman is a robust and opinionated set of tools, libraries, 
> and a workflow that can help developers quickly build beautiful, 
> compelling web apps.
> 

Lepnina is an attempt to re-engineer Yeoman's `generator-tsmod` to facilitate
incremental adoption of the best practices it promotes.

It uses `libkconfig`, a mature Python reimplementation of the Linux Kernel's `Kconfig` tools, 
to disable the features/practices a team is not ready to adopt yet.

Essentially Lepnina is `generator-tsmod` with a fine-grained configuration 
and a prompting phase implemented through `menuconfig` Curses UI, which
is mature enough to support Windows too.

![MenuConfig Prompt][1]

However, the current implementation is a proof of concept. It doesn't use
Yeoman's framework of priorities, `Generator` and `Storage` yet, and 
implements only a small subset of the `generator-tsmod` practices. 
But the idea is eventually to support them all, just in a way when 
you don't use what you don't need.

## Workflow

- Install Python, `kconfiglib` and if on Windows, `windows-curses`
- Run `menuconfig` to produce `.config` from `Kconfig`. On Windows, menuconfig.exe is in the `scripts/` folder of the Python's installation.
- Install Node 14.x and run `npm ci` to install `ejs`
- Run `node parseConfig.js >.config` to produce `.config.json` from `.config`
- Run `npx ejs -f .config.json ejs\files.json.ejs` to produce a list of files your chosen configuration needs
- Run `npx ejs -f .config.json ejs\{file}.ejs >output\{file}` to produce the files. Some files don't have .ejs and they should be copied as is

The workflow will obviously be automated more. At this point I only care about finding 
whether the approach is scalable to dozens of features/practices without inducing a
combinatorial explosion.

Kconfig describes the feature flags and dependencies between them, using the
well known Kconfig language https://www.kernel.org/doc/html/latest/kbuild/kconfig-language.html 
and `kconfiglob` Python tools https://pypi.org/project/kconfiglib/. 

Just like Yeoman, `ejs` templates are used. `parseConfig.js` is a tiny tool
to parse `.config` files generated from `Kconfig`. Note that while `.config` is a 
flat list of `CONFIG_FOO=y` name-value pairs, `Kconfig` is a
"metaconfig", and it's much harder to parse it than the `.config` configuration
files - `kconfiglib` is 8k+ LOC.

[1]: menuconfig.jpg
[2]: https://user-images.githubusercontent.com/528415/115439161-435d5800-a1dc-11eb-9fab-f8d330695758.png
