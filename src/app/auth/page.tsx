"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Palette,
  Users,
  Heart,
  BookOpen,
  Star,
  ArrowRight,
  Eye,
  EyeOff,
  Chrome,
  Sparkles,
  ImageIcon,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock featured artworks for the hero section
const featuredArtworks = [
  {
    id: 1,
    image: "/placeholder.svg?height=200&width=200",
    title: "Starry Night",
    artist: "Van Gogh",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=200&width=200",
    title: "The Scream",
    artist: "Munch",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=200&width=200",
    title: "Girl with Pearl",
    artist: "Vermeer",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=200&width=200",
    title: "Great Wave",
    artist: "Hokusai",
  },
  {
    id: 5,
    image: "/placeholder.svg?height=200&width=200",
    title: "Persistence",
    artist: "Dalí",
  },
  {
    id: 6,
    image: "/placeholder.svg?height=200&width=200",
    title: "American Gothic",
    artist: "Wood",
  },
];

const stats = [
  { icon: ImageIcon, label: "Artworks", value: "50K+" },
  { icon: Users, label: "Artists", value: "12K+" },
  { icon: BookOpen, label: "Collections", value: "8K+" },
  { icon: Heart, label: "Art Lovers", value: "100K+" },
];

function AuthForm({ type }: { type: "login" | "signup" }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", { type, email, password, name });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {type === "signup" && (
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {type === "login" && (
        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      )}

      <Button type="submit" className="w-full" size="lg">
        {type === "login" ? "Log In" : "Create Account"}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button type="button" variant="outline" className="w-full" size="lg">
        <Chrome className="h-4 w-4 mr-2" />
        Continue with Google
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        {type === "login" ? (
          <>
            {"Don't have an account? "}
            <Link href="#" className="text-primary hover:underline">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="#" className="text-primary hover:underline">
              Log in
            </Link>
          </>
        )}
      </div>
    </form>
  );
}

export default function AuthPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-20 w-48 h-48 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-36 h-36 bg-pink-500 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">
                G
              </span>
            </div>
            <span className="font-bold text-2xl">Gesso</span>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Log In</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Welcome back to Gesso</DialogTitle>
                <DialogDescription>
                  Sign in to your account to continue exploring art
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Log In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login" className="mt-6">
                  <AuthForm type="login" />
                </TabsContent>
                <TabsContent value="signup" className="mt-6">
                  <AuthForm type="signup" />
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Join the Art Community
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  Discover Art.
                  <span className="text-primary block">Share Passion.</span>
                  <span className="text-muted-foreground">
                    Build Collections.
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Connect with fellow art enthusiasts, explore masterpieces from
                  around the world, and curate your personal collection of
                  inspiring artworks.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="flex justify-center mb-2">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-6" asChild>
                  <Link href="/explore">
                    Start Exploring
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-lg px-8 py-6"
                    >
                      Create Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Join Gesso</DialogTitle>
                      <DialogDescription>
                        Create your account to start building your art
                        collection
                      </DialogDescription>
                    </DialogHeader>
                    <AuthForm type="signup" />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Right Column - Artwork Grid */}
            <div className="relative">
              <div className="grid grid-cols-3 gap-4 transform rotate-3 hover:rotate-0 transition-transform duration-700">
                {featuredArtworks.map((artwork, index) => (
                  <div
                    key={artwork.id}
                    className={`relative group cursor-pointer ${
                      index % 2 === 0 ? "translate-y-4" : "-translate-y-4"
                    }`}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <CardContent className="p-0">
                        <Image
                          src={artwork.image || "/placeholder.svg"}
                          alt={artwork.title}
                          width={200}
                          height={200}
                          className="w-full h-32 sm:h-40 object-cover"
                        />
                        <div className="p-3">
                          <h3 className="font-semibold text-sm line-clamp-1">
                            {artwork.title}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {artwork.artist}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 animate-pulse">
                <TrendingUp className="h-3 w-3" />
                Trending
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Star className="h-3 w-3 fill-current" />
                Featured
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 lg:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Art Lovers Choose Gesso
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to explore, discover, and share your passion
              for art in one beautiful platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Palette className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Discover Art</h3>
              <p className="text-muted-foreground text-sm">
                Explore thousands of artworks from classical masterpieces to
                contemporary creations.
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Build Collections</h3>
              <p className="text-muted-foreground text-sm">
                Curate your personal galleries and organize artworks by theme,
                style, or preference.
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Connect</h3>
              <p className="text-muted-foreground text-sm">
                Join a community of art enthusiasts and share your discoveries
                with like-minded people.
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Share Passion</h3>
              <p className="text-muted-foreground text-sm">
                Express your love for art through reviews, favorites, and
                thoughtful discussions.
              </p>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <Card className="bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 border-primary/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Start Your Art Journey?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of art lovers who are already discovering,
                collecting, and sharing their passion on Gesso.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="text-lg px-8 py-6">
                      Get Started Free
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Join Gesso</DialogTitle>
                      <DialogDescription>
                        Create your account to start building your art
                        collection
                      </DialogDescription>
                    </DialogHeader>
                    <AuthForm type="signup" />
                  </DialogContent>
                </Dialog>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6"
                  asChild
                >
                  <Link href="/explore">Explore as Guest</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t bg-background/80 backdrop-blur">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  G
                </span>
              </div>
              <span className="font-bold text-xl">Gesso</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link
                href="/about"
                className="hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-foreground transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/contact"
                className="hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
