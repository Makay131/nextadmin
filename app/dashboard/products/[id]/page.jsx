import { updateProduct } from "@/app/lib/actions"
import { fetchProduct } from "@/app/lib/data"
import styles from "@/app/ui/dashboard/products/singleProduct/singleProduct.module.css"
import Image from "next/image"

export default async function SingleProductPage({params}) {
    const product = await fetchProduct(params.id);
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image src={product.img || "/noavatar.png"} alt="product profile image" fill/>
                </div>
                {product.title}
            </div>
            <div className={styles.formContainer}>
                <form action={updateProduct} className={styles.form}>
                    <input type="hidden" name="id" value={product.id} />
                    <label>Title</label>
                    <input type="text" name="title" placeholder={product.title} />
                    <label>Price</label>
                    <input type="number" name="price" placeholder={product.price} />
                    <label>Stock</label>
                    <input type="number" name="number" placeholder={product.stock} />
                    <label>Color</label>
                    <input type="text" name="color" placeholder={product.color} />
                    <label>Size</label>
                    <textarea type="text" name="size" placeholder={product.size} />
                    <label>Category</label>
                    <select name="cat" id="cat">
                        <option value="kitchen">Kitchen</option>
                        <option value="computers">Computers</option>
                    </select>
                    <label>Description</label>
                    <textarea name="description" id="desc" placeholder={product.desc} rows="10" />
                    <button>Update</button>
                </form>
            </div>
        </div>
    )
}