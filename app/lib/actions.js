"use server"; //NEVER FORGET THIS LOL

import { revalidatePath } from "next/cache";
import { Product, User } from "./models";
import { connectToDatabase } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";

export const addUser = async (formData) => {
    const { username, email, password, phone, address, isActive, isAdmin } = Object.fromEntries(formData);

    try {
        connectToDatabase();

        // We will hash the password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            phone,
            address,
            isAdmin,
            isActive,
        })
        newUser.save();
    } catch(err) {
        console.log(err)
        throw new Error("Failed to create user!")
    }

    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");
}
export const addProduct = async (formData) => {
    const { title, desc, price, stock, color, size } = Object.fromEntries(formData);

    try {
        connectToDatabase();

        const newProduct = new Product({
            title, desc, price, stock, color, size
        })
        newProduct.save();
    } catch(err) {
        console.log(err)
        throw new Error("Failed to create product!")
    }

    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
}

export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData);

    try {
        connectToDatabase();

        await User.findByIdAndDelete(id);

    } catch(err) {
        console.log(err)
        throw new Error("Failed to delete user!")
    }

    revalidatePath("/dashboard/users");
}
export const deleteProduct = async (formData) => {
    const { id } = Object.fromEntries(formData);

    try {
        connectToDatabase();

        await Product.findByIdAndDelete(id);

    } catch(err) {
        console.log(err)
        throw new Error("Failed to delete product!")
    }

    revalidatePath("/dashboard/products");
}

export const updateUser = async (formData) => {
    const { id, username, email, password, phone, address, isActive, isAdmin } = Object.fromEntries(formData);

    try {
        connectToDatabase();
        const updateFields = {
            username, email, password, phone, address, isActive, isAdmin
        }

        Object.keys(updateFields).forEach(key => (updateFields[key] === "" || undefined) && delete updateFields[key]);
        await User.findByIdAndUpdate(id, updateFields);
    } catch(err) {
        console.log(err)
        throw new Error("Failed to update user!")
    }

    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");
}

export const updateProduct = async (formData) => {
    const { id, title, desc, price, stock, color, size } = Object.fromEntries(formData);

    try {
        connectToDatabase();
        const updateFields = {
            title, desc, price, stock, color, size
        }

        Object.keys(updateFields).forEach(key => (updateFields[key] === "" || undefined) && delete updateFields[key]);
        await Product.findByIdAndUpdate(id, updateFields);
    } catch(err) {
        console.log(err)
        throw new Error("Failed to update product!")
    }

    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
}

export const authenticate = async (prevData, formData) => {
    const { username, password } = Object.fromEntries(formData);

    try {
        await signIn("credentials", { username, password, redirect: false });
    } catch(err) {
        // return {error: "Wrong credentials"} ---> useState error handling
        return "Wrong credentials" // --> useFormState error handling
    }
    redirect('/dashboard'); //manually redirect
}