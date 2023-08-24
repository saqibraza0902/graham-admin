import { useAppDispatch } from '@/redux/hooks';
import { buyerId } from '@/redux/slices/buyerslice';
import { setSellerID } from '@/redux/slices/sellerslice';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface DropArray {
  title: string;
  path?: string;
}
interface DropProps {
  buyer_id?: string;
  seller_id?: string;
  onClose: () => void;
  invoice?: string;
  DropArray: DropArray[];
}
const Menu = ({
  buyer_id,
  seller_id,
  invoice,
  onClose,
  DropArray,
}: DropProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleDropClick = (path: string) => {
    if (seller_id) {
      dispatch(setSellerID(seller_id));
      router.push(`${path}?page=1`);
    } else if (buyer_id) {
      dispatch(buyerId(buyer_id));
      router.push(`${path}?page=1`);
    } else if (invoice) {
      router.push(`${path}?id=${invoice}`);
    } else {
      router.push(`${path}`);
    }
  };
  const dropdownRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  return (
    <div
      className="bg-white shadow-2xl rounded-xl relative !z-10"
      ref={dropdownRef}
    >
      <ul className="py-4 font-Montserrat text-xs font-semibold ">
        {DropArray.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              if (item.path) {
                handleDropClick(item.path);
              }
            }}
            className="hover:bg-brand_yellow-500 hover:text-white py-2 w-full px-5 rounded-lg"
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Menu;
