# Angular Viewer

Open files related to an angular directives in a grid format.

## Features

 - Select `av` from the VSCode command palette to open the directive (.ts), style sheet (.scss) and template (.html) files that have the same name as the file in the currently focused window

 ![Demo](assets/0.2.0-demo.gif)

## Extension Settings

`/* noop */`

## Installation Instructions

The .vsix binary is included for convenience. To install the extension, 
 - Go to VSCode's Extensions pane
 - Click More Actions `...` menu in the upper right
 - Select "Install from .vsix"
 - Select the .vsix file from the build/ folder

To build from source, install VSCode's publication/packaging utility `npm install -g vsce` and run `vsce package` in the root directory

## Release Notes

### 1.0.0
  - Confirguration options for pane dimensions. Bug fixes.

### 0.2.0
  - Support for ngrx store files - more of that sweet, sweet hardcoded functionality

 ### 0.1.0
  - Initial hardcoded functionality: 3 mixed horizontal/vertical panes




  ![tfw](assets/tfw-you-discover-this-extension.gif)
