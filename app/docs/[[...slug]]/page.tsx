import { source } from "@/lib/source";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import defaultMdxComponents, { createRelativeLink } from "fumadocs-ui/mdx";
import { BiLinkExternal } from "react-icons/bi";
import clsx from "clsx";
import { ComponentProps, FC } from "react";
import FumaLink from "fumadocs-core/link";

function LinkWithExternalIcon(
  props: React.ComponentPropsWithoutRef<"a"> & {
    as?: React.FC<ComponentProps<"a">>;
  },
) {
  const isExternal = props.href ? /^https?:\/\//.test(props.href) : false;

  const LinkComponent = props.as || FumaLink;

  return (
    <LinkComponent
      {...props}
      className={clsx("inline-flex items-center", props.className)}
    >
      {props.children}
      {isExternal && <BiLinkExternal />}
    </LinkComponent>
  );
}

function createLink(Base: React.FC<ComponentProps<"a">>) {
  return function Link(props: React.ComponentPropsWithoutRef<"a">) {
    const isExternal = props.href ? /^https?:\/\//.test(props.href) : false;

    return (
      <Base
        {...props}
        className={clsx("inline-flex items-center", props.className)}
      >
        {props.children}
        {isExternal && <BiLinkExternal />}
      </Base>
    );
  };
}

function DriversTable(props: {
  def: [{ name: string; crate: string; path: string; description?: string }];
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Driver</th>
          <th>Docs</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {props.def.map((driver) => (
          <tr key={driver.name}>
            <td>{driver.name}</td>
            <td>
              <LinkWithExternalIcon
                href={`https://rktk-docs.nazo6.dev/${
                  driver.crate.replaceAll("-", "_")
                }/${driver.path}/index.html`}
              >
                docs
              </LinkWithExternalIcon>
            </td>
            <td>{driver.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      editOnGithub={{
        owner: "nazo6",
        repo: "rktk-site",
        path: `content/docs/${page.file.path}`,
        sha: "master",
      }}
      lastUpdate={page.data.lastModified}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={{
            ...defaultMdxComponents,
            a: createLink(createRelativeLink(source, page)),
            DriversTable,
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
