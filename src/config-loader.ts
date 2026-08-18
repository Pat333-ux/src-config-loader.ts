// Beast-System-3-Core/src/config-loader.ts

import * as fs from "fs";
import * as path from "path";

export interface BeastConfig {
  apiUrl: string;
  apiPort: number;
  identityId: string;
  environment: string;
  modules: Record<string, any>;
}

function readJson(file: string): any {
  const fullPath = path.join(process.cwd(), "config", file);
  const raw = fs.readFileSync(fullPath, "utf8");
  return JSON.parse(raw);
}

export async function loadConfig(): Promise<BeastConfig> {
  const environment = readJson("environment.json");
  const system = readJson("system.json");
  const modules = readJson("modules.json");
  const ports = readJson("ports.json");
  const identity = readJson("identity.json");

  return {
    apiUrl: system.apiUrl,
    apiPort: ports.dashboard,
    identityId: identity.defaultIdentity,
    environment: environment.mode,
    modules
  };
}
