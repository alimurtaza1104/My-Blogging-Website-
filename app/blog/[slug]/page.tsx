
import { notFound } from 'next/navigation';
import { articles, getArticle } from '@/lib/content';
import Link from 'next/link';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticle(slug);

  return a
    ? {
        title: a.title,
        description: a.meta,
      }
    : {};
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticle(slug);

  if (!a) return notFound();

  const related = articles
    .filter((x) => x.slug !== a.slug && x.category === a.category)
    .slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.excerpt,
    datePublished: a.date,
    dateModified: a.updated,
    author: {
      '@type': 'Person',
      name: a.author,
    },
    image: a.image,
  };

  return (
    <main className="container py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <div className="max-w-5xl mx-auto">
        <div className="text-sm muted">
          <Link href="/blog">Blog</Link> /{' '}
          <Link
            href={`/category/${a.category
              .toLowerCase()
              .replaceAll(' & ', '-')
              .replaceAll(' ', '-')}`}
          >
            {a.category}
          </Link>
        </div>

        <div className="max-w-3xl mt-8">
          <div
            className="text-sm font-bold uppercase tracking-wider"
            style={{ color: 'var(--primary)' }}
          >
            {a.category}
          </div>

          <h1 className="text-4xl md:text-6xl font-black leading-[1.03] mt-3">
            {a.title}
          </h1>

          <p className="text-xl muted leading-8 mt-5">{a.excerpt}</p>

          <div className="text-sm muted mt-6">
            By{' '}
            <b style={{ color: 'var(--text)' }}>{a.author}</b> · Published{' '}
            {a.date} · Updated {a.updated} · {a.readingTime} min read
          </div>
        </div>

        <img
          src={a.image}
          alt={a.title}
          className="w-full aspect-[2/1] object-cover rounded-3xl mt-10"
        />

        <div className="grid lg:grid-cols-[190px_1fr] gap-10 mt-12">
          <aside className="lg:sticky lg:top-28 h-fit card p-5">
            <b>On this page</b>

            <div className="text-sm muted mt-4 grid gap-3">
              <span>Introduction</span>
              <span>Key ideas</span>
              <span>Practical checklist</span>
              <span>Conclusion</span>
            </div>
          </aside>

          <article>
            <div
              className="prose-nb"
              dangerouslySetInnerHTML={{ __html: a.content }}
            />

            <div className="my-12 py-8 border-y text-center text-xs tracking-[.2em] muted">
              ADVERTISEMENT
            </div>

            <section className="card p-7 mt-12">
              <div className="font-bold">About the author</div>

              <h3 className="text-xl font-bold mt-2">{a.author}</h3>

              <p className="muted mt-2">
                The NextByte editorial team publishes practical guides focused
                on useful digital work, clear explanations and reader-first
                content.
              </p>
            </section>

            <section className="mt-14">
              <h2 className="text-3xl font-black">You May Also Like</h2>

              <div className="grid md:grid-cols-3 gap-5 mt-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="card p-5 hover:-translate-y-1 transition"
                  >
                    <div
                      className="text-xs font-bold"
                      style={{ color: 'var(--primary)' }}
                    >
                      {r.category}
                    </div>

                    <h3 className="font-bold mt-2 leading-snug">
                      {r.title}
                    </h3>

                    <p className="muted text-sm mt-2">{r.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="card p-7 mt-12">
              <h2 className="text-2xl font-bold">Join the conversation</h2>

              <p className="muted mt-2">
                Comments are moderated before publication.
              </p>

              <form className="grid gap-3 mt-5">
                <input
                  aria-label="Name"
                  placeholder="Name"
                  className="border rounded-xl px-4 py-3 bg-transparent"
                  style={{ borderColor: 'var(--line)' }}
                />

                <input
                  aria-label="Email"
                  type="email"
                  placeholder="Email"
                  className="border rounded-xl px-4 py-3 bg-transparent"
                  style={{ borderColor: 'var(--line)' }}
                />

                <textarea
                  aria-label="Comment"
                  placeholder="Your comment"
                  rows={4}
                  className="border rounded-xl px-4 py-3 bg-transparent"
                  style={{ borderColor: 'var(--line)' }}
                />

                <button
                  type="button"
                  className="justify-self-start px-5 py-3 rounded-full text-white font-semibold"
                  style={{ background: 'var(--primary)' }}
                >
                  Submit for review
                </button>
              </form>
            </section>
          </article>
        </div>
      </div>
    </main>
  );
}

