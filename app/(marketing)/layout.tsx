import {    NavBar  } from "./_components/navbar";
const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <NavBar />
            <main> {children} </main>
        </div>
    )
}

export default MarketingLayout;