const fs = require('fs/promises')
const Handlebars = require("handlebars")

const crlf = /\r?\n/
const notSetOptions = /^# (.*?) is not set$/

const parseFile = async (fileName = '.config') => {
	const config = new Map()
	for (const x of (await fs.readFile('.config', 'utf-8')).split(crlf)) {
		if (x.match(notSetOptions)) {
			config.set(RegExp.$1, null)	
			continue
		}
		if (x[0] == '#') {
			continue
		}

		const [name,val] = x.split('=')
		if (name === '') {
			continue
		}
		switch (val) {
	 	case 'n':
			config.set(name, false)
			break
		case 'y':
			config.set(name, true)
			break
		default:
			console.warn({ m: 'Option _name_ has unsupported value of _val_', name, val })
		}
	}
	return config
}

const main = async () => {
	const map = await parseFile()
	const obj = Object.fromEntries(map);
	console.log(JSON.stringify(obj, null, 2))
}

main().catch(e => console.log(e))