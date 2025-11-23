import { ReactNode } from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  btnAction?: ReactNode;
}

function HeaderPage({ title, subtitle, btnAction }: HeaderProps) {
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
        {btnAction && <div>{btnAction}</div>}
      </div>
    </>
  );
}

export default HeaderPage;
