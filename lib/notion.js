import { Client } from '@notionhq/client';
import { unstable_cache } from 'next/cache';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

function extractNumber(property) {
  if (!property) return 0;
  if (property.type === 'number') return property.number ?? 0;
  return 0;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function blocksToHtml(blocks) {
  return blocks
    .filter((b) => b.type === 'paragraph')
    .map((b) => {
      const richText = b.paragraph?.rich_text ?? [];
      if (richText.length === 0) return '';
      const inner = richText
        .map((t) => {
          const text = escapeHtml(t.plain_text);
          return t.annotations?.bold ? `<strong>${text}</strong>` : text;
        })
        .join('');
      return `<p>${inner}</p>`;
    })
    .filter(Boolean)
    .join('');
}

function extractText(property) {
  if (!property) return '';
  if (property.type === 'title') {
    return property.title.map((t) => t.plain_text).join('');
  }
  if (property.type === 'rich_text') {
    return property.rich_text.map((t) =>
      t.annotations?.strikethrough ? `~${t.plain_text}` : t.plain_text
    ).join('');
  }
  if (property.type === 'select') {
    return property.select?.name ?? '';
  }
  if (property.type === 'url') {
    return property.url ?? '';
  }
  return '';
}

export async function getBoboboxContent() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_BOBOBOX_DB_ID,
  });

  return response.results
    .map((page) => {
      const props = page.properties;
      return {
        name: extractText(props.Name ?? props.name),
        section: extractText(props.Section ?? props.section),
        content: extractText(props.Content ?? props.content),
        subtitle: extractText(props.Subtitle ?? props.subtitle),
        order: extractNumber(props.Order ?? props.order),
      };
    })
    .sort((a, b) => a.order - b.order);
}

export async function getBoboboxProjects() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_BOBOBOX_PROJECTS_DB_ID,
  });

  return response.results
    .map((page) => {
      const props = page.properties;
      return {
        name: extractText(props.Name ?? props.name),
        tag: extractText(props.Tag ?? props.tag),
        description: extractText(props.Description ?? props.description),
        problem: extractText(props.Problem ?? props.problem),
        approach: extractText(props.Approach ?? props.approach),
        solution: extractText(props.Solution ?? props.solution),
        outcomes: extractText(props.Outcomes ?? props.outcomes),
        order: extractNumber(props.Order ?? props.order),
      };
    })
    .sort((a, b) => a.order - b.order);
}

export async function getBoboboxImages() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_BOBOBOX_IMAGES_DB_ID,
  });

  return response.results
    .map((page) => {
      const props = page.properties;
      return {
        name: extractText(props.Name ?? props.name),
        project: extractText(props.Project ?? props.project),
        imageUrl: extractText(
          props.ImageUrl ?? props['Image URL'] ?? props.image_url ?? props.imageUrl
        ),
        title: extractText(props.Title ?? props.title),
        subtitle: extractText(props.Subtitle ?? props.subtitle),
        order: extractNumber(props.Order ?? props.order),
      };
    })
    .sort((a, b) => a.order - b.order);
}

export const getSideProjects = unstable_cache(
  async () => {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_SIDE_PROJECTS_DB_ID,
    });

    return response.results
      .map((page) => {
        const props = page.properties;
        return {
          name: extractText(props.Name ?? props.name),
          tag: extractText(props.Tag ?? props.tag),
          subtitle: extractText(props.Subtitle ?? props.subtitle),
          description: extractText(props.Description ?? props.description),
          order: extractNumber(props.Order ?? props.order),
        };
      })
      .sort((a, b) => a.order - b.order);
  },
  ['side-projects'],
  { revalidate: 3600, tags: ['notion'] }
);

export const getSideProjectImages = unstable_cache(
  async () => {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_SIDE_PROJECT_IMAGES_DB_ID,
    });

    return response.results
      .map((page) => {
        const props = page.properties;
        return {
          name: extractText(props.Name ?? props.name),
          project: extractText(props.Project ?? props.project),
          imageUrl: extractText(
            props.ImageUrl ?? props['Image URL'] ?? props.image_url ?? props.imageUrl
          ),
          title: extractText(props.Title ?? props.title),
          subtitle: extractText(props.Subtitle ?? props.subtitle),
          order: extractNumber(props.Order ?? props.order),
        };
      })
      .sort((a, b) => a.order - b.order);
  },
  ['side-project-images'],
  { revalidate: 3600, tags: ['notion'] }
);

export const getToolsContent = unstable_cache(
  async () => {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_TOOLS_DB_ID,
    });

    return response.results.map((page) => {
      const props = page.properties;
      return {
        name: extractText(props.Name ?? props.name),
        category: extractText(props.Category ?? props.category),
        iconSlug: extractText(
          props.IconSlug ?? props['Icon Slug'] ?? props.icon_slug ?? props.iconSlug
        ),
        iconUrl: extractText(
          props.IconUrl ?? props['Icon URL'] ?? props.icon_url ?? props.iconUrl
        ),
      };
    });
  },
  ['tools-content'],
  { revalidate: 3600, tags: ['notion'] }
);

export const getHomepageContent = unstable_cache(
  async () => {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_HOMEPAGE_DB_ID,
    });

    const rows = response.results.map((page) => {
      const props = page.properties;
      return {
        _id: page.id,
        name: extractText(props.Name ?? props.name),
        section: extractText(props.Section ?? props.section),
        content: extractText(props.Content ?? props.content),
        subtitle: extractText(props.Subtitle ?? props.subtitle),
        label: extractText(props.Label ?? props.label),
        imageUrl: extractText(
          props['Image URL'] ?? props.ImageUrl ?? props.image_url ?? props.imageUrl
        ),
        htmlContent: '',
      };
    });

    const aboutRow = rows.find((r) => r.section === 'About');
    if (aboutRow) {
      const blocksRes = await notion.blocks.children.list({ block_id: aboutRow._id });
      console.log('About blocks:', JSON.stringify(blocksRes.results?.slice(0, 3), null, 2));
      aboutRow.htmlContent = blocksToHtml(blocksRes.results);
      console.log('About htmlContent:', aboutRow.htmlContent);
    }

    return rows.map(({ _id, ...rest }) => rest);
  },
  ['homepage-content'],
  { revalidate: 3600, tags: ['notion'] }
);
