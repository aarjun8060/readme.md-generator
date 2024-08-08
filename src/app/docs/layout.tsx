import Navigation from "@/components/site/navigation";

const DocLayout = ({
    children
}:{
    children:React.ReactNode
}) => {
    return (
        <div className="flex flex-col ">
            <Navigation/>
            <div className="mt-24">
                {children}
            </div>
        </div>
    );
}
 
export default DocLayout;