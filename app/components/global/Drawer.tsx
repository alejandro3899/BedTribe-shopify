import {Dialog, Transition} from '@headlessui/react';
import {useLocation} from '@remix-run/react';
import React, {Fragment, useEffect} from 'react';

export default function Drawer({
  enterFrom,
  isOpen,
  closeDrawer,
  children,
}: {
  enterFrom: 'RIGHT' | 'LEFT';
  isOpen: boolean;
  closeDrawer: () => void;
  children: React.ReactNode;
}) {
  const location = useLocation();

  useEffect(() => {
    closeDrawer();
  }, [location]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeDrawer}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25"></div>
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom={
            enterFrom === 'RIGHT' ? 'translate-x-full' : '-translate-x-full'
          }
          enterTo="translate-x-0"
          leave="ease-in duration-300"
          leaveFrom="translate-x-0"
          leaveTo={
            enterFrom === 'RIGHT' ? 'translate-x-full' : '-translate-x-full'
          }
        >
          <Dialog.Panel
            className={`fixed h-full overflow-y-auto top-0 bottom-0 bg-white w-full max-w-sm ${
              enterFrom === 'RIGHT' ? 'right-0' : 'left-0'
            }`}
          >
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
