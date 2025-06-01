/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  Home,
  Search,
  BookOpen,
  User,
  MoreVertical,
  Edit3,
  Trash2,
  ArrowLeft,
  Lock,
  Globe,
  Plus,
  GripVertical,
  X,
  Share2,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { faker } from "@faker-js/faker";

// Mock data for the collection
const collection = {
  id: "modern-masters",
  title: "Modern Masters",
  description:
    "A curated collection of groundbreaking artworks from the modern art movement, featuring pieces that revolutionized artistic expression in the 20th century.",
  visibility: "Public" as "Public" | "Private",
  owner: {
    id: "sarah-chen",
    name: "Sarah Chen",
    username: "@sarahc_art",
    avatar: faker.image.urlPicsumPhotos({ width: 40, height: 40 }),
    initials: "SC",
  },
  createdAt: "March 2024",
  artworkCount: 12,
  followers: 234,
  isOwner: true, // This would be determined by auth
};

// Mock artworks in the collection
const collectionArtworks = [
  {
    id: 1,
    title: "The Starry Night",
    artist: "Vincent van Gogh",
    year: 1889,
    image: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
    addedAt: "2 days ago",
  },
  {
    id: 2,
    title: "The Persistence of Memory",
    artist: "Salvador Dalí",
    year: 1931,
    image: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
    addedAt: "1 week ago",
  },
  {
    id: 3,
    title: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer",
    year: 1665,
    image: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
    addedAt: "2 weeks ago",
  },
  {
    id: 4,
    title: "The Great Wave off Kanagawa",
    artist: "Katsushika Hokusai",
    year: 1831,
    image: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
    addedAt: "3 weeks ago",
  },
  {
    id: 5,
    title: "American Gothic",
    artist: "Grant Wood",
    year: 1930,
    image: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
    addedAt: "1 month ago",
  },
  {
    id: 6,
    title: "The Scream",
    artist: "Edvard Munch",
    year: 1893,
    image: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
    addedAt: "1 month ago",
  },
  {
    id: 7,
    title: "Guernica",
    artist: "Pablo Picasso",
    year: 1937,
    image: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
    addedAt: "2 months ago",
  },
  {
    id: 8,
    title: "The Birth of Venus",
    artist: "Sandro Botticelli",
    year: 1485,
    image: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
    addedAt: "2 months ago",
  },
];

function ArtworkCard({ artwork, isOwner }: { artwork: any; isOwner: boolean }) {
  const [, setIsRemoving] = useState(false);

  const handleRemoveFromCollection = () => {
    setIsRemoving(true);
    // Simulate API call
    setTimeout(() => {
      setIsRemoving(false);
      // Remove artwork from collection
    }, 1000);
  };

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300">
      {isOwner && (
        <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-background/80 backdrop-blur"
          >
            <GripVertical className="h-4 w-4" />
          </Button>
        </div>
      )}

      {isOwner && (
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 bg-background/80 backdrop-blur"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Heart className="h-4 w-4 mr-2" />
                Add to Favorites
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-destructive"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remove from Collection
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Remove artwork from collection?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove &quot;{artwork.title}&quot; from your
                      collection. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleRemoveFromCollection}
                      className="bg-destructive text-destructive-foreground"
                    >
                      Remove
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      <CardContent className="p-0">
        <Link href={`/artworks/${artwork.id}`} className="block">
          <div className="relative overflow-hidden">
            <Image
              src={artwork.image || "/placeholder.svg"}
              alt={artwork.title}
              width={300}
              height={300}
              className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-sm sm:text-base line-clamp-1 mb-1">
              {artwork.title}
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm line-clamp-1 mb-1">
              {artwork.artist}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{artwork.year}</span>
              <span>Added {artwork.addedAt}</span>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function CollectionPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(collection.description);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <Link
              href="/collections"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Collections</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  G
                </span>
              </div>
              <span className="font-bold text-xl">Gesso</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/explore"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>Explore</span>
            </Link>
            <Link
              href="/collections"
              className="flex items-center space-x-2 text-primary"
            >
              <BookOpen className="h-4 w-4" />
              <span>Collections</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8">
        {/* Collection Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl sm:text-4xl font-bold">
                  {collection.title}
                </h1>
                <Badge
                  variant={
                    collection.visibility === "Public" ? "default" : "secondary"
                  }
                  className="flex items-center gap-1"
                >
                  {collection.visibility === "Public" ? (
                    <Globe className="h-3 w-3" />
                  ) : (
                    <Lock className="h-3 w-3" />
                  )}
                  {collection.visibility}
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={collection.owner.avatar || "/placeholder.svg"}
                      alt={collection.owner.name}
                    />
                    <AvatarFallback className="text-xs">
                      {collection.owner.initials}
                    </AvatarFallback>
                  </Avatar>
                  <Link
                    href={`/profile/${collection.owner.id}`}
                    className="hover:text-foreground transition-colors font-medium"
                  >
                    {collection.owner.name}
                  </Link>
                  <span className="text-muted-foreground">
                    {collection.owner.username}
                  </span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Created {collection.createdAt}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                <span>{collection.artworkCount} artworks</span>
                <span>{collection.followers} followers</span>
              </div>
            </div>

            {collection.isOwner && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Collection
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete collection?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete &quot;{collection.title}
                        &quot; and remove all artworks from this collection.
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-destructive text-destructive-foreground">
                        Delete Collection
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            {isEditing ? (
              <div className="space-y-3">
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a description for your collection..."
                  className="min-h-[100px]"
                />
                <div className="flex items-center gap-2">
                  <Button size="sm" onClick={() => setIsEditing(false)}>
                    Save Changes
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setDescription(collection.description);
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground leading-relaxed max-w-3xl">
                {description || "No description provided."}
              </p>
            )}
          </div>

          {collection.isOwner && (
            <div className="flex items-center gap-3">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Artwork
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share Collection
              </Button>
            </div>
          )}
        </div>

        <Separator className="mb-8" />

        {/* Collection Grid */}
        {collectionArtworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {collectionArtworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                isOwner={collection.isOwner}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              No artworks in this collection
            </h3>
            <p className="text-muted-foreground mb-4">
              {collection.isOwner
                ? "Start building your collection by adding your favorite artworks."
                : "This collection doesn't have any artworks yet."}
            </p>
            {collection.isOwner && (
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Artwork
              </Button>
            )}
          </div>
        )}

        {/* Collection Stats */}
        {collectionArtworks.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {collection.artworkCount}
                </div>
                <div className="text-sm text-muted-foreground">Artworks</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {collection.followers}
                </div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">15</div>
                <div className="text-sm text-muted-foreground">Artists</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">8</div>
                <div className="text-sm text-muted-foreground">Centuries</div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t">
        <div className="flex items-center justify-around py-2">
          <Link
            href="/"
            className="flex flex-col items-center p-2 text-muted-foreground"
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            href="/explore"
            className="flex flex-col items-center p-2 text-muted-foreground"
          >
            <Search className="h-5 w-5" />
            <span className="text-xs mt-1">Explore</span>
          </Link>
          <Link
            href="/collections"
            className="flex flex-col items-center p-2 text-primary"
          >
            <BookOpen className="h-5 w-5" />
            <span className="text-xs mt-1">Collections</span>
          </Link>
          <Link
            href="/profile"
            className="flex flex-col items-center p-2 text-muted-foreground"
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
