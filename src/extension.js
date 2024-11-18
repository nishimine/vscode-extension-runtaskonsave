const vscode = require("vscode");

/**
 * @return {{enabledNotifications: boolean, ruleSet: {filePathMatchRegex: string, filePathIgnoreRegex?: string, taskLabel: string}[]}}
 */
function getConfiguration() {
  const config = vscode.workspace.getConfiguration("nishimine.runtaskonsave");
  return {
    enabledNotifications: config.get("enableNotifications"),
    ruleSet: config.get("ruleSet"),
  };
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument((document) => {
      const config = getConfiguration();
      config.ruleSet.forEach(async (rule) => {
        if (new RegExp(rule.filePathMatchRegex).test(document.fileName)) {
          if (
            rule.filePathIgnoreRegex &&
            new RegExp(rule.filePathIgnoreRegex).test(document.fileName)
          ) {
            return;
          }
          if (config.enabledNotifications) {
            vscode.window.showInformationMessage(
              `\`${rule.taskLabel}\` in \`tasks.json\` was executed triggered by saving file \`${document.fileName}\`.`
            );
          }
          const tasks = await vscode.tasks.fetchTasks();
          const targetTask = tasks.find((task) => task.name === rule.taskLabel);
          if (targetTask) {
            vscode.tasks.executeTask(targetTask);
          } else {
            vscode.window.showErrorMessage(
              `Not found task \`${rule.taskLabel}\` in \`tasks.json\``
            );
          }
        }
      });
    })
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
