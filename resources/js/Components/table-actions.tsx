import { Link } from '@inertiajs/react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Copy, Eye, Pencil, Trash } from 'lucide-react';
import DialogConfirmation from './dialog-confirmation';
import { useTranslation } from '@/lib/TranslationContext';

interface ItemProps {
  icon: React.ReactNode;
  content: string;
}

interface TooltipOptionProps {
  show?: string | undefined;
  edit?: string | undefined;
  clone?: () => Promise<void>;
  destroy?: () => Promise<void>;
}

export function TooltipItem({ icon, content }: ItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{icon}</TooltipTrigger>
      <TooltipContent>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default function TableActions({
  show,
  edit,
  clone,
  destroy,
}: TooltipOptionProps) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-4 justify-center">
      {show && (
        <TooltipItem
          icon={
            <Link href={show}>
              <Eye size={16} className="text-green-600" />
            </Link>
          }
          content={t?.common.view || 'View'}
        />
      )}
      {edit && (
        <TooltipItem
          icon={
            <Link href={edit}>
              <Pencil size={16} className="text-blue-600" />
            </Link>
          }
          content={t?.common.edit || 'Edit'}
        />
      )}
      {clone && (
        <TooltipItem
          icon={
            <Copy
              size={16}
              className="text-purple-600 cursor-pointer"
              onClick={clone}
            />
          }
          content={t?.common.clone || 'Clone'}
        />
      )}
      {destroy && (
        <DialogConfirmation
          button={
            <TooltipItem
              icon={<Trash size={16} className="text-red-600 cursor-pointer" />}
              content={t?.common.delete || 'Delete'}
            />
          }
          onConfirm={destroy}
        />
      )}
    </div>
  );
}
