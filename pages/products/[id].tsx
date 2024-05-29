import { useRouter } from "next/router";
import styles from "@/../../styles/Home.module.css";
import Link from "next/link";
import {useState,useEffect} from "react";
import React from "react";
interface Params{
   id:string;
   name:string;
   image:string;
}
export async function getStaticProps({params}:{params:Params}){
    const req = await fetch(`http://localhost:3000/${params.id}.json`)
    const data = await req.json();

    return {
        props:{
            product:data
        }
    }
}
export async function getStaticPaths(){
    const req = await fetch(`http://localhost:3000/products.json`)
    const data = await req.json();

    const paths = data.map((product:string)=>{
        return{
            params:{
                id:product,
            }
        }
    })
    return{
        paths,
        fallback:false,
    }
}

const Product = ({product}:{product:Params}) => {
    interface SvgImageProps {
        href: string;
        width: string;
        height: string;
      }
    const router = useRouter();
    console.log(router.query)
    const {id} = router.query;
    
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // クライアントサイドでのみ実行
        setIsClient(true);
      }, []);
    
      if (!isClient) {
        // サーバーサイドでは空のdivをレンダリング
        return <div></div>;
      }
    
    return (
        <div className = {styles.container}>
          <main className ={styles.main}>
            
           <h1>{id}のページです</h1>
           <svg width ="300" height ="300"><image href={product.image} width = "300" height ="300" /></svg>
           
           <p>{product.name}</p>
           <br/>
           <Link href ="/products">商品一覧へ</Link>
          </main>
        </div>
    );
}

export default Product;