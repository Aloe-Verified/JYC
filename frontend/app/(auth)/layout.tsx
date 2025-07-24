const RootLayout = ({
    children,

}: {
    children: React.ReactNode;
}) => {
    return (
        <div className = "h-full bg-[#FFFDD0] text-white">
            {children}
        </div>
    );
}
export default RootLayout;