import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const PRODUCTS = [
  {
    id: 1,
    name: "SoundVault Pro X",
    tagline: "Studio-grade isolation. Anywhere.",
    price: 349,
    originalPrice: 429,
    badge: "Best Seller",
    badgeVariant: "default",
    date: "Jan 12, 2025",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&auto=format",
    specs: ["40mm drivers", "ANC", "36h battery"],
    comments: [
      { user: "Marta K.", avatar: "MK", text: "Absolutely love these. The noise cancellation is unreal for the price.", stars: 5, date: "Feb 3, 2025" },
      { user: "Jonas P.", avatar: "JP", text: "Great sound stage. A bit heavy after 2hrs but still top pick.", stars: 4, date: "Mar 1, 2025" },
    ],
  },
  {
    id: 2,
    name: "AuraBuds Lite",
    tagline: "Featherlight. Fierce bass.",
    price: 89,
    originalPrice: null,
    badge: "New",
    badgeVariant: "secondary",
    date: "Mar 5, 2025",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop&auto=format",
    specs: ["TWS", "IPX5", "28h total"],
    comments: [
      { user: "Rūta A.", avatar: "RA", text: "Perfect for workouts. Never fall out.", stars: 5, date: "Mar 20, 2025" },
    ],
  },
  {
    id: 3,
    name: "DeepField Studio",
    tagline: "Hear what the mix engineer heard.",
    price: 599,
    originalPrice: 699,
    badge: "Pro",
    badgeVariant: "destructive",
    date: "Nov 8, 2024",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop&auto=format",
    specs: ["Planar magnetic", "Open-back", "Wired"],
    comments: [
      { user: "Tomas V.", avatar: "TV", text: "Reference-level audio. Not for casual listeners — for people who NEED accuracy.", stars: 5, date: "Dec 14, 2024" },
      { user: "Ana S.", avatar: "AS", text: "Expensive but worth every cent if you're a producer.", stars: 5, date: "Jan 7, 2025" },
      { user: "Lukas M.", avatar: "LM", text: "The soundstage is impossibly wide. Incredible.", stars: 5, date: "Feb 22, 2025" },
    ],
  },
  {
    id: 4,
    name: "CloudWave Flex",
    tagline: "Your commute, reimagined.",
    price: 179,
    originalPrice: 219,
    badge: "Sale",
    badgeVariant: "outline",
    date: "Feb 18, 2025",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop&auto=format",
    specs: ["Foldable", "30h ANC", "USB-C"],
    comments: [
      { user: "Elena D.", avatar: "ED", text: "Folds so compact, fits in my jacket pocket. Game changer for travel.", stars: 4, date: "Mar 10, 2025" },
    ],
  },
  {
    id: 5,
    name: "NightOwl SE",
    tagline: "Built for the dark hours.",
    price: 259,
    originalPrice: null,
    badge: "Limited",
    badgeVariant: "default",
    date: "Mar 15, 2025",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=300&fit=crop&auto=format",
    specs: ["Midnight edition", "Hi-Res Audio", "Leather band"],
    comments: [],
  },
  {
    id: 6,
    name: "PulseRun Sport",
    tagline: "Sweat-proof. Drop-proof. Unstoppable.",
    price: 129,
    originalPrice: 159,
    badge: "Popular",
    badgeVariant: "secondary",
    date: "Jan 30, 2025",
    image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=400&h=300&fit=crop&auto=format",
    specs: ["IPX7", "Wing tips", "24h battery"],
    comments: [
      { user: "Dmitri O.", avatar: "DO", text: "Survived my muddy half-marathon. I'm never switching.", stars: 5, date: "Feb 28, 2025" },
      { user: "Klara R.", avatar: "KR", text: "Very comfortable. Bass is punchy for gym sessions.", stars: 4, date: "Mar 5, 2025" },
    ],
  },
];

function StarRating({ stars }) {
  return (
    <span className="text-amber-400 text-sm tracking-tighter">
      {"★".repeat(stars)}{"☆".repeat(5 - stars)}
    </span>
  );
}

function ProductDrawer({ product, onAddToCart }) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(product.comments);
  const [authorName, setAuthorName] = useState("");

  const submitComment = () => {
    if (!newComment.trim() || !authorName.trim()) return;
    const c = {
      user: authorName,
      avatar: authorName.slice(0, 2).toUpperCase(),
      text: newComment,
      stars: 5,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    setComments([...comments, c]);
    setNewComment("");
    setAuthorName("");
  };

  return (
    <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto bg-zinc-950 text-zinc-100 border-zinc-800">
      <SheetHeader className="mb-6">
        <SheetTitle className="text-zinc-100 text-2xl font-bold tracking-tight">{product.name}</SheetTitle>
        <p className="text-zinc-400 text-sm italic">{product.tagline}</p>
      </SheetHeader>

      <img src={product.image} alt={product.name} className="w-full h-52 object-cover rounded-xl mb-6 border border-zinc-800" />

      <div className="flex items-end gap-3 mb-2">
        <span className="text-3xl font-black text-white">${product.price}</span>
        {product.originalPrice && (
          <span className="text-zinc-500 line-through text-lg mb-0.5">${product.originalPrice}</span>
        )}
        <Badge variant={product.badgeVariant} className="mb-0.5 ml-auto">{product.badge}</Badge>
      </div>
      <p className="text-zinc-500 text-xs mb-4">Listed {product.date}</p>

      <div className="flex gap-2 flex-wrap mb-6">
        {product.specs.map(s => (
          <span key={s} className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full border border-zinc-700">{s}</span>
        ))}
      </div>

      <Button className="w-full mb-6 bg-white text-zinc-950 hover:bg-zinc-200 font-bold text-base" onClick={() => onAddToCart(product)}>
        Add to Cart — ${product.price}
      </Button>

      <Separator className="bg-zinc-800 mb-5" />

      <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-widest mb-4">
        Reviews ({comments.length})
      </h3>

      <ScrollArea className="h-52 mb-5 pr-2">
        {comments.length === 0 && <p className="text-zinc-600 text-sm">No reviews yet. Be the first!</p>}
        <div className="flex flex-col gap-4">
          {comments.map((c, i) => (
            <div key={i} className="flex gap-3">
              <Avatar className="h-8 w-8 shrink-0 bg-zinc-700 text-zinc-200">
                <AvatarFallback className="bg-zinc-700 text-zinc-200 text-xs">{c.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-200">{c.user}</span>
                  <span className="text-xs text-zinc-600">{c.date}</span>
                </div>
                <StarRating stars={c.stars} />
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Separator className="bg-zinc-800 mb-4" />
      <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Leave a Review</h4>
      <Input
        placeholder="Your name"
        value={authorName}
        onChange={e => setAuthorName(e.target.value)}
        className="mb-2 bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 text-sm"
      />
      <Textarea
        placeholder="Share your experience..."
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
        className="mb-3 bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 text-sm resize-none h-20"
      />
      <Button variant="outline" className="w-full border-zinc-600 text-zinc-200 hover:bg-zinc-800 text-sm" onClick={submitComment}>
        Post Review
      </Button>
    </SheetContent>
  );
}

export default function HeadphoneShop() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.tagline.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🎧</span>
            <div>
              <span className="font-black text-xl tracking-tight text-white">BUNSON</span>
              <span className="block text-[10px] text-zinc-500 leading-none tracking-widest uppercase">Audio Gear</span>
            </div>
          </div>

          <Input
            placeholder="Search headphones..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="max-w-xs bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 text-sm h-9"
          />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative border-zinc-700 text-zinc-200 hover:bg-zinc-800 shrink-0 text-sm h-9">
                🛒 Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-zinc-950 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-zinc-950 border-zinc-800 text-zinc-100">
              <SheetHeader>
                <SheetTitle className="text-zinc-100 text-xl font-bold">Your Cart</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                {cart.length === 0 && <p className="text-zinc-500 text-sm">Your cart is empty.</p>}
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center border-b border-zinc-800 pb-3">
                    <div>
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-zinc-500">Qty: {item.qty}</p>
                    </div>
                    <span className="text-sm font-bold">${item.price * item.qty}</span>
                  </div>
                ))}
                {cart.length > 0 && (
                  <>
                    <Separator className="bg-zinc-800" />
                    <div className="flex justify-between text-lg font-black">
                      <span>Total</span>
                      <span>${cartTotal}</span>
                    </div>
                    <Button className="w-full bg-white text-zinc-950 hover:bg-zinc-200 font-bold mt-2">Checkout</Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-14 pb-10 text-center">
        <Badge variant="outline" className="border-zinc-700 text-zinc-400 mb-4 text-xs tracking-widest uppercase">Premium Audio Store</Badge>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tighter text-white mb-3 leading-none">
          Hear it all.<br />
          <span className="text-zinc-400">Miss nothing.</span>
        </h1>
        <p className="text-zinc-500 max-w-md mx-auto text-base">
          Curated headphones for audiophiles, athletes, and everyone in between. Every pair tested, every review real.
        </p>
      </section>

      {/* Product Grid */}
      <main className="max-w-6xl mx-auto px-4 pb-20">
        {filtered.length === 0 && (
          <p className="text-center text-zinc-600 text-sm py-20">No products found for "{search}"</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => (
            <Sheet key={product.id}>
              <Card className="bg-zinc-900 border-zinc-800 overflow-hidden hover:border-zinc-600 transition-all duration-200 hover:-translate-y-0.5 flex flex-col">
                <CardHeader className="p-0 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge
                    variant={product.badgeVariant}
                    className="absolute top-3 left-3 text-xs"
                  >
                    {product.badge}
                  </Badge>
                </CardHeader>

                <CardContent className="p-4 flex-1">
                  <h2 className="text-base font-bold text-zinc-100 tracking-tight">{product.name}</h2>
                  <p className="text-zinc-500 text-xs italic mb-3">{product.tagline}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.specs.map(s => (
                      <span key={s} className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full border border-zinc-700">{s}</span>
                    ))}
                  </div>

                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xl font-black text-white">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-zinc-600 line-through text-sm">${product.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-zinc-600 text-[10px] tracking-wide">Added {product.date}</p>

                  {product.comments.length > 0 && (
                    <div className="mt-3 flex items-center gap-2">
                      <StarRating stars={Math.round(product.comments.reduce((s, c) => s + c.stars, 0) / product.comments.length)} />
                      <span className="text-zinc-600 text-xs">({product.comments.length})</span>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="p-4 pt-0 flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-white text-zinc-950 hover:bg-zinc-200 font-bold text-xs h-8"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                  <SheetTrigger asChild>
                    <Button size="sm" variant="outline" className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 text-xs h-8">
                      Details
                    </Button>
                  </SheetTrigger>
                </CardFooter>
              </Card>
              <ProductDrawer product={product} onAddToCart={addToCart} />
            </Sheet>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 text-center text-zinc-600 text-xs tracking-wide">
        <span className="font-black text-zinc-400">BUNSON</span> Audio Gear · Premium Headphones · © 2025
      </footer>
    </div>
  );
}