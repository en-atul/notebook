import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { DefaultLayout } from "components";


const layoutStyles = {
    lgColumns: "lg:grid-cols-10",
    bgColor: "bg-white"
};

const NoMatchPage = () => {
    return (
        <DefaultLayout {...layoutStyles}>
            <Helmet>
                <title>Page Not Found | MKI Legal</title>
            </Helmet>
            <section className="col-span-10 overflow-y-auto bg-black">
                <section className="flex flex-col h-screen items-center justify-center">
                    
                    <section className="text-center w-3/5">
                        <h1 className="text-xl md:text-5xl abc-regular md:font-normal my-0 leading-snug text-white pb-12">
                            404
                        </h1>
                        <p className="karla text-lg text-white">
                            Something went wrong, the requested page could not be found.
                            <br /> Try again or navigate to a new tab 
                        </p>
                    </section>
                    <Link to="/" className="mt-8">
                        <span className="text-white karla-exl py-1 px-4 rounded-full">Go Back to Home</span>
                    </Link>
                </section>
            </section>
        </DefaultLayout>
    );
};

export default NoMatchPage;
