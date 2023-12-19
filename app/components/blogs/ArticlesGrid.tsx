import {Link} from '@remix-run/react';
import {useEffect, useState} from 'react';
import {ArticleItemFragment} from 'storefrontapi.generated';
import arrowRight from '~/assets/right-arrow.svg';
import arrowLeft from '~/assets/left-arrow.svg';

export default function ArticlesGrid({
  articles,
}: {
  articles: ArticleItemFragment[];
}) {
  const [pageNum, setpageNum] = useState<number>(1);
  const [isMobile, setIsMobile] = useState<boolean>();

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  let start = 0;
  let pageSize = isMobile ? 3 : pageNum === 1 ? 7 : 9;
  let pageCount = isMobile
    ? Math.ceil(articles.length / 3)
    : Math.ceil((articles.length + 2) / 9);
  if (pageNum > 1) {
    if (isMobile) {
      start = (pageNum - 1) * 3;
    } else {
      start = (pageNum - 2) * 9 + 7;
    }
  }

  const paginate = (num: number) => {
    setpageNum(num);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-12 md:gap-y-16">
        {articles.slice(start, start + pageSize).map((article, index) => {
          const publishedDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(new Date(article.publishedAt));

          const mergeRow = pageNum === 1 && !isMobile && index === 0;

          if (mergeRow)
            return (
              <Link
                key={article.handle}
                prefetch="intent"
                to={`/blogs/${article.blog.handle}/${article.handle}`}
                className="col-start-1 col-end-4"
              >
                <div className="flex">
                  <div className="w-1/3 pr-4">
                    <h2>{article.title}</h2>
                    <div className="flex items-center space-x-3 mt-1">
                      <p className="small h-3">{publishedDate}</p>
                      <div className="w-1 h-1 bg-zap rounded-full"></div>
                      <p className="small h-3">{article.blog.title}</p>
                    </div>
                  </div>
                  <div className="w-2/3">
                    <div
                      className="w-full pb-[56.2%] bg-cover bg-center rounded-lg"
                      style={{
                        backgroundImage: `url(${article.image?.url || ''})`,
                      }}
                    ></div>
                  </div>
                </div>
              </Link>
            );

          return (
            <Link
              key={article.handle}
              prefetch="intent"
              to={`/blogs/${article.blog.handle}/${article.handle}`}
            >
              <div
                className="pb-[70%] rounded-lg bg-cover bg-center"
                style={{
                  backgroundImage: `url(${article.image?.url})`,
                }}
              ></div>
              <p className="article-title mt-3">{article.title}</p>
              <div className="flex items-center space-x-3 mt-1">
                <p className="small h-3">{publishedDate}</p>
                <div className="w-1 h-1 bg-zap rounded-full"></div>
                <p className="small h-3">{article.blog.title}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-12 md:mt-10 flex items-center justify-center space-x-5">
        <button
          className="p-0"
          disabled={pageNum === 1}
          onClick={() => paginate(pageNum - 1)}
        >
          <img src={arrowLeft} alt="pagination left" />
        </button>
        {pageNum > 3 && (
          <>
            <span onClick={() => paginate(1)} className="cursor-pointer">
              01
            </span>
            <span>...</span>
          </>
        )}
        {[-1, 0, 1].map((value, index) => {
          if (pageNum + value <= 0) return null;
          if (pageNum + value > pageCount) return null;
          return (
            <span
              key={index}
              className={`${
                value === 0 ? 'underline underline-offset-4' : 'cursor-pointer'
              }`}
              onClick={() => paginate(pageNum + value)}
            >
              {`0${pageNum + value}`.slice(-2)}
            </span>
          );
        })}
        {pageCount - pageNum > 2 && (
          <>
            <span>...</span>
            <span
              onClick={() => paginate(pageCount)}
              className="cursor-pointer"
            >
              {`0${pageCount}`.slice(-2)}
            </span>
          </>
        )}
        <button
          className="p-0"
          disabled={pageNum === pageCount}
          onClick={() => paginate(pageNum + 1)}
        >
          <img src={arrowRight} alt="pagination right" />
        </button>
      </div>
    </>
  );
}
