import { useState, useEffect } from 'react';
import {
    Mail, Calendar, FileText, HardDrive, MessageSquare,
    Github, Zap, Check, ChevronRight,
    Globe, Shield, Clock, Sparkles, Bot, Workflow,
    ExternalLink, Star, Menu, X, Search, Code, Database,
    ShoppingBag, Image, Layers, PenTool, LayoutTemplate, Briefcase
} from 'lucide-react';

const GMAIL_LOGO = 'https://www.gstatic.com/marketing-cms/assets/images/66/ac/14b165e647fd85c824bfbe5d6bc5/gmail.webp=s96-fcrop64=1,00000000ffffffff-rw';
const GDRIVE_LOGO = 'https://logos.composio.dev/api/googledrive';
const SLACK_LOGO = 'https://logos.composio.dev/api/slack';
const GSHEETS_LOGO = 'https://logos.composio.dev/api/googlesheets';
const NOTION_LOGO = 'https://logos.composio.dev/api/notion';
const GITHUB_LOGO = 'https://cdn.simpleicons.org/github/white';
const GMEET_LOGO = 'https://logos.composio.dev/api/googlemeet';
const GCALENDAR_LOGO = 'https://logos.composio.dev/api/googlecalendar';
const EXCEL_LOGO = 'https://cdn.jsdelivr.net/gh/ComposioHQ/open-logos@master/Excel.png';
const GDOCS_LOGO = 'https://logos.composio.dev/api/googledocs';
const DISCORD_LOGO = 'https://logos.composio.dev/api/discord';
const TELEGRAM_LOGO = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/240px-Telegram_logo.svg.png';

/* ───────────────────── DATA FOR DYNAMIC UI ───────────────────── */
const examples = [
    { trigger: "a new row is added to my leads sheet", action: "research the company and add notes" },
    { trigger: "a GitHub issue is created", action: "post it to #dev Slack with priority label" },
    { trigger: "someone mentions us on X", action: "add it to our social tracker" },
    { trigger: "a support ticket arrives", action: "draft a reply using our FAQ" }
];

const tabs = ['Productivity', 'Communication', 'Development', 'Business', 'AI & More'];

const appsData = {
    'Popular Apps': [
        { name: 'Gmail', image: GMAIL_LOGO, color: '#EA4335', features: 13 },
        { name: 'Google Drive', image: GDRIVE_LOGO, color: '#0F9D58', features: 21 },
        { name: 'Slack', image: SLACK_LOGO, color: '#E01E5A', features: 20 },
        { name: 'Google Sheets', image: GSHEETS_LOGO, color: '#0F9D58', features: 23 },
        { name: 'Notion', image: NOTION_LOGO, color: '#FFFFFF', features: 28 },
        { name: 'GitHub', image: GITHUB_LOGO, color: '#FFFFFF', features: 17 },
        { name: 'Asana', icon: Check, color: '#F06A6A', features: 37 },
        { name: 'Salesforce', icon: Globe, color: '#00A1E0', features: 24 }
    ],
    'Productivity': [
        { name: 'Dropbox', icon: HardDrive, features: 11, beta: true },
        { name: 'Todoist', icon: Check, features: 14, beta: true },
        { name: 'Gmail', image: GMAIL_LOGO, features: 13, color: '#EA4335' },
        { name: 'Google Tasks', icon: Check, features: 14, beta: true, color: '#4285F4' },
        { name: 'OneDrive', icon: HardDrive, features: 13, beta: true, color: '#0078D4' },
        { name: 'Notion', image: NOTION_LOGO, features: 28 },
        { name: 'Outlook', icon: Mail, features: 20, beta: true, color: '#0078D4' },
        { name: 'Google Docs', image: GDOCS_LOGO, features: 26, beta: true, color: '#4285F4' },
        { name: 'api2pdf', icon: FileText, features: 5, beta: true },
        { name: 'Google Meet', image: GMEET_LOGO, features: 18, beta: true, color: '#00897B' },
        { name: 'Google Sheets', image: GSHEETS_LOGO, features: 23, beta: true, color: '#0F9D58' },
        { name: 'Google Calendar', image: GCALENDAR_LOGO, features: 31, beta: true, color: '#4285F4' },
    ],
    'Communication': [
        { name: 'Slack', image: SLACK_LOGO, features: 20, color: '#E01E5A' },
        { name: 'Discord', image: DISCORD_LOGO, features: 6, beta: true, color: '#5865F2' },
        { name: 'Twitter', icon: Globe, features: 28, beta: true, color: '#1DA1F2' },
        { name: 'Microsoft Teams', icon: MessageSquare, features: 20, beta: true, color: '#6264A7' },
        { name: 'WhatsApp', icon: MessageSquare, features: 15, beta: true, color: '#25D366' },
        { name: 'Intercom', icon: MessageSquare, features: 14, beta: true, color: '#1F8EEA' }
    ],
    'Development': [
        { name: 'AgentQL', icon: Code, features: 3, beta: true },
        { name: 'GitHub', image: GITHUB_LOGO, features: 17, beta: true },
        { name: 'Supabase', icon: Database, features: 31, beta: true, color: '#3ECF8E' },
        { name: 'GitLab', icon: Github, features: 28, beta: true, color: '#FC6D26' }
    ],
    'Business': [
        { name: 'Benchmark Email', icon: Mail, features: 13, beta: true },
        { name: 'Todoist', icon: Check, features: 14, beta: true },
        { name: 'Shopify', icon: ShoppingBag, features: 15, beta: true, color: '#96BF48' },
        { name: 'Google Tasks', icon: Check, features: 14, beta: true, color: '#4285F4' },
    ],
    'AI & More': [
        { name: 'Exa', icon: Zap, features: 12, beta: true },
        { name: 'Voo', icon: Zap, features: 5, beta: true },
        { name: 'Perplexity', icon: Search, features: 1, beta: true },
        { name: 'AtTest AI', icon: Check, features: 4, beta: true },
        { name: 'Canva', icon: Image, features: 28, beta: true, color: '#00C4CC' },
    ]
};

/* ───────────────────── COMPONENTS ───────────────────── */
const SetuLogo = ({ size = 'lg' }) => (
    <div className="flex flex-col">
        <div className="flex items-center">
            <div className={`bg-dark-600 border border-white/10 rounded-lg flex items-center gap-1.5 ${size === 'lg' ? 'px-3 py-1.5' : 'px-2 py-1'}`}>
                <span className={`${size === 'lg' ? 'text-xl' : 'text-base'} font-black tracking-wider text-white`}>SETU</span>
                <span className={`${size === 'lg' ? 'text-lg' : 'text-sm'} font-bold text-accent`} style={{ fontFamily: 'serif' }}>सेतु</span>
            </div>
        </div>
        <span className="text-[10px] tracking-[0.15em] text-white/35 mt-1.5 italic">Bridge of your digital world</span>
    </div>
);

const AppCard = ({ app }) => {
    const Icon = app.icon;
    return (
        <div className="bg-[#1C1C1C] border border-white/5 hover:border-white/20 hover:bg-[#222222] rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all group">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                    {app.image ? (
                        <img src={app.image} alt={app.name} className="w-5 h-5 object-contain" />
                    ) : (
                        <Icon size={20} style={{ color: app.color || '#FFFFFF' }} />
                    )}
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">{app.name}</span>
                        {app.beta && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#332211] text-[#FF8B5E] border border-[#FF6B35]/30">beta</span>
                        )}
                    </div>
                    <span className="text-xs text-white/40 group-hover:text-white/50 transition-colors">{app.features} features</span>
                </div>
            </div>
            <ChevronRight size={16} className="text-white/10 group-hover:text-white/30 transition-colors" />
        </div>
    )
};

const WorkflowNode = ({ label, icon: Icon, x, y, active, accent }) => (
    <div
        className={`absolute flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-500
      ${active ? 'bg-accent/20 border border-accent/40 text-accent shadow-lg shadow-accent/10' : 'bg-white/[0.06] border border-white/10 text-white/70'}
      ${accent ? 'ring-1 ring-accent/30' : ''}
    `}
        style={{ left: x, top: y }}
    >
        <Icon size={14} />
        {label}
    </div>
);

const integrationsList = [
    { name: 'Gmail', image: GMAIL_LOGO, color: '#EA4335' },
    { name: 'Google Calendar', image: GCALENDAR_LOGO, color: '#4285F4' },
    { name: 'Notion', image: NOTION_LOGO, color: '#FFFFFF' },
    { name: 'Google Drive', image: GDRIVE_LOGO, color: '#0F9D58' },
    { name: 'GitHub', image: GITHUB_LOGO, color: '#FFFFFF' },
    { name: 'Slack', image: SLACK_LOGO, color: '#E01E5A' },
];

const toolsGrid = [
    { name: 'Gmail', image: GMAIL_LOGO, color: '#EA4335', bg: 'bg-red-500/10' },
    { name: 'Calendar', image: GCALENDAR_LOGO, color: '#4285F4', bg: 'bg-blue-500/10' },
    { name: 'Notion', image: NOTION_LOGO, color: '#FFFFFF', bg: 'bg-white/5' },
    { name: 'Drive', image: GDRIVE_LOGO, color: '#0F9D58', bg: 'bg-green-500/10' },
    { name: 'Slack', image: SLACK_LOGO, color: '#E01E5A', bg: 'bg-pink-500/10' },
    { name: 'GitHub', image: GITHUB_LOGO, color: '#FFFFFF', bg: 'bg-white/5' },
    { name: 'Sheets', image: GSHEETS_LOGO, color: '#0F9D58', bg: 'bg-green-500/10' },
    { name: 'Discord', image: DISCORD_LOGO, color: '#5865F2', bg: 'bg-indigo-500/10' },
    { name: 'Telegram', image: TELEGRAM_LOGO, color: '#0079BF', bg: 'bg-blue-500/10' },
    { name: 'Docs', image: GDOCS_LOGO, color: '#0052CC', bg: 'bg-blue-600/10' },
    { name: 'Excel', image: EXCEL_LOGO, color: '#5E6AD2', bg: 'bg-indigo-500/10' },
    { name: 'More', icon: Sparkles, color: '#FF6B35', bg: 'bg-accent/10' },
];

/* ════════════════════════════════════════════════ */
/* MAIN COMPONENT                    */
/* ════════════════════════════════════════════════ */
export default function SetuLandingPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // State for the dynamic UI
    const [isAppsModalOpen, setIsAppsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Productivity');
    const [currentExampleIndex, setCurrentExampleIndex] = useState(0);

    // Cycle through text examples
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentExampleIndex((prev) => (prev + 1) % examples.length);
        }, 4000); // changes every 4 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-dark-900 text-white font-sans relative overflow-x-hidden">

            {/* ──────── AMBIENT BACKGROUND ──────── */}
            <div className="hero-glow fixed inset-0 pointer-events-none z-0" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-20 blur-[120px] bg-accent/20 pointer-events-none" />

            {/* ══════════════════ NAVBAR ══════════════════ */}
            <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 lg:px-20 py-5">
                <SetuLogo size="sm" />

                {/* Desktop center nav */}
                <div className="hidden md:flex items-center gap-8">
                    {['About', 'Product', 'Prices'].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                        >
                            {item}
                        </a>
                    ))}
                </div>

                {/* Desktop right buttons */}
                <div className="hidden md:flex items-center gap-3">
                    <button className="border border-white/20 hover:border-white/40 text-white/70 hover:text-white text-sm font-medium px-5 py-2 rounded-lg transition-all duration-200">
                        How it works
                    </button>
                    <button className="bg-accent hover:bg-accent-light text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-accent/25">
                        Get Started
                    </button>
                </div>

                {/* Mobile menu toggle */}
                <button
                    className="md:hidden text-white/70"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-dark-900/95 backdrop-blur-lg pt-20 px-6">
                    <div className="flex flex-col gap-6">
                        {['About', 'Product', 'Prices', 'How it works'].map((item) => (
                            <a key={item} href="#" className="text-lg text-white/70 hover:text-white transition-colors">
                                {item}
                            </a>
                        ))}
                        <button className="bg-accent text-white font-semibold px-6 py-3 rounded-lg w-full mt-4">
                            Get Started
                        </button>
                    </div>
                </div>
            )}

            {/* ══════════════════ HERO (Centered) ══════════════════ */}
            <section className="relative z-10 px-6 md:px-12 lg:px-20 pt-8 md:pt-10 pb-16 md:pb-24">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Headline */}
                    <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white leading-[1.2] md:leading-[1.15] tracking-[-0.02em]">
                        Describe any task in
                        <br className="hidden md:block" />
                        <span className="relative inline-block whitespace-nowrap mt-1 md:mt-0">
                            <span className="italic text-[#C9A96E]">plain English</span>
                            {/* Hand-drawn curved underline */}
                            <svg
                                className="absolute left-0 w-full h-[8px] md:h-[10px] -bottom-1 md:-bottom-1.5 text-[#C9A96E] opacity-90"
                                viewBox="0 0 200 12"
                                fill="none"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M3 9C50 3 150 3 197 9"
                                    stroke="currentColor"
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                    vectorEffect="non-scaling-stroke"
                                />
                            </svg>
                        </span>
                        .
                        <br className="hidden md:block" />
                        Our AI agents bridge Gmail, Calendar,
                        <br className="hidden md:block" />
                        and Notion, etc — automatically.
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-4 text-white/45 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                        Setu is a no-code AI agent platform that helps you automate your daily tasks.
                    </p>

                    {/* Dynamic Task Automation Card */}
                    <div className="mt-8 max-w-3xl mx-auto">
                        <div className="w-full bg-[#141414] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-left p-3">
                            <div className="bg-[#1A1A1A] rounded-xl border border-white/5 p-4 flex flex-col gap-4">

                                {/* When Input Line */}
                                <div className="flex items-center gap-3 bg-[#222222] border border-white/10 rounded-lg px-4 py-3 group focus-within:border-white/30 transition-colors">
                                    <span className="text-white/60 font-medium whitespace-nowrap">When</span>
                                    <div className="w-full relative h-6 overflow-hidden flex items-center">
                                        {/* Note: In a production app you'd use framer-motion or CSS transitions. Here we rely on simple state change to mimic the video. */}
                                        <span key={`trigger-${currentExampleIndex}`} className="text-white/90 w-full truncate animate-[fade-in_0.5s_ease-in-out]">
                                            {examples[currentExampleIndex].trigger}
                                        </span>
                                    </div>
                                    <PenTool size={16} className="text-white/20 flex-shrink-0 group-hover:text-white/40 cursor-pointer" />
                                </div>

                                {/* Automatically Input Line */}
                                <div className="flex items-center gap-3 bg-[#222222] border border-white/10 rounded-lg px-4 py-3 group focus-within:border-white/30 transition-colors">
                                    <span className="text-accent font-medium whitespace-nowrap">Automatically <span className="text-accent/60 ml-1">→</span></span>
                                    <div className="w-full relative h-6 overflow-hidden flex items-center">
                                        <span key={`action-${currentExampleIndex}`} className="text-white/90 w-full truncate animate-[fade-in_0.5s_ease-in-out]">
                                            {examples[currentExampleIndex].action}
                                        </span>
                                    </div>
                                    <PenTool size={16} className="text-white/20 flex-shrink-0 group-hover:text-white/40 cursor-pointer" />
                                </div>
                            </div>

                            {/* Bottom Toolbar */}
                            <div className="flex flex-wrap items-center justify-between px-2 py-3 mt-1 gap-4">
                                <div className="flex items-center gap-4">
                                    {/* Integrations button that opens Modal */}
                                    <button
                                        onClick={() => setIsAppsModalOpen(true)}
                                        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1.5 transition-colors group relative"
                                    >
                                        <div className="flex -space-x-1">
                                            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center border-2 border-[#141414] z-30"><Github size={12} color="black" /></div>
                                            <div className="w-5 h-5 rounded-full bg-[#4285F4] flex items-center justify-center border-2 border-[#141414] z-20"><Calendar size={12} color="white" /></div>
                                            <div className="w-5 h-5 rounded-full bg-[#0F9D58] flex items-center justify-center border-2 border-[#141414] z-10"><HardDrive size={12} color="white" /></div>
                                        </div>
                                        <span className="text-sm font-medium text-white/90">Integrations</span>

                                        {/* Simple tooltip on hover */}
                                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-semibold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                            Browse available apps
                                        </span>
                                    </button>

                                    <button className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors">
                                        <Zap size={14} className="text-white/40" />
                                        When something happens
                                        <ChevronRight size={14} className="rotate-90" />
                                    </button>
                                </div>

                                <button className="bg-accent hover:bg-accent-light text-white text-sm font-semibold px-6 py-2 rounded-lg transition-all flex items-center gap-2">
                                    <Sparkles size={16} />
                                    Create
                                </button>
                            </div>
                        </div>

                        {/* Helpful links below card */}
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-white/50">
                            Not sure where to start?
                            <button className="flex items-center gap-1 text-white hover:text-white/80 underline decoration-white/30 underline-offset-4">
                                <LayoutTemplate size={14} /> Browse templates
                            </button>
                            or
                            <button className="flex items-center gap-1 text-white hover:text-white/80 underline decoration-white/30 underline-offset-4">
                                <Search size={14} /> help me find a use-case
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════ NOT SURE SECTION ══════════════════ */}
            <div className="max-w-6xl mx-auto px-6 pt-16 md:pt-28">
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <section className="relative z-10 text-center px-6 py-16 md:py-24">
                <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-3">Not sure where to start?</p>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Not sure where to start?...
                </h2>
                <p className="text-white/50 mt-3 text-sm md:text-base max-w-md mx-auto">
                    Learn more AI agents that work in real use cases.
                </p>
            </section>

            {/* ══════════════════ FEATURE PANELS ══════════════════ */}
            <section className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">

                    {/* ── Panel 1: Integrations ── */}
                    <div className="glass-card p-5">
                        <h3 className="text-[11px] tracking-[0.15em] uppercase text-white/40 font-semibold mb-4">Integrations</h3>
                        <div className="space-y-2.5">
                            {integrationsList.map((item) => (
                                <div
                                    key={item.name}
                                    className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.04] hover:border-white/10 transition-all duration-200 group cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.06]">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="w-4 h-4 object-contain" />
                                            ) : (
                                                <item.icon size={16} style={{ color: item.color }} />
                                            )}
                                        </div>
                                        <span className="text-sm text-white/80 font-medium">{item.name}</span>
                                    </div>
                                    <ChevronRight size={14} className="text-white/20 group-hover:text-white/50 transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Panel 2: Live Workflow ── */}
                    <div className="glass-card p-5 relative overflow-hidden min-h-[340px]">
                        <h3 className="text-[11px] tracking-[0.15em] uppercase text-white/40 font-semibold mb-4">Live Workflow</h3>

                        {/* Workflow visualization */}
                        <div className="relative h-[280px]">
                            {/* Connection lines */}
                            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.6" />
                                        <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.15" />
                                    </linearGradient>
                                </defs>
                                <line x1="85" y1="45" x2="120" y2="105" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="4 3" />
                                <line x1="170" y1="130" x2="100" y2="190" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="4 3" />
                                <line x1="130" y1="215" x2="180" y2="255" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="4 3" />
                            </svg>

                            <WorkflowNode label="Trigger" icon={Zap} x="30px" y="20px" active />
                            <WorkflowNode label="Monitor" icon={Clock} x="100px" y="90px" accent />
                            <WorkflowNode label="Task" icon={Workflow} x="50px" y="170px" />
                            <WorkflowNode label="Notification" icon={Mail} x="140px" y="240px" active />
                        </div>
                    </div>

                    {/* ── Panel 3: Agent Output Preview ── */}
                    <div className="glass-card p-5">
                        <h3 className="text-[11px] tracking-[0.15em] uppercase text-white/40 font-semibold mb-4">Agent Output Preview</h3>

                        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                            <p className="text-xs text-white/40 mb-2 font-medium">Drafted email</p>
                            <div className="space-y-3 text-[13px] text-white/70 leading-relaxed">
                                <p>I want you to received your items in good condition after dispatch from our warehouse.</p>
                                <p>Please contact us immediately if you encounter any issues with packaging and delivery.</p>
                                <p>Thank you for your hectic active business.</p>
                                <p className="text-white/40 mt-1">Sincerely,</p>
                                <p className="text-white/40">Rushi.</p>
                            </div>
                            <div className="flex items-center gap-2 mt-5">
                                <button className="bg-accent/90 hover:bg-accent text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all flex items-center gap-1.5">
                                    <Check size={12} />
                                    Approve & Send
                                </button>
                                <button className="bg-white/[0.06] hover:bg-white/10 text-white/60 hover:text-white/80 text-xs font-medium px-4 py-2 rounded-lg transition-all border border-white/[0.06]">
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Terminal-style demo ── */}
                <div className="mt-6 glass-card p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 rounded-full bg-red-500/60" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                        <div className="w-3 h-3 rounded-full bg-green-500/60" />
                        <span className="ml-2 text-[11px] text-white/30 font-mono">setu-agent</span>
                    </div>
                    <div className="font-mono text-xs md:text-sm space-y-1.5 text-white/60">
                        <p><span className="text-green-400">›</span> <span className="text-accent/80">Result:</span> Checking calendar for conflicts...</p>
                        <p><span className="text-green-400">›</span> <span className="text-accent/80">Result:</span> <span className="text-white/40">google_calendar.get_events("next Tuesday")...</span></p>
                        <p><span className="text-green-400">›</span> <span className="text-green-400/80">✓</span> No conflicts found. Meeting scheduled successfully.</p>
                        <p className="flex items-center"><span className="text-green-400">›</span>&nbsp;<span className="cursor-blink text-accent">▊</span></p>
                    </div>
                </div>
            </section>

            {/* ══════════════════ CONNECT TOOLS ══════════════════ */}
            <section className="relative z-10 py-16 md:py-24">
                {/* Separator line */}
                <div className="max-w-6xl mx-auto px-6 mb-16">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                <div className="text-center px-6 mb-12">
                    <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-3">Connect your favorite tools</p>
                    <h2 className="text-2xl md:text-4xl font-bold">Connect your favorite tools</h2>
                    <p className="text-white/50 mt-3 text-sm md:text-base max-w-lg mx-auto">
                        Connect Setu agents to the workflow apps you already use.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto px-6">
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 md:gap-4">
                        {toolsGrid.map((tool) => (
                            <div
                                key={tool.name}
                                className="glass-card hover:bg-white/[0.08] flex flex-col items-center justify-center py-5 px-3 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 group"
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tool.bg} mb-2 transition-transform group-hover:scale-110`}>
                                    {tool.image ? (
                                        <img src={tool.image} alt={tool.name} className="w-5 h-5 object-contain" />
                                    ) : (
                                        <tool.icon size={20} style={{ color: tool.color }} />
                                    )}
                                </div>
                                <span className="text-[11px] text-white/50 group-hover:text-white/70 font-medium transition-colors">{tool.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════ FOOTER ══════════════════ */}
            <footer className="relative z-10 border-t border-white/[0.06] bg-dark-800/50">
                <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6">

                        {/* Brand column */}
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <Star size={20} className="text-accent" fill="#FF6B35" />
                                <span className="text-lg font-bold">Incredible</span>
                            </div>
                            <p className="text-xs text-white/30 leading-relaxed max-w-[200px]">
                                Build AI-agent lead users. Automate 5000+ custom use cases. All with AI.
                            </p>
                        </div>

                        {/* Links columns */}
                        {[
                            {
                                title: 'Product',
                                links: ['AI Agents', 'All Platforms', 'Virtual Assistant', 'Community'],
                            },
                            {
                                title: 'Company',
                                links: ['About Us', 'Contact', 'Affiliate Program', 'Onboard Community'],
                            },
                            {
                                title: 'Resources',
                                links: ['Learning Center', 'API Documentation', 'Security & Compliance', 'Shared Community'],
                            },
                            {
                                title: '',
                                links: ['', '', '', 'Send Feedback'],
                            },
                        ].map((col, i) => (
                            <div key={i}>
                                {col.title && (
                                    <h4 className="text-xs tracking-wider uppercase text-white/40 font-semibold mb-4">
                                        {col.title}
                                    </h4>
                                )}
                                <ul className="space-y-2.5">
                                    {col.links.filter(Boolean).map((link) => (
                                        <li key={link}>
                                            <a
                                                href="#"
                                                className="text-sm text-white/40 hover:text-white/70 transition-colors duration-200 flex items-center gap-1"
                                            >
                                                {link}
                                                {link === 'API Documentation' && <ExternalLink size={10} />}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Bottom bar */}
                    <div className="flex flex-col md:flex-row items-center justify-between mt-12 pt-8 border-t border-white/[0.05] gap-4">
                        <p className="text-xs text-white/25">
                            © 2025 Incredible, Inc. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-xs text-white/30 hover:text-white/50 transition-colors">Privacy Policy</a>
                            <a href="#" className="text-xs text-white/30 hover:text-white/50 transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* ══════════════════ APPS MODAL OVERLAY ══════════════════ */}
            {isAppsModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
                    {/* Dark backdrop */}
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsAppsModalOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative w-full max-w-5xl bg-[#141414] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">

                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/5">
                            <div className="flex-1 max-w-md relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search apps by name or feature..."
                                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-[#202020] transition-colors"
                                />
                            </div>
                            <div className="flex items-center gap-4 ml-4">
                                <span className="text-sm text-white/50 hidden md:inline-block">Your agents can work with any of these apps</span>
                                <button
                                    onClick={() => setIsAppsModalOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Tabs Navigation */}
                        <div className="flex overflow-x-auto border-b border-white/5 px-2">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab
                                        ? 'border-accent text-white'
                                        : 'border-transparent text-white/40 hover:text-white/70'
                                        }`}
                                >
                                    {tab === 'Productivity' && <Layers size={16} />}
                                    {tab === 'Communication' && <MessageSquare size={16} />}
                                    {tab === 'Development' && <Code size={16} />}
                                    {tab === 'Business' && <Briefcase size={16} />}
                                    {tab === 'AI & More' && <Sparkles size={16} />}
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Scrollable Content Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">

                            {/* Popular Apps Section (Shown when Productivity tab is active to match the video) */}
                            {activeTab === 'Productivity' && appsData['Popular Apps'] && (
                                <div>
                                    <h3 className="flex items-center gap-2 text-sm font-semibold text-white/90 mb-4">
                                        <Star size={16} className="text-yellow-500" fill="currentColor" />
                                        Popular Apps
                                        <span className="text-xs text-white/40 font-normal ml-2">Most used by agents</span>
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                        {appsData['Popular Apps'].map(app => (
                                            <AppCard key={`popular-${app.name}`} app={app} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Active Category Apps Section */}
                            <div>
                                <h3 className="text-sm font-semibold text-white/90 mb-4">{activeTab}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {appsData[activeTab]?.map(app => (
                                        <AppCard key={`${activeTab}-${app.name}`} app={app} />
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}