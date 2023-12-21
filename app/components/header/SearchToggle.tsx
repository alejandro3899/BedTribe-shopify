import search from '~/assets/search.svg';

export default function SearchToggle() {
  return (
    <a href="#search-aside">
      <img src={search} alt="header search" className="block md:hidden" />
      <p className="header-menu-item hidden md:block">Search</p>
    </a>
  );
}
