import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import https from "https";

const API_KEY = process.env.TAAKLY_API_KEY;
const MCP_URL = "https://eorqoektvyvefymtoork.supabase.co/functions/v1/taakly-mcp";

if (!API_KEY) {
  process.stderr.write("[taakly] ERROR: TAAKLY_API_KEY no configurada\n");
    process.exit(1);
    }

    function callSupabase(toolName, args) {
      return new Promise((resolve, reject) => {
          const url = new URL(`${MCP_URL}?key=${API_KEY}`);
              const payload = JSON.stringify({
                    jsonrpc: "2.0", id: 1, method: "tools/call",
                          params: { name: toolName, arguments: args },
                              });
                                  const options = {
                                        hostname: url.hostname, path: url.pathname + url.search,
                                              method: "POST",
                                                    headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(payload) },
                                                          timeout: 10000,
                                                              };
                                                                  const req = https.request(options, (res) => {
                                                                        let data = "";
                                                                              res.on("data", (chunk) => (data += chunk));
                                                                                    res.on("end", () => {
                                                                                            try {
                                                                                                      const parsed = JSON.parse(data);
                                                                                                                if (parsed.error) reject(new Error(parsed.error.message || "Error de Taakly"));
                                                                                                                          else resolve(parsed.result);
                                                                                                                                  } catch { reject(new Error(`Respuesta invalida: ${data.slice(0, 200)}`)); }
                                                                                                                                        });
                                                                                                                                            });
                                                                                                                                                req.on("error", reject);
                                                                                                                                                    req.on("timeout", () => { req.destroy(); reject(new Error("Timeout")); });
                                                                                                                                                        req.write(payload);
                                                                                                                                                            req.end();
                                                                                                                                                              });
                                                                                                                                                              }
                                                                                                                                                              
                                                                                                                                                              const server = new McpServer({ name: "taakly", version: "1.0.0" });
                                                                                                                                                              
                                                                                                                                                              server.tool("get_clients", "Lista tus clientes activos en Taakly.", {}, async () => {
                                                                                                                                                                const result = await callSupabase("get_clients", {});
                                                                                                                                                                  return { content: result.content };
                                                                                                                                                                  });
                                                                                                                                                                  
                                                                                                                                                                  server.tool("get_projects", "Lista proyectos, opcionalmente filtrados por cliente.",
                                                                                                                                                                    { client_id: z.string().optional().describe("UUID del cliente (opcional)") },
                                                                                                                                                                      async ({ client_id }) => {
                                                                                                                                                                          const result = await callSupabase("get_projects", { client_id });
                                                                                                                                                                              return { content: result.content };
                                                                                                                                                                                });
                                                                                                                                                                                
                                                                                                                                                                                server.tool("get_active_timer", "Devuelve el timer activo o null.", {}, async () => {
                                                                                                                                                                                  const result = await callSupabase("get_active_timer", {});
                                                                                                                                                                                    return { content: result.content };
                                                                                                                                                                                    });
                                                                                                                                                                                    
                                                                                                                                                                                    server.tool("start_timer", "Inicia un timer para un cliente y proyecto.",
                                                                                                                                                                                      { client_id: z.string(), project_id: z.string(), description: z.string().optional() },
                                                                                                                                                                                        async ({ client_id, project_id, description }) => {
                                                                                                                                                                                            const result = await callSupabase("start_timer", { client_id, project_id, description });
                                                                                                                                                                                                return { content: result.content };
                                                                                                                                                                                                  });
                                                                                                                                                                                                  
                                                                                                                                                                                                  server.tool("stop_timer", "Detiene el timer activo y guarda la duracion.", {}, async () => {
                                                                                                                                                                                                    const result = await callSupabase("stop_timer", {});
                                                                                                                                                                                                      return { content: result.content };
                                                                                                                                                                                                      });
                                                                                                                                                                                                      
                                                                                                                                                                                                      server.tool("log_time", "Registra una entrada de tiempo manual.",
                                                                                                                                                                                                        {
                                                                                                                                                                                                            client_id: z.string(), project_id: z.string(),
                                                                                                                                                                                                                hours: z.number().min(0.25).max(24),
                                                                                                                                                                                                                    description: z.string().optional(),
                                                                                                                                                                                                                        date: z.string().optional().describe("YYYY-MM-DD"),
                                                                                                                                                                                                                          },
                                                                                                                                                                                                                            async ({ client_id, project_id, hours, description, date }) => {
                                                                                                                                                                                                                                const result = await callSupabase("log_time", { client_id, project_id, hours, description, date });
                                                                                                                                                                                                                                    return { content: result.content };
                                                                                                                                                                                                                                      });
                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                      const transport = new StdioServerTransport();
                                                                                                                                                                                                                                      await server.connect(transport);
                                                                                                                                                                                                                                      process.stderr.write("[taakly] Desktop Extension lista\n");
