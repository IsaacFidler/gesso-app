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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Home,
  Search,
  BookOpen,
  User,
  Edit3,
  MoreVertical,
  Heart,
  Plus,
  Settings,
  Trash2,
  Globe,
  Lock,
  RefreshCw,
  Calendar,
  MapPin,
  LinkIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { faker } from "@faker-js/faker";

// Mock current user data
const currentUser = {
  id: "current-user",
  name: "Alex Rivera",
  username: "@alex_art",
  bio: "Digital artist and art collector passionate about contemporary art and emerging artists.",
  avatar: faker.image.urlPicsumPhotos({ width: 120, height: 120 }),
  location: "New York, NY",
  website: "alexrivera.art",
  joinDate: "January 2023",
  stats: {
    followers: 1234,
    following: 567,
    artworks: 45,
    collections: 8,
  },
};

// Mock pinned favourites (exactly 4)
const pinnedFavourites = Array.from({ length: 4 }).map(() => ({
  id: faker.string.uuid(),
  title: faker.lorem.words(3),
  artist: faker.person.fullName(),
  year: faker.date.past({ years: 200 }).getFullYear(),
  image: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
}));

// Mock user collections
const userCollections = Array.from({ length: 4 }).map(() => ({
  id: faker.string.uuid(),
  title: faker.lorem.words(2),
  description: faker.lorem.sentence(),
  artworkCount: faker.number.int({ min: 5, max: 32 }),
  visibility: faker.helpers.arrayElement(["Public", "Private"]) as
    | "Public"
    | "Private",
  previewArtworks: Array.from({
    length: faker.number.int({ min: 2, max: 3 }),
  }).map(() => faker.image.urlPicsumPhotos({ width: 100, height: 100 })),
  updatedAt: faker.date.recent({ days: 30 }).toLocaleDateString(),
}));

function PinnedArtworkCard({ artwork }: { artwork: any }) {
  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        <Link href={`/artworks/${artwork.id}`}>
          <div className="relative overflow-hidden">
            <Image
              src={artwork.image || "/placeholder.svg"}
              alt={artwork.title}
              width={300}
              height={300}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Heart className="h-3 w-3 fill-current" />
                Pinned
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-sm line-clamp-1 mb-1">
              {artwork.title}
            </h3>
            <p className="text-muted-foreground text-xs line-clamp-1 mb-1">
              {artwork.artist}
            </p>
            <p className="text-muted-foreground text-xs">{artwork.year}</p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}

function CollectionCard({ collection }: { collection: any }) {
  const [, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    // Simulate API call
    setTimeout(() => {
      setIsDeleting(false);
      // Remove collection from list
    }, 1000);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Preview Images */}
          <div className="flex -space-x-2">
            {collection.previewArtworks
              .slice(0, 3)
              .map((image: string, index: number) => (
                <div
                  key={index}
                  className="w-12 h-12 rounded-lg border-2 border-background overflow-hidden bg-muted"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt=""
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            {collection.artworkCount > 3 && (
              <div className="w-12 h-12 rounded-lg border-2 border-background bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                +{collection.artworkCount - 3}
              </div>
            )}
          </div>

          {/* Collection Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Link href={`/collections/${collection.id}`}>
                  <h3 className="font-semibold text-base line-clamp-1 hover:text-primary transition-colors">
                    {collection.title}
                  </h3>
                </Link>
                <Badge
                  variant={
                    collection.visibility === "Public" ? "default" : "secondary"
                  }
                  className="text-xs flex items-center gap-1"
                >
                  {collection.visibility === "Public" ? (
                    <Globe className="h-3 w-3" />
                  ) : (
                    <Lock className="h-3 w-3" />
                  )}
                  {collection.visibility}
                </Badge>
              </div>

              {/* Action Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/collections/${collection.id}/edit`}>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Collection
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Collection Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Collection
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete collection?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete &quot;
                          {collection.title}&quot; and remove all artworks from
                          this collection. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          className="bg-destructive text-destructive-foreground"
                        >
                          Delete Collection
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
              {collection.description}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{collection.artworkCount} artworks</span>
              <span>Updated {collection.updatedAt}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MyProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                G
              </span>
            </div>
            <span className="font-bold text-xl">Gesso</span>
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
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span>Collections</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center space-x-2 text-primary"
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
          </nav>

          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
                <AvatarImage
                  src={currentUser.avatar || "/placeholder.svg"}
                  alt={currentUser.name}
                />
                <AvatarFallback className="text-2xl">
                  {currentUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl sm:text-3xl font-bold">
                      {currentUser.name}
                    </h1>
                    <Button variant="outline" size="sm">
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    {currentUser.username}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                    {currentUser.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{currentUser.location}</span>
                      </div>
                    )}
                    {currentUser.website && (
                      <div className="flex items-center gap-1">
                        <LinkIcon className="h-4 w-4" />
                        <Link
                          href={`https://${currentUser.website}`}
                          className="hover:text-primary transition-colors"
                        >
                          {currentUser.website}
                        </Link>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {currentUser.joinDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl">
                {currentUser.bio}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <span className="font-semibold">
                    {currentUser.stats.followers.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground">followers</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">
                    {currentUser.stats.following.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground">following</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">
                    {currentUser.stats.collections}
                  </span>
                  <span className="text-muted-foreground">collections</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Pinned Favourites */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500" />
              Pinned Favourites
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Change
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Change Pinned Favourites</DialogTitle>
                  <DialogDescription>
                    Select up to 4 artworks to pin to your profile. These will
                    be prominently displayed to visitors.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    This would show a grid of your favorited artworks to choose
                    from...
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pinnedFavourites.map((artwork) => (
              <PinnedArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </section>

        <Separator className="mb-8" />

        {/* My Collections */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              My Collections ({userCollections.length})
            </h2>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create New Collection
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {userCollections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </section>
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
            className="flex flex-col items-center p-2 text-muted-foreground"
          >
            <BookOpen className="h-5 w-5" />
            <span className="text-xs mt-1">Collections</span>
          </Link>
          <Link
            href="/profile"
            className="flex flex-col items-center p-2 text-primary"
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
