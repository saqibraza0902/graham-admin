import { cn } from "@/utils/styles";

interface Prop {
  text?: string;
  className?: string
}
const NotFound = ({ text, className }: Prop) => {
  return (
    <tr>
      <td colSpan={8}>
        <p className={cn("text-center py-10 font-semibold text-xl", className)}>{text}</p>
      </td>
    </tr>
  );
};
export default NotFound;
