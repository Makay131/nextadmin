import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdShoppingBag,
    MdAttachMoney,
    MdWork,
    MdAnalytics,
    MdPeople,
    MdOutlineSettings,
    MdHelpCenter,
    MdLogout,
  } from "react-icons/md";
import { auth, signOut } from "@/app/auth";

const menuItems = [
    {
      title: "Pages",
      list: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: <MdDashboard />,
        },
        {
          title: "Users",
          path: "/dashboard/users",
          icon: <MdSupervisedUserCircle />,
        },
        {
          title: "Products",
          path: "/dashboard/products",
          icon: <MdShoppingBag />,
        },
        {
          title: "Transactions",
          path: "/dashboard/transactions",
          icon: <MdAttachMoney />,
        },
      ],
    },
    {
      title: "Analytics",
      list: [
        {
          title: "Revenue",
          path: "/dashboard/revenue",
          icon: <MdWork />,
        },
        {
          title: "Reports",
          path: "/dashboard/reports",
          icon: <MdAnalytics />,
        },
        {
          title: "Teams",
          path: "/dashboard/teams",
          icon: <MdPeople />,
        },
      ],
    },
    {
      title: "User",
      list: [
        {
          title: "Settings",
          path: "/dashboard/settings",
          icon: <MdOutlineSettings />,
        },
        {
          title: "Help",
          path: "/dashboard/help",
          icon: <MdHelpCenter />,
        },
      ],
    },
  ];

export default async function Sidebar() {
    const session = await auth(); // initially session only has the email(check out auth.js to add more props of user objects)
    const user = session.user;
    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image className={styles.userImage} src={user.img || "/noavatar.png"} alt={user.username + "'s profile picture"} width="50" height="50" />
                <div className={styles.userDetail}>
                    <span className={styles.username}>{user.username}</span>
                    <span className={styles.userTitle}>Administrator</span>
                </div>
            </div>
            <ul className={styles.list}>
                {menuItems.map(category => {
                    return (
                        <li key={category.title}>
                            <span className={styles.cat}>{category.title}</span>
                            {category.list.map(item => (
                                <MenuLink key={item.title} item={item} />
                            ))}
                        </li>
                    )
                })}
            </ul>
            <form action={async () => {
              "use server";
              await signOut();
            }}>
              <button className={styles.logout}>
                <MdLogout />
                Logout
              </button>
            </form>
        </div>
    )
}