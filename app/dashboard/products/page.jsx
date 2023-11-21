import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import styles from "@/app/ui/dashboard/products/products.module.css";
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/pagination";

export default function ProductsPage() {
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
          <tr>
            <td>
              <div className={styles.product}>
                <Image className={styles.userImage} src="/noproduct.jpg" alt="user image" width={40} height={40} />
                Iphone
              </div>
            </td>
            <td>Desc</td>
            <td>99£</td>
            <td>13.01.2022</td>
            <td>72</td>
            <td>
              <div className={styles.buttons}>
                <Link href="/dashboard/products/test">
                  <button className={`${styles.button} ${styles.view}`}>view</button>
                </Link>
                <button className={`${styles.button} ${styles.delete}`}>delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination />
        </div>
    )
}