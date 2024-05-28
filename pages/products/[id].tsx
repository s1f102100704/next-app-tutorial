import { useRouter } from "next/router";


const Product = () => {
    const router = useRouter();
    const {id} = router.query;
    return (
        <div>
            にんいのID 
        </div>
    );
}

export default Product;