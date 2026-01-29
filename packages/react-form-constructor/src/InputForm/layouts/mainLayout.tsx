function MainLayout({
  children,
  label,
  required,
  error,
  name,
  labelClass,
  errorClass,
}: {
  children: React.ReactNode;
  label?: React.ReactNode;
  required?: string | boolean;
  error: any;
  name: string;
  labelClass?: any;
  errorClass?: any;
}) {
  return (
    <div>
      {label && (
        <label className={labelClass}>
          {label} {required ? <span>*</span> : null}
        </label>
      )}
      {children}
      {error?.[name] && (
        <span className={errorClass}>{error?.[name]?.message}</span>
      )}
    </div>
  );
}

export default MainLayout;
