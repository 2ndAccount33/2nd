import { useState } from 'react';
import {
    Mail, Calendar, FileText, HardDrive, MessageSquare,
    Github, Zap, Check, ChevronRight,
    Globe, Shield, Clock, Sparkles, Bot, Workflow,
    ExternalLink, Star, Menu, X
} from 'lucide-react';

/* ───────────────────── LOGO ───────────────────── */
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

/* ───────────────── INTEGRATION ICONS ──────────── */
const integrationsList = [
    { name: 'Gmail', icon: Mail, color: '#EA4335' },
    { name: 'Google Calendar', icon: Calendar, color: '#4285F4' },
    { name: 'Notion', icon: FileText, color: '#FFFFFF' },
    { name: 'Google Drive', icon: HardDrive, color: '#0F9D58' },
    { name: 'GitHub', icon: Github, color: '#FFFFFF' },
    { name: 'Slack', icon: MessageSquare, color: '#E01E5A' },
];

const toolsGrid = [
    { name: 'Gmail', icon: Mail, color: '#EA4335', bg: 'bg-red-500/10' },
    { name: 'Calendar', icon: Calendar, color: '#4285F4', bg: 'bg-blue-500/10' },
    { name: 'Notion', icon: FileText, color: '#FFFFFF', bg: 'bg-white/5' },
    { name: 'Drive', icon: HardDrive, color: '#0F9D58', bg: 'bg-green-500/10' },
    { name: 'Slack', icon: MessageSquare, color: '#E01E5A', bg: 'bg-pink-500/10' },
    { name: 'GitHub', icon: Github, color: '#FFFFFF', bg: 'bg-white/5' },
    { name: 'Sheets', icon: FileText, color: '#0F9D58', bg: 'bg-green-500/10' },
    { name: 'Discord', icon: MessageSquare, color: '#5865F2', bg: 'bg-indigo-500/10' },
    { name: 'Trello', icon: Globe, color: '#0079BF', bg: 'bg-blue-500/10' },
    { name: 'Jira', icon: Zap, color: '#0052CC', bg: 'bg-blue-600/10' },
    { name: 'Linear', icon: Workflow, color: '#5E6AD2', bg: 'bg-indigo-500/10' },
    { name: 'More', icon: Sparkles, color: '#FF6B35', bg: 'bg-accent/10' },
];

/* ───────────────── WORKFLOW NODE ──────────────── */
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

/* ════════════════════════════════════════════════ */
/*               MAIN COMPONENT                    */
/* ════════════════════════════════════════════════ */
export default function SetuLandingPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <section className="relative z-10 px-6 md:px-12 lg:px-20 pt-12 md:pt-20 pb-16 md:pb-24">
                <div className="max-w-4xl mx-auto text-center">

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4rem] font-extrabold leading-[1.1] tracking-tight">
                        Describe any task in{' '}
                        <span className="italic font-serif text-[#C9A96E]">plain English</span>.
                        <br className="hidden sm:block" />
                        Our AI agents bridge Gmail, Calendar,
                        <br className="hidden sm:block" />
                        and Notion, etc —automatically.
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-6 text-white/45 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                        Setu is a no-code AI agent platform that helps you automate your daily tasks.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <button className="bg-accent hover:bg-accent-light text-white font-semibold px-7 py-3 rounded-full transition-all duration-200 flex items-center gap-2 hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-0.5 text-sm">
                            Get Started
                            <span className="ml-1">→</span>
                        </button>
                        <button className="border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-semibold px-7 py-3 rounded-full transition-all duration-200 flex items-center gap-2 hover:-translate-y-0.5 text-sm">
                            Watch Demo
                        </button>
                    </div>

                    {/* Task Automation Card */}
                    <div className="mt-12 max-w-lg mx-auto">
                        <div className="w-full bg-dark-700/80 border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/40 overflow-hidden text-left">
                            {/* Trigger row */}
                            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                                <div className="flex items-center gap-2">
                                    <span className="text-white/40 text-sm font-medium">When</span>
                                    <span className="text-white/70 text-sm">a new lead signs up</span>
                                </div>
                                <button className="text-white/20 hover:text-white/40 transition-colors">
                                    <ExternalLink size={14} />
                                </button>
                            </div>

                            {/* Action row */}
                            <div className="px-5 py-4 border-b border-white/[0.06]">
                                <div className="flex items-center gap-2">
                                    <span className="text-accent font-semibold text-sm">Automatically</span>
                                    <span className="text-accent/50">→</span>
                                    <span className="text-white/60 text-sm">research their company and notify me on Slack</span>
                                    <button className="ml-auto text-white/20 hover:text-white/40 transition-colors flex-shrink-0">
                                        <ExternalLink size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Bottom toolbar */}
                            <div className="flex items-center justify-between px-5 py-3 bg-dark-800/50">
                                <div className="flex items-center gap-3">
                                    {/* Integration dots */}
                                    <div className="flex items-center gap-1">
                                        <div className="w-4 h-4 rounded-full bg-yellow-500/80" />
                                        <div className="w-4 h-4 rounded-full bg-blue-500/80" />
                                        <div className="w-4 h-4 rounded-full bg-green-500/80" />
                                    </div>
                                    <span className="text-xs text-white/50 font-medium">Integrations</span>

                                    {/* Divider */}
                                    <div className="w-px h-4 bg-white/10" />

                                    {/* When something happens */}
                                    <button className="flex items-center gap-1 text-xs text-white/50 hover:text-white/70 transition-colors">
                                        <Sparkles size={12} className="text-white/40" />
                                        When something happens
                                        <ChevronRight size={12} className="rotate-90" />
                                    </button>
                                </div>

                                {/* Create button */}
                                <button className="bg-accent hover:bg-accent-light text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1 hover:shadow-lg hover:shadow-accent/25">
                                    <Zap size={11} />
                                    Create
                                </button>
                            </div>
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
                                            <item.icon size={16} style={{ color: item.color }} />
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
                                {/* Line from Trigger to Monitor */}
                                <line x1="85" y1="45" x2="120" y2="105" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="4 3" />
                                {/* Line from Monitor to Task */}
                                <line x1="170" y1="130" x2="100" y2="190" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="4 3" />
                                {/* Line from Task to Notification */}
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
                                    <tool.icon size={20} style={{ color: tool.color }} />
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
        </div>
    );
}
