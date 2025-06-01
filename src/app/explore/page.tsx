/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  Search,
  BookOpen,
  User,
  Filter,
  TrendingUp,
  Users,
  Tag,
  Heart,
  Eye,
  Calendar,
  MapPin,
  Palette,
  Crown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { faker } from "@faker-js/faker";

// Mock data for trending artworks
const trendingArtworks = [
  {
    id: 1,
    title: "The Starry Night",
    artist: "Vincent van Gogh",
    year: 1889,
    image: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
    views: "12.4k",
    likes: "2.1k",
    trending: true,
  },
  {
    id: 2,
    title: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer",
    year: 1665,
    image: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
    views: "8.7k",
    likes: "1.8k",
    trending: true,
  },
  {
    id: 3,
    title: "The Great Wave",
    artist: "Katsushika Hokusai",
    year: 1831,
    image: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
    views: "15.2k",
    likes: "3.4k",
    trending: true,
  },
  {
    id: 4,
    title: "The Persistence of Memory",
    artist: "Salvador Dalí",
    year: 1931,
    image: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
    views: "9.8k",
    likes: "2.3k",
    trending: true,
  },
  {
    id: 5,
    title: "American Gothic",
    artist: "Grant Wood",
    year: 1930,
    image: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
    views: "6.5k",
    likes: "1.2k",
    trending: true,
  },
  {
    id: 6,
    title: "The Scream",
    artist: "Edvard Munch",
    year: 1893,
    image: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
    views: "11.3k",
    likes: "2.7k",
    trending: true,
  },
];

// Mock data for featured collections
const featuredCollections = [
  {
    id: 1,
    title: "Impressionist Masterpieces",
    description: "A curated selection of the finest Impressionist paintings",
    owner: "Sarah Chen",
    artworkCount: 24,
    followers: 1200,
    coverImage: faker.image.urlPicsumPhotos({ width: 300, height: 200 }),
    featured: true,
  },
  {
    id: 2,
    title: "Modern Abstract Art",
    description: "Exploring the boundaries of abstract expression",
    owner: "Michael Rodriguez",
    artworkCount: 18,
    followers: 856,
    coverImage: faker.image.urlPicsumPhotos({ width: 300, height: 200 }),
    featured: true,
  },
  {
    id: 3,
    title: "Renaissance Portraits",
    description: "Timeless portraits from the Renaissance period",
    owner: "Emma Thompson",
    artworkCount: 32,
    followers: 2100,
    coverImage: faker.image.urlPicsumPhotos({ width: 300, height: 200 }),
    featured: true,
  },
  {
    id: 4,
    title: "Contemporary Sculptures",
    description: "Modern three-dimensional art forms",
    owner: "David Kim",
    artworkCount: 15,
    followers: 634,
    coverImage: faker.image.urlPicsumPhotos({ width: 300, height: 200 }),
    featured: true,
  },
];

// Mock data for new artists
const newArtists = [
  {
    id: 1,
    name: "Luna Martinez",
    username: "@luna_art",
    bio: "Digital artist exploring surreal landscapes",
    avatar: faker.image.urlPicsumPhotos({ width: 80, height: 80 }),
    artworkCount: 12,
    followers: 234,
    isNew: true,
  },
  {
    id: 2,
    name: "Alex Chen",
    username: "@alexc_creates",
    bio: "Contemporary painter and sculptor",
    avatar: faker.image.urlPicsumPhotos({ width: 80, height: 80 }),
    artworkCount: 8,
    followers: 156,
    isNew: true,
  },
  {
    id: 3,
    name: "Maya Patel",
    username: "@maya_vision",
    bio: "Mixed media artist and photographer",
    avatar: faker.image.urlPicsumPhotos({ width: 80, height: 80 }),
    artworkCount: 15,
    followers: 389,
    isNew: true,
  },
  {
    id: 4,
    name: "Jordan Smith",
    username: "@jordan_draws",
    bio: "Illustrator and concept artist",
    avatar: faker.image.urlPicsumPhotos({ width: 80, height: 80 }),
    artworkCount: 22,
    followers: 567,
    isNew: true,
  },
  {
    id: 5,
    name: "Zara Ahmed",
    username: "@zara_paints",
    bio: "Abstract expressionist painter",
    avatar: faker.image.urlPicsumPhotos({ width: 80, height: 80 }),
    artworkCount: 18,
    followers: 445,
    isNew: true,
  },
  {
    id: 6,
    name: "Rio Tanaka",
    username: "@rio_art",
    bio: "Traditional and digital artist",
    avatar: faker.image.urlPicsumPhotos({ width: 80, height: 80 }),
    artworkCount: 9,
    followers: 278,
    isNew: true,
  },
];

// Mock data for popular tags
const popularTags = [
  { name: "Impressionism", count: 1234, trending: true },
  { name: "Abstract", count: 987, trending: false },
  { name: "Portrait", count: 856, trending: true },
  { name: "Landscape", count: 743, trending: false },
  { name: "Modern Art", count: 692, trending: true },
  { name: "Renaissance", count: 567, trending: false },
  { name: "Surrealism", count: 445, trending: true },
  { name: "Pop Art", count: 389, trending: false },
  { name: "Minimalism", count: 334, trending: false },
  { name: "Expressionism", count: 298, trending: true },
  { name: "Cubism", count: 267, trending: false },
  { name: "Photography", count: 234, trending: false },
];

function ArtworkCard({ artwork }: { artwork: any }) {
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
              className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {artwork.trending && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Trending
              </div>
            )}
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{artwork.views}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                <span>{artwork.likes}</span>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-sm sm:text-base line-clamp-1 mb-1">
              {artwork.title}
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm line-clamp-1 mb-1">
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
  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        <Link href={`/collections/${collection.id}`}>
          <div className="relative overflow-hidden">
            <Image
              src={collection.coverImage || "/placeholder.svg"}
              alt={collection.title}
              width={300}
              height={200}
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {collection.featured && (
              <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Crown className="h-3 w-3" />
                Featured
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-base line-clamp-1 mb-1">
              {collection.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
              {collection.description}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>by {collection.owner}</span>
              <div className="flex items-center gap-3">
                <span>{collection.artworkCount} works</span>
                <span>{collection.followers} followers</span>
              </div>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}

function ArtistCard({ artist }: { artist: any }) {
  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 text-center">
      <CardContent className="p-6">
        <Link href={`/artist/${artist.id}`}>
          <div className="relative mb-4">
            <Avatar className="h-16 w-16 mx-auto">
              <AvatarImage
                src={artist.avatar || "/placeholder.svg"}
                alt={artist.name}
              />
              <AvatarFallback>
                {artist.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {artist.isNew && (
              <div className="absolute -top-1 -right-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                New
              </div>
            )}
          </div>
          <h3 className="font-semibold text-base mb-1">{artist.name}</h3>
          <p className="text-muted-foreground text-sm mb-1">
            {artist.username}
          </p>
          <p className="text-muted-foreground text-xs line-clamp-2 mb-3">
            {artist.bio}
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span>{artist.artworkCount} works</span>
            <span>{artist.followers} followers</span>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("trending");

  return (
    <div className="min-h-screen bg-background">
      <main className="container px-4 py-8 max-w-6xl mx-auto">
        {/* Search Section */}
        <div className="mb-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">
              Explore Art
            </h1>
            <p className="text-muted-foreground text-center mb-6">
              Discover amazing artworks, collections, and artists from around
              the world
            </p>

            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for artworks, artists, collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Tag className="h-4 w-4 mr-2" />
                    Tags
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Popular Tags</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Impressionism</DropdownMenuItem>
                  <DropdownMenuItem>Abstract</DropdownMenuItem>
                  <DropdownMenuItem>Portrait</DropdownMenuItem>
                  <DropdownMenuItem>Landscape</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Palette className="h-4 w-4 mr-2" />
                    Style
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Art Styles</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Renaissance</DropdownMenuItem>
                  <DropdownMenuItem>Baroque</DropdownMenuItem>
                  <DropdownMenuItem>Modern</DropdownMenuItem>
                  <DropdownMenuItem>Contemporary</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Period
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Time Periods</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Ancient (Before 500 CE)</DropdownMenuItem>
                  <DropdownMenuItem>Medieval (500-1400)</DropdownMenuItem>
                  <DropdownMenuItem>Renaissance (1400-1600)</DropdownMenuItem>
                  <DropdownMenuItem>Modern (1800-1950)</DropdownMenuItem>
                  <DropdownMenuItem>Contemporary (1950+)</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Artist
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Famous Artists</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Vincent van Gogh</DropdownMenuItem>
                  <DropdownMenuItem>Pablo Picasso</DropdownMenuItem>
                  <DropdownMenuItem>Leonardo da Vinci</DropdownMenuItem>
                  <DropdownMenuItem>Claude Monet</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    Location
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Locations</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Europe</DropdownMenuItem>
                  <DropdownMenuItem>North America</DropdownMenuItem>
                  <DropdownMenuItem>Asia</DropdownMenuItem>
                  <DropdownMenuItem>Other</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 max-w-4xl mx-auto">
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Trending</span>
            </TabsTrigger>
            <TabsTrigger
              value="collections"
              className="flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Collections</span>
            </TabsTrigger>
            <TabsTrigger value="artists" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Artists</span>
            </TabsTrigger>
            <TabsTrigger value="tags" className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span className="hidden sm:inline">Tags</span>
            </TabsTrigger>
          </TabsList>

          {/* Trending Artworks */}
          <TabsContent value="trending" className="space-y-6">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold">Trending Artworks</h2>
              <Button variant="ghost" className="text-primary">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {trendingArtworks.map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} />
              ))}
            </div>
          </TabsContent>

          {/* Featured Collections */}
          <TabsContent value="collections" className="space-y-6">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold">Featured Collections</h2>
              <Button variant="ghost" className="text-primary">
                View All
              </Button>
            </div>
            <div className="max-w-6xl mx-auto">
              <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {featuredCollections.map((collection) => (
                    <CarouselItem
                      key={collection.id}
                      className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                    >
                      <CollectionCard collection={collection} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
              </Carousel>
            </div>
          </TabsContent>

          {/* New Artists */}
          <TabsContent value="artists" className="space-y-6">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold">New Artists</h2>
              <Button variant="ghost" className="text-primary">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {newArtists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          </TabsContent>

          {/* Popular Tags */}
          <TabsContent value="tags" className="space-y-6">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold">Popular Tags</h2>
              <Button variant="ghost" className="text-primary">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Trending Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags
                    .filter((tag) => tag.trending)
                    .map((tag) => (
                      <Badge
                        key={tag.name}
                        variant="default"
                        className="cursor-pointer hover:bg-primary/80 transition-colors"
                      >
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {tag.name} ({tag.count})
                      </Badge>
                    ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags
                    .filter((tag) => !tag.trending)
                    .slice(0, 6)
                    .map((tag) => (
                      <Badge
                        key={tag.name}
                        variant="secondary"
                        className="cursor-pointer hover:bg-secondary/80 transition-colors"
                      >
                        {tag.name} ({tag.count})
                      </Badge>
                    ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">All Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.slice(6).map((tag) => (
                    <Badge
                      key={tag.name}
                      variant="outline"
                      className="cursor-pointer hover:bg-accent transition-colors"
                    >
                      {tag.name} ({tag.count})
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
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
            className="flex flex-col items-center p-2 text-primary"
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
