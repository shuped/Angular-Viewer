# Angular Viewer

Make browsing the files in your angular/ngrx app easier by automatically opening related angular files in efficient layouts.

## Features

 - Select `av` from the VSCode command palette to open the directive (.ts), style sheet (.scss) and template (.html) OR effects, reducers and actions files that have the same name as the file in the currently focused window

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

## Known Issues

Closing the 2x1 bottom pane before closing all other panes puts VSCode into an error state. This appears to be a reported vs code issue.

## Release Notes

### 0.2.0
  - Support for ngrx store files - more of that sweet, sweet hardcoded functionality

 ### 0.1.0
  - Initial hardcoded functionality: 3 mixed horizontal/vertical panes




  ![tfw](assets/tfw-you-discover-this-extension.gif)
