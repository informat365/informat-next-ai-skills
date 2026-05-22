#!/usr/bin/env node

/**
 * Informat Platform - Unified System Method Calling
 * Usage:
 *   call_informat.js <methodName> --file params.json
 *   call_informat.js <methodName> '{"key":"value"}'
 *   call_informat.js <methodName>
 *   call_informat.js <methodName> --appId <appId> --file params.json
 *   call_informat.js <methodName> --appId <appId> '{"key":"value"}'
 *   call_informat.js <methodName> --appId <appId>
 */

var https = require("https");
var http = require("http");
var fs = require("fs");
var nodePath = require("path");
var urlMod = require("url");

// ---- Load configuration from .env file ----
function loadEnv() {
  var envPath = nodePath.join(__dirname, ".env");
  var config = {};
  try {
    var lines = fs.readFileSync(envPath, "utf-8").split("\n");
    for (var i = 0; i < lines.length; i++) {
      var trimmed = lines[i].trim();
      if (!trimmed || trimmed.charAt(0) === "#") continue;
      var idx = trimmed.indexOf("=");
      if (idx === -1) continue;
      config[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
    }
  } catch (e) {
    console.error("Failed to read .env file: " + envPath);
    process.exit(1);
  }
  return config;
}

// ---- HTTP POST (with 60s timeout) ----
function post(targetUrl, headers, body, callback) {
  var parsed = new urlMod.URL(targetUrl);
  var mod = parsed.protocol === "https:" ? https : http;
  var req = mod.request(parsed, {
    method: "POST",
    headers: Object.assign({}, headers, { "Content-Length": Buffer.byteLength(body) }),
    timeout: 60000,
  }, function (res) {
    var chunks = [];
    res.on("data", function (c) { chunks.push(c); });
    res.on("end", function () {
      var text = Buffer.concat(chunks).toString("utf-8");
      if (res.statusCode < 200 || res.statusCode >= 300) {
        callback(new Error("Request failed (" + res.statusCode + "): " + text));
      } else {
        callback(null, text);
      }
    });
  });
  req.on("timeout", function () { req.destroy(new Error("Request timed out after 60s")); });
  req.on("error", function (e) { callback(e); });
  req.write(body);
  req.end();
}

// ---- Main Flow ----
var cliArgs = process.argv.slice(2);

if (cliArgs.length === 0 || cliArgs[0] === "-h" || cliArgs[0] === "--help") {
  console.error("Usage:");
  console.error("  call_informat.js <methodName> --file params.json");
  console.error("  call_informat.js <methodName> '{\"key\":\"value\"}'");
  console.error("  call_informat.js <methodName>");
  console.error("  call_informat.js <methodName> --appId <appId> --file params.json");
  console.error("  call_informat.js <methodName> --appId <appId> '{\"key\":\"value\"}'");
  console.error("  call_informat.js <methodName> --appId <appId>");
  console.error("\nNote:");
  console.error("  - Methods starting with _company automatically use the team agent interface");
  console.error("  - Common methods (e.g. _get_current_time, _javascript_eval) don't require --appId");
  console.error("  - Other methods require --appId and use the application agent interface");
  process.exit(2);
}

var methodName = cliArgs[0];
var restArgs = cliArgs.slice(1);

// Parse named arguments
var methodArgs = {};
var appId = null;
var fileUsed = false;
var positionalArgs = [];

function requireNextArg(flag, index) {
  var next = restArgs[index + 1];
  if (!next || next.charAt(0) === "-") {
    console.error("Missing value after " + flag);
    process.exit(1);
  }
  return next;
}

for (var i = 0; i < restArgs.length; i++) {
  if (restArgs[i] === "--appId" || restArgs[i] === "--appid") {
    appId = requireNextArg("--appId", i);
    i++;
  } else if (restArgs[i] === "--file" || restArgs[i] === "-f") {
    var filePath = nodePath.resolve(requireNextArg("--file", i));
    i++;
    try {
      methodArgs = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      fileUsed = true;
    } catch (e) {
      console.error("Failed to read/parse file: " + filePath + " - " + e.message);
      process.exit(1);
    }
  } else {
    positionalArgs.push(restArgs[i]);
  }
}

// If no params from --file, try parsing positional arg as JSON
if (!fileUsed && positionalArgs.length > 0) {
  try { methodArgs = JSON.parse(positionalArgs[0]); } catch (e) { console.error("Invalid JSON: " + e.message); process.exit(1); }
}

// Common methods that don't require --appId
var noAppIdMethods = [
  "_read_office_file", "_read_informat_script_sdk", "_read_informat_expression_doc",
  "_list_informat_markdown", "_read_informat_markdown", "_app_get_web_url", "_app_doc",
  "_web_content", "_javascript_eval", "_render_html", "_get_current_time",
  "_get_current_user", "_send_system_email"
];
function isNoAppIdMethod(name) {
  for (var j = 0; j < noAppIdMethods.length; j++) {
    if (name === noAppIdMethods[j]) return true;
  }
  return false;
}

// Check if appId is required
if (!methodName.startsWith("_company") && !methodName.startsWith("_wb_") && !isNoAppIdMethod(methodName) && !appId) {
  console.error("Missing --appId. Usage: call_informat.js <methodName> --appId <appId>");
  process.exit(1);
}

var env = loadEnv();
var host = (process.env.INFORMAT_HOST || env.INFORMAT_HOST || "").trim();
if (!host) { console.error("Missing INFORMAT_HOST"); process.exit(1); }
var agentToken = (process.env.INFORMAT_AGENT_TOKEN || env.INFORMAT_AGENT_TOKEN || "").trim();
if (!agentToken) { console.error("Missing INFORMAT_AGENT_TOKEN"); process.exit(1); }
if (host.charAt(host.length - 1) !== "/") host += "/";

// Build API path
var apiPath;
if (methodName.startsWith("_company")) {
  apiPath = "web0/aiagent/company_agent";
} else if (methodName.startsWith("_wb_")) {
  apiPath = "web0/aiagent/wb_agent";
} else if (appId) {
  apiPath = "web0/aiagent/app_agent/" + appId;
} else {
  apiPath = "web0/aiagent/common_agent";
}

var url = host + apiPath;
var body = JSON.stringify({
  jsonrpc: "2.0", id: 1,
  params: { name: methodName, arguments: methodArgs },
});

post(url, {
  "Content-Type": "application/json",
  "X-INFORMAT-AGENT-TOKEN": agentToken,
}, body, function (err, text) {
  if (err) { console.error(err.message); process.exit(1); }
  var data;
  try { data = JSON.parse(text); } catch (e) { console.log(text); return; }
  if (data.error) {
    console.error("Error (" + data.error.code + "): " + data.error.message);
    process.exit(1);
  }
  var contents = (data.result && data.result.content) || [];
  for (var i = 0; i < contents.length; i++) {
    var item = contents[i];
    if (item.type === "text") {
      try { console.log(JSON.stringify(JSON.parse(item.text), null, 2)); } catch (_) { console.log(item.text); }
    } else {
      console.log(JSON.stringify(item, null, 2));
    }
  }
});
