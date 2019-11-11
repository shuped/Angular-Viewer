# Angular Viewer

Open files related to an angular directives in a grid format.

Select "av" from the VSCode command palette (CMD+SHIFT+P / CTRL+SHIFT+) to run the extension

## Features

 - Opens the directive (.ts) file, style sheet and template for the active file in a hardcoded layout (active file must have the same name fragments as the files that are intended to be opened, e.g. `my-app.component`)

## Extension Settings

/* noop */

## Installation Instructions

The .vsix binary is included for convenience. To install the extension, 
 - Go to VSCode's Extensions pane
 - Click More Actions `...` menu in the upper right
 - Select "Install from .vsix"
 - Select the .vsix file from the build/ folder

To build from source, install VSCode's publication/packaging utility `npm install -g vsce` and run `vsce package` in the root directory. This will create a .vsix binary in the root directory.

## Known Issues

Closing the 2x1 bottom pane before closing all other panes creates an error state. This appears to be a reported vs code issue.

## Release Notes

 ### 0.1.0
  - Initial hardcoded functionality: 3 mixed horizontal/vertical panes
