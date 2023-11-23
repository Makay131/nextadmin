import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import styles from "@/app/ui/dashboard/products/products.module.css";
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { fetchProducts } from "@/app/lib/data";
import { deleteProduct } from "@/app/lib/actions";

export default async function ProductsPage({ searchParams }) {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { products, count } = await fetchProducts(q, page);

    return (
        <div className={styles.container}>
                  <div className={styles.top}>
        <Search placeholder="Search for a product"/>
        <Link href="/dashboard/products/add">
          <button className={styles.addButton}>Add new</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Created At</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
                    <tr key={product.id}>
                      <td>
                        <div className={styles.product}>
                          <Image className={styles.userImage} src={product.img || "/noproduct.jpg"} alt={"image of " + product.title} width={40} height={40} />
                          {product.title}
                        </div>
                      </td>
                      <td>{product.desc}</td>
                      <td>£{product.price}</td>
                      <td>{product.createdAt?.toString().slice(4,16) || "-"}</td>
                      <td>{product.stock}</td>
                      <td>
                        <div className={styles.buttons}>
                          <Link href={`/dashboard/products/${product.id}`}>
                            <button className={`${styles.button} ${styles.view}`}>view</button>
                          </Link>
                          <form action={deleteProduct}>
                            <input type="hidden" name="id" value={product.id} />
                            <button className={`${styles.button} ${styles.delete}`}>delete</button>
                          </form>
                        </div>
                      </td>
                    </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
        </div>
    )
}