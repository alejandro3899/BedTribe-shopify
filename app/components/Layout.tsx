import {Await} from '@remix-run/react';
import {Suspense} from 'react';
import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import {Footer} from '~/components/Footer';
import {
  PredictiveSearchForm,
  PredictiveSearchResults,
} from '~/components/Search';
import {Header} from './header/Header';

export type LayoutProps = {
  cart: Promise<CartApiQueryFragment | null>;
  children?: React.ReactNode;
  footer: Promise<FooterQuery>;
  header: HeaderQuery;
};

export function Layout({cart, children = null, footer, header}: LayoutProps) {
  return (
    <>
      {/* <SearchAside /> */}
      <Header header={header} cart={cart} />
      <main>{children}</main>
      <Suspense>
        <Await resolve={footer}>
          {(footer) => (
            <Footer metaobject={footer.metaobject} shop={header.shop} />
          )}
        </Await>
      </Suspense>
    </>
  );
}

// function SearchAside() {
//   return (
//     <Aside id="search-aside" heading="SEARCH">
//       <div className="predictive-search">
//         <br />
//         <PredictiveSearchForm>
//           {({fetchResults, inputRef}) => (
//             <div>
//               <input
//                 name="q"
//                 onChange={fetchResults}
//                 onFocus={fetchResults}
//                 placeholder="Search"
//                 ref={inputRef}
//                 type="search"
//               />
//               &nbsp;
//               <button type="submit">Search</button>
//             </div>
//           )}
//         </PredictiveSearchForm>
//         <PredictiveSearchResults />
//       </div>
//     </Aside>
//   );
// }
