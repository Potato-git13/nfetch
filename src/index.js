#!/usr/bin/env node
const { hostname, userInfo, uptime, freemem, totalmem } = require('os');
const { readFileSync } = require('fs');

const colour = {
	bold: '\x1b[1m',
	black: '\x1b[30m',
	green: '\x1b[32m',
	blue: '\x1b[34m',
	white: '\x1b[37m',
	brightRed: '\x1b[91m',
	brightYellow: '\x1b[93m',
	brightMagenta: '\x1b[95m',
	brightCyan: '\x1b[96m',
};

const tempUptime = {
	minutes: Math.floor((uptime() / 60) % 60),
	hours: Math.floor(uptime() / 60 / 60),
};

const info = {
	user: userInfo().username,
	shell: userInfo().shell.split('/')[3],
	wm:
		(process.env.DESKTOP_SESSION ||
			process.env.XDG_SESSION_DESKTOP ||
			process.env.XDG_CURRENT_DESKTOP ||
			process.env.GDMSESSION ||
			process.env.ORIGINAL_XDG_CURRENT_DESKTOP) ??
		'null',
	host: hostname(),
	ram: `${(((totalmem() - freemem()) / totalmem()) * 100).toFixed(2)}% / 100%`,
	// ! Shitty regex, probably most impractical way to get distro  name too
	distro: readFileSync('/etc/os-release')
		.toString('ascii')
		.match(/PRETTY_NAME="([^"]+?)"/)[1]
		.toLowerCase(),
	uptime: `${tempUptime.hours ? `${tempUptime.hours}h, ${tempUptime.minutes}m` : `${tempUptime.minutes}m`}`,
};

console.log(
	`${colour.bold}
       ${colour.white}_..oo8${colour.black}"""Y8b.._		
     ${colour.white}.88888888o.${colour.black}    "Yb.
   ${colour.white}.d888P""Y8888b${colour.black}      "b
   ${colour.white}o88888    88888)${colour.black}       "b	${colour.brightMagenta}${info.user}${colour.white}	:: ${colour.brightMagenta}${info.host}
 ${colour.white}d888888b..d8888P${colour.black}         'b	${colour.blue}distro 	${colour.white}::${colour.blue} ${info.distro}
 ${colour.white}88888888888888"${colour.black}           8	${colour.green}uptime 	${colour.white}::${colour.green} ${info.uptime}
${colour.white}(88DWB8888888P${colour.black}             8)	${colour.brightRed}wm 	${colour.white}::${colour.brightRed} ${info.wm}
 ${colour.white}8888888888P${colour.black}               8	${colour.brightYellow}shell	${colour.white}::${colour.brightYellow} ${info.shell}
 ${colour.white}Y88888888P${colour.black}     ${colour.white}ee${colour.black}        .P	${colour.brightCyan}ram ${colour.white}	::${colour.brightCyan} ${info.ram}
  ${colour.white}Y888888(${colour.black}     ${colour.white}8888${colour.black}      oP
   ${colour.white}"Y88888b${colour.black}     ${colour.white}""${colour.black}     oP"
     ${colour.white}"Y8888o._${colour.black}    _.oP"
       ${colour.white}\`""Y888boodP""\'
`,
);
