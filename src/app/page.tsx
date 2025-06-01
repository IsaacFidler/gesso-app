import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Heart, Home, Search, BookOpen, User, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { faker } from "@faker-js/faker";

const popularArtworks = Array.from({ length: 9 }).map(() => ({
  id: faker.string.uuid(),
  title: faker.lorem.words(3),
  artist: faker.person.fullName(),
  image: faker.image.urlPicsumPhotos({ width: 400, height: 300 }),
}));

const newAdditions = Array.from({ length: 5 }).map(() => ({
  id: faker.string.uuid(),
  title: faker.lorem.words(3),
  artist: faker.person.fullName(),
  image: faker.image.urlPicsumPhotos({ width: 300, height: 250 }),
}));

const recommendedArtworks = Array.from({ length: 4 }).map(() => ({
  id: faker.string.uuid(),
  title: faker.lorem.words(3),
  artist: faker.person.fullName(),
  image: faker.image.urlPicsumPhotos({ width: 250, height: 250 }),
}));

function ArtworkCard({
  artwork,
  size = "default",
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  artwork: any;
  size?: "default" | "small";
}) {
  const cardClass = size === "small" ? "w-full" : "w-full";
  const imageHeight = size === "small" ? 200 : 250;

  return (
    <Card
      className={`${cardClass} group cursor-pointer hover:shadow-lg transition-shadow duration-300`}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={artwork.image || "/placeholder.svg"}
            alt={artwork.title}
            width={300}
            height={imageHeight}
            className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button size="icon" variant="secondary" className="h-8 w-8">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-sm sm:text-base line-clamp-1 mb-1">
            {artwork.title}
          </h3>
          <p className="text-muted-foreground text-xs sm:text-sm line-clamp-1">
            {artwork.artist}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
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
            <Link href="/" className="flex items-center space-x-2 text-primary">
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

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-12 sm:py-20 lg:py-24">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight mb-6">
                Discover the World&apos;s
                <span className="text-primary block">Greatest Art</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Explore masterpieces from renowned artists, discover new
                favorites, and build your personal collection of inspiring
                artworks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8">
                  Explore Art
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  View Collections
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Artworks */}
        <section className="py-12 sm:py-16">
          <div className="container px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Popular Artworks
              </h2>
              <Button variant="ghost" className="text-primary">
                View All
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularArtworks.map((artwork) => (
                <Link
                  key={artwork.id}
                  href={`/artworks/${artwork.id}`}
                  className="block"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ArtworkCard artwork={artwork} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* New Additions */}
        <section className="py-12 sm:py-16 bg-muted/30">
          <div className="container px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold">New Additions</h2>
              <Button variant="ghost" className="text-primary">
                View All
              </Button>
            </div>

            <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {newAdditions.map((artwork) => (
                  <CarouselItem
                    key={artwork.id}
                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <Link
                      href={`/artworks/${artwork.id}`}
                      className="block"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <ArtworkCard artwork={artwork} size="small" />
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </section>

        {/* Recommended for You */}
        <section className="py-12 sm:py-16">
          <div className="container px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                  Recommended for You
                </h2>
                <p className="text-muted-foreground">
                  Based on your favorites and viewing history
                </p>
              </div>
              <Button variant="ghost" className="text-primary">
                View All
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedArtworks.map((artwork) => (
                <Link
                  key={artwork.id}
                  href={`/artworks/${artwork.id}`}
                  className="relative block"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ArtworkCard artwork={artwork} size="small" />
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    Recommended
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t">
        <div className="flex items-center justify-around py-2">
          <Link
            href="/"
            className="flex flex-col items-center p-2 text-primary"
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
