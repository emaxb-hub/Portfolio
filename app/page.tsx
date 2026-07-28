import type { Metadata } from "next";
import PortfolioHome from "./PortfolioHome";

export const metadata: Metadata = {
  title: "Emaan Bilal | Frontend & Game Developer",
  description:
    "A tech-forward portfolio for Emaan Bilal, frontend developer, game developer, and Computer Science student.",
};

export default function Home() {
  return <PortfolioHome />;
}
