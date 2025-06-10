import { Footer } from "./_components/footer";
import { Heading } from "./_components/heading";
import BoyLogo from "./_components/boylogo";



const MarketingPage = () => {
    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-8 dark:bg-gray-900 dark:text-gray-100">
        <div className="max-w-md">
          <BoyLogo />
          <Heading />
        </div>
        
        
        </div>
        <Footer />
      </>
    )
}

export default MarketingPage;