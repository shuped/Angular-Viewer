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

		const folder = getContainingFolder(vscode.window.activeTextEditor.document.uri.fsPath);
		// fs.readdirSync(folder)
		// 	.forEach((file) => {
		// 		console.log(file)
		// 		console.log(path.join(folder, file))
		// 		vscode.window.showTextDocument(
		// 			vscode.Uri.file(path.join(folder, file)),
		// 			{viewColumn: 2}
		// 		)
		// 	});
		vscode.window.showTextDocument(
			vscode.Uri.file(path.join(folder, 'test.component.ts')),
			{viewColumn: 1}
		);
		vscode.window.showTextDocument(
			vscode.Uri.file(path.join(folder, 'test.component.scss')),
			{viewColumn: 2}
		);
		vscode.window.showTextDocument(
			vscode.Uri.file(path.join(folder, 'test.component.html')),
			{viewColumn: 3}
		)
		vscode.window.showTextDocument(
			vscode.Uri.file(path.join(folder, 'test.component.spec.ts')),
			{viewColumn: 4}
		)
		vscode.commands.executeCommand('vscode.setEditorLayout', { orientation: 0, groups: [{ groups: [{}, {}], size: 0.5 }, { groups: [{}, {}], size: 0.5 }] });
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

function getContainingFolder(filePath) {
	const filePathSegments = filePath.split('/')
	const folderPathSegments = filePathSegments.splice(0, filePathSegments.length - 1);
	return path.join(...folderPathSegments);
}

function getMatchingFileUriWithExtensionInFolder(file, extension, folderPath) {
	const fileName = path.basename(file).split('.').slice(0, 2).join('.');
	const matchingFile = fs.readdirSync(folderPath).find((name) => name === fileName + '.' + extension);

	return path.resolve(folderPath, matchingFile);
}