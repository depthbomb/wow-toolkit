const { Configuration } = require('electron-builder');
const { version, author, nameLong, description, appUserModelId, applicationName } = require('../../product.json');

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Whether or not to entirely skip adding node_modules to the app's asar.
 *
 * Setting this to `true` is useful in cases where third-party package code is completely bundled
 * into your compiled app code.
 */
const EXCLUDE_ALL_NODE_MODULES = false;
/**
 * Specific package names to exclude from the app's asar when `EXCLUDE_ALL_NODE_MODULES` is false.
 *
 * If a package has dependencies then you must exclude those as well.
 */
const EXCLUDED_PACKAGES = [
	'cockatiel',
	'date-fns',
	'ufo',
	'universal-user-agent',
	'shared',
	'smol-toml',
	'mitt',
	'type-flag'
];

/**
 * @type Configuration
 */
const config = {
	appId: appUserModelId,
	executableName: applicationName,
	productName: nameLong,
	copyright: `Copyright © 2025 ${author}`,
	asar: true,
	buildDependenciesFromSource: true,
	compression: 'maximum',
	directories: {
		output: '../../build'
	},
	files: [
		'dist/*',
		'package.json',
	],
	asarUnpack: [
		'*.node',
		'*.dll',
		'*.exe',
	],
	extraMetadata: {
		version,
		description
	},
	extraFiles: [],
	extraResources: [
		{ from: '../../static/extra/tray/tray.ico', to: 'tray/tray.ico' },
		{ from: '../../static/extra/notifications/beledar.jpg', to: 'notifications/beledar.jpg' },
		{ from: '../../static/extra/notifications/wow-token.jpg', to: 'notifications/wow-token.jpg' },
	],
	win: {
		icon: '../../static/icon.ico',
		signtoolOptions: {
			publisherName: author
		},
	},
	portable: {
		artifactName: `${applicationName}.exe`
	},
	electronFuses: {
		runAsNode: !isProduction,
		onlyLoadAppFromAsar: isProduction,
		enableCookieEncryption: isProduction,
		enableNodeCliInspectArguments: !isProduction,
		enableNodeOptionsEnvironmentVariable: !isProduction,
		enableEmbeddedAsarIntegrityValidation: isProduction,
	}
};

if (EXCLUDE_ALL_NODE_MODULES) {
	config.files.push('!node_modules');
} else {
	for (const excludedPackage of EXCLUDED_PACKAGES) {
		config.files.push(`!node_modules/${excludedPackage}`);
	}
}

exports.default = config;
