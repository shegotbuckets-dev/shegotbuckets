module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "type-enum": [
            2,
            "always",
            [
                "feat", // New feature
                "fix", // Bug fix
                "docs", // Documentation
                "style", // Formatting, missing semi colons, etc
                "refactor", // Code change that neither fixes a bug or adds a feature
                "perf", // Performance improvements
                "test", // Adding tests
                "chore", // Maintain
                "revert", // Revert changes
                "wip", // Work in progress
            ],
        ],
    },
};
