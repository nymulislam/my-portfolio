import { useState } from "react";
import { FiArrowRight, FiX } from "react-icons/fi";

const Writing = () => {
  const [activeArticle, setActiveArticle] = useState(null);

  const posts = [
    {
      id: "auth-code",
      title: "How Does My Authenticator App Know The Code?",
      date: "Jul 31, 2026",
      summary:
        "Time-based One-Time Passwords (TOTP) rely on HMAC-SHA1 algorithms and synchronized 30-second epoch time windows between client and server, requiring zero internet communication.",
      content: [
        "Every 30 seconds, millions of developers open Google Authenticator or 1Password to copy a 6-digit number. Have you ever wondered how the authenticator app knows the exact code without any network connection?",
        "The answer lies in RFC 6238 (TOTP: Time-Based One-Time Password Algorithm). When you scan a QR code, the server shares a secret key (a Base32-encoded string). Both your phone and the server take the current Unix timestamp, divide it by 30 seconds, and feed that number into HMAC-SHA1 along with the shared secret.",
        "Because time ticks identically on both your device and the server, both compute the exact same hash simultaneously. No telemetry, no push notifications, just pure mathematical synchronization.",
      ],
    },
    {
      id: "seat-race",
      title: "Who Sold My Seat Twice?",
      date: "Jul 18, 2026",
      summary:
        "Handling concurrent ticket booking transactions using database locks, optimistic concurrency control, and atomic inventory mutations.",
      content: [
        "In high-traffic ticketing systems, the greatest challenge isn't serving pages fast—it's preventing two users from purchasing the exact same cinema seat at the exact same millisecond.",
        "Naive read-then-write code creates classic race conditions. By implementing database-level transactions with SELECT ... FOR UPDATE or atomic decrement conditionals in MongoDB (findOneAndUpdate with quantity > 0), we ensure that inventory locks are strictly enforced at the data layer.",
      ],
    },
    {
      id: "proxy-server",
      title: "A tale of proxy server",
      date: "Feb 14, 2024",
      summary:
        "Forward proxies vs reverse proxies, TLS termination, load balancing, and why modern edge infrastructure is built on proxy cascades.",
      content: [
        "To a client, a reverse proxy looks just like an ordinary web server. But behind that single IP lies load balancing, SSL/TLS termination, request caching, and health checks.",
        "Understanding proxy routing is essential when deploying Next.js applications behind custom domains, configuring rate limiters, or handling WebSocket handshakes across container boundaries.",
      ],
    },
    {
      id: "bloom-filter",
      title: "Probabilistic Data Structures: Bloom filter",
      date: "Feb 7, 2024",
      summary:
        "Trading 100% certainty for memory efficiency: how bit arrays and multiple hash functions check set membership in constant time.",
      content: [
        "When you have billions of items (like cached URLs or username availability), storing them in a traditional hash set consumes gigabytes of expensive RAM.",
        "A Bloom filter solves this with a simple bit array. It can definitively tell you if an element is NOT present, with an acceptable, mathematically predictable false positive rate for membership. It powers web crawlers, CDNs, and database read-amplification avoidance.",
      ],
    },
    {
      id: "schema-design",
      title: "Understanding Before Implementation",
      date: "Jan 12, 2024",
      summary:
        "Why spending time mapping entity boundaries, user workflows, and state transitions saves weeks of painful downstream refactoring.",
      content: [
        "The fastest way to slow down a software project is to begin writing code before understanding the fundamental problem. Clean code is not the result of speed; it is the natural byproduct of clear thinking.",
        "When building full-stack products solo, taking 24 hours to model the document relationships and state machines on paper prevents countless schema migrations later.",
      ],
    },
  ];

  return (
    <section className="py-12 border-t border-stone-200 dark:border-stone-800/80" id="writing">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-serif text-2xl font-normal text-stone-900 dark:text-stone-100">
            Writing
          </h2>
          <a
            href="#writing"
            className="text-xs font-mono text-amber-800 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
          >
            <span>All posts</span>
            <span>→</span>
          </a>
        </div>

        {/* Posts List */}
        <div className="divide-y divide-stone-200/70 dark:divide-stone-800/70">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => setActiveArticle(post)}
              className="group py-5 flex items-baseline justify-between gap-4 cursor-pointer hover:opacity-85 transition-opacity"
            >
              <div className="space-y-1">
                <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100 group-hover:text-amber-900 dark:group-hover:text-amber-400 transition-colors">
                  {post.title}
                </h3>
                <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                  {post.date}
                </span>
              </div>
              <FiArrowRight className="text-stone-400 group-hover:text-amber-800 dark:group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0 text-sm mt-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Article Reading Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 dark:bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-xl w-full max-h-[85vh] overflow-y-auto rounded-2xl bg-[#FBF9F5] dark:bg-[#1E1C1A] border border-stone-300 dark:border-stone-700 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
              <div>
                <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                  {activeArticle.date}
                </span>
                <h2 className="font-serif text-2xl font-normal text-stone-900 dark:text-stone-50 mt-1">
                  {activeArticle.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1 rounded-md text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                aria-label="Close article"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            <div className="space-y-4 text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
              {activeArticle.content.map((p, idx) => (
                <p
                  key={idx}
                  className={
                    idx === 0
                      ? "first-letter:text-4xl first-letter:font-serif first-letter:font-medium first-letter:float-left first-letter:mr-2.5 first-letter:text-stone-900 dark:first-letter:text-stone-100 first-letter:leading-none"
                      : ""
                  }
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-mono"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Writing;
