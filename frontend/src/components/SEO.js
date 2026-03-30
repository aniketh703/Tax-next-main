import { Helmet } from "react-helmet-async";

const SITE_NAME = "TaxNext.in — VNAV Associates";
const DEFAULT_TITLE = "TaxNext.in — Income Tax, GST & Business Compliance | VNAV Associates";
const DEFAULT_DESC =
  "CA. V.V.N. Prasad Gupta of VNAV Associates handles ITR filing, GST compliance, and business tax — personally. Hyderabad-based, India-wide.";
const SITE_URL = "https://taxnext.in";

/**
 * SEO component — drop into any page to set title + meta.
 *
 * Usage:
 *   <SEO
 *     title="Income Tax Filing — ITR Filing Services | VNAV Associates"
 *     description="File your income tax return with a practising CA..."
 *     canonical="/services/income-tax-filing"
 *   />
 */
export default function SEO({ title, description, canonical, noindex = false, schema }) {
  const resolvedTitle  = title       || DEFAULT_TITLE;
  const resolvedDesc   = description || DEFAULT_DESC;
  const resolvedCanon  = canonical   ? `${SITE_URL}${canonical}` : null;

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDesc} />

      {/* Canonical */}
      {resolvedCanon && <link rel="canonical" href={resolvedCanon} />}

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title"       content={resolvedTitle} />
      <meta property="og:description" content={resolvedDesc} />
      <meta property="og:type"        content="website" />
      <meta property="og:site_name"   content={SITE_NAME} />
      {resolvedCanon && <meta property="og:url" content={resolvedCanon} />}

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary" />
      <meta name="twitter:title"       content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDesc} />

      {/* JSON-LD Schema (optional, pass as string) */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}
