import {
  Archive,
  ArrowLeft,
  ArrowRight,
  Forward,
  Mail,
  MoreHorizontal,
  Paperclip,
  Plus,
  Reply,
  Search,
  Send,
  Star,
  Trash2,
  X,
} from "lucide-react"

export default function EmailClient() {
  return (
    <div className="border-border rounded-xl border-2 p-[3px] transition duration-200 hover:shadow-xl">
      <div className="bg-background text-foreground flex h-screen">
        {/* Left Sidebar */}
        {/* Left Sidebar */}
        <div className="bg-card flex w-64 flex-col">
          {/* Profile Section */}
          <div className="border-border border-r border-b p-4">
            <div className="flex items-center gap-3">
              <div className="text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full [background-image:var(--blue-glossy)] text-sm font-medium">
                B
              </div>
              <div>
                <div className="text-sm font-medium">Baked Design</div>
                <div className="text-muted-foreground text-xs">
                  work@baked.design
                </div>
              </div>
            </div>
          </div>

          {/* New Email Button */}
          <div className="border-r p-4">
            <button className="bg-muted hover:bg-accent text-foreground flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium">
              <Mail className="h-4 w-4" />
              New email
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 border-r px-4">
            <div className="text-muted-foreground mb-2 text-xs font-medium">
              Core
            </div>
            <nav className="space-y-1">
              <div className="bg-accent text-accent-foreground flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4" />
                  Inbox
                </div>
                <span className="bg-muted rounded px-2 py-0.5 text-xs">
                  281
                </span>
              </div>
              <div className="text-muted-foreground hover:text-foreground hover:bg-accent flex items-center gap-3 rounded-lg px-3 py-2 text-sm">
                <Star className="h-4 w-4" />
                Favorites
              </div>
              <div className="text-muted-foreground hover:text-foreground hover:bg-accent flex items-center justify-between rounded-lg px-3 py-2 text-sm">
                <div className="flex items-center gap-3">
                  <Send className="h-4 w-4" />
                  Drafts
                </div>
                <span className="text-xs">13</span>
              </div>
              <div className="text-muted-foreground hover:text-foreground hover:bg-accent flex items-center gap-3 rounded-lg px-3 py-2 text-sm">
                <Send className="h-4 w-4" />
                Sent
              </div>
            </nav>

            <div className="text-muted-foreground mt-6 mb-2 text-xs font-medium">
              Management
            </div>
            <nav className="space-y-1">
              <div className="text-muted-foreground hover:text-foreground hover:bg-accent flex items-center gap-3 rounded-lg px-3 py-2 text-sm">
                <Archive className="h-4 w-4" />
                Archive
              </div>
              <div className="text-muted-foreground hover:text-foreground hover:bg-accent flex items-center justify-between rounded-lg px-3 py-2 text-sm">
                <div className="flex items-center gap-3">
                  <Trash2 className="h-4 w-4" />
                  Spam
                </div>
                <span className="text-xs">24</span>
              </div>
              <div className="text-muted-foreground hover:text-foreground hover:bg-accent flex items-center gap-3 rounded-lg px-3 py-2 text-sm">
                <Trash2 className="h-4 w-4" />
                Bin
              </div>
            </nav>
          </div>
        </div>

        {/* Center Panel - Email List */}
        <div className="bg-card border-border flex w-96 flex-col border-r">
          {/* Header */}
          <div className="border-border border-b px-4 py-4">
            <div className="mb-4 flex items-center gap-3">
              <Mail className="h-5 w-5" />
              <span className="font-medium">Inbox</span>
              <div className="ml-auto flex items-center gap-1">
                <button className="hover:bg-accent rounded p-1">
                  <div className="flex h-4 w-4 items-center justify-center rounded-sm border border-current">
                    <div className="h-2 w-2 rounded-sm bg-current"></div>
                  </div>
                </button>
                <span className="text-muted-foreground text-sm">Select</span>
                <MoreHorizontal className="text-muted-foreground ml-2 h-4 w-4" />
                <X className="text-muted-foreground h-4 w-4" />
                <ArrowLeft className="text-muted-foreground h-4 w-4" />
                <ArrowRight className="text-muted-foreground h-4 w-4" />
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <input
                type="text"
                placeholder="Search"
                className="bg-input border-border w-full rounded-lg border py-2 pr-4 pl-10 text-sm"
              />
              <span className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 transform text-xs">
                ⌘K
              </span>
            </div>

            {/* Filter Buttons */}
            <div className="mt-4 flex items-center gap-2">
              <button className="text-primary-foreground flex items-center gap-1 rounded-lg [background-image:var(--blue-glossy)] px-3 py-1 text-sm font-medium">
                <div className="h-2 w-2 rounded-full [background-image:var(--orange-glossy)]"></div>
                Primary
              </button>
              <button className="text-muted-foreground hover:text-foreground flex items-center gap-1 rounded-lg px-3 py-1 text-sm">
                <div className="h-2 w-2 rounded-full border border-current"></div>
                <div className="h-2 w-2 rounded-full border border-current"></div>
              </button>
              <button className="text-muted-foreground hover:text-foreground flex items-center gap-1 rounded-lg px-3 py-1 text-sm">
                <div className="h-2 w-2 rounded-full border border-current"></div>
              </button>
              <button className="text-muted-foreground hover:text-foreground rounded-lg px-3 py-1 text-sm">
                <div className="h-2 w-2 rounded-full border border-current"></div>
              </button>
            </div>
          </div>

          {/* Email List */}
          {/* Use "overflow-y-auto scrollbar-hide" to activate scrolling, "overflow-hidden" to disable scrolling */}
          <div className="flex-1 overflow-hidden">
            {/* Pinned Section */}
            <div className="p-4">
              <div className="text-muted-foreground mb-3 text-xs font-medium">
                Pinned (3)
              </div>

              {/* Pinned Email */}
              <div className="hover:bg-accent mb-2 flex items-start gap-3 rounded-lg p-3">
                <div className="text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full [background-image:var(--orange-glossy)] text-sm font-medium">
                  B
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center">
                    <span className="text-sm font-medium">
                      All from Baked [9]
                    </span>
                  </div>
                  <div className="text-muted-foreground text-xs">
                    New design review
                  </div>
                </div>
                <div className="ml-auto flex flex-col items-end justify-between py-1">
                  <span className="text-muted-foreground text-xs">Mar 29</span>
                  <div className="mt-4 flex gap-1">
                    <div className="h-2 w-2 rounded-full [background-image:var(--green-glossy)]"></div>
                  </div>
                </div>
              </div>

              <div className="hover:bg-accent mb-2 flex items-start gap-3 rounded-lg p-3">
                <div className="bg-muted text-muted-foreground flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium">
                  <div className="bg-muted-foreground h-4 w-4 rounded-full"></div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center">
                    <span className="text-sm font-medium">
                      Alex, Ali, Sarah [6]
                    </span>
                  </div>
                  <div className="text-muted-foreground text-xs">
                    Re: Design review fee...
                  </div>
                </div>
                <div className="ml-auto flex flex-col items-end justify-between py-1">
                  <span className="text-muted-foreground text-xs">Mar 28</span>
                  <div className="mt-4 flex gap-1">
                    <div className="h-2 w-2 rounded-full [background-image:var(--green-glossy)]"></div>
                    <div className="h-2 w-2 rounded-full [background-image:var(--purple-glossy)]"></div>
                  </div>
                </div>
              </div>

              <div className="hover:bg-accent mb-2 flex items-start gap-3 rounded-lg p-3">
                <div className="bg-card border-border flex h-8 w-8 items-center justify-center rounded-full border">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center">
                    <span className="text-sm font-medium">GitHub [8]</span>
                  </div>
                  <div className="text-muted-foreground text-xs">
                    Security alert: Criti...
                  </div>
                </div>
                <div className="ml-auto flex flex-col items-end justify-between py-1">
                  <span className="text-muted-foreground text-xs">Mar 28</span>
                  <div className="mt-4 flex gap-1">
                    <div className="h-2 w-2 rounded-full [background-image:var(--green-glossy)]"></div>
                    <div className="h-2 w-2 rounded-full [background-image:var(--green-glossy)]"></div>
                    <div className="h-2 w-2 rounded-full [background-image:var(--green-glossy)]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Section */}
            <div className="p-4">
              <div className="text-muted-foreground mb-3 text-xs font-medium">
                Primary (278)
              </div>

              <div className="hover:bg-accent mb-2 flex items-start gap-3 rounded-lg p-3">
                <div className="text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full [background-image:var(--purple-glossy)] text-sm font-medium">
                  S
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center">
                    <span className="text-sm font-medium">Stripe</span>
                  </div>
                  <div className="text-muted-foreground text-xs">
                    Payment confirmation...
                  </div>
                </div>
                <div className="ml-auto flex flex-col items-end justify-between py-1">
                  <span className="text-muted-foreground text-xs">Mar 29</span>
                  <div className="mt-4 flex gap-1">
                    <div className="h-2 w-2 rounded-full [background-image:var(--yellow-glossy)]"></div>
                    <div className="h-2 w-2 rounded-full [background-image:var(--yellow-glossy)]"></div>
                  </div>
                </div>
              </div>

              <div className="hover:bg-accent mb-2 flex items-start gap-3 rounded-lg p-3">
                <div className="text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full [background-image:var(--red-glossy)] text-sm font-medium shadow-md">
                  N
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center">
                    <span className="text-sm font-medium">Netflix</span>
                  </div>
                  <div className="text-muted-foreground text-xs">
                    New shows added to ...
                  </div>
                </div>
                <div className="ml-auto flex flex-col items-end justify-between py-1">
                  <span className="text-muted-foreground text-xs">Mar 29</span>
                  <div className="mt-4 flex gap-1">
                    <div className="h-2 w-2 rounded-full [background-image:var(--green-glossy)]"></div>
                    <div className="h-2 w-2 rounded-full [background-image:var(--green-glossy)]"></div>
                  </div>
                </div>
              </div>

              <div className="hover:bg-accent mb-2 flex items-start gap-3 rounded-lg p-3">
                <div className="text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full [background-image:var(--blue-glossy)] text-sm font-medium">
                  N
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center">
                    <span className="text-sm font-medium">Nick</span>
                  </div>
                  <div className="text-muted-foreground text-xs">
                    Coffee next week?
                  </div>
                </div>
                <div className="ml-auto flex flex-col items-end justify-between py-1">
                  <span className="text-muted-foreground text-xs">Mar 28</span>
                  <div className="mt-4 flex gap-1">
                    <div className="h-2 w-2 rounded-full [background-image:var(--green-glossy)]"></div>
                  </div>
                </div>
              </div>

              <div className="hover:bg-accent mb-2 flex items-start gap-3 rounded-lg p-3">
                <div className="text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full [background-image:var(--red-glossy)] text-sm font-medium">
                  A
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center">
                    <span className="text-sm font-medium">Asana</span>
                  </div>
                  <div className="text-muted-foreground text-xs">
                    Weekly task summary
                  </div>
                </div>
                <div className="ml-auto flex flex-col items-end justify-between py-1">
                  <span className="text-muted-foreground text-xs">Mar 25</span>
                  <div className="mt-4 flex gap-1">
                    <div className="h-2 w-2 rounded-full [background-image:var(--purple-glossy)]"></div>
                  </div>
                </div>
              </div>

              <div className="hover:bg-accent mb-2 flex items-start gap-3 rounded-lg p-3">
                <div className="text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full [background-image:var(--red-glossy)] text-sm font-medium">
                  F
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center">
                    <span className="text-sm font-medium">Figma [5]</span>
                  </div>
                  <div className="text-muted-foreground text-xs">
                    Comments on "Landi...
                  </div>
                </div>
                <div className="ml-auto flex flex-col items-end justify-between py-1">
                  <span className="text-muted-foreground text-xs">Mar 26</span>
                  <div className="mt-4 flex gap-1">
                    <div className="h-2 w-2 rounded-full [background-image:var(--green-glossy)]"></div>
                    <div className="h-2 w-2 rounded-full [background-image:var(--green-glossy)]"></div>
                  </div>
                </div>
              </div>

              <div className="hover:bg-accent mb-2 flex items-start gap-3 rounded-lg p-3">
                <div className="text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full [background-image:var(--yellow-glossy)] text-sm font-medium">
                  D
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center">
                    <span className="text-sm font-medium">DocuSign [2]</span>
                  </div>
                  <div className="text-muted-foreground text-xs">
                    Urgent: Contract nee...
                  </div>
                </div>
                <div className="ml-auto flex flex-col items-end justify-between py-1">
                  <span className="text-muted-foreground text-xs">Mar 25</span>
                  <div className="mt-4 flex gap-1">
                    <div className="h-2 w-2 rounded-full [background-image:var(--yellow-glossy)]"></div>
                    <div className="h-2 w-2 rounded-full [background-image:var(--yellow-glossy)]"></div>
                  </div>
                </div>
              </div>

              <div className="hover:bg-accent mb-2 flex items-center gap-3 rounded-lg p-3">
                <div className="text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full [background-image:var(--blue-glossy)] text-sm font-medium">
                  L
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">LinkedIn</span>
                    <span className="text-muted-foreground text-xs">
                      Mar 24
                    </span>
                  </div>
                  <div className="text-muted-foreground text-xs">
                    Job opportunities in yo...
                  </div>
                </div>
                <div className="h-2 w-2 rounded-full [background-image:var(--red-glossy)]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Email Content */}
        <div className="bg-background mt-0 flex flex-1 flex-col">
          {/* Email Header */}
          <div className="border-border mt-0.5 border-b px-4 py-6">
            {/* <div className="px-6 py-4 border-b border-border"> */}
            <div className="mb-2 flex items-center justify-between">
              <h1 className="text-lg font-semibold">
                Re: Design review feedback [6]
              </h1>
              <div className="flex items-center gap-2">
                <button className="hover:bg-accent rounded-lg p-2">
                  <Paperclip className="h-4 w-4" />
                </button>
                <button className="hover:bg-accent rounded-lg p-2">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button className="hover:bg-accent rounded-lg p-2">
                  <Star className="h-4 w-4" />
                </button>
                <button className="hover:bg-accent rounded-lg p-2">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
                <button className="hover:bg-accent rounded-lg p-2">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="text-muted-foreground mb-4 flex items-center gap-2 text-sm">
              <span className="bg-accent rounded px-2 py-1 text-xs">
                March 25 - March 29
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full [background-image:var(--green-glossy)] text-xs font-medium">
                C
              </div>
              <div className="text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full [background-image:var(--purple-glossy)] text-xs font-medium">
                S
              </div>
              <button className="text-muted-foreground hover:text-foreground text-sm">
                <div className="text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full [background-image:var(--orange-glossy)] text-xs font-medium">
                  A
                </div>
              </button>
              <div className="text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full [background-image:var(--blue-glossy)] text-xs font-medium">
                A
              </div>
              <div className="text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full [background-image:var(--green-glossy)] text-xs font-medium">
                S
              </div>
            </div>
          </div>

          {/* Email Content */}
          {/* Use "overflow-y-auto scrollbar-hide" to activate scrolling, "overflow-hidden" to disable scrolling */}
          {/* <div className="flex-1 overflow-hidden p-6"> */}
          <div className="flex-1 overflow-hidden px-6 py-6">
            {/* AI Summary */}
            <div className="mb-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-sm font-medium">AI Summary</span>
                <button className="text-muted-foreground hover:text-foreground">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Design review of new email client features. Team discussed
                command center improvements and category system. General
                positive feedback, with suggestions for quick actions placement.
              </p>
            </div>

            {/* Attachments */}
            <div className="mb-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-sm font-medium">Attachments [4]</span>
                <button className="text-muted-foreground hover:text-foreground">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex gap-3">
                <div className="bg-card border-border flex items-center gap-2 rounded-lg border p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded [background-image:var(--red-glossy)]">
                    <Paperclip className="text-primary-foreground h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">cmd.center.fig</div>
                    <div className="text-muted-foreground text-xs">2.1 MB</div>
                  </div>
                </div>
                <div className="bg-card border-border flex items-center gap-2 rounded-lg border p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded [background-image:var(--blue-glossy)]">
                    <Paperclip className="text-primary-foreground h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">comments.docx</div>
                    <div className="text-muted-foreground text-xs">0.7 MB</div>
                  </div>
                </div>
                <div className="bg-card border-border flex items-center gap-2 rounded-lg border p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded [background-image:var(--purple-glossy)]">
                    <Paperclip className="text-primary-foreground h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">img.png</div>
                    <div className="text-muted-foreground text-xs">2.3 MB</div>
                  </div>
                </div>
                <div className="bg-card border-border flex items-center gap-2 rounded-lg border p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded [background-image:var(--red-glossy)]">
                    <Paperclip className="text-primary-foreground h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">requirements.pdf</div>
                    <div className="text-muted-foreground text-xs">1.5 MB</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Messages */}
            <div className="space-y-6">
              {/* First Message */}
              <div className="border-border rounded-lg border p-4">
                <div className="mb-3 flex items-center gap-3">
                  <div className="text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full [background-image:var(--orange-glossy)] text-sm font-medium">
                    AM
                  </div>
                  <div>
                    <div className="text-sm font-medium">Ali Mamedgasanov</div>
                    <div className="text-muted-foreground text-xs">
                      March 25, 10:15 AM
                    </div>
                  </div>
                </div>
                <div className="text-muted-foreground mb-2 text-sm">
                  To: Alex, Sarah
                </div>
                <div className="mb-4 text-sm leading-relaxed">
                  yo team, i've updated the email client design with some new
                  interactions, taking a different approach with the command
                  center - much cleaner now. check out the new flows and let me
                  know what you think!
                </div>
                <div className="bg-card border-border mb-4 flex items-center gap-2 rounded-lg border p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded [background-image:var(--red-glossy)]">
                    <Paperclip className="text-primary-foreground h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">cmd.center.fig</div>
                    <div className="text-muted-foreground text-xs">21 MB</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="bg-muted hover:bg-accent text-foreground flex items-center gap-1 rounded px-3 py-1 text-sm">
                    <Reply className="h-3 w-3" />
                    Reply
                  </button>
                  <button className="bg-muted hover:bg-accent text-foreground flex items-center gap-1 rounded px-3 py-1 text-sm">
                    <Forward className="h-3 w-3" />
                    Forward
                  </button>
                  <button className="hover:bg-accent rounded p-1">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                  <button className="hover:bg-accent ml-auto rounded p-1">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Second Message */}
              <div className="border-border rounded-lg border p-4">
                <div className="mb-3 flex items-center gap-3">
                  <div className="text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full [background-image:var(--green-glossy)] text-sm font-medium">
                    S
                  </div>
                  <div>
                    <div className="text-sm font-medium">Sarah</div>
                    <div className="text-muted-foreground text-xs">
                      March 25, 2:30 PM
                    </div>
                  </div>
                </div>
                <div className="text-muted-foreground mb-2 text-sm">
                  To: All
                </div>
                <div className="mb-4 text-sm leading-relaxed">
                  I've spent some time playing with the new version and have
                  quite a few thoughts. The command center is definitely moving
                  in the right direction - the new layout makes much more sense
                  for power users. Really like how you've integrated the
                  keyboard shortcuts naturally into the UI.
                </div>
                <div className="mb-4 text-sm leading-relaxed">
                  Let me know what you think about these points. Happy to jump
                  on a call to discuss in detail.
                </div>
                <div className="flex gap-2">
                  <button className="bg-muted hover:bg-accent text-foreground flex items-center gap-1 rounded px-3 py-1 text-sm">
                    <Reply className="h-3 w-3" />
                    Reply
                  </button>
                  <button className="bg-muted hover:bg-accent text-foreground flex items-center gap-1 rounded px-3 py-1 text-sm">
                    <Forward className="h-3 w-3" />
                    Forward
                  </button>
                  <button className="hover:bg-accent rounded p-1">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                  <button className="hover:bg-accent ml-auto rounded p-1">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
