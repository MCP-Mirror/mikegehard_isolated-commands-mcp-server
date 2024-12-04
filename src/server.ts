import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
  } from "@modelcontextprotocol/sdk/types.js";
import { RunCommandArgsSchema, runCommandIdentifier } from "./commands.js";

  

function setToolHandlers(server: Server): Server {
    server.setRequestHandler(ListToolsRequestSchema, async () => {
        return {
            tools: [
                {
                    name: runCommandIdentifier,
                    description: "Run a command in an isolated environment",
                    inputSchema: RunCommandArgsSchema,
                }
            ]
        };
    });

    /**
     * Handler for the create_note tool.
     * Creates a new note with the provided title and content, and returns success message.
     */
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
        switch (request.params.name) {
            case runCommandIdentifier: {
                const command = String(request.params.arguments?.command);
                if (!command) {
                    throw new Error("Command is required");
                }
                return {
                    content: [{
                        type: "text",
                        text: `Command run: ${command}`
                    }]
                };
            }

            default:
                throw new Error("Unknown tool");
        }
    });

    return server;
}

export function createServer(): Server {
    const server =  new Server(
        {
            name: "isolated-commands-mcp-server",
            version: "0.1.0",
        },
        {
            capabilities: {
                resources: {},
                tools: {},
                prompts: {},
            },
        }
    );

    setToolHandlers(server);

    return server;
}
