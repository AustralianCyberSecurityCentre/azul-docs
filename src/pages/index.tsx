import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

// import "@docusaurus/theme-classic";

import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";
import Graph from "../components/Graph";

import Azul from "../../static/img/azul-text-glitched.svg";
import Admonition from "@theme/Admonition";


function HomepageHeader() {
  return (
    <div className={clsx("container", styles.flexTitle)}>
      <div>
        <Heading as="h1" className={clsx("hero__title", styles.logo)}>
          <Azul title="Azul Logo" />
        </Heading>
        <p className={clsx("hero__subtitle", styles.subtitle)}>
          A malware repository, analytical engine and clustering suite for
          incident response, malware family analysis and long-term correlation.
        </p>
      </div>
      <div>
        <Admonition type="info">
          <p>
            <Link to="./overview/release-notes">
              9.0.0 has been released
            </Link>
            , our first open-source release!
          </p>
        </Admonition>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="./overview/about"
          >
            💡 About
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="./user-guide/malware-analysis"
          >
            ✏️ Learn
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="./sysadmin-guide/installation"
          >
            🚀 Deploy
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description={siteConfig.tagline}>
      <div className={clsx(styles.combinedContainer)}>
        <div className={clsx(styles.floatingBehind)}>
          <Graph />
        </div>

        <div className={clsx(styles.floatingInFront)}>
          <HomepageHeader />
        </div>
      </div>
    </Layout>
  );
}
