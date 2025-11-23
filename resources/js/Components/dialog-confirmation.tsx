import { ReactNode } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/Components/ui/alert-dialog';
import { useTranslation } from '@/lib/TranslationContext';

interface Props {
  button: ReactNode;
  title?: string;
  subtitle?: string;
  onConfirm: () => void;
}

export default function DialogConfirmation({
  button,
  onConfirm,
  title,
  subtitle,
}: Props) {
  const { t } = useTranslation();
  return (
    <AlertDialog>
      <AlertDialogTrigger>{button}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title ?? t?.common.alertTitleDelete}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {subtitle ?? t?.common.alertSubtitleDelete}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t?.common.cancel}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {t?.common.yes}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
