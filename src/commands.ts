export const runCommandIdentifier = "run_command";

export const RunCommandArgsSchema = {
    type: "object",
    properties: {
        command: {
            type: "string",
            description: "The command to run"
        }
    },
    required: ["command"]
}