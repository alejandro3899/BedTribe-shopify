import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {ARTICLE_QUERY} from '~/queries/article';
import instagram from '~/assets/Instagram.svg';
import twitter from '~/assets/Twitter.svg';
import youbute from '~/assets/youtube.svg';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Hydrogen | ${data?.article.title ?? ''} article`}];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  const {blogHandle, articleHandle} = params;

  if (!articleHandle || !blogHandle) {
    throw new Response('Not found', {status: 404});
  }

  const {blog} = await context.storefront.query(ARTICLE_QUERY, {
    variables: {blogHandle, articleHandle},
  });

  if (!blog?.articleByHandle) {
    throw new Response(null, {status: 404});
  }

  const article = blog.articleByHandle;
  const blogTitle = blog.title;
  return json({article, blogTitle});
}

export default function Article() {
  const {article, blogTitle} = useLoaderData<typeof loader>();
  const {title, image, contentHtml, author} = article;

  const publishedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt));

  return (
    <div className="pt-28 pb-14 md:py-36">
      <div className="con max-w-[926px]">
        {image && (
          <Image
            data={image}
            sizes="(min-width: 768px) 100vw, 90vw"
            loading="eager"
            className="rounded-xl md:rounded-lg"
          />
        )}
        <div className="flex flex-col items-start md:items-center">
          <p className="badge mt-7 md:mt-10">{blogTitle}</p>
          <h3 className="mt-2 md:mt-4 md:text-center">{title}</h3>
          <p className="small mt-5 md:mt-8 normal-case">Share this article</p>
          <div className="flex items-center space-x-3 mt-2">
            <a href="#" className="article-share">
              <img src={instagram} alt="share instagram" />
            </a>
            <a href="#" className="article-share">
              <img src={twitter} alt="share twitter" />
            </a>
            <a href="#" className="article-share">
              <img src={youbute} alt="share youtube" />
            </a>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{__html: contentHtml}}
          className="max-w-[720px] mt-16 md:mt-28 mx-auto w-full article"
        />
      </div>
    </div>
  );
}
