"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Plus,
  MoreVertical,
  Edit3,
  Trash2,
  Globe,
  Lock,
  Settings,
  Share2,
  Copy,
  Eye,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { faker } from "@faker-js/faker";

// Mock collections data
const allCollections = Array.from({ length: 8 }).map(() => ({
  id: faker.string.uuid(),
  title: faker.lorem.words(2),
  description: faker.lorem.sentence(),
  artworkCount: faker.number.int({ min: 5, max: 41 }),
  visibility: faker.helpers.arrayElement(["Public", "Private"]) as
    | "Public"
    | "Private",
  previewArtworks: Array.from({
    length: faker.number.int({ min: 1, max: 3 }),
  }).map(() => faker.image.urlPicsumPhotos({ width: 120, height: 120 })),
  updatedAt: faker.date.recent({ days: 60 }).toLocaleDateString(),
  createdAt: faker.date.past({ years: 1 }).toLocaleDateString(),
}));

// Define a type for collection
interface Collection {
  id: string;
  title: string;
  description: string;
  artworkCount: number;
  visibility: "Public" | "Private";
  previewArtworks: string[];
  updatedAt: string;
  createdAt: string;
}

function CollectionCard({ collection }: { collection: Collection }) {
  const handleDelete = () => {
    // Simulate API call
    // Remove collection from list
  };

  const handleDuplicate = () => {
    console.log("Duplicating collection:", collection.title);
  };

  const handleShare = () => {
    console.log("Sharing collection:", collection.title);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 h-full">
      <CardContent className="p-0">
        <Link href={`/collections/${collection.id}`} className="block">
          {/* Preview Images */}
          <div className="relative p-4 pb-2">
            <div className="flex justify-center items-center gap-2 min-h-[80px]">
              {collection.previewArtworks.length > 0 ? (
                collection.previewArtworks
                  .slice(0, 3)
                  .map((image: string, index: number) => (
                    <div
                      key={index}
                      className={`relative overflow-hidden rounded-lg bg-muted ${
                        collection.previewArtworks.length === 1
                          ? "w-20 h-20"
                          : collection.previewArtworks.length === 2
                          ? "w-16 h-16"
                          : "w-12 h-12"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt=""
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))
              ) : (
                <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
        </Link>

        {/* Collection Info */}
        <div className="p-4 pt-2">
          <div className="flex items-start justify-between mb-2">
            <Link href={`/collections/${collection.id}`}>
              <h3 className="font-semibold text-base line-clamp-1 hover:text-primary transition-colors">
                {collection.title}
              </h3>
            </Link>

            {/* Action Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/collections/${collection.id}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Collection
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/collections/${collection.id}/edit`}>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Collection
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDuplicate}>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                {collection.visibility === "Public" && (
                  <DropdownMenuItem onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
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
                        This will permanently delete &quot;{collection.title}
                        &quot; and remove all artworks from this collection.
                        This action cannot be undone.
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

          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {collection.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
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
              <span className="text-xs text-muted-foreground">
                {collection.artworkCount} artworks
              </span>
            </div>
          </div>

          <div className="mt-2 text-xs text-muted-foreground">
            Updated {collection.updatedAt}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState({ filter }: { filter: string }) {
  const getEmptyMessage = () => {
    switch (filter) {
      case "public":
        return {
          title: "No public collections",
          description:
            "You haven't created any public collections yet. Create one to share your curated artworks with the community.",
        };
      case "private":
        return {
          title: "No private collections",
          description:
            "You haven't created any private collections yet. Create one to keep your personal favorites organized.",
        };
      default:
        return {
          title: "No collections yet",
          description:
            "Start building your art collection by creating your first curated gallery of artworks.",
        };
    }
  };

  const { title, description } = getEmptyMessage();

  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
        <BookOpen className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        {description}
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Collection
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Collection</DialogTitle>
            <DialogDescription>
              Start curating your favorite artworks by creating a new
              collection.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Collection creation form would go here...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function CollectionsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const getFilteredCollections = () => {
    switch (activeFilter) {
      case "public":
        return allCollections.filter(
          (collection) => collection.visibility === "Public"
        );
      case "private":
        return allCollections.filter(
          (collection) => collection.visibility === "Private"
        );
      default:
        return allCollections;
    }
  };

  const filteredCollections = getFilteredCollections();
  const publicCount = allCollections.filter(
    (c) => c.visibility === "Public"
  ).length;
  const privateCount = allCollections.filter(
    (c) => c.visibility === "Private"
  ).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}

      <main className="container px-4 py-8 max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              My Collections
            </h1>
            <p className="text-muted-foreground">
              Organize and manage your curated artworks in personalized
              collections
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="flex items-center gap-2 shrink-0">
                <Plus className="h-4 w-4" />
                Create New Collection
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Collection</DialogTitle>
                <DialogDescription>
                  Start curating your favorite artworks by creating a new
                  collection.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm text-muted-foreground">
                  Collection creation form would go here...
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter Tabs */}
        <Tabs
          value={activeFilter}
          onValueChange={setActiveFilter}
          className="mb-8"
        >
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">All ({allCollections.length})</TabsTrigger>
            <TabsTrigger value="public">Public ({publicCount})</TabsTrigger>
            <TabsTrigger value="private">Private ({privateCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {filteredCollections.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCollections.map((collection) => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))}
              </div>
            ) : (
              <EmptyState filter="all" />
            )}
          </TabsContent>

          <TabsContent value="public" className="mt-6">
            {filteredCollections.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCollections.map((collection) => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))}
              </div>
            ) : (
              <EmptyState filter="public" />
            )}
          </TabsContent>

          <TabsContent value="private" className="mt-6">
            {filteredCollections.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCollections.map((collection) => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))}
              </div>
            ) : (
              <EmptyState filter="private" />
            )}
          </TabsContent>
        </Tabs>
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
