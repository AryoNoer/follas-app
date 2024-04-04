"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Limelight } from "next/font/google";

interface Menu {
    id: number;
    name: string;
    description: string;
    price: number;
    rating: number;
    image: string;
    category: string;
}

export default function AddMenuPage() {
    const ApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const [menus, setMenus] = useState<Menu[]>([]);
    const [newMenu, setNewMenu] = useState<Menu>({ id: 0, name: '', description: '', price: 0, rating: 0, image: '', category: '' });
    const [updateMenu, setUpdateMenu] = useState<Menu>({ id: 0, name: '', description: '', price: 0, rating: 0, image: '', category: '' });

    useEffect(() => {
        fetchMenus();
    }, []);

    // Fetch menus
    const fetchMenus = async () => {
        try {
            const response = await axios.get<Menu[]>(`${ApiUrl}/api/menu`);
            setMenus(response.data);
        } catch (error) {
            console.error("Error fetching menus:", error);
        }
    };

    // Create menu
    const createMenu = async () => {
        try {
            const response = await axios.post<Menu>(`${ApiUrl}/api/menu`, newMenu);
            setMenus([...menus, response.data]);
        } catch (error) {
            console.error("Error creating menu:", error);
        }
    };

    // Update menu
    const updateMenuDetails = async () => {
        try {
            const response = await axios.put<Menu>(`${ApiUrl}/api/menu/${updateMenu.id}`, updateMenu);
            setMenus(menus.map((menu) => (menu.id === response.data.id ? response.data : menu)));
        } catch (error) {
            console.error("Error updating menu:", error);
        }
    };

    // Delete menu
    const deleteMenu = async (id: number) => {
        try {
            await axios.delete(`${ApiUrl}/api/menu/${id}`);
            setMenus(menus.filter((menu) => menu.id !== id));
        } catch (error) {
            console.error("Error deleting menu:", error);
        }
    };


    return (
        <main className="flex h-screen flex-col items-center justify-center p-8 bg-follas-cream">
            <div className="w-full max-w-2xl">
                <h1 className="text-3xl font-bold mb-4">Menus</h1>
                <ul className="space-y-4">
                    {menus.map((menu) => (
                        <li key={menu.id} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
                            <div className="w-24 h-24 flex-shrink-0">
                                <img src={menu.image} alt={menu.name} className="object-cover w-full h-full rounded-md" />
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold">{menu.name}</div>
                                <div className="text-gray-600">{menu.description}</div>
                                <div className="text-gray-700">Price: ${menu.price}</div>
                                <div className="text-gray-700">Rating: {menu.rating}</div>
                                <div className="text-gray-700">Category: {menu.category}</div>
                            </div>
                            <div>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => setUpdateMenu(menu)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                                    onClick={() => deleteMenu(menu.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Form to add new menu */}
            <div className="w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Add New Menu</h2>
                <form onSubmit={createMenu} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newMenu.name}
                        onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
                        className="border border-gray-400 rounded-md py-2 px-4"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newMenu.description}
                        onChange={(e) => setNewMenu({ ...newMenu, description: e.target.value })}
                        className="border border-gray-400 rounded-md py-2 px-4"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={newMenu.price}
                        onChange={(e) => setNewMenu({ ...newMenu, price: parseInt(e.target.value) })}
                        className="border border-gray-400 rounded-md py-2 px-4"
                    />
                    <input
                        type="number"
                        placeholder="Rating"
                        value={newMenu.rating}
                        onChange={(e) => setNewMenu({ ...newMenu, rating: parseInt(e.target.value) })}
                        className="border border-gray-400 rounded-md py-2 px-4"
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={newMenu.image}
                        onChange={(e) => setNewMenu({ ...newMenu, image: e.target.value })}
                        className="border border-gray-400 rounded-md py-2 px-4"
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={newMenu.category}
                        onChange={(e) => setNewMenu({ ...newMenu, category: e.target.value })}
                        className="border border-gray-400 rounded-md py-2 px-4"
                    />
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Menu
                    </button>
                </form>
            </div>
            <div>
        <h2 className="text-2xl font-bold mb-4">Update Menu</h2>
        <input
          type="text"
          placeholder="Name"
          value={updateMenu.name}
          onChange={(e) => setUpdateMenu({ ...updateMenu, name: e.target.value })}
          className="border border-gray-400 rounded-md py-1 px-2 mb-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={updateMenu.description}
          onChange={(e) => setUpdateMenu({ ...updateMenu, description: e.target.value })}
          className="border border-gray-400 rounded-md py-1 px-2 mb-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={updateMenu.price}
          onChange={(e) => setUpdateMenu({ ...updateMenu, price: parseInt(e.target.value) })}
          className="border border-gray-400 rounded-md py-1 px-2 mb-2"
        />
        <input
          type="number"
          placeholder="Rating"
          value={updateMenu.rating}
          onChange={(e) => setUpdateMenu({ ...updateMenu, rating: parseInt(e.target.value) })}
          className="border border-gray-400 rounded-md py-1 px-2 mb-2"
        />
        <input
          type="text"
          placeholder="Image"
          value={updateMenu.image}
          onChange={(e) => setUpdateMenu({ ...updateMenu, image: e.target.value })}
          className="border border-gray-400 rounded-md py-1 px-2 mb-2"
        />
        <input
          type="text"
          placeholder="Category"
          value={updateMenu.category}
          onChange={(e) => setUpdateMenu({ ...updateMenu, category: e.target.value })}
          className="border border-gray-400 rounded-md py-1 px-2 mb-2"
        />  
        <button
          onClick={updateMenuDetails}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Menu
        </button>
      </div>
        </main>
    );
}