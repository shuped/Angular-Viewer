// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "angular-viewer" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.av', function () {
		// The code you place here will be executed every time your command is executed
		console.log('executed')
		// Display a message box to the user
		vscode.window.showInformationMessage('And we\'re testing...');

		const activeFile = path.basename(vscode.window.activeTextEditor.document.uri.fsPath);
		const activeFolder = getContainingFolder(vscode.window.activeTextEditor.document.uri.fsPath);

		const matchingDirective = getMatchingFileUriWithExtensionInFolder(activeFile, 'ts', activeFolder);
		const matchingTemplate = getMatchingFileUriWithExtensionInFolder(activeFile, 'html', activeFolder);
		const matchingStyleSheet = getMatchingFileUriWithExtensionInFolder(activeFile, 'scss', activeFolder);

		vscode.commands
			.executeCommand(
				'vscode.setEditorLayout',
				{ 
					orientation: 1,
					groups: [
						{ 
							groups: [{size:0.66}, {size:0.34}],
							size: 0.66
						},
						{ 
							groups: [{}],
							size: 0.34 
						}
					]
				}
				)
			.then(() => {
				return vscode.window.showTextDocument(
					vscode.Uri.file(matchingDirective),
					{viewColumn: 1}
				);
			})
			.then(() => {
				return vscode.window.showTextDocument(
					vscode.Uri.file(matchingStyleSheet),
					{viewColumn: 2}
				);
			})
			.then(() => {
				return vscode.window.showTextDocument(
					vscode.Uri.file(matchingTemplate),
					{viewColumn: 3}
				);
			});
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
	console.log('deactiated')
}

module.exports = {
	activate,
	deactivate
}

function getContainingFolder(filePath) {
	const filePathSegments = filePath.split('/')
	const folderPathSegments = filePathSegments.splice(0, filePathSegments.length - 1);
	return path.join(...folderPathSegments);
}

/**
 * Find a file in the provided folder than has the same name but with a specified extension
 * @param {string} file file name or path to match against
 * @param {string} extension ts, scss, html, spec.ts
 * @param {string} folderPath the path to the dir to search
 * @returns {string} matching file path
 */
function getMatchingFileUriWithExtensionInFolder(file, extension, folderPath) {
	const fileName = path.basename(file).split('.').slice(0, 2).join('.');
	const matchingFile = fs.readdirSync(folderPath).find((name) => name === fileName + '.' + extension);

	return path.resolve(folderPath, matchingFile);
}