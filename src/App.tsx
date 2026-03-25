// @ts-ignore
import "./index.css";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NavLink } from "react-router";
import LoginPage from "./pages/LoginPage";
import { useEffect } from "react";

export function App() {
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem("comments");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, text: "Great sound quality!" },
          { id: 2, text: "Worth the price 👍" },
        ];
  });
  const [newComment, setNewComment] = useState("");
    useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const products = [
    {
      id: 1,
      name: "Sony WH-1000XM5",
      price: "$399",
      date: "2025-10-01",
      image:
        "https://images.unsplash.com/photo-1518441902117-9c3aee4fdddc?w=500",
    },
    {
      id: 2,
      name: "AirPods Max",
      price: "$549",
      date: "2025-09-15",
      image:
        "https://images.unsplash.com/photo-1585386959984-a41552231658?w=500",
    },
    {
      id: 3,
      name: "Bose QuietComfort Ultra",
      price: "$429",
      date: "2025-11-20",
      image:
        "https://images.unsplash.com/photo-1580894908361-967195033215?w=500",
    },
  ];

  const addComment = () => {
    if (!newComment.trim()) return;
    setComments([...comments, { id: Date.now(), text: newComment }]);
    setNewComment("");
  };

  const deleteComment = (id: number) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b">
        <h1 className="text-xl font-bold">HeadphoneHub</h1>
        <div className="flex gap-4">
          <Button variant="ghost">Home</Button>
          <Button variant="ghost">Shop</Button>
          <Button variant="ghost">Contact</Button>
          <NavLink to={"/login"}>login</NavLink>
          <NavLink to={"/Register"}>Register</NavLink>
        </div>
      </nav>

      {/* Header */}
      <header className="text-center py-10">
        <h2 className="text-3xl font-bold mb-2">
          Premium Headphones Store
        </h2>
        <p className="text-muted-foreground">
          Discover the best headphones with top-notch sound quality and comfort.
        </p>
      </header>

      {/* Products */}
      <section className="grid md:grid-cols-3 gap-6 px-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={product.image}
                alt={product.name}
                className="rounded-xl mb-4 h-48 w-full object-cover"
              />
              <p className="text-lg font-semibold">{product.price}</p>
              <p className="text-sm text-muted-foreground">
                Released: {product.date}
              </p>
              <Button
                className="mt-4 w-full"
                onClick={() =>
                  alert(`${product.name} added to cart!`)
                }
              >
                Buy Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Comments */}
      <section className="px-6 py-10 max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>

        <div className="space-y-3 mb-4">
          {comments.map((c) => (
            <Card key={c.id}>
              <CardContent className="py-3 flex justify-between items-center">
                <span>{c.text}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteComment(c.id)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button onClick={addComment}>Add Comment</Button>
        </div>
      </section>
    </div>
  );
}

export default App;