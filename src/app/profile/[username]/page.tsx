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
  Home,
  Search,
  BookOpen,
  User,
  MoreHorizontal,
  UserPlus,
  MessageCircle,
  Share2,
  MapPin,
  Calendar,
  LinkIcon,
  Heart,
  Users,
  Star,
  ArrowLeft,
  Globe,
  Lock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock user data
const profileUser = {
  id: "sarah-chen",
  name: "Sarah Chen",
  username: "@sarahc_art",
  bio: "Art curator and digital artist passionate about contemporary art and emerging artists. Exploring the intersection of technology and traditional art forms.",
  avatar: "/placeholder.svg?height=120&width=120",
  coverImage: "/placeholder.svg?height=200&width=800",
  location: "San Francisco, CA",
  website: "sarahchen.art",
  joinDate: "March 2023",
  isVerified: true,
  isFollowing: false,
  stats: {
    followers: 2847,
    following: 456,
    artworks: 89,
    collections: 12,
  },
};

// Mock pinned favourites (exactly 4)
const pinnedFavourites = [
  {
    id: 1,
    title: "The Starry Night",
    artist: "Vincent van Gogh",
    year: 1889,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    title: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer",
    year: 1665,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    title: "The Great Wave off Kanagawa",
    artist: "Katsushika Hokusai",
    year: 1831,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    title: "The Persistence of Memory",
    artist: "Salvador Dalí",
    year: 1931,
    image: "/placeholder.svg?height=300&width=300",
  },
];

// Mock collections
const userCollections = [
  {
    id: 1,
    title: "Impressionist Masters",
    description: "A curated collection of the finest Impressionist paintings",
    artworkCount: 24,
    visibility: "Public" as const,
    previewArtworks: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    updatedAt: "2 days ago",
  },
  {
    id: 2,
    title: "Modern Abstract Art",
    description: "Exploring the boundaries of abstract expression",
    artworkCount: 18,
    visibility: "Public" as const,
    previewArtworks: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    updatedAt: "1 week ago",
  },
  {
    id: 3,
    title: "Contemporary Sculptures",
    description: "Three-dimensional art from the 21st century",
    artworkCount: 15,
    visibility: "Public" as const,
    previewArtworks: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    updatedAt: "2 weeks ago",
  },
  {
    id: 4,
    title: "Digital Art Pioneers",
    description: "Artists pushing the boundaries of digital creativity",
    artworkCount: 32,
    visibility: "Public" as const,
    previewArtworks: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    updatedAt: "3 weeks ago",
  },
];

// Mock recent activity
const recentActivity = [
  {
    id: 1,
    type: "liked",
    artwork: { title: "Composition VII", artist: "Wassily Kandinsky" },
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    type: "added_to_collection",
    artwork: { title: "The Kiss", artist: "Gustav Klimt" },
    collection: "Romantic Art",
    timestamp: "1 day ago",
  },
  {
    id: 3,
    type: "followed",
    user: { name: "Alex Rivera", username: "@alex_art" },
    timestamp: "3 days ago",
  },
  {
    id: 4,
    type: "created_collection",
    collection: "Digital Art Pioneers",
    timestamp: "1 week ago",
  },
];

function ArtworkCard({ artwork }: { artwork: any }) {
  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        <Link href={`/artwork/${artwork.id}`}>
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
  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <Link href={`/collection/${collection.id}`}>
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
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-base line-clamp-1">
                  {collection.title}
                </h3>
                <Badge variant="secondary" className="text-xs">
                  {collection.visibility === "Public" ? (
                    <Globe className="h-3 w-3 mr-1" />
                  ) : (
                    <Lock className="h-3 w-3 mr-1" />
                  )}
                  {collection.visibility}
                </Badge>
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
        </Link>
      </CardContent>
    </Card>
  );
}

function ActivityItem({ activity }: { activity: any }) {
  const getActivityText = () => {
    switch (activity.type) {
      case "liked":
        return (
          <>
            <Heart className="h-4 w-4 text-red-500 mr-2" />
            Liked{" "}
            <span className="font-medium">
              &quot;{activity.artwork.title}&quot;
            </span>{" "}
            by {activity.artwork.artist}
          </>
        );
      case "added_to_collection":
        return (
          <>
            <BookOpen className="h-4 w-4 text-blue-500 mr-2" />
            Added{" "}
            <span className="font-medium">
              &quot;{activity.artwork.title}&quot;
            </span>{" "}
            to <span className="font-medium">{activity.collection}</span>
          </>
        );
      case "followed":
        return (
          <>
            <UserPlus className="h-4 w-4 text-green-500 mr-2" />
            Started following{" "}
            <span className="font-medium">{activity.user.name}</span> (
            {activity.user.username})
          </>
        );
      case "created_collection":
        return (
          <>
            <Star className="h-4 w-4 text-yellow-500 mr-2" />
            Created collection{" "}
            <span className="font-medium">
              &quot;{activity.collection}&quot;
            </span>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-start gap-3 p-4 hover:bg-muted/50 rounded-lg transition-colors">
      <div className="flex items-center text-sm text-muted-foreground flex-1">
        {getActivityText()}
      </div>
      <span className="text-xs text-muted-foreground whitespace-nowrap">
        {activity.timestamp}
      </span>
    </div>
  );
}

export default function ProfilePage() {
  const [isFollowing, setIsFollowing] = useState(profileUser.isFollowing);
  const [followerCount, setFollowerCount] = useState(
    profileUser.stats.followers
  );

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount(isFollowing ? followerCount - 1 : followerCount + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
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

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Report User
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                  src={profileUser.avatar || "/placeholder.svg"}
                  alt={profileUser.name}
                />
                <AvatarFallback className="text-2xl">
                  {profileUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {profileUser.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1">
                  <Star className="h-3 w-3 fill-current" />
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                    {profileUser.name}
                  </h1>
                  <p className="text-muted-foreground mb-2">
                    {profileUser.username}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                    {profileUser.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{profileUser.location}</span>
                      </div>
                    )}
                    {profileUser.website && (
                      <div className="flex items-center gap-1">
                        <LinkIcon className="h-4 w-4" />
                        <Link
                          href={`https://${profileUser.website}`}
                          className="hover:text-primary transition-colors"
                        >
                          {profileUser.website}
                        </Link>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {profileUser.joinDate}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleFollow}
                    className="flex items-center gap-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button variant="outline" size="icon">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Bio */}
              <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl">
                {profileUser.bio}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <span className="font-semibold">
                    {followerCount.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground">followers</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">
                    {profileUser.stats.following.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground">following</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">
                    {profileUser.stats.collections}
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
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pinnedFavourites.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </section>

        <Separator className="mb-8" />

        {/* Collections */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Collections ({userCollections.length})
            </h2>
            <Button variant="ghost" className="text-primary">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {userCollections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </section>

        <Separator className="mb-8" />

        {/* Recent Activity */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Users className="h-6 w-6" />
              Recent Activity
            </h2>
          </div>
          <Card>
            <CardContent className="p-0">
              {recentActivity.map((activity, index) => (
                <div key={activity.id}>
                  <ActivityItem activity={activity} />
                  {index < recentActivity.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
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
