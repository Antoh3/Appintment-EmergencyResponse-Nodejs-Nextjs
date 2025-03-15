interface SiteHeaderProps {
    heading: string;
    text?: string;
    children?: React.ReactNode;
  }
  
  const SiteHeader = ({ heading, text, children }: SiteHeaderProps) => {
    return (
      // <div className="flex items-center justify-between px-2">
      <div >
        <div className=" gap-1">
          <h1 className="font-medium text-3xl md:text-4xl">{heading}</h1>
          {text && <p className="text-lg text-muted-foreground">{text}</p>}
        </div>
        {children}
      </div>
    );
  };
  
  export default SiteHeader;
  