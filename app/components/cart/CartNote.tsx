import _ from 'lodash';
import {CartForm} from '@shopify/hydrogen';
import {useCallback, useRef, useState} from 'react';
import {CartApiQueryFragment} from 'storefrontapi.generated';

export default function CartNote({cart}: {cart: CartApiQueryFragment}) {
  const [note, setNote] = useState<string>(cart.note || '');
  const submitRef = useRef<HTMLButtonElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value.slice(0, 250));
    submitNote();
  };

  const submitNote = useCallback(
    _.debounce(() => {
      if (submitRef.current) {
        submitRef.current.click();
      }
    }, 300),
    [],
  );

  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.NoteUpdate}
      inputs={{note: note}}
    >
      <div className="text-taupe font-mono text-[9px] uppercase">
        Leave a note for your order
      </div>
      <div className="mt-[10px]">
        <textarea
          name="note"
          id="note"
          value={note}
          onChange={(e) => handleChange(e)}
          className="h-[82px] w-full resize-none block border border-taupe focus:outline-none text-xs px-4 py-3"
        ></textarea>
        <div className="flex justify-end mt-1 text-taupe text-[8px]">
          {note.length}/250
        </div>
        <button className="hidden" ref={submitRef} type="submit"></button>
      </div>
    </CartForm>
  );
}
