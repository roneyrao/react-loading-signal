module.exports={
	bail:true,
	verbose:true,

	collectCoverage:true,
	coverageDirectory:'<rootDir>/__coverage__',
	collectCoverageFrom:['src/**/*.js', 'demo/**/*.js'],
	coverageThreshold:{
		global:{
			statements:80,
			branches:80,
			functions:80,
			lines:80
		}
	},

	roots:['<rootDir>/src', '<rootDir>/demo'],
	moduleFileExtensions:['js'],
	moduleNameMapper:{
		"\\.css$":"identity-obj-proxy"
	},
	//transform:{
	//	'.+\\.js$':'babel-jest',
	//	"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/jest.staticFileTransformer.js"
	//}
	snapshotSerializers:['enzyme-to-json/serializer'],
	setupTestFrameworkScriptFile:'<rootDir>/jest.setupFramework.js'
}
