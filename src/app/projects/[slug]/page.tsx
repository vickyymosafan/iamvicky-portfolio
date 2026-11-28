import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CASE_STUDY_SLUGS,
  getAdjacentCaseStudies,
  getCaseStudyBySlug,
} from "@/data/caseStudies";
import { ProjectCaseStudyPage } from "@/components/case-study/ProjectCaseStudyPage";

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) {
    return {
      title: "Case Study Not Found | M. Vicky Mosafan",
    };
  }

  return {
    title: `${study.title} — UI/UX & Engineering Case Study | M. Vicky Mosafan`,
    description: study.tagline,
    openGraph: {
      title: `${study.title} | M. Vicky Mosafan`,
      description: study.tagline,
      type: "article",
    },
  };
}

export default async function ProjectCaseStudyRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const { prev, next } = getAdjacentCaseStudies(study.slug);

  return (
    <ProjectCaseStudyPage
      study={study}
      prevStudy={prev}
      nextStudy={next}
    />
  );
}
