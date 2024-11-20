# RunTaskOnSave

This VSCode extension triggers tasks defined in `tasks.json` upon saving files whose paths match a specified regular expression pattern.

## Installation

Install the extension from the [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=nishimine.runtaskonsave).
Edit your configuration file (e.g., `.vscode/settings.json`) as needed.

## Configuretion

### Example

Here’s an example of settings to include in `.vscode/settings.json`:

```json
{
  "nishimine.runtaskonsave": {
    "enableNotifications": true,
    "ruleSet": [
      {
        "filePathMatchRegex": "\\.(jsx?|tsx?|cpp|h)$",
        "filePathIgnoreRegex": "(/node_modules/|/build/|/dist/)$",
        "taskLabel": "Echo Hoge"
      }
    ]
  }
}
```

Here’s an example of settings to include in `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Echo Hoge",
      "type": "shell",
      "command": "echo",
      "args": ["hoge"],
      "problemMatcher": [],
      "group": {
        "kind": "none",
        "isDefault": false
      }
    }
  ]
}
```
