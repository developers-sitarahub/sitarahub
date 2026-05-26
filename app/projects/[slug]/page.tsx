import { projects } from '@/lib/projects-data';
import { notFound } from 'next/navigation';
import { ProjectDetailClient } from './project-detail-client';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.name} Case Study | Sitarahub Premium Software Studio`,
    description: `Case study for ${project.name} (${project.category}) built by Sitarahub. Detailed challenge, technical solution, and operational impact.`,
    openGraph: {
      title: `${project.name} Case Study | Sitarahub`,
      description: project.description,
      type: 'article',
      tags: project.tags,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
