import styles from "@/app/ui/dashboard/products/singleProduct/singleProduct.module.css"
import Image from "next/image"

export default function SingleProductPage() {
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image src="/noavatar.png" alt="user profile image" fill/>
                </div>
                Iphone
            </div>
            <div className={styles.formContainer}>
                <form action="" className={styles.form}>
                    <label>Title</label>
                    <input type="text" name="title" placeholder="John Doe" />
                    <label>Price</label>
                    <input type="number" name="price" placeholder="2" />
                    <label>Stock</label>
                    <input type="number" name="number" placeholder="2" />
                    <label>Color</label>
                    <input type="text" name="color" placeholder="red" />
                    <label>Size</label>
                    <textarea type="text" name="size" placeholder="Large" />
                    <label>Category</label>
                    <select name="cat" id="cat">
                        <option value="kitchen">Kitchen</option>
                        <option value="computers">Computers</option>
                    </select>
                    <label>Description</label>
                    <textarea name="description" id="description" placeholder="description" rows="10" />
                    <button>Update</button>
                </form>
            </div>
        </div>
    )
}