"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Copy, Check, Sparkles, Terminal, FileCode, ShieldAlert, CheckCircle2, RotateCcw } from "lucide-react";

interface Preset {
  id: string;
  name: string;
  category: string;
  requirement: string;
  functional: string[];
  boundary: string[];
  negative: string[];
  jestCode: string;
}

const PRESETS: Preset[] = [
  {
    id: "stripe-sub",
    name: "Stripe Subscription & Webhook Flow",
    category: "Fintech / Stripe",
    requirement:
      "When a customer upgrades to Pro tier, create a Stripe Checkout session. Listen for customer.subscription.updated and invoice.payment_succeeded webhooks. Ensure idempotency, grant instant access in Redis session cache, and send confirmation email.",
    functional: [
      "Verifies Checkout session URL is generated with valid metadata and user ID",
      "Webhook endpoint validates stripe-signature header against webhook secret",
      "Updates user tier in MySQL and sets cache key `user:{id}:tier` in Redis with TTL 3600s",
      "Emits `SUBSCRIPTION_ACTIVATED` event with transaction reference",
    ],
    boundary: [
      "Handles concurrent webhook retries for duplicate event IDs idempotently",
      "Gracefully handles clock skew in Stripe signature timestamp (±300 seconds)",
      "Handles user cancellation initiated immediately after subscription creation",
    ],
    negative: [
      "Rejects incoming requests with invalid or tampered `stripe-signature` (400 Bad Request)",
      "Rejects unauthenticated webhook endpoints from non-Stripe IP ranges",
      "Handles declined credit card webhook event without granting premium entitlements",
    ],
    jestCode: `describe('Stripe Webhook Handler & Tier Provisioning', () => {
  it('should process invoice.payment_succeeded and update Redis cache', async () => {
    const mockPayload = { id: 'evt_test_123', type: 'invoice.payment_succeeded' };
    const signature = generateStripeSignature(mockPayload, process.env.STRIPE_WEBHOOK_SECRET);

    const res = await request(app)
      .post('/api/webhooks/stripe')
      .set('stripe-signature', signature)
      .send(mockPayload);

    expect(res.status).toBe(200);
    const cachedTier = await redisClient.get('user:u_9841:tier');
    expect(cachedTier).toBe('PRO_TIER');
  });

  it('should reject requests with invalid signature', async () => {
    const res = await request(app)
      .post('/api/webhooks/stripe')
      .set('stripe-signature', 'invalid_sig')
      .send({});
    expect(res.status).toBe(400);
  });
});`,
  },
  {
    id: "rbac-middleware",
    name: "RBAC & JWT Route Guard",
    category: "Security & Auth",
    requirement:
      "Enforce Role-Based Access Control (RBAC) middleware for `/api/admin/*` endpoints. Verify Bearer JWT token, extract user role, check against required permissions array, and handle expired/blacklisted tokens stored in Redis.",
    functional: [
      "Extracts and decodes JWT from Authorization: Bearer <token>",
      "Checks role against route requirement (e.g., 'ADMIN' or 'SUPER_ADMIN')",
      "Appends sanitized user context to `req.user` for downstream controllers",
    ],
    boundary: [
      "Accepts tokens generated within 1 second of expiration without race condition",
      "Handles multi-role arrays where user holds 1 of 3 authorized roles",
    ],
    negative: [
      "Returns 401 Unauthorized if Bearer token is missing or malformed",
      "Returns 403 Forbidden if user role is 'CUSTOMER' attempting to access admin route",
      "Returns 401 Unauthorized if token JTI is listed in Redis token blacklist",
    ],
    jestCode: `describe('RBAC Middleware Guard', () => {
  it('allows access when user has required ADMIN role', async () => {
    const token = signJWT({ id: 1, role: 'ADMIN' });
    const res = await request(app)
      .get('/api/admin/metrics')
      .set('Authorization', \`Bearer \${token}\`);
    expect(res.status).toBe(200);
  });

  it('blocks access with 403 when user is regular CUSTOMER', async () => {
    const token = signJWT({ id: 2, role: 'CUSTOMER' });
    const res = await request(app)
      .get('/api/admin/metrics')
      .set('Authorization', \`Bearer \${token}\`);
    expect(res.status).toBe(403);
    expect(res.body.error).toMatch(/Insufficient permissions/);
  });
});`,
  },
  {
    id: "skpearls-filter",
    name: "SKPearls Multi-Attribute Filter & Cache",
    category: "E-Commerce / Performance",
    requirement:
      "Filter luxury pearl catalogue by variety (Akoya, Tahitian, South Sea), grade, price range, and in-stock status. Check Redis cache key `catalog:hash` first; if cache miss, query MySQL with compound indexing and write back to Redis.",
    functional: [
      "Returns filtered results matching query parameters with pagination metadata",
      "Cache hit returns data within 15ms without touching MySQL database",
      "Cache miss queries indexed MySQL table and populates Redis with 600s TTL",
    ],
    boundary: [
      "Handles zero-match filters with empty array and HTTP 200 (not 404)",
      "Handles page=1&limit=100 boundary constraints safely",
      "Sorts correctly across duplicate price points",
    ],
    negative: [
      "Rejects SQL injection in variety query param via parameterized sanitation",
      "Rejects negative price range filters (min_price < 0)",
      "Falls back to direct DB query without crashing if Redis connection times out",
    ],
    jestCode: `describe('SKPearls Catalog Query & Redis Cache', () => {
  it('serves cached response on warm cache hit', async () => {
    const spy = jest.spyOn(db, 'query');
    const res = await request(app).get('/api/products?variety=Tahitian&grade=AAA');
    
    expect(res.status).toBe(200);
    expect(res.headers['x-cache']).toBe('HIT');
    expect(spy).not.toHaveBeenCalled();
  });
});`,
  },
];

export function TestForgeDemo() {
  const [selectedPreset, setSelectedPreset] = useState<Preset>(PRESETS[0]);
  const [requirementInput, setRequirementInput] = useState<string>(PRESETS[0].requirement);
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamProgress, setStreamProgress] = useState(100);
  const [activeTab, setActiveTab] = useState<"functional" | "boundary" | "negative" | "code">("functional");
  const [copied, setCopied] = useState(false);
  const [streamedLines, setStreamedLines] = useState<string[]>(PRESETS[0].functional);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSelectPreset = (preset: Preset) => {
    setSelectedPreset(preset);
    setRequirementInput(preset.requirement);
    setStreamProgress(100);
    setStreamedLines(preset.functional);
    setActiveTab("functional");
  };

  const handleRunGeneration = () => {
    setIsGenerating(true);
    setStreamProgress(0);
    setStreamedLines([]);

    let current = 0;
    const allLines = selectedPreset.functional;

    const interval = setInterval(() => {
      current += 1;
      setStreamProgress(Math.min(100, Math.round((current / allLines.length) * 100)));
      setStreamedLines(allLines.slice(0, current));

      if (current >= allLines.length) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 450);
  };

  const copyCode = () => {
    const content =
      activeTab === "code"
        ? selectedPreset.jestCode
        : selectedPreset[activeTab].map((item, idx) => `${idx + 1}. ${item}`).join("\n");
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-slate-950/60 px-5 py-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20">
            <div className="h-full w-full rounded-xl bg-slate-950 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight">Test Forge AI</h3>
              <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[11px] font-semibold text-cyan-400 border border-cyan-500/20">
                Live Work Interactive Engine
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Automated QA test suite generation powered by LLM parsing & Jest/RTL export
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            LLM Pipeline Online (60% QA effort saved)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
        {/* Left Column: Preset Selector & Requirement Input */}
        <div className="lg:col-span-5 p-5 space-y-4 bg-slate-950/30">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between mb-2">
              <span>Select Architecture Requirement</span>
              <span className="text-[11px] text-indigo-400">Click to load preset</span>
            </label>
            <div className="space-y-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-sm flex items-start justify-between ${
                    selectedPreset.id === preset.id
                      ? "border-indigo-500/60 bg-indigo-500/10 text-white shadow-md shadow-indigo-500/5"
                      : "border-white/5 bg-slate-900/40 text-slate-300 hover:border-white/20 hover:bg-slate-900/80"
                  }`}
                >
                  <div>
                    <div className="font-medium text-slate-100">{preset.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{preset.category}</div>
                  </div>
                  {selectedPreset.id === preset.id && (
                    <span className="h-2 w-2 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              Feature Specification / PRD Prompt
            </label>
            <textarea
              value={requirementInput}
              onChange={(e) => setRequirementInput(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-white/10 bg-slate-950/80 p-3 text-xs font-mono text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
              placeholder="Enter user story, API contract, or functional requirement..."
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRunGeneration}
              disabled={isGenerating}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating Test Matrix ({streamProgress}%)
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" />
                  Run AI Test Generation
                </>
              )}
            </button>
            <button
              onClick={() => handleSelectPreset(selectedPreset)}
              title="Reset demo"
              className="p-2.5 rounded-xl border border-white/10 bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/20 p-3 text-[11px] text-slate-300 leading-relaxed">
            <span className="font-semibold text-indigo-300">Engineering Fact:</span> In production, Akhil integrated
            OpenAI streaming APIs with Node.js/Express, cutting test authoring time by <strong className="text-cyan-300">60%</strong> and saving QA teams ~18 hours per sprint.
          </div>
        </div>

        {/* Right Column: Streaming Output & Matrix View */}
        <div className="lg:col-span-7 flex flex-col bg-slate-950/50 min-h-[380px]">
          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-slate-900/40 px-4 py-2">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab("functional")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "functional"
                    ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Functional ({selectedPreset.functional.length})
              </button>
              <button
                onClick={() => setActiveTab("boundary")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "boundary"
                    ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                Edge & Boundary ({selectedPreset.boundary.length})
              </button>
              <button
                onClick={() => setActiveTab("negative")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "negative"
                    ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <ShieldAlert className="h-3.5 w-3.5 text-amber-400" />
                Security / Negative ({selectedPreset.negative.length})
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "code"
                    ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <FileCode className="h-3.5 w-3.5 text-emerald-400" />
                Jest Spec
              </button>
            </div>

            <button
              onClick={copyCode}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-900/60 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:bg-slate-800 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Terminal Content */}
          <div className="p-4 flex-1 overflow-y-auto max-h-[380px] font-mono text-xs text-slate-300">
            {activeTab === "code" ? (
              <pre className="p-3 rounded-xl bg-slate-950 border border-white/5 text-emerald-300 font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre">
                {selectedPreset.jestCode}
              </pre>
            ) : (
              <div className="space-y-2.5">
                {(activeTab === "functional"
                  ? isGenerating
                    ? streamedLines
                    : selectedPreset.functional
                  : activeTab === "boundary"
                  ? selectedPreset.boundary
                  : selectedPreset.negative
                ).map((testCase, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <span className="shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="space-y-1">
                      <p className="text-slate-200 leading-snug">{testCase}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500">
                        <span className="text-emerald-400 font-semibold">✓ Automated Test Ready</span>
                        <span>•</span>
                        <span>Severity: High</span>
                        <span>•</span>
                        <span>Status: Verified</span>
                      </div>
                    </div>
                  </div>
                ))}

                {isGenerating && activeTab === "functional" && (
                  <div className="flex items-center gap-2 p-2 text-indigo-400 text-xs animate-pulse">
                    <Terminal className="h-3.5 w-3.5" />
                    <span>Streaming test cases from OpenAI engine...</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Metric bar */}
          <div className="border-t border-white/5 bg-slate-950/80 px-4 py-2.5 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-4">
              <span>Token Speed: <strong className="text-white">92 tok/s</strong></span>
              <span>Latency: <strong className="text-cyan-400">380ms</strong></span>
              <span>Parser: <strong className="text-emerald-400">AST Schema Validator</strong></span>
            </div>
            <span className="text-slate-500 font-sans hidden sm:inline">Built with React + Next.js App Router + TypeScript</span>
          </div>
        </div>
      </div>
    </div>
  );
}
