import { Navbar } from "@/component";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default RootLayout;