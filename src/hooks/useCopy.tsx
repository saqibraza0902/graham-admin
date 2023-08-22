import { toast } from "react-toastify";

interface UseCopy {
  handleCopy: (url: string, successMessage?: string) => void;
}

const useCopy = (): UseCopy => {
  const handleCopy = (url: string, successMessage?: string) => {
    if (navigator && url) {
      navigator.clipboard.writeText(url);
      toast.success(successMessage ?? "Link copied!");
    }
  };

  return { handleCopy };
};

export default useCopy;
