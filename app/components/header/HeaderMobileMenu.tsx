import {HeaderQuery} from 'storefrontapi.generated';
import {LayoutProps} from '../Layout';
import {useState} from 'react';
import {useRootLoaderData} from '~/root';
import Drawer from '../Drawer';
import cross from '~/assets/cross.svg';
import {NavLink} from '@remix-run/react';

type HeaderProps = Pick<LayoutProps, 'header' | 'cart'>;

export default function HeaderMenuMobileToggle({
  primaryDomainUrl,
  menu,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {publicStoreDomain} = useRootLoaderData();

  return (
    <>
      <span
        className="header-menu-item md:hidden"
        onClick={() => setIsOpen(true)}
      >
        Menu
      </span>
      <Drawer
        enterFrom="LEFT"
        closeDrawer={() => setIsOpen(false)}
        isOpen={isOpen}
      >
        <div className="p-5 relative">
          <button
            className="absolute top-5 right-5 p-0"
            onClick={() => setIsOpen(false)}
          >
            <img src={cross} alt="cross icon" />
          </button>
          <div className="flex flex-col space-y-5 mt-6">
            {menu &&
              menu.items.map((item) => {
                if (!item.url) return null;
                // if the url is internal, we strip the domain
                const url =
                  item.url.includes('myshopify.com') ||
                  item.url.includes(publicStoreDomain) ||
                  item.url.includes(primaryDomainUrl)
                    ? new URL(item.url).pathname
                    : item.url;

                return (
                  <NavLink
                    className={({isActive}) =>
                      `header-menu-item ${
                        isActive ? 'bg-dusk text-cream' : 'text-noir'
                      }`
                    }
                    end
                    key={item.id}
                    prefetch="intent"
                    to={url}
                  >
                    {item.title}
                  </NavLink>
                );
              })}
          </div>
        </div>
      </Drawer>
    </>
  );
}
