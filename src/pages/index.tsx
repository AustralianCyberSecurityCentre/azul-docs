import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import clsx from "clsx";
import type { ReactNode } from "react";

// import "@docusaurus/theme-classic";

import Heading from "@theme/Heading";
import Layout from "@theme/Layout";

import Graph from "../components/Graph";
import styles from "./index.module.css";

import Admonition from "@theme/Admonition";
import Azul from "../../static/img/azul-text-glitched.svg";


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
            <Link to="./overview/release-notes/">
              12.0.0 has been released, with significant improvements to UI and processing
            </Link>
          </p>
        </Admonition>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="./overview/about/"
          >
            💡 About
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="./user-guide/malware-analysis/"
          >
            ✏️ Learn
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="./sysadmin-guide/installation/"
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
