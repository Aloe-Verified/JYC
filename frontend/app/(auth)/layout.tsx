const RootLayout = ({
    children,

}: {
    children: React.ReactNode;
}) => {
    return (
        <div className = "min-h-screen bg-[radial-gradient(ellipse_at_top,#F5EAD5_0%,#E7D5B7_100%)] text-[#493322]">
            {children}
        </div>
    );
}
export default RootLayout;