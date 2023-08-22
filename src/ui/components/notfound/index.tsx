interface Prop {
  text?: string;
}
const NotFound = ({ text }: Prop) => {
  return (
    <tr>
      <td colSpan={8}>
        <p className="text-center py-10 font-semibold text-xl">{text}</p>
      </td>
    </tr>
  );
};
export default NotFound;
