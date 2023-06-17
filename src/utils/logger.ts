import pino from "pino"
import config from "../config"

export default pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    },
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },
      bindings: (bindings) => {
        return { 
            pid: bindings.pid, 
            host: bindings.hostname,
            node_version: config.nodeVer
        }
      },
    },
    name: config.appName,
    level: config.pinoMinLevel,
    enabled: config.pinoEnabled,
    timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
    
})