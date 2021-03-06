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
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let avReference = vscode.commands.registerCommand('extension.av', function () {
		// config options, so they update without restarting
		const { leftToRightPercentage, topToBottomPercentage } = vscode.workspace.getConfiguration().get('angularViewer');

		let activeFile = path.basename(vscode.window.activeTextEditor.document.uri.fsPath);
		let activeFolder = getContainingFolder(vscode.window.activeTextEditor.document.uri.fsPath);

		if (activeFile.includes('component')) {
			const folderContents = fs.readdirSync(activeFolder);

			const matchingDirective = path.join(
				activeFolder,
				getMatchingFileUriWithExtension(activeFile, 'ts', folderContents)
			);
			const matchingTemplate = path.join(
				activeFolder,
				getMatchingFileUriWithExtension(activeFile, 'html', folderContents)
			);
			const matchingStyleSheet = path.join(
				activeFolder,
				getMatchingFileUriWithExtension(activeFile, 'scss', folderContents)
			);

			threePaneLayout(
				vscode.Uri.file(matchingDirective),
				vscode.Uri.file(matchingStyleSheet),
				vscode.Uri.file(matchingTemplate),
				leftToRightPercentage / 100,
				topToBottomPercentage / 100
			);
		} else if (
			activeFile.includes('effects')  ||
			activeFile.includes('reducers') ||
			activeFile.includes('actions')		
		) {
			const folderContents = fs.readdirSync(activeFolder);

			const matchingEffects = path.join(
				activeFolder,
				getMatchingFileUriWithNameFragment(activeFile, 'effects', folderContents)
			);
			const matchingReducers = path.join(
				activeFolder,
				getMatchingFileUriWithNameFragment(activeFile, 'reducers', folderContents)
			);
			const matchingActions = path.join(
				activeFolder,
				getMatchingFileUriWithNameFragment(activeFile, 'actions', folderContents)
			);

			threePaneLayout(
				vscode.Uri.file(matchingEffects),
				vscode.Uri.file(matchingActions),
				vscode.Uri.file(matchingReducers),
				leftToRightPercentage / 100,
				topToBottomPercentage / 100
			);
		}
	});

	context.subscriptions.push(avReference);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

function getContainingFolder(filePath) {
	return path.dirname(filePath);
}

/**
 * Find a file in the provided folder that has the same name but with a specified extension
 * @param {string} file file name or path to match against
 * @param {string} extension ts, scss, html, spec.ts
 * @param {string} files the path to the dir to search
 * @returns {string} matching file path
 */
function getMatchingFileUriWithExtension(file, extension, files) {
	const fileName = path
		.basename(file)
		.split('.')
		.slice(0, 2)
		.join('.');

	return files.find((name) => name === fileName + '.' + extension);
}

/**
 * Find a file in the provided folder that has the same first name segment, but with a specified
 * second name extension.  eg. `firstNameSeg.secondNameSeg.html`
 * Expects 2 periods in the file name
 * @param {string} file file name or path to match against
 * @param {string} matchFragment the second fragment to match with the given first segment in `file`
 * @param {string} files the path to the dir to search
 * @returns {string} matching file path
 */
function getMatchingFileUriWithNameFragment(file, matchFragment, files) {
	const [name, ...rest] = path.basename(file).split('.');
	const extension = rest[rest.length - 1];
	return files.find((fileName) => fileName === name + '.' + matchFragment + '.' + extension );
}

function threePaneLayout(pane1, pane2, pane3, leftToRightRatio, topToBottomRatio) {
	// Unreliable when not done in serial
	vscode.commands.executeCommand('vscode.setEditorLayout', { 
		orientation: 1,
		groups: [
			{ 
				groups: [{ size: leftToRightRatio }, {size: 1 - leftToRightRatio }],
				size: topToBottomRatio
			},
			{
				size: 1 - topToBottomRatio
			}
		]
	})
	.then(() => vscode.window.showTextDocument(pane1, { viewColumn: 1 }))
	.then(() => vscode.window.showTextDocument(pane2, { viewColumn: 2 }))
	.then(() => vscode.window.showTextDocument(pane3, { viewColumn: 3 }));
}