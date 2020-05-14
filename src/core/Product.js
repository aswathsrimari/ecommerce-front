import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getProducts, read, listRelated} from './apiCore'
import {Card} from './Card';

const Product = (props) =>{
    const [Product, setProduct] = useState({})
    const [error, setError] = useState(false)
    const [relatedProduct, setrelatedProduct] = useState([])


    const loadSingleProduct = productId =>{
        read(productId).then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setProduct(data);
                listRelated(data._id).then(data=>{
                    if(data.error){
                        setError(data.error)
                    }else{
                        setrelatedProduct(data)
                    }
                })
            }
        })

    }
    useEffect(()=>{
        const productId = props.match.params.productId
        loadSingleProduct(productId)
    },[props])
    return (
        <Layout title={Product && Product.name} description={Product && Product.description && Product.description.substring(0,100)} className="container-fluid">
           <h2 className="mb-4">Single  Product</h2>
           <div className="row">
             <div className="col-8">
             {Product && Product.description && <Card product={Product} showViewProductButton={false}/>}
             </div>

             <div className="col-4">
               <h4>Related Products</h4>
               {relatedProduct.map((p,i)=>(
                   <div className="mb-3">
                        <Card key={i} product={p}/>
                   </div>
               ))}
             
             </div>
           </div>
        </Layout>
    

    )
}
export default Product;