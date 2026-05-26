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

  const imageUrl = project.previewImage || '/og-image.png';

  return {
    title: `${project.name} Case Study | Sitarahub Premium Software Studio`,
    description: `Case study for ${project.name} (${project.category}) built by Sitarahub. Discover the challenge, custom software solution, and technical impact.`,
    keywords: [...project.tags, 'case study', 'software development', 'enterprise solution', 'Sitarahub case study'],
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: `${project.name} Case Study | Sitarahub`,
      description: project.description,
      url: `https://sitarahub.com/projects/${slug}`,
      type: 'article',
      tags: project.tags,
      images: [
        {
          url: imageUrl,
          alt: `${project.name} Case Study by Sitarahub`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} Case Study | Sitarahub`,
      description: project.description,
      images: [imageUrl],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `https://sitarahub.com/projects/${slug}#creativework`,
    'name': project.name,
    'headline': `${project.name} Case Study | Sitarahub`,
    'description': project.description,
    'genre': project.category,
    'creator': {
      '@type': 'Organization',
      'name': 'Sitarahub Private Limited',
      'url': 'https://sitarahub.com'
    },
    'datePublished': `${project.year}-01-01`,
    'image': project.previewImage ? `https://sitarahub.com${project.previewImage}` : 'https://sitarahub.com/og-image.png',
    'keywords': project.tags.join(', '),
    'about': {
      '@type': 'Thing',
      'name': project.category,
      'description': project.challenge
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://sitarahub.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Projects',
        'item': 'https://sitarahub.com/#projects'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': project.name,
        'item': `https://sitarahub.com/projects/${slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([creativeWorkSchema, breadcrumbSchema])
        }}
      />
      <ProjectDetailClient project={project} />
    </>
  );
}
