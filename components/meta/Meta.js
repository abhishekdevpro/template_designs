import Head from "next/head";

export default function Meta({ title, keywords, description }) {
  const homepage = "/dashboard";
  const logo = "/public/assets/logo2.png";
  const favicon = "/assets/favicon.png"; // Use absolute path

  function isiteJsonLd() {
    return {
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        url: homepage,
        logo: logo,

        image: logo,
        description: description,
        founder: "Template Design",
        foundingDate: "2023",
        foundingLocation: "IN",
        email: "xyz@gmail.com",
        telephone: "+91 9999999999",
        areaServed: "IN",
        keywords: Array.isArray(keywords) ? keywords.join(", ") : keywords, // Ensure keywords is a string
        mainEntityOfPage: homepage,
        knowsAbout: Array.isArray(keywords) ? keywords.join(", ") : keywords, // Ensure knowsAbout is a string
        knowsLanguage: "English",
        memberOf: "Template Design",
        owns: "Template Design",
        publishingPrinciples: homepage,
        slogan: "Get hired with an ATS-optimized resume",
      }),
    };
  }

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="keywords"
        content={Array.isArray(keywords) ? keywords.join(", ") : keywords}
      />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href={favicon} />
      <title>{title}</title>

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={homepage} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={logo} />
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={homepage} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={logo} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={isiteJsonLd()}
        key="isiteJsonLd"
      />
    </Head>
  );
}
