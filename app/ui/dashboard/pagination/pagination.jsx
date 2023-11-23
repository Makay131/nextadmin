"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import styles from "./pagination.module.css";

export default function Pagination({ count }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const page = searchParams.get("page") || 1;
    const params = new URLSearchParams(searchParams);
    const ITEMS_PER_PAGE = 2;

    const handleChangePage = (type) => {
        type === "prev" ?
            params.set("page", parseInt(page) - 1) :
            params.set("page", parseInt(page) + 1);
        replace(`${pathname}?${params}`)
    }

    const hasPrev = ITEMS_PER_PAGE * (parseInt(page) - 1) > 0
    const hasNext = ITEMS_PER_PAGE * (parseInt(page) - 1) + ITEMS_PER_PAGE < count;
    return (
        <div className={styles.container}>
            <button className={styles.button} disabled={!hasPrev} onClick={() => handleChangePage("prev")}>Previous</button>
            <button className={styles.button} disabled={!hasNext} onClick={() => handleChangePage("next")}>Next</button>
        </div>
    )
}
