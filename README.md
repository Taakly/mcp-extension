# Taakly Desktop Extension for Claude

Connect Claude with your Taakly freelancer cockpit. Log hours, query clients, and manage projects using natural language.

## Installation

1. Download `taakly.mcpb` from the [latest release](https://github.com/Taakly/mcp-extension/releases)
2. 2. Double-click the file — Claude Desktop opens the installation dialog automatically
   3. 3. Enter your Taakly API key when prompted (Taakly > Settings > MCP Connector)
      4. 4. Click **Install**
        
         5. ## Available Tools
        
         6. | Tool | Description |
         7. |---|---|
         8. | `get_clients` | List your active clients |
         9. | `get_projects` | Query projects, optionally filtered by client |
         10. | `get_active_timer` | Check if a timer is currently running |
         11. | `start_timer` | Start a timer for a client and project |
         12. | `stop_timer` | Stop the active timer and save the duration |
         13. | `log_time` | Manually log a time entry |
        
         14. ## Usage Examples
        
         15. > "What clients do I have active in Taakly?"
             >
             > > "Start a timer for Acme Corp, web project."
             > >
             > > > "Log 2 hours of meeting time for today."
             > > >
             > > > > "Stop the timer and tell me how long I've been working."
             > > > >
             > > > > ## How It Works
             > > > >
             > > > > The extension runs a local Node.js MCP server (stdio) that proxies tool calls to the Taakly API over HTTPS. Your API key is stored securely in your OS keychain.
             > > > >
             > > > > ## Getting Your API Key
             > > > >
             > > > > 1. Go to [taakly.com](https://taakly.com) and log in
             > > > > 2. 2. Navigate to **Settings > MCP Connector**
             > > > >    3. 3. Click **Generate new key**
             > > > >      
             > > > >       4. ## Documentation
             > > > >      
             > > > >       5. Full documentation at [taakly.com/mcp](https://taakly.com/mcp)
             > > > >      
             > > > >       6. ## Support
             > > > > 
             - Email: support@taakly.com
             - - Docs: [taakly.com/mcp](https://taakly.com/mcp)
              
               - ## Privacy
              
               - This extension only accesses data belonging to the authenticated user. See our [Privacy Policy](https://taakly.com/privacy) and [DPA](https://taakly.com/dpa).
              
               - ## License
              
               - MIT
              
               - ## About
              
               - Taakly is the freelancer cockpit for European independent professionals. Built by [B-connecting s.r.o.](https://taakly.com), Prague.
