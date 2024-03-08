# Ez-DToC 🚀

![Tutorial](assets/tutorial.gif)

## Cloning the Project 📋

To get started with the project, you'll first need to clone it from GitHub to your local machine.

1. **Open Terminal** 💻: Open your terminal or command prompt.

2. **Clone the Repository** 📥: Run the following command to clone the repository. Make sure to replace `https://github.com/iannatividad/ez-dtoc.git` with the actual URL of your GitHub repository.

   ```bash
   git clone https://github.com/iannatividad/ez-dtoc.git
   ```

3. **Navigate to the Project Directory** 📂: Once cloning is complete, navigate to the project directory.

   ```bash
   cd path/to/project
   ```

## Setting Up the Figma Plugin 🔧

After cloning the project, follow these steps to set up the Figma plugin for development and testing on your local machine.

1. **Install Dependencies** 🛠: Ensure you have Node.js installed on your machine. Then, install the project dependencies by running:

   ```bash
   npm install
   ```

2. **Install TypeScript and Figma Plugin Typings** 📚: If you haven't already, install TypeScript globally and the Figma plugin typings for development.

   ```bash
   npm install -g typescript
   npm install --save-dev @figma/plugin-typings
   ```

3. **Build the Plugin** 🏗: Compile the TypeScript code to JavaScript. If your project is set up to use a build script, you might run something like:

   ```bash
   npm run build
   ```

   Or, for continuous compilation:

   ```bash
   tsc -w
   ```

4. **Link the Plugin to Figma** 🔗:

   - Open Figma and go to the Plugins section in your profile settings.
   - Choose "Create your own plugin" and then "Link existing plugin".
   - Navigate to your project directory and select the `manifest.json` file.

5. **Run the Plugin** 🚀: To run the plugin, ensure you have the Figma desktop application installed on your computer. The desktop version is recommended for a smoother development and testing experience. Download it from the [Figma Downloads Page](https://www.figma.com/downloads/).

   - After installation, open the Figma desktop app and navigate to "Plugins" > "Development" in the file browser sidebar.
   - Find your plugin in the list and click on it to run.

   Note: If you make changes to your plugin code, remember to rebuild your project (if necessary) and refresh the plugin in Figma to see the updates.

## Usage 🖥

After successfully setting up and running your plugin in Figma, here's how to use it:

1. **Open a Figma File** 📁: Start by opening any Figma design file where you want to use the plugin.

2. **Run the Plugin** ▶️: Navigate to "Plugins" > "Development" > "Your Plugin Name" to activate the plugin.

3. **Interact with the Plugin UI** 🖱: A plugin window will appear. Depending on the plugin's functionality, you might need to select design elements or specify options.

   - For example, if your plugin converts design to code, select the design element and click the "Generate Code" button in the plugin UI.

4. **View Results** 📈: The plugin will process your request and display results directly in the plugin window or apply changes to the Figma file.

5. **Adjust Settings (if applicable)** ⚙️: Some plugins allow you to adjust settings or preferences. Look for a settings icon or menu within the plugin UI to customize its behavior.

6. **Feedback and Iteration** 💬: Use the plugin as part of your design workflow. If you encounter any issues or have suggestions for improvement, reach out to the plugin developer or contribute to the plugin's repository if it's open source.

## Collaborating and Testing 👥

- Share the GitHub repository with your co-developers.
- They should follow the same steps to clone the project, set up, and link the plugin for development on their Figma account.

Remember, any time you make changes to the plugin, you'll need to push those changes to GitHub and your co-developers will need to pull the updates to test the latest version.

Happy coding! 💻