import { Product, User } from "./models"
import { connectToDatabase } from "./utils";

export const fetchUsers = async (q, page) => {
    //making the search case sensitive with regex
    const regex = new RegExp(q, "i");

    const ITEM_PER_PAGE = 2;

    try {
        connectToDatabase();
        const count = await User.find({username: {$regex: regex }}).count();
        const users = await User.find({username: {$regex: regex }}).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1));
        return {users, count};
    } catch(err) {
        console.log(err)
        throw new Error("Failed to fetch users!")
    }
}
export const fetchProducts = async (q, page) => {
    //making the search case sensitive with regex
    const regex = new RegExp(q, "i");

    const ITEM_PER_PAGE = 2;

    try {
        connectToDatabase();
        const count = await Product.find({title: {$regex: regex }}).count();
        const products = await Product.find({title: {$regex: regex }}).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1));
        return {products, count};
    } catch(err) {
        console.log(err)
        throw new Error("Failed to fetch products!")
    }
}

export const fetchUser = async (id) => {
    try {
        connectToDatabase();
        const user = await User.findById(id)
        return user;
    } catch(err) {
        console.log(err)
        throw new Error("Failed to fetch user!")
    }
}
export const fetchProduct = async (id) => {
    try {
        connectToDatabase();
        const product = await Product.findById(id)
        return product;
    } catch(err) {
        console.log(err)
        throw new Error("Failed to fetch product!")
    }
}