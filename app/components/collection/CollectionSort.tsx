import {Fragment} from 'react';
import {Listbox, Transition} from '@headlessui/react';
import downArrow from '~/assets/down-arrow.svg';
import {useNavigate} from '@remix-run/react';

type SortOption = {
  name: string;
  value: string;
};

const sortOptions: SortOption[] = [
  {name: 'Sort', value: ''},
  {name: 'Price, low to high', value: 'asc'},
  {name: 'Price, high to low', value: 'desc'},
  {name: 'Newest', value: 'newest'},
];

export default function CollectionSort({selected}: {selected: string}) {
  const navigate = useNavigate();

  const handleChange = (selectedOption: SortOption) => {
    const url = new URL(window.location.href);
    if (selectedOption.value === 'asc') {
      url.searchParams.set('sortBy', 'price');
      url.searchParams.set('sortDir', 'asc');
    } else if (selectedOption.value === 'desc') {
      url.searchParams.set('sortBy', 'price');
      url.searchParams.set('sortDir', 'desc');
    } else if (selectedOption.value === 'newest') {
      url.searchParams.set('sortBy', 'createdAt');
      url.searchParams.delete('sortDir');
    } else {
      url.searchParams.delete('sortBy');
      url.searchParams.delete('sortDir');
    }
    url.searchParams.delete('cursor');
    url.searchParams.delete('direction');
    navigate(url.pathname + url.search);
  };

  return (
    <Listbox
      value={sortOptions.find((option) => option.value === selected)!}
      onChange={(value: SortOption) => handleChange(value)}
    >
      <div className="relative">
        <Listbox.Button
          as="div"
          className="flex items-center space-x-2 cursor-pointer"
        >
          <span>Sort</span>
          <div className="p-1 rounded-full bg-cream">
            <img src={downArrow} className="w-3 h-3" />
          </div>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 right-0 bg-white text-base focus:outline-none z-20 shadow">
            {sortOptions.map((sortOption, index) => (
              <Listbox.Option
                key={index}
                value={sortOption}
                className={`hover:bg-cream py-2 px-3 cursor-pointer ${
                  sortOption.value === selected ? 'bg-product-card' : ''
                }`}
              >
                <span className="font-grotesk truncate text-10 relative">
                  {sortOption.name}
                </span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
