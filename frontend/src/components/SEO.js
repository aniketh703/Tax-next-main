import { Helmet } from "react-helmet-async";

const SITE_NAME = "TaxNext.in — VNAV Associates";
const DEFAULT_TITLE = "TaxNext.in — Best CA in Kurnool & Chennai | Income Tax, GST & Compliance";
const DEFAULT_DESC =
  "CA. V.V.N. Prasad Gupta of VNAV Associates (Kurnool & Chennai) provides professional ITR filing, GST compliance, and audit services. Primary Office: Kurnool.";
const SITE_URL = "https://taxnext.in";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const DEFAULT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "TaxAdviceService",
  "name": "VNAV Associates — TaxNext.in",
  "description": "Professional Chartered Accountant services in Kurnool and Chennai.",
  "url": "https://taxnext.in",
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "404, Suresh Towers, Santosh Nagar, NH 44 Road",
      "addressLocality": "Kurnool",
      "addressRegion": "Andhra Pradesh",
      "postalCode": "518003",
      "addressCountry": "IN"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "Flat No. C, No. 9, Jai Nagar, 15th Street, Arumbakkam",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "600106",
      "addressCountry": "IN"
    }
  ]
};

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
  const resolvedSchema = schema      || DEFAULT_SCHEMA;

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
      <meta property="og:image"       content={DEFAULT_OG_IMAGE} />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDesc} />
      <meta name="twitter:image"       content={DEFAULT_OG_IMAGE} />

      {/* JSON-LD Schema */}
      {resolvedSchema && (
        <script type="application/ld+json">{JSON.stringify(resolvedSchema)}</script>
      )}
    </Helmet>
  );
}
