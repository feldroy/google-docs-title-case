# Title Case Add-on

A Title Case google docs Add-on which turns all headings from h1, h2 to h6.

## Usage

- Generate a .clasp.json file with the script id of your script file of the google doc you want to add
- Run `npm install` to install the dependencies.
- After this you could edit the Code.js file in case you want your font size or font family to be different.
- Run `npm run clasp-push` to push the code to the app script file. (If it asks "? Manifest file has been updated. Do you want to push and overwrite?" double check the script id is the same new script where you are trying to push and then `press y`)
- Click on Run button present on the menu bar in google script editor.
- If it asks for Authorization required review permissions sign in and enter proceed to <project name> unsafe and allow.
- After Execution you may find the Add-on present inside your Add-on menu item.

## Contribute

To contribute to this project

- `git clone` the repository
- Run `npm install` to install all node modules
- generate a script id from you google doc where you might try out the features (tools->script editor->settings->copy script ID)
- Add a `.clasp.json` file in the same way as `.clasp.json.example` in the `src` directory with the script id you generated in previous step
- Run `npm run clasp-push` to push any changes made locally to the script file online (If it asks "? Manifest file has been updated. Do you want to push and overwrite?" double check the script id is the same new script where you are trying to push and then `press y`)
- Run `npm run clasp-pull` to pull latest file present on the online script file
