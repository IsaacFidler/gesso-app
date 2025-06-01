import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  Home,
  Search,
  BookOpen,
  User,
  Star,
  Plus,
  Share2,
  ArrowLeft,
  Calendar,
  Palette,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { faker } from "@faker-js/faker";

// Mock data for the artwork
const artwork = {
  id: 1,
  title: "The Starry Night",
  artist: {
    name: "Vincent van Gogh",
    id: "van-gogh",
    bio: "Dutch Post-Impressionist painter",
  },
  year: 1889,
  image: faker.image.urlPicsumPhotos({ width: 800, height: 600 }),
  description:
    "The Starry Night is an oil-on-canvas painting by Dutch Post-Impressionist painter Vincent van Gogh. Painted in June 1889, it depicts the view from the east-facing window of his asylum room at Saint-Rémy-de-Provence, just before sunrise, with the addition of an imaginary village. It has been in the permanent collection of the Museum of Modern Art in New York City since 1941.",
  medium: "Oil on canvas",
  dimensions: "73.7 cm × 92.1 cm",
  location: "Museum of Modern Art, New York",
  tags: [
    "Post-Impressionism",
    "Landscape",
    "Night Scene",
    "Swirls",
    "Stars",
    "Village",
  ],
  isFavorited: false,
  inCollection: false,
};

// Mock reviews data
const reviews = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      avatar: faker.image.urlPicsumPhotos({ width: 40, height: 40 }),
      initials: "SC",
    },
    rating: 5,
    comment:
      "Absolutely mesmerizing! The swirling patterns in the sky create such a sense of movement and emotion. Van Gogh's technique here is unparalleled.",
    date: "2 days ago",
  },
  {
    id: 2,
    user: {
      name: "Michael Rodriguez",
      avatar: faker.image.urlPicsumPhotos({ width: 40, height: 40 }),
      initials: "MR",
    },
    rating: 5,
    comment:
      "One of my favorite pieces of all time. The contrast between the turbulent sky and the peaceful village below tells such a beautiful story.",
    date: "1 week ago",
  },
  {
    id: 3,
    user: {
      name: "Emma Thompson",
      avatar: faker.image.urlPicsumPhotos({ width: 40, height: 40 }),
      initials: "ET",
    },
    rating: 4,
    comment:
      "The brushwork is incredible. You can really feel Van Gogh's emotional state through every stroke. A true masterpiece.",
    date: "2 weeks ago",
  },
];

// Mock similar artworks
const similarArtworks = [
  {
    id: 2,
    title: "Café Terrace at Night",
    artist: "Vincent van Gogh",
    image: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
    year: 1888,
  },
  {
    id: 3,
    title: "The Great Wave off Kanagawa",
    artist: "Katsushika Hokusai",
    image: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
    year: 1831,
  },
  {
    id: 4,
    title: "Water Lilies",
    artist: "Claude Monet",
    image: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
    year: 1919,
  },
  {
    id: 5,
    title: "The Persistence of Memory",
    artist: "Salvador Dalí",
    image: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
    year: 1931,
  },
  {
    id: 6,
    title: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer",
    image: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
    year: 1665,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ReviewCard({ review }: { review: any }) {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <Avatar>
          <AvatarImage
            src={review.user.avatar || "/placeholder.svg"}
            alt={review.user.name}
          />
          <AvatarFallback>{review.user.initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">{review.user.name}</h4>
            <span className="text-sm text-muted-foreground">{review.date}</span>
          </div>
          <StarRating rating={review.rating} />
          <p className="mt-3 text-muted-foreground leading-relaxed">
            {review.comment}
          </p>
        </div>
      </div>
    </Card>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SimilarArtworkCard({ artwork }: { artwork: any }) {
  return (
    <Link href={`/artwork/${artwork.id}`} className="block group">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <Image
            src={artwork.image || "/placeholder.svg"}
            alt={artwork.title}
            width={200}
            height={200}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-4">
          <h4 className="font-semibold text-sm line-clamp-1 mb-1">
            {artwork.title}
          </h4>
          <p className="text-muted-foreground text-xs line-clamp-1">
            {artwork.artist}
          </p>
          <p className="text-muted-foreground text-xs">{artwork.year}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function ArtworkDetailPage() {
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

      <main className="container px-4 py-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Artwork Image */}
            <div className="relative mb-8">
              <div className="aspect-[4/3] relative overflow-hidden rounded-lg bg-muted">
                <Image
                  src={artwork.image || "/placeholder.svg"}
                  alt={artwork.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Artwork Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                  {artwork.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-lg text-muted-foreground mb-4">
                  <Link
                    href={`/artist/${artwork.artist.id}`}
                    className="hover:text-foreground transition-colors font-medium"
                  >
                    {artwork.artist.name}
                  </Link>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{artwork.year}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add to Collection
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Heart className="h-4 w-4" />
                  Favourite
                </Button>
              </div>

              {/* Tags */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {artwork.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold mb-3">About this artwork</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {artwork.description}
                </p>
              </div>

              {/* Artwork Details */}
              <div>
                <h3 className="font-semibold mb-3">Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Medium:</span>
                    <span className="ml-2 text-muted-foreground">
                      {artwork.medium}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Dimensions:</span>
                    <span className="ml-2 text-muted-foreground">
                      {artwork.dimensions}
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="font-medium">Location:</span>
                    <span className="ml-2 text-muted-foreground">
                      {artwork.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Artist Info Card */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">About the Artist</h3>
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={faker.image.urlPicsumPhotos({ width: 48, height: 48 })}
                    alt={artwork.artist.name}
                  />
                  <AvatarFallback>VG</AvatarFallback>
                </Avatar>
                <div>
                  <Link
                    href={`/artist/${artwork.artist.id}`}
                    className="font-medium hover:text-primary transition-colors"
                  >
                    {artwork.artist.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {artwork.artist.bio}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View Artist Profile
              </Button>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Views</span>
                  <span className="font-medium">12.4k</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Favorites</span>
                  <span className="font-medium">2.1k</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Collections</span>
                  <span className="font-medium">856</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <StarRating rating={5} />
                    <span className="font-medium ml-1">4.9</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Reviews Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Reviews</h2>
            <Button variant="outline">Write a Review</Button>
          </div>
          <div className="space-y-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>

        <Separator className="my-12" />

        {/* Similar Artworks */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Similar Artworks</h2>
            <Button variant="ghost" className="text-primary">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {similarArtworks.map((similarArtwork) => (
              <SimilarArtworkCard
                key={similarArtwork.id}
                artwork={similarArtwork}
              />
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
