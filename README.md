# Ez-DToC

## Cloning the Project

To get started with the project, you'll first need to clone it from GitHub to your local machine.

1. **Open Terminal**: Open your terminal or command prompt.

2. **Clone the Repository**: Run the following command to clone the repository. Make sure to replace `YOUR_REPOSITORY_URL` with the actual URL of your GitHub repository.

    ```bash
    git clone YOUR_REPOSITORY_URL
    ```

3. **Navigate to the Project Directory**: Once cloning is complete, navigate to the project directory.

    ```bash
    cd path/to/project
    ```

## Setting Up the Figma Plugin

After cloning the project, follow these steps to set up the Figma plugin for development and testing on your local machine.

1. **Install Dependencies**: Ensure you have Node.js installed on your machine. Then, install the project dependencies by running:

    ```bash
    npm install
    ```

2. **Install TypeScript and Figma Plugin Typings**: If you haven't already, install TypeScript globally and the Figma plugin typings for development.

    ```bash
    npm install -g typescript
    npm install --save-dev @figma/plugin-typings
    ```

3. **Build the Plugin**: Compile the TypeScript code to JavaScript. If your project is set up to use a build script, you might run something like:

    ```bash
    npm run build
    ```

    Or, for continuous compilation:

    ```bash
    tsc -w
    ```

4. **Link the Plugin to Figma**:
    - Open Figma and go to the Plugins section in your profile settings.
    - Choose "Create your own plugin" and then "Link existing plugin".
    - Navigate to your project directory and select the `manifest.json` file.

5. **Run the Plugin**: Now, the plugin should be available in Figma under "Plugins" > "Development". Select your plugin to run it.

## Collaborating and Testing

- Share the GitHub repository with your co-developers.
- They should follow the same steps to clone the project, set up, and link the plugin for development on their Figma account.

Remember, any time you make changes to the plugin, you'll need to push those changes to GitHub and your co-developers will need to pull the updates to test the latest version.

Happy coding!